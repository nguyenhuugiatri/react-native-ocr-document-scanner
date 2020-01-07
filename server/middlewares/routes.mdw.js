module.exports = function(app) {
  app.use("/account", require("../routes/account.route"));
};
