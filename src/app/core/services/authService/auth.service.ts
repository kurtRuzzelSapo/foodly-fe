import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Route, Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  apiUrl = 'http://127.0.0.1:8000/api';



// When admin go to admin page, when user go to user page
// need to finish
  /**
   * Save the access token to localStorage
   */
  setLoginData(token: string, role:string): void {
    localStorage.setItem('access_token', token);
    localStorage.setItem('role', role);
  }

  /**
   * Retrieve the access token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRole(): string | null {
    return localStorage.getItem('user_role');
  }
  /**
   * Remove the access token from localStorage
   */
  clearLoginData(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
  }
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

UserOrAdmin(role: string) {
  if (role === 'user') {
    this.router.navigateByUrl('/homepage'); // Adjust this path as per your routes
  } else if (role === 'admin') {
    this.router.navigateByUrl('/admin/dashboard'); // Adjust this path as per your routes
  } else {
    this.router.navigateByUrl('/login'); // Redirect to a fallback (e.g., login) for invalid roles
  }
}

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/register`, user, { headers });
  }
  login(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/login`, user, { headers });
  }





  // SAMPLE CRUD OPERATION FUNCTION

  ForCRUD(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user, { headers: this.getAuthHeaders() });
  }
   // 1. Create (POST)
   createResource(resource: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/resources`, resource, { headers });
  }

  // 2. Read (GET)
  getResourceById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/resources/${id}`, { headers });
  }

  getAllResources(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/resources`, { headers });
  }

  // 3. Update (PUT/PATCH)
  updateResource(id: number, updatedData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/resources/${id}`, updatedData, { headers });
  }

  // 4. Delete (DELETE)
  deleteResource(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/resources/${id}`, { headers });
  }
}
