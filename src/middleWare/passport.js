//import authentication strategies
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;
const { Employee } = require("../../db/models");

//Local Strategy
exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    //find user by username
    const user = await Employee.findOne({
      where: { username },
    });
    //password validation
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (passwordsMatch) return done(null, user);
    return done(null, false, { message: "Incorrect password." });
  } catch (error) {
    done(error);
  }
});

//JWT strategy
exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: { use_env_variable: "JWT_SECRET" },
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    }
    try {
      const user = await Employee.findByPk(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
