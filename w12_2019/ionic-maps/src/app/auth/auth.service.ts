import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // isAuthenticated = false;
  userId = null;
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      tap(userData => {
        const expTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
        this._user.next(new User(userData.localId, userData.email, userData.idToken, expTime));
      })
    );
  }

  get isAuthenticated() {
    return this._user.asObservable().pipe(map(user => {
      if(user) {
        return !!user.token;
      } else {
        return null;
      }
    }));
  }

  // setUser(userId: string) {
  //   this.userId = userId;
  //   this.isAuthenticated = true;
  // }

  login(email: string, password: string) {
    //firebase login API here
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
    {
      email,
      password,
      returnSecureToken: true,
    });
  }

  logout() {
    //firebase logout API here
    this._user.next(null);
  }
}
