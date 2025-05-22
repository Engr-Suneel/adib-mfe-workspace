import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { UserProfileStore } from './user-profile.store';
@Component({
  selector: 'app-user-profile',
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  readonly store = inject(UserProfileStore);
  readonly user = this.store.user;
  readonly loading = this.store.isLoading;
  readonly error = this.store.error;
}
