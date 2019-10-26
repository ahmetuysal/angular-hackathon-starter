import { Injectable } from '@angular/core';
import { UpdateUserRequest } from '../request/update-user-request.model';
import { JwtService } from '../auth/jwt.service';
import {
  HttpHeaders,
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { GetUserResponse } from '../response/get-user-response.model';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
    private readonly stateService: StateService
  ) {}

  updateUser(user: User): Observable<boolean> {
    const request = new UpdateUserRequest(user);
    return this.http
      .put<void>(`${environment.apiUrl}users/${user.id}`, request, {
        observe: 'response',
        headers: this.setHeaders()
      })
      .pipe(
        tap(() => this.stateService.setCurrentUser(user)),
        map((response: HttpResponse<void>) => response.status === 200),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error(
              'A client-side or network error occurred on update user:',
              error.error.message
            );
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status} on update user, ` +
                `body was: ${JSON.stringify(error.error)}`
            );
          }
          return of(false);
        })
      );
  }

  getUser(username: string): Observable<User> {
    return this.http
      .get<GetUserResponse>(`${environment.apiUrl}users/${username}`, {
        observe: 'response',
        headers: this.setHeaders()
      })
      .pipe(
        map((response: HttpResponse<GetUserResponse>) => response.body.user),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error(
              'A client-side or network error occurred on get user with username:',
              error.error.message
            );
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status} on get user with username, ` +
                `body was: ${JSON.stringify(error.error)}`
            );
          }
          return of(null);
        })
      );
  }

  private setHeaders(): HttpHeaders {
    const jwtToken = this.jwtService.getToken();
    if (jwtToken) {
      return new HttpHeaders({
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      });
    }
  }
}
