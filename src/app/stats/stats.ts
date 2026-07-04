import {
  Component,
  OnInit,
  OnDestroy,
  afterNextRender,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  display: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class Stats implements OnInit, OnDestroy {
  stats: Stat[] = [
    { value: 8, suffix: '+', label: 'Years Experience', display: '0' },
    { value: 500, suffix: 'K+', label: 'Daily Transactions', display: '0' },
    { value: 3, suffix: '', label: 'Fortune 500 Companies', display: '0' },
    { value: 90, suffix: '%+', label: 'Code Coverage', display: '0' },
  ];

  private observer!: IntersectionObserver;
  private animationStarted = false;

  constructor(private cdr: ChangeDetectorRef) {
    afterNextRender(() => {
      this.setupObserver();
    });
  }

  ngOnInit() {}

  setupObserver() {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
    const el = document.getElementById('stats-section');
    if (!el) return;
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.animationStarted) {
          this.animationStarted = true;
          this.animateCounters();
        }
      },
      { threshold: 0.4 }
    );
    this.observer.observe(el);
  }

  animateCounters() {
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      this.stats = this.stats.map((stat) => ({
        ...stat,
        display: Math.floor(eased * stat.value).toString(),
      }));

      this.cdr.detectChanges();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.stats = this.stats.map((stat) => ({
          ...stat,
          display: stat.value.toString(),
        }));
        this.cdr.detectChanges();
      }
    };

    requestAnimationFrame(animate);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
