import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../shared/scroll-animate.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  currentYear = new Date().getFullYear();
}
