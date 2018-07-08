"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const comment_1 = require("./models/comment");
const moment = require("moment");
// init data
admin.initializeApp();
const firebase = admin.database();
const commentReference = firebase.ref('/comments');
const dayOfMillSeconds = 1000 * 60 * 60 * 24;
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.helloWorld = functions.https.onRequest((request, response) => {
    // get comments.
    commentReference.once('value')
        .then(snapshots => toComments(snapshots))
        .then(comments => comments.filter(comment => {
        return moment().diff(moment(comment.date)) > dayOfMillSeconds;
    }))
        .then(comments => {
        response.send(comments[0].user.name + ' is Over Day ');
    });
});
function toComments(snapshots) {
    const comments = [];
    Object.keys(snapshots.val()).forEach(key => {
        comments.push(new comment_1.Comment(snapshots.val()[key]).setData(key));
    });
    return comments;
}
//# sourceMappingURL=index.js.map