import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="container">
      <header class="toolbar">
        <h1 style="margin:0">Client Management</h1>
        <nav class="actions">
          <a routerLink="/clients">Clients</a>
          <a routerLink="/meetings" style="margin-left:12px">Meetings</a>
        </nav>
      </header>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
