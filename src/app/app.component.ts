import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TeamComponent } from './team/team.component';
import { HeaderComponent } from './header/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TeamComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }
