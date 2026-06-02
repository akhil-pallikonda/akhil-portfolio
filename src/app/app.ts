import { Component } from '@angular/core';
import { Introduction } from './introduction/introduction'; // Updated import
import { About } from './about/about';
import { Skills } from './skills/skills';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Introduction, About, Skills], // Updated imports array
  template: `
    <main class="min-h-screen bg-appleBlack">
      <app-introduction />  <app-about />
      <app-skills />
    </main>
  `
})
export class App {}