import { database } from './database';
import { Comment } from '../models/comment';

export class CommentRepository {

    async list(): Promise<Comment[]> {
        const reference = database.ref('/comments');
        return await reference.once('value')
                .then(snapshots=> {
                    if(snapshots.exists()) { return this.toComments(snapshots); }
                    else { throw new Error('snapshotはありません'); }
                });
    }

    update(commentsId: string[]): Promise<boolean> {
        const reference = database.ref('/comments');
        const data = {}
        commentsId.forEach(id => { data[`${id}/content`] = 'fix data'; }); 
    
        return reference.update(data)
                .then(() => true)
                .catch(err => false);
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