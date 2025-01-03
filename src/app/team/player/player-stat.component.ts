import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PercentPipe } from '@angular/common';

const rankIconMapping: { [key: string]: string } = {
  'UNRANKED': 'Rank=Unranked.png',
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
  imports: [PercentPipe],
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
  highestWinRate: number = 0;

  ngOnInit(): void {
    this.updatePlayerStats();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['player']) {
      this.updatePlayerStats();
    }
  }

  private updatePlayerStats(): void {
    if (!this.player || Object.keys(this.player.ranked_stats).length === 0) {
      this.highestTierAndRank = ['UNRANKED', ''];
      this.highestRankIconPath = `../../../assets/images/ranked_icons/${rankIconMapping['UNRANKED']}`;
    } 
    
    const rankedStats = this.player.ranked_stats;

    if (rankedStats.RANKED_SOLO_5x5) {
      const soloStats = rankedStats.RANKED_SOLO_5x5;
      this.rankedSoloTierAndRank = `${soloStats.tier} ${soloStats.rank}`;
      this.rankedSoloWinRate = soloStats.wins / (soloStats.wins + soloStats.losses);
    } else {
      this.rankedSoloTierAndRank = 'UNRANKED'
    }

    if (rankedStats.RANKED_FLEX_SR) {
      const flexStats = rankedStats.RANKED_FLEX_SR;
      this.rankedFlexTierAndRank = `${flexStats.tier} ${flexStats.rank}`
      this.rankedFlexWinRate = flexStats.wins / (flexStats.wins + flexStats.losses);
    } else {
      this.rankedFlexTierAndRank = 'UNRANKED'
    }
  
    this.setHighestTierAndRank();
    this.setHighestWinRate();
  }

  private setHighestTierAndRank(): void {
    const soloTierAndRank = this.getTierAndRank('RANKED_SOLO_5x5');
    const flexTierAndRank = this.getTierAndRank('RANKED_FLEX_SR');
    const highestTier = tierOrder.indexOf(soloTierAndRank[0]) >= tierOrder.indexOf(flexTierAndRank[0]) ? soloTierAndRank : flexTierAndRank;

    this.highestTierAndRank = highestTier;
    this.highestRankIconPath = `../../../assets/images/ranked_icons/${rankIconMapping[highestTier[0]]}`;
  }

  private getTierAndRank(queueType: string): string[] {
    const stats = this.player.ranked_stats[queueType];
    if (!stats) return ['UNRANKED', ''];

    return [stats.tier, stats.rank];
  }

  private setHighestWinRate() {
    this.highestWinRate = this.rankedSoloWinRate > this.rankedFlexWinRate ? this.rankedSoloWinRate : this.rankedFlexWinRate;
  }
}
