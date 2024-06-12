import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/item.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5250/api/Users';  // Ensure this URL is correct

  constructor(private http: HttpClient) { }

  signup(signupData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, signupData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }
  getUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
  

  updateUser(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userData.UserId}`, userData);
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/logged-in`);
  }
  
}
