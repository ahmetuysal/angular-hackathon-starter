import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CheckUsernameRequest } from '../request/check-username-request.model';
import { LoginRequest } from '../request/login-request.model';
import { CheckUsernameResponse } from '../response/check-username-response.model';
import { GetUserResponse } from '../response/get-user-response.model';
import { LoginResponse } from '../response/login-response.model';
import { JwtService } from './jwt.service';
import { SignupRequest } from '../request/signup-request.model';
import { CheckEmailRequest } from '../request/check-email-request.model';
import { CheckEmailResponse } from '../response/check-email-response.model';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
    private readonly stateService: StateService
  ) {}

  signOut(): void {
    this.purgeAuth();
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  async populate() {
    // If JWT detected, attempt to get & store user's info
    const token: string = this.jwtService.getToken();
    console.log(`Token: ${token}`);
    if (token) {
      await this.updateCurrentUserUsingToken();
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  async setAuth(token: string): Promise<boolean> {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(token);
    // update the current user data using jwt token.
    return await this.updateCurrentUserUsingToken();
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    this.stateService.setCurrentUser(null);
  }

  async updateCurrentUserUsingToken(): Promise<boolean> {
    try {
      const response: HttpResponse<GetUserResponse> = await this.http
        .get<GetUserResponse>(`${environment.apiUrl}auth`, {
          observe: 'response',
          headers: this.setHeaders()
        })
        .toPromise();

      if (response.body.user) {
        this.stateService.setCurrentUser(response.body.user);
        return true;
      } else {
        this.purgeAuth();
        return false;
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
              `body was: ${JSON.stringify(error.error)}`
          );
          this.purgeAuth();
        }
        return false;
      } else {
        throw error;
      }
    }
  }

  async attemptAuth(loginRequest: LoginRequest): Promise<boolean> {
    try {
      const response: HttpResponse<LoginResponse> = await this.http
        .post<LoginResponse>(`${environment.apiUrl}auth/login`, loginRequest, {
          observe: 'response',
          headers: this.setHeaders()
        })
        .toPromise();

      if (response.body.token) {
        return await this.setAuth(response.body.token);
      } else {
        // Remove any potential remnants of previous auth states
        this.purgeAuth();
        return false;
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
              `body was: ${JSON.stringify(error.error)}`
          );
        }
        return false;
      } else {
        throw error;
      }
    }
  }

  async attemptSignup(signupRequest: SignupRequest): Promise<boolean> {
    const result: HttpResponse<object> = await this.http
      .post(`${environment.apiUrl}auth/signup`, signupRequest, {
        observe: 'response',
        headers: this.setHeaders()
      })
      .toPromise();

    if (result instanceof HttpErrorResponse) {
      if (result.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', result.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${result.status}, ` +
            `body was: ${result.error}`
        );
      }
      return false;
    } else {
      return result.status === 201;
    }
  }

  isUsernameAvailable(username: string): Observable<boolean> {
    return this.http
      .post<CheckUsernameResponse>(
        `${environment.apiUrl}auth/check-username`,
        new CheckUsernameRequest(username),
        {
          observe: 'response',
          headers: this.setHeaders()
        }
      )
      .pipe(
        map(
          (response: HttpResponse<CheckUsernameResponse>) =>
            response.body.isUsernameAvailable
        ),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error(
              'A client-side or network error occurred on check username:',
              error.error.message
            );
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status} on check username, ` +
                `body was: ${JSON.stringify(error.error)}`
            );
          }
          return of(false);
        })
      );
  }

  isEmailAvailable(email: string): Observable<boolean> {
    return this.http
      .post<CheckEmailResponse>(
        `${environment.apiUrl}auth/check-email`,
        new CheckEmailRequest(email),
        {
          observe: 'response',
          headers: this.setHeaders()
        }
      )
      .pipe(
        map(
          (response: HttpResponse<CheckEmailResponse>) =>
            response.body.isEmailAvailable
        ),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error(
              'A client-side or network error occurred on check username:',
              error.error.message
            );
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status} on check username, ` +
                `body was: ${JSON.stringify(error.error)}`
            );
          }
          return of(false);
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
