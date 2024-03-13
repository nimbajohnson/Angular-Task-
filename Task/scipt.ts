// app.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}

// company-list.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  template: `
    <h1>Company List</h1>
    <ul>
      <li *ngFor="let company of companies">
        {{ company.name }} 
        <button (click)="onView(company.id)">View</button>
      </li>
    </ul>
  `
})
export class CompanyListComponent {
  companies = [
    { id: 1, name: 'Company A' },
    { id: 2, name: 'Company B' },
    { id: 3, name: 'Company C' }
  ];

  constructor(private router: Router) {}

  onView(companyId: number) {
    this.router.navigate(['/company-details', companyId]);
  }
}

// company-details.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  template: `
    <h1>Company Details</h1>
    <p>Selected Company ID: {{ companyId }}</p>
    <button (click)="onCancel()">Cancel</button>
    <button (click)="onApply()">Apply</button>
  `
})
export class CompanyDetailsComponent {
  companyId: number;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.companyId = this.route.snapshot.params['id'];
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  onApply() {
    // Send a request to the backend to apply for the selected company using this.companyId
    this.router.navigate(['/apply', this.companyId]);
  }
}

// company.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  selectedCompanyId: number;

  constructor() { }

  setSelectedCompanyId(id: number) {
    this.selectedCompanyId = id;
  }

  getSelectedCompanyId() {
    return this.selectedCompanyId;
  }
}

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CompanyListComponent } from './company-list.component';
import { CompanyDetailsComponent } from './company-details.component';
import { CompanyService } from './company.service';

const routes: Routes = [
  { path: '', component: CompanyListComponent },
  { path: 'company-details/:id', component: CompanyDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CompanyListComponent,
    CompanyDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule {}