import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  imports: [CommonModule, UserProfileComponent],
  selector: 'app-user-profile-entry',
  template: `<app-user-profile></app-user-profile>`,
})
export class RemoteEntryComponent {}
