export class Team {
  team_name: string;
  team_logo: string;
  players: Player[];
  coaches: Coach[];
}

export class Player {
  player_key: number;
  player_name: string;
  player_number: string;
  player_country?: string;
  player_type: string;
  player_age: string;
  player_match_played: string;
  player_goals: string;
  player_yellow_cards: string;
  player_red_cards: string;
  player_image?: string;
}
export class Coach {
  coach_name: string;
  coach_country?: string;
  coach_age?: string;
}
