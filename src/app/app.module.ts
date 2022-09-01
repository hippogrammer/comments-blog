import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentService } from './services/comment/comment.service';
import { CommentsListComponent } from './comments-list/comments-list.component';

@NgModule({
  declarations: [AppComponent, CommentFormComponent, CommentsListComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [CommentService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
