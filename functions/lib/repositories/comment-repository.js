"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const comment_1 = require("../models/comment");
class CommentRepository {
    list() {
        const reference = database_1.database.ref('/comments');
        return reference.once('value')
            .then(snapshots => {
            if (snapshots.exists()) {
                return this.toComments(snapshots);
            }
            else {
                throw new Error('snapshotはありません');
            }
        });
    }
    update(commentsId) {
        const reference = database_1.database.ref('/comments');
        commentsId.forEach(id => {
            console.log('update: ' + id);
            const data = { content: 'fix data' };
            reference.child(id).update(data)
                .then(() => console.log('update : ' + id))
                .catch(err => new Error('更新エラー'));
        });
    }
    // methods -----------------------------------------------------------------------
    toComments(snapshots) {
        const comments = [];
        Object.keys(snapshots.val()).forEach(key => {
            comments.push(new comment_1.Comment(snapshots.val()[key]).setData(key));
        });
        return comments;
    }
}
exports.CommentRepository = CommentRepository;
//# sourceMappingURL=comment-repository.js.map