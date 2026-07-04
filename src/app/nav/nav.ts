import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  afterNextRender,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavLink {
  label: string;
  sectionId: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav implements OnInit, OnDestroy {
  navLinks: NavLink[] = [
    { label: 'About', sectionId: 'about' },
    { label: 'Skills', sectionId: 'skills' },
    { label: 'Experience', sectionId: 'experience' },
    { label: 'Projects', sectionId: 'projects' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  activeSection = '';
  isScrolled = false;
  isMobileMenuOpen = false;

  private observers: IntersectionObserver[] = [];
  private lastScrollY = 0;
  isNavHidden = false;

  constructor(private cdr: ChangeDetectorRef) {
    afterNextRender(() => {
      this.setupSectionObservers();
    });
  }

  ngOnInit() {}

  @HostListener('window:scroll', [])
  onScroll() {
    const currentScrollY = window.scrollY;
    this.isScrolled = currentScrollY > 20;
    this.isNavHidden = currentScrollY > this.lastScrollY && currentScrollY > 100;
    this.lastScrollY = currentScrollY;
    this.cdr.detectChanges();
  }

  setupSectionObservers() {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
    const options = { rootMargin: '-40% 0px -55% 0px', threshold: 0 };
    this.navLinks.forEach((link) => {
      const el = document.getElementById(link.sectionId);
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection = link.sectionId;
            this.cdr.detectChanges();
          }
        });
      }, options);
      obs.observe(el);
      this.observers.push(obs);
    });
  }

  scrollTo(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  downloadResume() {
    const link = document.createElement('a');
    link.href = 'Resume - Akhil Pallikonda.pdf';
    link.download = 'Resume - Akhil Pallikonda.pdf';
    link.click();
  }

  ngOnDestroy() {
    this.observers.forEach((obs) => obs.disconnect());
  }
}
