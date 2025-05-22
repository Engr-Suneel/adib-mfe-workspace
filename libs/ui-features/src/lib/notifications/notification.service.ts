import { Injectable, computed, inject, signal, Signal } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastMessage } from './notification.interface';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _snackBar = inject(MatSnackBar);
  private _lastToast = signal<ToastMessage | null>(null);
  readonly lastToast: Signal<ToastMessage | null> = computed(() =>
    this._lastToast()
  );

  private show(
    type: ToastMessage['type'],
    message: string,
    config?: MatSnackBarConfig
  ) {
    const toast: ToastMessage = { message, type, config };
    this._lastToast.set(toast);
    this._snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`mat-mdc-snack-bar-${type}`],
      ...config,
    });
  }

  success(message: string, config?: MatSnackBarConfig) {
    this.show('success', message, config);
  }

  error(message: string, config?: MatSnackBarConfig) {
    this.show('error', message, config);
  }

  info(message: string, config?: MatSnackBarConfig) {
    this.show('info', message, config);
  }

  warning(message: string, config?: MatSnackBarConfig) {
    this.show('warning', message, config);
  }

  // Accepts a signal as input
  fromSignal(msg: Signal<string>, type: ToastMessage['type'] = 'info') {
    const val = msg();
    if (val) {
      this.show(type, val);
    }
  }
}
