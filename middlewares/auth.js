const { getUser } = require("../services/auth");

async function checkForAuthentication(req, res, next) {
  const authorizationHeaderValue = req.headers["authorization"];
  req.user = null;
  if (
    !authorizationHeaderValue ||
    !authorizationHeaderValue.startsWith("Bearer")
  ) {
    return next();
  }
  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);

  req.user = user;
  return next();
}

/*
async function restrictedToOnlyLoggedUser(req, res, next) {
  // const userUid = req.cookies?.uuid;
  const userUid = req.headers["authorization"];
  if (!userUid) return res.redirect("/login");
  //   console.log("passed useruid");

  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);

  // const user = getUser(userUid);
  if (!user) return res.redirect("/login");
  //   console.log("passed user");

  req.user = user;
  next();
}
async function authOnly(req, res, next) {
  // const userUid = req.cookies?.uuid;
  const userUid = req.headers["authorization"];
  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);

  // const user = getUser(userUid);

  req.user = user;
  next();
}
*/

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
    return next();
  };
}

module.exports = {
  // restrictedToOnlyLoggedUser,
  // authOnly,
  checkForAuthentication,
  restrictTo,
};
