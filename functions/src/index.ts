import * as functions from 'firebase-functions';
import { CommentRepository } from './repositories/comment-repository';

// init data
const commentRepository = new CommentRepository()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const updateComment = functions.https.onRequest((request, response) => {
    // get comments.         
    commentRepository.list()
        .then(comments => comments.map(comment => comment.key))
        .then(async ids => await commentRepository.update(ids))
        .catch(err => console.log('error : ' + err));
    return 0;
});
