import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../services/meetings.service';
import { ClientsService } from '../services/clients.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div>
      <header class="toolbar">
        <h2 style="margin:0">Meetings</h2>
        <div class="actions">
          <select [(ngModel)]="filterClient" (change)="load()">
            <option value="">All clients</option>
            <option *ngFor="let c of allClients" [value]="c.id">{{c.name}}</option>
          </select>
          <button class="primary" (click)="openForm()">+ New Meeting</button>
        </div>
      </header>

      <div *ngIf="showForm" class="card" style="margin-bottom:16px;">
        <form [formGroup]="form" (ngSubmit)="save()">
          <div style="display:grid;gap:12px;">
            <input formControlName="title" placeholder="Title" />
            <select formControlName="clientId">
              <option *ngFor="let c of allClients" [value]="c.id">{{c.name}}</option>
            </select>
            <input formControlName="when" type="datetime-local" />
            <select formControlName="mode"><option>Online</option><option>In-Person</option></select>
            <textarea formControlName="notes" placeholder="Notes"></textarea>
            <div>
              <button class="primary" type="submit" [disabled]="form.invalid">Save</button>
              <button type="button" (click)="closeForm()" style="margin-left:8px;">Cancel</button>
            </div>
          </div>
        </form>
      </div>

      <div *ngIf="meetings.length" style="display:grid;gap:12px;">
        <div *ngFor="let m of meetings" class="card">
          <h3 style="margin:0">{{m.title}}</h3>
          <p><strong>Client:</strong> {{m.client_name || m.clientId}}</p>
          <p><strong>When:</strong> {{m.when}}</p>
          <p><strong>Mode:</strong> {{m.mode}}</p>
          <p *ngIf="m.notes"><strong>Notes:</strong> {{m.notes}}</p>
        </div>
      </div>
      <p *ngIf="!meetings.length">No meetings found.</p>
    </div>
  `
})
export class MeetingsComponent implements OnInit {
  meetings: any[] = [];
  allClients: any[] = [];
  filterClient = '';
  showForm = false;
  fb = new FormBuilder();
  form = this.fb.group({
    title: ['', Validators.required],
    clientId: [null, Validators.required],
    when: ['', Validators.required],
    mode: ['Online', Validators.required],
    notes: ['']
  });

  constructor(private svc: MeetingsService, private cs: ClientsService){}

  ngOnInit(){ this.loadClients(); this.load(); }

  async loadClients(){
    this.allClients = (await this.cs.list()) || [];
  }

  async load() {
  let meetings: any[];

  if (this.filterClient) {
    // Filter by selected client
    meetings = (await this.svc.list({ clientId: this.filterClient })) || [];
  } else {
    // No filter → load all meetings
    meetings = (await this.svc.list()) || [];
  }

  // Map clientId → client_name
  const clientMap = new Map(this.allClients.map(c => [c.id.toString(), c.name]));

this.meetings = meetings.map(m => ({
  ...m,
  client_name: m.clientId != null ? clientMap.get(m.clientId.toString()) || 'Unknown' : 'Unknown'
}));


  console.log('Loaded meetings:', this.meetings);
}


  openForm(){ this.showForm = true; }
  closeForm(){ this.showForm = false; this.form.reset(); }

  async save(){
    if(this.form.invalid) return;
    await this.svc.create(this.form.value);
    this.closeForm();
    await Promise.all([this.load(), this.loadClients()]);
  }
}
