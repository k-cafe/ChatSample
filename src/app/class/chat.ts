import * as moment from 'moment';

export class User {
  uid: number;
  name: string;

  constructor(uid: number, name: string) {
    this.uid = uid;
    this.name = name;
  }
}

export class Comment {
  user: User;
  initial: string;
  content: string;
  date: number;
  key?: string;
  edit_flag?: boolean;

  constructor(user: User, content: string, date: number) {
    this.user = user;
    this.initial = user.name.slice(0, 1);
    this.content = content;
    this.date = date;
    this.edit_flag = false;
  }

  setData(key: string): Comment {
    this.key = key;
    return this;
  }
}
