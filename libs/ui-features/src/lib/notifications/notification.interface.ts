import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  config?: MatSnackBarConfig;
}
