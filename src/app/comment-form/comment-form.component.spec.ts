import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommentFormComponent } from './comment-form.component';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    component.commentForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1500),
      ]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('should return the correct id based on error on getErrorMessageId', () => {
    beforeEach(() => {
      component.submitted = true;
    });
    it('should return requiredError on required Error', () => {
      component.submitted = true;
      component.commentForm.controls['message']?.setErrors({
        required: true,
      });
      fixture.detectChanges();
      expect(component.getErrorMessageId()).toEqual('requiredError');
    });
    it('should return minLengthError on required Error', () => {
      component.commentForm.controls['message']?.setErrors({
        minLength: true,
      });
      fixture.detectChanges();
      expect(component.getErrorMessageId()).toEqual('minLengthError');
    });
    it('should return maxLengthError on required Error', () => {
      component.commentForm.controls['message']?.setErrors({
        maxLength: true,
      });
      fixture.detectChanges();
      expect(component.getErrorMessageId()).toEqual('maxLengthError');
    });
  });

  it('should emit the onCommentButtonClick on onSubmitClicked()', () => {
    spyOn(component.onCommentButtonClick, 'emit');
    spyOn(component.commentForm, 'reset');
    component.commentForm.controls['name'].setValue('Rebekah Yau');
    component.commentForm.controls['message'].setValue(
      'Hello my name is Rebekah Yau and I am a front end developer!'
    );
    fixture.detectChanges();
    component.onSubmitClicked();
    expect(component.onCommentButtonClick.emit).toHaveBeenCalled();
    expect(component.commentForm.reset).toHaveBeenCalled();
    expect(component.submitted).toBeFalse();
  });
});
