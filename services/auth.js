// const sessionToUserMap = new Map();
const jwt = require("jsonwebtoken");

const secretKey = "asi$asi";

function setUser(user) {
  //   sessionToUserMap.set(id, user);
  return jwt.sign({ _id: user._id, email: user.email }, secretKey);
}
function getUser(token) {
  //   return sessionToUserMap.get(id);
  if (!token) return null;
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
