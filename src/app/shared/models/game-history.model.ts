export type GameResult = 'PLAYER' | 'DEALER';

export interface GameHistory {
  result: GameResult;
  playerScore: number;
  dealerScore: number;
  date: Date;
}
