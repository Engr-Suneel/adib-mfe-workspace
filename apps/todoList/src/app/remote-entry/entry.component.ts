import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './posts/post.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  imports: [CommonModule, PostComponent, MatInputModule, MatFormFieldModule],
  selector: 'app-todo-list-entry',
  template: `<app-post></app-post>`,
})
export class RemoteEntryComponent {}
