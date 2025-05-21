import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserProfile } from './user-profile.model';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  readonly #http = inject(HttpClient);

  getUsers(): Observable<IUserProfile[]> {
    return this.#http.get<IUserProfile[]>(API_URL);
  }

  getUserById(id: number): Observable<IUserProfile> {
    return this.#http.get<IUserProfile>(`${API_URL}/${id}`);
  }
}
