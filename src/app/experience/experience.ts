import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

interface ExperienceItem {
  company: string;
  roleAndDate: string;
  bullets: string[];
  markerColorClass: string;
}

@Component({
  selector: 'app-experience',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  
  allExperiences: ExperienceItem[] = [
    {
      company: 'Verizon',
      roleAndDate: 'Engg. III • Apr 2022 - Dec 2025',
      bullets: [
        'Architected a 3rd-party subscriptions dashboard processing 130+ req/hr at 0.5s response time for 500K+ daily customers.',
        'Modernized legacy UI by migrating iframe-based workflows to React, achieving 90%+ code coverage.',
        'Led migration of 10+ high-performance APIs processing over 500K daily transactions.'
      ],
      markerColorClass: 'bg-appleBlue border-appleBlack'
    },
    {
      company: 'Deloitte',
      roleAndDate: 'Analyst • Jun 2021 - Apr 2022',
      bullets: [
        'Developed the Subscription Admin Internal Portal for Ascension Health, supporting 140K+ employees across 90 hospitals.',
        'Engineered Spring Boot EDSL Read Service APIs on GCP to handle HIPAA-compliant PHI data from FHIR stores.'
      ],
      markerColorClass: 'bg-[#333] border-appleBlack'
    },
    {
      company: 'Tata Consultancy Services',
      roleAndDate: 'System Engineer • Mar 2018 - Jun 2021',
      bullets: [
        'Built the RedApp Customer Feedback Service for Qantas Airways, empowering 1,500+ ground staff.',
        'Implemented Optimum Wellness Plans workflow in Angular for Banfield Pet Hospital, supporting 3M+ pets annually.'
      ],
      markerColorClass: 'bg-[#333] border-appleBlack'
    }
  ];

  filteredExperiences: ExperienceItem[] = [];
  
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.filteredExperiences = [...this.allExperiences];

    this.searchControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
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

    this.filteredExperiences = this.allExperiences.filter(exp => 
      exp.company.toLowerCase().includes(term) ||
      exp.roleAndDate.toLowerCase().includes(term) ||
      exp.bullets.some(bullet => bullet.toLowerCase().includes(term))
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
