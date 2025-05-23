import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BooksStore } from '@adib-mfe-workspace/ui-share';
import { PostStore } from './post.store';
import { Post } from './post.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements AfterViewInit {
  readonly postStore = inject(PostStore);
  readonly posts = this.postStore.posts;
  readonly displayedColumns = ['id', 'title', 'body'];
  readonly searchTerm = '';

  books = inject(BooksStore);

  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.postStore.fetchPosts(); // initial fetch
    console.log('books', this.books.books());
    console.log('books count', this.books.booksCount());
  }

  onSearchChange(value: string) {
    this.postStore.setSearch(value.trim());
  }

  onPageChange(event: PageEvent) {
    this.postStore.updateFilters({
      page: event.pageIndex + 1,
      limit: event.pageSize,
    });
  }

  onSortChange(event: Sort) {
    if (event.direction) {
      this.postStore.updateFilters({
        sort: event.active as keyof Post,
        order: event.direction as 'asc' | 'desc',
      });
    }
  }
}
