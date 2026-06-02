import { Component } from '@angular/core';
import { Introduction } from './introduction/introduction'; // Updated import
import { About } from './about/about';
import { Skills } from './skills/skills';
import { Experience } from './experience/experience';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Introduction, About, Skills, Experience], // Updated imports array
  template: `
    <main class="min-h-screen bg-appleBlack">
      <app-introduction />  <app-about />
      <app-skills />
      <app-experience />
    </main>
  `
})
export class App { }