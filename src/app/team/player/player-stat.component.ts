import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf, PercentPipe } from '@angular/common';

const rankIconMapping: { [key: string]: string } = {
  'IRON': 'Rank=Iron.png',
  'BRONZE': 'Rank=Bronze.png',
  'SILVER': 'Rank=Silver.png',
  'GOLD': 'Rank=Gold.png',
  'PLATINUM': 'Rank=Platinum.png',
  'EMERALD': 'Rank=Emerald.png',
  'DIAMOND': 'Rank=Diamond.png',
  'MASTER': 'Rank=Master.png',
  'GRANDMASTER': 'Rank=Grandmaster.png',
  'CHALLENGER': 'Rank=Challenger.png',
}

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [NgIf, PercentPipe],
  templateUrl: './player-stat.component.html',
  styleUrl: './player-stat.component.css'
})
export class PlayerStatComponent implements OnInit, OnChanges {
  @Input() player: any;
  // Solo Queue
  rankedSoloWinRate: number = 0;
  rankedSoloTierAndRank: string = '';
  rankedSoloIconPath: string = '';
  // Flex Queue
  rankedFlexWinRate: number = 0;
  rankedFlexTierAndRank: string = '';
  rankedFlexIconPath: string = '';

  ngOnInit(): void {
    this.updatePlayerStats();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['player']) {
      this.updatePlayerStats();
    }
  }

  private updatePlayerStats(): void {
    this.rankedSoloWinRate = this.player.ranked_stats.RANKED_SOLO_5x5.wins / (this.player.ranked_stats.RANKED_SOLO_5x5.wins + this.player.ranked_stats.RANKED_SOLO_5x5.losses);
    this.rankedSoloTierAndRank = `${this.player.ranked_stats.RANKED_SOLO_5x5.tier} ${this.player.ranked_stats.RANKED_SOLO_5x5.rank}`
    this.rankedFlexWinRate = this.player.ranked_stats.RANKED_FLEX_SR.wins / (this.player.ranked_stats.RANKED_FLEX_SR.wins + this.player.ranked_stats.RANKED_FLEX_SR.losses);
    this.rankedFlexTierAndRank = `${this.player.ranked_stats.RANKED_FLEX_SR.tier} ${this.player.ranked_stats.RANKED_FLEX_SR.rank}`
    this.setRankedIcons();
  }

  private setRankedIcons(): void {
    const soloRank: string = this.player.ranked_stats.RANKED_SOLO_5x5.tier;
    const flexRank: string = this.player.ranked_stats.RANKED_FLEX_SR.tier;
    this.rankedSoloIconPath = `../../../assets/images/ranked_icons/${rankIconMapping[soloRank]}`
    this.rankedFlexIconPath = `../../../assets/images/ranked_icons/${rankIconMapping[flexRank]}`
  }
}
