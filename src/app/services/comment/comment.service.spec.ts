import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IComment } from './comment.interface';
import { of } from 'rxjs';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;
  let httpClient: HttpClient;
  const mockComment: IComment = {
    name: 'Rebekah',
    message: 'This is a message',
    created: '91374632',
    id: 1,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CommentService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Observable of comments on getAllComments', (done) => {
    spyOn(httpClient, 'get').and.returnValue(of([mockComment]));
    service.getAllComments().subscribe((resp: IComment[]) => {
      expect(httpClient.get).toHaveBeenCalled();
      expect({ ...resp[0] }).toEqual({ ...mockComment });
      done();
    });
  });

  it('should return Observable of comment by id on getComment/:id', (done) => {
    let commentId = 1;
    spyOn(httpClient, 'get').and.returnValue(of(mockComment));
    service.getCommentById(commentId).subscribe((resp: IComment) => {
      expect(httpClient.get).toHaveBeenCalled();
      expect(commentId).toEqual(mockComment.id);
      done();
    });
  });

  it('should return Observable of any on createComment', (done) => {
    spyOn(httpClient, 'post').and.returnValue(of({ id: 1 }));
    service
      .createComment({ name: mockComment.name, message: mockComment.message })
      .subscribe((resp: any) => {
        expect(httpClient.post).toHaveBeenCalled();
        expect(resp.id).toEqual(mockComment.id);
        done();
      });
  });

  it('should return Observable of any on deleteAllComments', (done) => {
    spyOn(httpClient, 'delete').and.returnValue(of({ id: 1 }));
    service.deleteAllComments().subscribe((resp: any) => {
      expect(httpClient.delete).toHaveBeenCalled();
      expect(resp.id).toEqual(mockComment.id);
      done();
    });
  });
});
