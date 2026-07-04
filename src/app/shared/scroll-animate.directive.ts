import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[scrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input() animationDelay: number = 0;

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${this.animationDelay}ms, transform 0.6s ease ${this.animationDelay}ms`;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            this.observer?.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    this.observer.observe(el);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
