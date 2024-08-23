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

const tierOrder: string[] = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'EMERALD', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'];

@Component({
  selector: 'app-player-stat',
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
  // Flex Queue
  rankedFlexWinRate: number = 0;
  rankedFlexTierAndRank: string = '';
  // Highest Rank
  highestTierAndRank: string[] = [];
  highestRankIconPath: string = '';

  ngOnInit(): void {
    this.updatePlayerStats();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['player']) {
      this.updatePlayerStats();
    }
  }

  private updatePlayerStats(): void {
    const soloStats = this.player.ranked_stats.RANKED_SOLO_5x5;
    const flexStats = this.player.ranked_stats.RANKED_FLEX_SR;

    this.rankedSoloWinRate = soloStats.wins / (soloStats.wins + soloStats.losses);
    this.rankedSoloTierAndRank = `${soloStats.tier} ${soloStats.rank}`
    this.rankedFlexWinRate = flexStats.wins / (flexStats.wins + flexStats.losses);
    this.rankedFlexTierAndRank = `${flexStats.tier} ${flexStats.rank}`
    
    this.setHighestTierAndRank();
  }

  private setHighestTierAndRank(): void {
    const [soloTierAndRank, flexTierAndRank] = this.getSoloAndFlexTierAndRank();
    const tierIndex = 0;
    const highestTier = tierOrder.indexOf(soloTierAndRank[tierIndex]) >= tierOrder.indexOf(flexTierAndRank[tierIndex]) ? soloTierAndRank : flexTierAndRank;

    this.highestTierAndRank = highestTier;
    this.highestRankIconPath = `../../../assets/images/ranked_icons/${rankIconMapping[highestTier[tierIndex]]}`;
  }

  private getSoloAndFlexTierAndRank(): string[][] {
    const soloTier: string = this.player.ranked_stats.RANKED_SOLO_5x5.tier;
    const flexTier: string = this.player.ranked_stats.RANKED_FLEX_SR.tier;
    const soloRank: string = this.player.ranked_stats.RANKED_SOLO_5x5.rank;
    const flexRank: string = this.player.ranked_stats.RANKED_FLEX_SR.rank;
    return [[soloTier, soloRank], [flexTier, flexRank]];
  }
}
