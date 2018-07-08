import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Comment } from './models/comment';
import * as moment from 'moment';

// init data
admin.initializeApp();
const firebase = admin.database();
const commentReference = firebase.ref('/comments');
const dayOfMillSeconds = 1000 * 60 * 60 * 24;

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    // get comments.
    commentReference.once('value')
        .then(snapshots => toComments(snapshots))
        .then(comments =>  lessThan(dayOfMillSeconds, comments))
        .then(comments => {
            response.send(comments[0].user.name + ' is Under Day ');
        });
    });

function toComments(snapshots: any): Comment[] {
    const comments: Comment[] = [];
            Object.keys(snapshots.val()).forEach(key => {
                comments.push(new Comment(snapshots.val()[key]).setData(key));
            });
            return comments;
}

function lessThan(dayOfMSec: number, comments: Comment[]): Comment[] {
    return comments.filter(comment => { 
        return moment().diff(moment(comment.date)) < dayOfMSec;
    });
}
