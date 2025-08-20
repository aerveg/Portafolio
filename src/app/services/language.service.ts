import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private currentLang = 'es';
  private translations$ = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLang);
  }

  get lang$() {
    return this.translations$.asObservable();
  }

  switchLang(lang: 'es' | 'en') {
    this.currentLang = lang;
    this.loadTranslations(lang);
  }

  private loadTranslations(lang: string) {
    this.http.get(`/assets/i18n/${lang}.json`).subscribe(data => {
      this.translations$.next(data);
    });
  }
}