import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeStore } from '@adib-mfe-workspace/ui-theme';
import { I18nService } from '@adib-mfe-workspace/ui-i18n';
import { BooksStore } from '@adib-mfe-workspace/ui-share';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    MatSlideToggleModule,
    RouterModule,
    TranslateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  breakpointObserver = inject(BreakpointObserver);
  theme = inject(ThemeStore);
  i18n = inject(I18nService);
  books = inject(BooksStore);

  languages = this.i18n.languages;
  lang = this.i18n.currentLang;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    // Apply theme class to <html> based on the value in signal store (from cookie)
    this.theme.setTheme(this.theme.theme());

    // Sync language from cookie to TranslateService
    this.i18n.changeLang(this.i18n.currentLang);

    console.log('books', this.books.books());
    console.log('books count', this.books.booksCount());

    this.books.removeBook(1);
  }

  onThemeChange() {
    this.theme.toggleTheme();
  }

  onLangChange(lang: string) {
    this.i18n.changeLang(lang);
    this.lang = lang;
  }
}
