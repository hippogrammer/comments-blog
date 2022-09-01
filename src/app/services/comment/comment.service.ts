import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IComment } from './comment.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getAllComments(): Observable<IComment[]> {
    return this.http.get<IComment[]>(environment.api_url + '/getComments');
  }

  createComment(requestObject: Partial<IComment>) {
    return this.http.post(
      environment.api_url + '/createComment',
      requestObject
    );
  }

  getCommentById(id: number): Observable<IComment> {
    return this.http.get<IComment>(environment.api_url + `/getComment/${id}`);
  }

  deleteAllComments() {
    return this.http.delete(environment.api_url + '/deleteComments');
  }
}
