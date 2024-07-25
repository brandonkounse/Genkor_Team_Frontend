export interface TeamMember {
  name: string,
  position: string,
  profile_info: {
    profile_icon_id: string,
    summoner_level: string,
  },
  ranked_stats: {
    arena: RankedData,
    ranked_flex_sr: RankedData,
    ranked_solo_5x5: RankedData,
  }
}

interface RankedData {
  leagueId: string,
  losses: string,
  queueType: string,
  rank: string,
  tier: string,
  wins: string,
}