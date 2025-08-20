import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Navbar } from './shared/navbar/navbar';
import { ScreenService } from './services/screen.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, AsyncPipe],
  template: `
    <div class="layout" [class.is-mobile]="isMobile$ | async">
      <app-navbar></app-navbar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: []
})
export class App {
  private screenService = inject(ScreenService);
  isMobile$ = this.screenService.isMobile$;
}