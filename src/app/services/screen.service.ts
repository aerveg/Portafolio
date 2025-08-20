import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScreenService {
  private screen$ = new BehaviorSubject<number>(window.innerWidth);

  constructor() {
    window.addEventListener('resize', () => {
      this.screen$.next(window.innerWidth);
    });
  }

  get isMobile$(): Observable<boolean> {
    return this.screen$.pipe(map(width => width < 768));
  }

  get screenWidth$(): Observable<number> {
    return this.screen$.asObservable();
  }
}