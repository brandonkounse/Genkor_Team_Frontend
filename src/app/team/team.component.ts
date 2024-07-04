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
  public teamMembers: any[] = [];
  public splashPaths: string[] = []
  public subscription: Subscription | null = null;

  constructor(public teamService: TeamService) { }

  ngOnInit(): void {
    this.subscription = this.teamService.getTeamMembers().subscribe({
      next: (members) => this.teamMembers = members,
      error: (e) => console.error('Error fetching team members: ', e)
    });

    this.splashPaths = this.teamService.teamSplash.flatMap(obj => Object.values(obj));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}