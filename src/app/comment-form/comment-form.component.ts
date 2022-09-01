import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() commentForm!: FormGroup;
  @Input() enableClear: boolean = false;
  @Output() onCommentButtonClick: EventEmitter<any> = new EventEmitter();
  @Output() onClearCommentsButtonClick: EventEmitter<any> = new EventEmitter();
  submitted = false;
  constructor() {}
  ngOnInit(): void {}
  onSubmitClicked() {
    this.submitted = true;
    if (!this.commentForm.invalid) {
      this.onCommentButtonClick.emit();
      this.commentForm.reset();
      this.submitted = false;
    }
  }
  getErrorMessageId() {
    if (this.submitted && this.commentForm?.controls['message'].errors) {
      if (this.commentForm.controls['message'].errors['required']) {
        return 'requiredError';
      } else if (this.commentForm.controls['message'].errors['minLength']) {
        return 'minLengthError';
      } else if (this.commentForm.controls['message'].errors['maxLength']) {
        return 'maxLengthError';
      }
    }
    return '';
  }
}
