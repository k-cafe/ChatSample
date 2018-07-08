import { Component, OnInit } from '@angular/core';
import { Comment, User } from '../../models/chat';
import { ChatService } from '../../repositories/chat.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

const CURRENT_USER = new User(1, 'Tanaka Jiro');
const ANOTHER_USER = new User(2, 'Suzuki Taro');

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public content = '';
  public comments: Comment[] = [];
  public current_user = CURRENT_USER;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getComment()
    .snapshotChanges()
    .pipe(map(snapshots =>
      snapshots.map((snapshot: any) => {
        const value: Comment = snapshot.payload.val();
        const key = snapshot.payload.key;
        return new Comment(value.user, value.content, value.date).setData(key);
      }))).subscribe(comments => { this.comments = comments; } );
  }

  addComment(content: string) {
    if (content) {
      const date = +moment();
      this.chatService.create(new Comment(this.current_user, content, date));
      this.content = '';
    }
  }

  toggleEditComment(num: number) {
    this.comments[num].edit_flag = (this.comments[num].edit_flag) ? false : true;
  }

  saveEditComment(num: number, key: String) {
    const data = { content: this.comments[num].content, date: this.comments[num].date };
    this.chatService.update(key, data);
  }

  resetEditComment(num: number) {
    this.comments[num].content = '';
  }

  deleteComment(key: string) {
    this.chatService.delete(key);
  }
}
