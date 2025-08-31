import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div>
      <header class="toolbar">
        <h2 style="margin:0">Clients</h2>
        <div class="actions">
          <input placeholder="Search by name or email" [(ngModel)]="query" (input)="load()" />
          <button class="primary" (click)="openForm()">+ New Client</button>
        </div>
      </header>

      <div *ngIf="showForm" class="card" style="margin-bottom:16px;">
        <form [formGroup]="form" (ngSubmit)="save()">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <input formControlName="name" placeholder="Name" />
            <input formControlName="email" placeholder="Email" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
            <input formControlName="phone" placeholder="Phone" />
            <input formControlName="company" placeholder="Company" />
          </div>
          <div style="margin-top:12px;">
            <button class="primary" type="submit" [disabled]="form.invalid">Save</button>
            <button type="button" (click)="closeForm()" style="margin-left:8px;">Cancel</button>
          </div>
        </form>
      </div>

      <table *ngIf="clients.length">
        <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th></th></tr></thead>
        <tbody>
          <tr *ngFor="let c of clients">
            <td>{{c.name}}</td>
            <td>{{c.email}}</td>
            <td>{{c.phone}}</td>
            <td>{{c.company}}</td>
            <td><button class="link" (click)="archive(c)">Archive</button></td>
          </tr>
        </tbody>
      </table>

      <p *ngIf="!clients.length">No clients found.</p>
    </div>
  `
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  query = '';
  showForm = false;
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    company: ['']
  });

  constructor(private fb: FormBuilder, private svc: ClientsService) { this.fb = fb; }

  ngOnInit(){ this.load(); }

  async load(){
    try {
      this.clients = (await this.svc.list({ q: this.query })) || [];
    } catch(e){ console.error(e); }
  }

  openForm(){ this.showForm = true; }
  closeForm(){ this.showForm = false; this.form.reset(); }

  async save(){
    if(this.form.invalid) return;
    try {
      await this.svc.create(this.form.value);
      this.closeForm();
      await this.load();
    } catch(e){ console.error(e); }
  }

  async archive(c: any){
    if(!confirm('Archive this client?')) return;
    await this.svc.archive(c.id);
    await this.load();
  }
}
