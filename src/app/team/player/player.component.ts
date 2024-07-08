import { Component, Input, OnInit } from '@angular/core';
import { NgIf, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [NgIf, PercentPipe],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {
  @Input() player: any;
  rankedSoloWinRate: number = 0;
  rankedSoloTierAndRank: string = '';
  rankedFlexWinRate: number = 0;
  rankedFlexTierAndRank: string = '';

  ngOnInit(): void {
    this.rankedSoloWinRate = this.player.ranked_stats.RANKED_SOLO_5x5.wins / (this.player.ranked_stats.RANKED_SOLO_5x5.wins + this.player.ranked_stats.RANKED_SOLO_5x5.losses);
    this.rankedSoloTierAndRank = `${this.player.ranked_stats.RANKED_SOLO_5x5.tier} ${this.player.ranked_stats.RANKED_SOLO_5x5.rank}`
    this.rankedFlexWinRate = this.player.ranked_stats.RANKED_FLEX_SR.wins / (this.player.ranked_stats.RANKED_FLEX_SR.wins + this.player.ranked_stats.RANKED_FLEX_SR.losses);
    this.rankedFlexTierAndRank = `${this.player.ranked_stats.RANKED_FLEX_SR.tier} ${this.player.ranked_stats.RANKED_FLEX_SR.rank}`
  }
}
