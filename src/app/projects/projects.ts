import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimateDirective } from '../shared/scroll-animate.directive';

interface Project {
  title: string;
  company: string;
  companyColor: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  projects: Project[] = [
    {
      title: 'Manage Subscriptions Dashboard',
      company: 'Verizon',
      companyColor: '#cd040b',
      description:
        'A high-performance subscriptions dashboard inside the ACSS (Automated Customer Service Support) application for Verizon\'s Customer Representatives. Built with React for the UI and Spring Boot microservices for backend integrations with 3rd-party vendors. Achieved 80%+ code coverage across all modules.',
      tech: ['React', 'Spring Boot', 'Microservices', 'Kafka', 'Redis', 'Oracle DB'],
      githubUrl: 'https://github.com/akhil-pallikonda',
      liveUrl: '#',
    },
    {
      title: 'Subscription Admin Internal Portal',
      company: 'Deloitte · Ascension Health',
      companyColor: '#86bc25',
      description:
        'An internal admin portal for Ascension Health enabling healthcare workers to manage patient vitals subscriptions across 90+ hospitals for 140K+ employees. Built EDSL Read Service APIs using Spring Boot and Microservices, deployed to PCF on GCP, ensuring HIPAA-compliant PHI data handling via FHIR stores.',
      tech: ['ReactJS', 'Spring Boot', 'GCP', 'PCF', 'FHIR', 'Microservices'],
      githubUrl: 'https://github.com/akhil-pallikonda',
      liveUrl: '#',
    },
    {
      title: 'Qantas Airways API Platform',
      company: 'TCS',
      companyColor: '#e8001c',
      description:
        'Designed, developed, and tested RESTful APIs in Spring Boot for Qantas Airways to render outcomes per design specifications. Participated in Agile ceremonies including daily scrums, sprint planning, and retrospectives to maintain delivery velocity.',
      tech: ['Spring Boot', 'Java', 'REST APIs', 'Agile', 'JUnit', 'Oracle DB'],
      githubUrl: 'https://github.com/akhil-pallikonda',
      liveUrl: '#',
    },
  ];
}
