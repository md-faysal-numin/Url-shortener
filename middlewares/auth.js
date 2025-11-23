const { getUser } = require("../services/auth");

async function restrictedToOnlyLoggedUser(req, res, next) {
  const userUid = req.cookies?.uuid;
  if (!userUid) return res.redirect("/login");
  //   console.log("passed useruid");
  const user = getUser(userUid);
  if (!user) return res.redirect("/login");
  //   console.log("passed user");

  req.user = user;
  next();
}
async function authOnly(req, res, next) {
  const userUid = req.cookies?.uuid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictedToOnlyLoggedUser,
  authOnly,
};
