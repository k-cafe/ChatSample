import { database } from './database';
import { Comment } from '../models/comment';

export class CommentRepository {

    list(): Promise<Comment[]> {
        const reference = database.ref('/comments');
        return reference.once('value')
                .then(snapshots=> {
                    if(snapshots.exists()) { return this.toComments(snapshots.val()); }
                    else { throw new Error('snapshotはありません'); }
                });
    }

    update(commentsId: string[]) {
        const reference = database.ref('/comments');
        commentsId.forEach(id => {
            console.log('update: ' + id);
            const data = { content: 'fix data' };
            reference.child(id).update(data);
        });
    }
    
    // methods -----------------------------------------------------------------------

    toComments(snapshots: any): Comment[] {
        const comments: Comment[] = [];
                Object.keys(snapshots.val()).forEach(key => {
                    comments.push(new Comment(snapshots.val()[key]).setData(key));
                });
                return comments;
    }
    
}