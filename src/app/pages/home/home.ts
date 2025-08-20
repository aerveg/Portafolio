import { Component, inject, ViewEncapsulation } from '@angular/core';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor],
  encapsulation: ViewEncapsulation.None,
  template: `
    <section class="home page-wrapper" *ngIf="lang$ | async as lang">
  <header>
    <h1 class="title">{{ lang.home.title }}</h1>
    <p class="subtitle">{{ lang.home.subtitle }}</p>
  </header>

  <article class="description">
    <p>{{ lang.home.description }}</p>
    <p>{{ lang.home.description2 }}</p>
  </article>

  <section class="section-block">
    <h2>{{ lang.home.values.title }}</h2>
    <ul>
      <li *ngFor="let point of lang.home.values.points">{{ point }}</li>
    </ul>
  </section>

  <section class="section-block">
    <h2>{{ lang.home.tech.title }}</h2>
    <ul>
      <li *ngFor="let item of lang.home.tech.items">
        <strong>{{ item.name }}:</strong> {{ item.reason }}
      </li>
    </ul>
  </section>

  <blockquote class="quote">
    “{{ lang.home.quote }}”
  </blockquote>

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
export class Home {
  private languageService = inject(LanguageService);
  lang$ = this.languageService.lang$;
}