const crypto = require("crypto");
let array = [];

function generateToken(discordid) {
  const id = crypto.randomBytes(6).toString("hex");
  array[id] = discordid;
  setTimeout(function() {
    if (tokenExists(id)) {
      deleteToken(id);
    }
  }, 900000);
  return id;
}

function deleteToken(tokenid) {
  if(tokenid in array) {
    delete array[tokenid];
  }
}

function tokenExists(tokenid) {
  if(tokenid in array) {
    return true;
  } else {
    return false;
  }
}

function getUserId(tokenid) {
  if(tokenid in array) {
    return array[tokenid];
  } else {
    return false;
  }
}

function getTokens() {
  for (var k in array) {
    console.log("Key: " + key + " // Value: " + array[key]);
  }
}

module.exports = {
  tokenExists,
  deleteToken,
  generateToken,
  getUserId
}
