const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.deleteUnverifiedUsers = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const users = await admin.auth().listUsers();
  const now = new Date().getTime();
  const usersToDelete = [];

  users.users.forEach((user) => {
    if (!user.emailVerified && now - new Date(user.metadata.creationTime).getTime() > 48 * 60 * 60 * 1000) {
      usersToDelete.push(user.uid);
    }
  });

  if (usersToDelete.length > 0) {
    await admin.auth().deleteUsers(usersToDelete);
    console.log(`Deleted ${usersToDelete.length} unverified users`);
  } else {
    console.log("No unverified users to delete");
  }
});