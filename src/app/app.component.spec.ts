import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommentService } from './services/comment/comment.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('AppComponent', () => {
  let commentService: CommentService;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [CommentService],
      imports: [HttpClientTestingModule],
    }).compileComponents();
    commentService = TestBed.get(CommentService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call commentService to fetch all comments on ngOnInit', () => {
    spyOn(commentService, 'getAllComments');
    component.ngOnInit();
    expect(commentService.getAllComments).toHaveBeenCalled();
  });
  describe('onCommentSubmitted', () => {
    it('should succeed and show the success toast and fetch all comments', () => {
      spyOn(commentService, 'createComment').and.returnValue(
        of({ status: 200 })
      );
      spyOn(commentService, 'getAllComments');
      spyOn(component, 'displayToast');
      component.commentForm.controls['name'].setValue('Rebekah Yau');
      component.commentForm.controls['message'].setValue(
        'This is some comment that I wrote'
      );
      component.onCommentSubmitted();
      fixture.detectChanges();
      expect(commentService.createComment).toHaveBeenCalledWith(
        component.commentForm.getRawValue()
      );
      expect(component.displayToast).toHaveBeenCalledWith('success');
      expect(commentService.getAllComments).toHaveBeenCalled();
    });

    it('should fail and show the error toast on failure', () => {
      spyOn(commentService, 'createComment').and.returnValue(
        throwError(() => {
          status: 500;
        })
      );
      spyOn(commentService, 'getAllComments');
      spyOn(component, 'displayToast');
      component.commentForm.controls['name'].setValue('Rebekah Yau');
      component.commentForm.controls['message'].setValue(
        'This is some comment that I wrote'
      );
      component.onCommentSubmitted();
      fixture.detectChanges();
      expect(commentService.createComment).toHaveBeenCalledWith(
        component.commentForm.getRawValue()
      );
      expect(component.displayToast).toHaveBeenCalledWith('error');
    });
  });
});
