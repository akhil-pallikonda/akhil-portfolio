import { Component, OnDestroy, ChangeDetectorRef, afterNextRender } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime, tap } from 'rxjs/operators';
import { Introduction } from './introduction/introduction';
import { About } from './about/about';
import { Skills } from './skills/skills';
import { Experience } from './experience/experience';
import { Nav } from './nav/nav';
import { Stats } from './stats/stats';
import { Projects } from './projects/projects';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Introduction, About, Skills, Experience, Nav, Stats, Projects, Contact],
  template: `
    <!-- Scroll Progress Bar -->
    <div class="fixed top-0 left-0 h-0.5 bg-appleBlue z-[60] transition-all duration-150 ease-out"
         [style.width.%]="scrollProgress">
    </div>

    <!-- Navigation -->
    <app-nav />

    <main class="min-h-screen bg-appleBlack relative">
      <app-introduction />
      <app-stats />
      <app-about />
      <app-skills />
      <app-experience />
      <app-projects />
      <app-contact />
    </main>

    <!-- Back to Top Button -->
    @if (showBackToTop) {
      <button
        (click)="scrollToTop()"
        id="back-to-top-btn"
        class="fixed bottom-8 right-8 p-3 rounded-full bg-appleSurface text-appleBlue border border-appleMuted/20 hover:border-appleBlue hover:scale-110 transition-all duration-300 shadow-lg z-50 flex items-center justify-center group"
        aria-label="Back to top">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    }
  `
})
export class App implements OnDestroy {
  private scrollSubscription?: Subscription;

  scrollProgress = 0;
  showBackToTop = false;

  constructor(private cdr: ChangeDetectorRef) {
    afterNextRender(() => {
      this.setupScrollListener();
    });
  }

  setupScrollListener() {
    this.scrollSubscription = fromEvent(window, 'scroll', { passive: true })
      .pipe(
        throttleTime(100, undefined, { leading: true, trailing: true }),
        tap(() => this.onWindowScroll())
      )
      .subscribe();
  }

  onWindowScroll() {
    const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

    this.showBackToTop = scrollPosition > 300;

    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0) {
      this.scrollProgress = (scrollPosition / scrollHeight) * 100;
    } else {
      this.scrollProgress = 0;
    }

    this.cdr.detectChanges();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}