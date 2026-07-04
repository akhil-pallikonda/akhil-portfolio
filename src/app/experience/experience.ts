import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { ScrollAnimateDirective } from '../shared/scroll-animate.directive';

interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  location: string;
  bullets: string[];
  markerColorClass: string;
  expanded: boolean;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollAnimateDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements OnInit, OnDestroy {
  searchControl = new FormControl('');

  allExperiences: ExperienceItem[] = [
    {
      company: 'Verizon',
      role: 'Software Engineer III',
      date: 'Apr 2022 – Dec 2025',
      location: 'Hyderabad, India',
      bullets: [
        'Architected a 3rd-party subscriptions dashboard (ACSS) processing 130K+ req/hr at 0.5s response time for 500K+ daily customers.',
        'Modernized legacy iframe-based UI workflows by migrating to React, achieving 90%+ code coverage across all modules.',
        'Developed Spring Boot microservices for integrating with 3rd-party vendors, maintaining 80%+ code coverage.',
        'Led migration of 10+ high-performance APIs processing over 500K+ daily transactions.',
        'Collaborated cross-functionally with product, QA, and DevOps teams in Agile sprints.',
      ],
      markerColorClass: 'bg-appleBlue border-appleBlack',
      expanded: false,
    },
    {
      company: 'Deloitte',
      role: 'Analyst',
      date: 'Jun 2021 – Apr 2022',
      location: 'Hyderabad, India',
      bullets: [
        'Developed the Admin Internal Portal for Ascension Health, supporting 140K+ employees across 90+ hospitals.',
        'Engineered Spring Boot EDSL Read Service APIs on GCP to handle HIPAA-compliant PHI data from FHIR stores.',
        'Deployed microservices to PCF (Pivotal Cloud Foundry) hosted on Google Cloud Platform.',
        'Built ReactJS interfaces for healthcare workers to manage patient vitals subscription workflows.',
      ],
      markerColorClass: 'bg-[#333] border-appleBlack',
      expanded: false,
    },
    {
      company: 'Tata Consultancy Services',
      role: 'System Engineer',
      date: 'Mar 2018 – Jun 2021',
      location: 'Hyderabad, India',
      bullets: [
        'Built the RedApp Customer Feedback Service for Qantas Airways, empowering 1,500+ ground staff.',
        'Designed, developed, and tested RESTful APIs in Spring Boot per design specifications.',
        'Implemented Optimum Wellness Plans workflow in Angular for Banfield Pet Hospital, supporting 3M+ pets annually.',
        'Participated in Agile ceremonies including daily scrums, sprint planning, and retrospectives.',
      ],
      markerColorClass: 'bg-[#333] border-appleBlack',
      expanded: false,
    },
  ];

  filteredExperiences: ExperienceItem[] = [];

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.filteredExperiences = [...this.allExperiences];

    this.searchControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        this.filterExperiences(searchTerm || '');
      });
  }

  filterExperiences(searchTerm: string) {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredExperiences = [...this.allExperiences];
      return;
    }
    this.filteredExperiences = this.allExperiences.filter(
      (exp) =>
        exp.company.toLowerCase().includes(term) ||
        exp.role.toLowerCase().includes(term) ||
        exp.date.toLowerCase().includes(term) ||
        exp.bullets.some((b) => b.toLowerCase().includes(term))
    );
  }

  toggleExpand(exp: ExperienceItem) {
    exp.expanded = !exp.expanded;
  }

  visibleBullets(exp: ExperienceItem): string[] {
    return exp.expanded ? exp.bullets : exp.bullets.slice(0, 2);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
