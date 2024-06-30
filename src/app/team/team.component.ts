import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})

export class TeamComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;
  public splashPaths: Array<string> = []

  constructor(public teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService.fetchTeamMembers();

    this.teamService.teamSplash.forEach(obj => {
      for (const key in obj) {
        this.splashPaths.push(obj[key])
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}