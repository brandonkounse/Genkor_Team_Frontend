import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';

import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgFor],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit, OnDestroy {
  teamProfileInfo: any;
  private subscription: Subscription | null = null;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.fetchTeamProfileInformation();
  }

  public fetchTeamProfileInformation(): void {
    this.subscription = this.teamService.getTeamProfileInformation().subscribe({
      next: data => {
        this.teamProfileInfo = data;
        console.log('Team Profile Information: ', this.teamProfileInfo);
      },
      error: error => {
        console.error('Error fetching team profile information', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
