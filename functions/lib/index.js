"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const comment_1 = require("./models/comment");
// init data
admin.initializeApp();
const firebase = admin.database();
const commentReference = firebase.ref('/comments');
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.helloWorld = functions.https.onRequest((request, response) => {
    // get comments.
    commentReference.once('value')
        .then(snapshots => {
        const comments = [];
        Object.keys(snapshots.val()).forEach(key => {
            comments.push(new comment_1.Comment(snapshots.val()[key]).setData(key));
        });
        return comments;
    })
        .then(comments => {
        response.send(comments[0].content + ' is message');
    });
});
//# sourceMappingURL=index.js.map