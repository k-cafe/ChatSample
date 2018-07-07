"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Comment {
    constructor(comment) {
        this.user = comment.user;
        this.initial = comment.user.name.slice(0, 1);
        this.content = comment.content;
        this.date = comment.date;
        this.edit_flag = false;
    }
    setData(key) {
        this.key = key;
        return this;
    }
}
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map