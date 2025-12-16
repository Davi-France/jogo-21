import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from '../../shared/models/card.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private suits = ['copa', 'ouros', 'espada', 'paus'] as const;
  private values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;

  private deck: Card[] = [];

  constructor() {
    this.resetDeck();
  }

  resetDeck(): Observable<void> {
    this.deck = this.createDeck();
    this.shuffle();
    return of(void 0);
  }

  draw(amount: number): Observable<Card[]> {
    const cards = this.deck.splice(0, amount);
    return of(cards);
  }

  // ==============================
  // Deck
  // ==============================
  private createDeck(): Card[] {
    const deck: Card[] = [];

    for (const suit of this.suits) {
      for (const value of this.values) {

        const points =
          value === 'A'
            ? 11
            : ['J', 'Q', 'K'].includes(value)
              ? 10
              : Number(value);

        deck.push({
          value,
          suit,
          points,
          image: `/${value}${suit}.png`
        });
      }
    }

    return deck;
  }

  private shuffle(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }
}
