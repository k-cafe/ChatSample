import { Component } from '@angular/core';
import { Comment, User } from './class/chat';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';

const CURRENT_USER: User = new User(1, 'Kohei Kitazawa');
const OTHER_USER: User = new User(2, 'Sawakita AGI');

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <app-chat></app-chat>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
