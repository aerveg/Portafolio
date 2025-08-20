import { Component, inject, ViewEncapsulation } from '@angular/core';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-sobre-mi',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor],
  encapsulation: ViewEncapsulation.None,
  template: `
    <section class="sobre-mi page-wrapper" *ngIf="lang$ | async as lang">
      <header>
        <h1 class="title">{{ lang.about.title }}</h1>
      </header>

      <section class="section-block" *ngFor="let section of lang.about.sections">
        <div class="subtitle">{{ section.subtitle }}</div>
        <article class="description">
          <p *ngFor="let paragraph of section.content">{{ paragraph }}</p>
        </article>
      </section>
      <section class="section-block" *ngIf="lang.about.achievements">
  <h2>{{ lang.about.achievements.title }}</h2>
  <ul>
    <li *ngFor="let item of lang.about.achievements.items">
      <strong>{{ item.name }}:</strong> {{ item.reason }}
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
export class SobreMi {
  private languageService = inject(LanguageService);
  lang$ = this.languageService.lang$;
}