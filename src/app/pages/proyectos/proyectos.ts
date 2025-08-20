import { Component, inject, ViewEncapsulation } from '@angular/core';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor],
  encapsulation: ViewEncapsulation.None,
  template: `
    <section class="proyectos page-wrapper" *ngIf="lang$ | async as lang">
      <header>
        <h1 class="title">{{ lang.projects.title }}</h1>
      </header>

      <section class="section-block">
        <p>{{ lang.projects.intro }}</p>
        <ul>
          <li *ngFor="let project of lang.projects.items">
            <strong>{{ project.name }}:</strong> {{ project.description }}
          </li>
        </ul>
      </section>

      <footer class="contact-info">
        <a href="mailto:{{ lang.home.contact.email }}">{{ lang.home.contact.email }}</a> ·
        <a href="tel:{{ lang.home.contact.phone }}">{{ lang.home.contact.phone }}</a> ·
        <a href="https://www.linkedin.com/in/aervega" target="_blank" rel="noopener noreferrer">
          {{ lang.home.contact.linkedin }}
        </a>
      </footer>
    </section>
  `,
  styles: []
})
export class Proyectos {
  private languageService = inject(LanguageService);
  lang$ = this.languageService.lang$;
}