import { Component, inject, ViewEncapsulation } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  encapsulation: ViewEncapsulation.None,
  template: `
     <section class="contact-page page-wrapper" *ngIf="lang$ | async as lang">
    <header>
      <h1 class="title">{{ lang.contact.title }}</h1>
      <p class="subtitle">{{ lang.contact.subtitle }}</p>
    </header>

    <article class="description">
      <p>{{ lang.contact.description }}</p>
    </article>

    <section class="section-block">
      <h2>{{ lang.contact.methodsTitle }}</h2>
      <ul>
        <li>
          <strong>Email:</strong>
          <a href="mailto:{{ lang.contact.email }}" style="color: var(--color-light)">
            {{ lang.contact.email }}
          </a>
        </li>
        <li>
          <strong>Teléfono:</strong>
          <a href="tel:{{ lang.contact.phone }}" style="color: var(--color-light)">
            {{ lang.contact.phone }}
          </a>
        </li>
        <li>
          <strong>LinkedIn:</strong>
          <a href="https://www.linkedin.com/in/aervega" target="_blank" style="color: var(--color-light)">
            {{ lang.contact.linkedin }}
          </a>
        </li>
      </ul>
    </section>

    <blockquote class="quote">“{{ lang.contact.quote }}”</blockquote>

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
export class Contacto {
  private languageService = inject(LanguageService);
  lang$ = this.languageService.lang$;
}