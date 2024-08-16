import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

import { TeamService } from '../services/team.service';
import { PlayerStatComponent } from './player/player-stat.component';
import { TeamMember } from '../models/team.interface';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgFor, NgIf, PlayerStatComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent implements OnInit, OnDestroy {
  @ViewChildren(PlayerStatComponent)
  playerComponents!: QueryList<PlayerStatComponent>;
  public teamMembers: any[] = [];
  private positionOrder: string[] = ['top', 'jungle', 'mid', 'adc', 'support'];
  public splashPaths: string[] = [];
  public teamImagePath: string = '../../assets/images/the_team.png';
  
  public subscription: Subscription | null = null;
  public selectedPlayerIndex: number | null = null;
  public currentPlayer: any;
  public flippedCards: Set<number> = new Set();

  constructor(public teamService: TeamService) {}

  ngOnInit(): void {
    this.subscription = this.teamService.getTeamMembers().subscribe({
      next: (members) => (this.teamMembers = members.sort(this.sortByPosition)),
      error: (e) => console.error('Error fetching team members: ', e),
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onCardClick(index: number): void {
    // this.selectedPlayerIndex = this.selectedPlayerIndex === index ? null : index;
    // this.currentPlayer = this.teamMembers[index];
    if (this.flippedCards.has(index)) {
      this.flippedCards.delete(index);
    } else {
      this.flippedCards.add(index);
    }
    this.currentPlayer = this.teamMembers[index];
  }

  public isCardFlipped(index: number): boolean {
    return this.flippedCards.has(index);
  }

  private sortByPosition = (a: TeamMember, b: TeamMember): number => {
    return (
      this.positionOrder.indexOf(a.position) - this.positionOrder.indexOf(b.position)
    );
  };
}
