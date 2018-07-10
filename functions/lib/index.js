"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const comment_repository_1 = require("./repositories/comment-repository");
// init data
const commentRepository = new comment_repository_1.CommentRepository();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.helloWorld = functions.https.onRequest((request, response) => {
    // get comments.         
    commentRepository.list()
        .then(comments => comments.map(comment => comment.key))
        .then(ids => commentRepository.update(ids))
        .catch(err => console.log('error : ' + err));
    return 0;
});
//# sourceMappingURL=index.js.map