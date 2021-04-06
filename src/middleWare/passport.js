//import authentication strategies
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;

//Local Strategy
exports.localStrategy = new LocalStrategy(async (uname, password, done) => {
  try {
    //find user by username
    const user = await Employee.findOne({
      where: { uname },
    });
    //password validation
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    passwordsMatch
      ? done(null, user)
      : done(null, false, { message: "Incorrect password." });
  } catch (error) {
    done(error);
  }
});

//JWT strategy
exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
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
