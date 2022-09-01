import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { IComment } from './services/comment/comment.interface';
import { CommentService } from './services/comment/comment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChildren('toast')
  toast!: QueryList<ElementRef>;
  title = 'comments';
  commentForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(1500),
    ]),
  });
  currentToast: any = null;
  toastMessages: { [key: string]: any } = {
    success: {
      success: true,
      message: 'Your comment was posted successfully!',
      icon_shape: 'check_circle',
    },
    error: {
      success: false,
      message: 'An error has occured and your comment could not be posted!',
      icon_shape: 'danger',
    },
    deleteSuccess: {
      success: true,
      message: 'Successfully cleared all comments!',
      icon_shape: 'check_circle',
    },
    genericError: {
      success: false,
      message: 'Something went wrong!',
      icon_shape: 'danger',
    },
  };

  allComments$: Observable<IComment[]> | null = null;
  constructor(private commentService: CommentService) {}
  ngOnInit() {
    this.allComments$ = this.commentService.getAllComments();
  }

  onCommentSubmitted() {
    this.commentService
      .createComment(this.commentForm.getRawValue())
      .subscribe({
        next: () => {
          this.displayToast('success');
          this.allComments$ = this.commentService.getAllComments();
        },
        error: () => {
          this.displayToast('error');
        },
      });
  }
  async onClearCommentsButtonClick() {
    let confirmed = await confirm(
      'Are you sure you want to clear all the comments?'
    );
    if (confirmed) {
      this.commentService.deleteAllComments().subscribe({
        next: () => {
          this.resetForm();
          this.displayToast('deleteSuccess');
          this.allComments$ = this.commentService.getAllComments();
        },
        error: () => this.displayToast('genericError'),
      });
    }
  }

  displayToast(toastContent: string) {
    this.currentToast = this.toastMessages[toastContent];
    this.toast.first.nativeElement.style.visibility = 'visible';
    setTimeout(() => {
      this.toast.first.nativeElement.style.visibility = 'hidden';
    }, 3000);
  }

  resetForm() {
    this.commentForm.reset();

    Object.keys(this.commentForm.controls).forEach((key) => {
      this.commentForm.get(key)?.setErrors(null);
    });
  }
}
