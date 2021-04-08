module.exports = {
  development: {
    username: db,
    password: tv4l3qljbbsv7swt,
    database: db,
    host:
      "app-74bd10b1-463f-4bf5-b7f5-04e2d0d8c403-do-user-9046966-0.b.db.ondigitalocean.com",
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "DATABASE_URL",
  },
};
