import { Injectable } from '@angular/core';
import { Card } from '../../shared/models/card.model';

@Injectable({ providedIn: 'root' })
export class GameService {

  calculateScore(cards: Card[]): number {
    let total = 0;
    let aces = 0;

    for (const card of cards) {
      if (card.value === 'A') {
        aces++;
        total += 11;
      } else {
        total += card.points;
      }
    }

    // Ajuste dos ases
    while (total > 21 && aces > 0) {
      total -= 10;
      aces--;
    }

    return total;
  }
}
