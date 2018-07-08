import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Comment } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private commentReference: AngularFireList<{}>;

  constructor(private firebase: AngularFireDatabase) { }

  getComment(): AngularFireList<{}> {
    this.commentReference = this.firebase.list('/comments');
    return this.commentReference;
  }

  create(comment: Comment) {
    this.commentReference.push(comment).then(() => {
      alert('create comment');
    });
  }

  update(key: any, data: any) {
    this.commentReference.update(key, data).then(() => {
      alert('update comment');
    });
  }

  delete(key: any) {
    this.commentReference.remove(key).then(() => {
      alert('remove comment');
    });
  }
}
