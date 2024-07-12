import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

import { TeamService } from './team.service';
import { PlayerComponent } from './player/player.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgFor, NgIf, PlayerComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})

export class TeamComponent implements OnInit, OnDestroy {
  @ViewChildren(PlayerComponent) playerComponents!: QueryList<PlayerComponent>;
  public teamMembers: any[] = [];
  public splashPaths: string[] = []
  public subscription: Subscription | null = null;
  public selectedPlayerIndex: number | null = null;

  constructor(public teamService: TeamService) { }

  ngOnInit(): void {
    this.subscription = this.teamService.getTeamMembers().subscribe({
      next: (members) => this.teamMembers = members,
      error: (e) => console.error('Error fetching team members: ', e)
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onSplashClick(index: number): void {
    this.selectedPlayerIndex = this.selectedPlayerIndex === index ? null : index;
  }
}