import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ScreenService } from '../../services/screen.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, AsyncPipe, NgIf],
  encapsulation: ViewEncapsulation.None,
  template: `
    <nav class="navbar" [class.--sidebar]="!(isMobile$ | async)" [class.--mobile]="isMobile$ | async">
    <div *ngIf="!(isMobile$ | async)">  
    <div class="navbar__profile">
    <img src="assets/img/profile.png" alt="Ariel Ramírez Vega" class="navbar__photo" />
    <h2 class="navbar__name">Ariel Ramírez Vega</h2>

    <ng-container *ngIf="lang$ | async as lang">
      <p class="navbar__role">{{ lang.navbar.role }}</p>

      <ul class="navbar__nav">
        <li>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">{{ lang.navbar.home }}</a>
        </li>
        <li>
          <a routerLink="/sobre-mi" routerLinkActive="active">{{ lang.navbar.about }}</a>
        </li>
        <li>
          <a routerLink="/proyectos" routerLinkActive="active">{{ lang.navbar.projects }}</a>
        </li>
        <li>
          <a routerLink="/contacto" routerLinkActive="active">{{ lang.navbar.contact }}</a>
        </li>
      </ul>
    </ng-container>
  </div>

  <div class="navbar__lang">
    <button (click)="switchLang('es')">
    <img src="/assets/img/flag-es.webp" alt="Español" />
  </button>
  <button (click)="switchLang('en')">
    <img src="/assets/img/flag-en.webp" alt="English" />
  </button>
  </div>

  <div class="navbar__social">
  <a href="https://github.com/aervega" target="_blank" aria-label="GitHub">
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.996.108-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.236 1.91 1.236 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.102.823 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  </a>

  <a href="https://linkedin.com/in/aervega" target="_blank" aria-label="LinkedIn">
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.6v2.2h.05c.5-.95 1.75-2 3.6-2 3.85 0 4.55 2.5 4.55 5.75V24h-4v-8.25c0-2-.05-4.6-2.8-4.6-2.8 0-3.25 2.2-3.25 4.45V24h-4V8z"/>
    </svg>
  </a>

  <a href="mailto:aervega2@gmail.com" aria-label="Email">
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.949.555-2.005.959-3.127 1.184-.897-.959-2.178-1.555-3.594-1.555-2.717 0-4.924 2.206-4.924 4.924 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.419-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.634.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
    </svg>
  </a>
</div>
</div>

  <!-- Botón hamburguesa solo en mobile -->
  <button *ngIf="isMobile$ | async" class="navbar__hamburger" (click)="toggleMenu()">☰</button>

  <!-- Menú desplegable solo si está abierto en mobile -->
  <div *ngIf="menuOpen && (isMobile$ | async)" class="navbar__mobile-menu">
  <ng-container *ngIf="lang$ | async as lang">  
    <ul class="navbar__mobile-nav">
      <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">{{ lang.navbar.home }}</a></li>
      <li><a routerLink="/sobre-mi" routerLinkActive="active">{{ lang.navbar.about }}</a></li>
      <li><a routerLink="/proyectos" routerLinkActive="active">{{ lang.navbar.projects }}</a></li>
      <li><a routerLink="/contacto" routerLinkActive="active">{{ lang.navbar.contact }}</a></li>
    </ul>
  </ng-container>

    <div class="navbar__mobile-lang">
  <button (click)="switchLang('es')">
    <img src="/assets/img/flag-es.webp" alt="Español" />
  </button>
  <button (click)="switchLang('en')">
    <img src="/assets/img/flag-en.webp" alt="English" />
  </button>
</div>

    <div class="navbar__mobile-social">
      <a href="https://github.com/aervega" target="_blank" aria-label="GitHub">
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.996.108-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.236 1.91 1.236 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.102.823 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  </a>

  <a href="https://linkedin.com/in/aervega" target="_blank" aria-label="LinkedIn">
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.6v2.2h.05c.5-.95 1.75-2 3.6-2 3.85 0 4.55 2.5 4.55 5.75V24h-4v-8.25c0-2-.05-4.6-2.8-4.6-2.8 0-3.25 2.2-3.25 4.45V24h-4V8z"/>
    </svg>
  </a>

  <a href="mailto:aervega2@gmail.com" aria-label="Email">
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.949.555-2.005.959-3.127 1.184-.897-.959-2.178-1.555-3.594-1.555-2.717 0-4.924 2.206-4.924 4.924 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.419-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.634.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
    </svg>
  </a>
    </div>
  </div>
</nav>
  `,
  styles: []
})
export class Navbar {
  private languageService = inject(LanguageService);
  private screenService = inject(ScreenService);

  lang$ = this.languageService.lang$;
  isMobile$ = this.screenService.isMobile$;

  menuOpen = false;

  switchLang(lang: 'es' | 'en') {
    this.languageService.switchLang(lang);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}