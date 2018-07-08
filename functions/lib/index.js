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
    const filteredComments = getUnoverDayComments()
        .then(comments => toCommentId(comments))
        .then(commentsId => update(commentsId))
        .then(() => { response.send("updated"); });
});
function getUnoverDayComments() {
    return commentReference.once('value')
        .then(snapshots => toComments(snapshots))
        .then(comments => filterComments(dayOfMillSeconds, comments));
}
function toComments(snapshots) {
    const comments = [];
    Object.keys(snapshots.val()).forEach(key => {
        comments.push(new comment_1.Comment(snapshots.val()[key]).setData(key));
    });
    return comments;
}
function filterComments(dayOfMSec, comments) {
    console.log(comments[0].user.name + '  is filtered');
    return comments.filter(comment => moment().diff(moment(comment.date)) < dayOfMSec);
}
function toCommentId(comments) {
    console.log('convert to id');
    return comments.map(comment => comment.key);
}
function update(commentsId) {
    commentsId.forEach(id => {
        console.log('update: ' + id);
        const data = { content: 'fix data' };
        commentReference.child(id).update(data);
    });
}
//# sourceMappingURL=index.js.map