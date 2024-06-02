import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private signUpUrl = '/users/signUp';
  private signInUrl = '/users/signIn';

  private TOKEN_KEY = 'token';

  constructor(private http: HttpClient) { }

  signUp(userData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.signUpUrl, userData)
  }

  signIn(userData: any) {
    return this.http.post<any>(this.baseUrl + this.signInUrl, userData)
      .pipe(
        map((res) => {
          // Save the token upon successful login
          if (res.token) {
            this.saveToken(res.token);
            console.log("auth service", res);

          }
          return res;
        }),
        shareReplay()
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  // Save the JWT token to local storage
  saveToken(token: string): void {
    console.log("auth service, saveToken", token);
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Get the JWT token from local storage
  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token !== null && token !== undefined ? token : null;
  }

  // Remove the JWT token from local storage
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Check if the user is authenticated (has a valid token)
  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log('token auth service', token)
    if (!token) {
      // No token exists
      return false;
    }

    try {
      // Decode the token (you'll need a library for this, e.g., jwt-decode)
      const decodedToken: any = jwtDecode(token);

      // Check if the token has expired (compare with current timestamp)
      // if (decodedToken.exp < Date.now() / 1000) {
      //   console.log('token expired')
      //   // Token has expired
      //   return false;
      // }

      // Add any other checks you need (e.g., signature validation)
      console.log("still")
      // If all checks pass, consider the token valid
      return true;
    } catch (error) {
      // Invalid token (e.g., malformed or tampered)
      return false;
    }
  }



}

