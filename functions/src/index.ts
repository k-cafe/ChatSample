import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Comment } from './models/comment';

// init data
admin.initializeApp();
const firebase = admin.database();
const commentReference = firebase.ref('/comments');

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    // get comments.
    commentReference.once('value')
        .then(snapshots => {
            const comments: Comment[] = [];
            Object.keys(snapshots.val()).forEach(key => {
                comments.push(new Comment(snapshots.val()[key]).setData(key));
            });
            return comments;
        })
        .then(comments => {
            response.send(comments[0].content + ' is message');
        });
    });
