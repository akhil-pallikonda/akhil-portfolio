import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

interface SkillCategory {
  title: string;
  subtitle: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  
  allSkillCategories: SkillCategory[] = [
    {
      title: 'Backend & Databases',
      subtitle: 'Engineered for high availability and low latency',
      skills: ['Java', 'Spring Boot', 'Microservices', 'Kafka', 'Redis', 'Oracle DB & MongoDB']
    },
    {
      title: 'Frontend & UX',
      subtitle: 'Reactjs, Angular, TypeScript, Redux Saga, Webpack',
      skills: ['Reactjs', 'Angular', 'TypeScript', 'Redux Saga', 'Webpack']
    },
    {
      title: 'Cloud & Platform',
      subtitle: 'AWS (EC2, SNS), GCP, WSO2 API Gateway, Jenkins, Docker',
      skills: ['AWS (EC2, SNS)', 'GCP', 'WSO2 API Gateway', 'Jenkins', 'Docker']
    }
  ];

  filteredSkillCategories: SkillCategory[] = [];
  
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.filteredSkillCategories = [...this.allSkillCategories];

    this.searchControl.valueChanges
      .pipe(
        debounceTime(50),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((searchTerm) => {
        this.filterSkills(searchTerm || '');
      });
  }

  filterSkills(searchTerm: string) {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredSkillCategories = [...this.allSkillCategories];
      return;
    }

    this.filteredSkillCategories = this.allSkillCategories.map(category => {
      const matchedSkills = category.skills.filter(skill => 
        skill.toLowerCase().includes(term)
      );
      
      return {
        ...category,
        skills: matchedSkills
      };
    }).filter(category => 
      category.skills.length > 0 || 
      category.title.toLowerCase().includes(term) || 
      category.subtitle.toLowerCase().includes(term)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
