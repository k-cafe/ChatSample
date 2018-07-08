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
    const filteredComments = getUnoverDayComments()
                        .then(comments => toCommentId(comments))
                        .then(commentsId => update(commentsId))
                        .then(() => { response.send("updated") });
});

function getUnoverDayComments(): Promise<Comment[]> {
    return commentReference.once('value')
                .then(snapshots => toComments(snapshots))
                .then(comments =>  filterComments(dayOfMillSeconds, comments));
}

function toComments(snapshots: any): Comment[] {
    const comments: Comment[] = [];
            Object.keys(snapshots.val()).forEach(key => {
                comments.push(new Comment(snapshots.val()[key]).setData(key));
            });
            return comments;
}

function filterComments(dayOfMSec: number, comments: Comment[]): Comment[] {
   return comments.filter(comment => moment().diff(moment(comment.date)) < dayOfMSec);
}

function toCommentId(comments: Comment[]): string[] {
     return  comments.map(comment => comment.key);
}

function update(commentsId: string[]) {
    commentsId.forEach(id => {
        console.log('update: ' + id);
        const data = { content: 'fix data' };
        commentReference.child(id).update(data);
    });
}
