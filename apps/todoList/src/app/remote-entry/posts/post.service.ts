import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pagination, Post, PostListInput } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com';

  http = inject(HttpClient);

  getPosts(input: PostListInput): Observable<Pagination<Post>> {
    const params = [
      `_limit=${input.limit}`,
      `_sort=${input.sort}`,
      `_order=${input.order}`,
    ];

    if (input.page > 0) {
      params.push(`_page=${input.page}`);
    }

    if (input.query) {
      params.push(`title_like=${input.query}`);
    }

    return this.http
      .get<Post[]>(`${this.apiUrl}/posts?${params.join('&')}`, {
        observe: 'response',
      })
      .pipe(
        map((res) => {
          return {
            totalCount: Number(res.headers.get('x-total-count')) || 0,
            items: res.body || [],
          };
        })
      );
  }
}
