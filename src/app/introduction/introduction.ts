import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.html',
  styleUrl: './introduction.scss',
})
export class Introduction implements OnInit, OnDestroy {
  phrases = [
    'Architecting high-performance systems',
    'Building for Scale & Impact',
    'Engineering Business Value',
    'Full Stack · MBA · Leader',
  ];
  currentPhrase = '';
  currentPhraseIndex = 0;
  isDeleting = false;
  showCursor = true;

  private typeInterval: ReturnType<typeof setTimeout> | null = null;
  private cursorInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private cdr: ChangeDetectorRef) {
    afterNextRender(() => {
      this.startTypewriter();
      this.startCursorBlink();
    });
  }

  ngOnInit() {}

  startTypewriter() {
    const type = () => {
      const full = this.phrases[this.currentPhraseIndex];

      if (!this.isDeleting) {
        this.currentPhrase = full.substring(0, this.currentPhrase.length + 1);
        if (this.currentPhrase === full) {
          this.isDeleting = true;
          this.typeInterval = setTimeout(type, 2200);
          this.cdr.detectChanges();
          return;
        }
        this.typeInterval = setTimeout(type, 60);
      } else {
        this.currentPhrase = full.substring(0, this.currentPhrase.length - 1);
        if (this.currentPhrase === '') {
          this.isDeleting = false;
          this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
          this.typeInterval = setTimeout(type, 300);
          this.cdr.detectChanges();
          return;
        }
        this.typeInterval = setTimeout(type, 35);
      }
      this.cdr.detectChanges();
    };
    this.typeInterval = setTimeout(type, 600);
  }

  startCursorBlink() {
    this.cursorInterval = setInterval(() => {
      this.showCursor = !this.showCursor;
      this.cdr.detectChanges();
    }, 530);
  }

  scrollToExperience(): void {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToSection(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = 'Resume - Akhil Pallikonda.pdf';
    link.download = 'Resume - Akhil Pallikonda.pdf';
    link.click();
  }

  ngOnDestroy() {
    if (this.typeInterval) clearTimeout(this.typeInterval);
    if (this.cursorInterval) clearInterval(this.cursorInterval);
  }
}
