import { User } from './user';

export class Comment {
    user: User;
    initial: string;
    content: string;
    date: number;
    key?: string;
    edit_flag?: boolean;
  
    constructor(comment: Comment) {
      this.user = comment.user;
      this.initial = comment.user.name.slice(0, 1);
      this.content = comment.content;
      this.date = comment.date;
      this.edit_flag = false;
    }
  
    setData(key: string): Comment {
      this.key = key;
      return this;
    }
  }