import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '../services/comment/comment.interface';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
})
export class CommentsListComponent implements OnInit {
  @Input() commentsList: IComment[] | null = null;
  constructor() {}

  ngOnInit(): void {}
}
