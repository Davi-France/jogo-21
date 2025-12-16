export enum MatchResult {
  WIN = 'WIN',
  LOSS = 'LOSS'
}

export interface Match {
  id: string;
  userId: string;
  date: string;
  result: MatchResult;
  playerScore: number;
  dealerScore: number;
  playerCards: any[];
  dealerCards: any[];
}
