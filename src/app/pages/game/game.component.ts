import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { DeckService } from '../../core/services/deck.service';
import { GameService } from '../../core/services/game.service';
import { Card } from '../../shared/models/card.model';
import { StorageService } from '../../core/services/storage.service';
import { AuthService } from '../../core/services/auth.service';
import { MatchResult } from '../../shared/models/match.model';

import { GameToastComponent } from '../../components/shared/game-toast/game-toast.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    GameToastComponent,
    RouterModule,
    MatIconModule,
    HeaderComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  playerCards: Card[] = [];
  dealerCards: Card[] = [];

  playerScore = 0;
  dealerScore = 0;

  gameOver = false;
  message = '';
  showDealerCards = false;

  drawingCard: Card | null = null;
  startAnimation = false;

  constructor(
    private snackBar: MatSnackBar,
    private deckService: DeckService,
    private gameService: GameService,
    private storageService: StorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.startGame();
  }

  restartGame(): void {
    this.startGame();
  }

  showToast(type: 'win' | 'lose') {
    this.snackBar.openFromComponent(GameToastComponent, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'win' ? ['toast-win'] : ['toast-lose'],
      data: {
        type,
        title: type === 'win' ? 'Vitória!' : 'Derrota',
        message: type === 'win' ? 'Parabéns!' : 'Não desista!'
      }
    });
  }

  startGame(): void {
    this.playerCards = [];
    this.dealerCards = [];
    this.playerScore = 0;
    this.dealerScore = 0;
    this.gameOver = false;
    this.message = '';
    this.showDealerCards = false;

    this.deckService.resetDeck();
    this.drawInitialCards();
  }

  drawInitialCards(): void {
    this.deckService.draw(2).subscribe(cards => {
      this.playerCards.push(...cards);
      this.updateScores();
    });

    this.deckService.draw(2).subscribe(cards => {
      this.dealerCards.push(...cards);
      this.updateScores();
    });
  }

  updateScores(): void {
    this.playerScore = this.gameService.calculateScore(this.playerCards);
    this.dealerScore = this.gameService.calculateScore(this.dealerCards);
  }

  pedir(): void {
    if (this.gameOver || this.drawingCard) return;

    this.deckService.draw(1).subscribe(cards => {
      const card = cards[0];

      this.drawingCard = card;
      this.startAnimation = false;

      setTimeout(() => {
        this.startAnimation = true;
      });

      setTimeout(() => {
        this.playerCards.push(card);
        this.drawingCard = null;
        this.startAnimation = false;

        this.updateScores();

        if (this.playerScore > 21) {
          this.endGame(MatchResult.LOSS);
        }
      }, 400);
    });
  }

  passar(): void {
    if (this.gameOver) return;

    this.showDealerCards = true;
    this.dealerTurn();
  }

  private dealerTurn(): void {
    this.dealerScore = this.gameService.calculateScore(this.dealerCards);

    if (this.dealerScore < 17) {
      this.deckService.draw(1).subscribe(cards => {
        this.dealerCards.push(...cards);
        this.dealerTurn();
      });
    } else {
      this.checkWinner();
    }
  }

  private checkWinner(): void {
    this.updateScores();

    if (this.dealerScore > 21) {
      this.endGame(MatchResult.WIN);
      return;
    }

    if (this.playerScore > this.dealerScore) {
      this.endGame(MatchResult.WIN);
    } else {
      this.endGame(MatchResult.LOSS);
    }
  }

  private endGame(result: MatchResult): void {
    this.gameOver = true;
    this.showDealerCards = true;

    this.showToast(result === MatchResult.WIN ? 'win' : 'lose');

    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.storageService.saveMatch({
      id: crypto.randomUUID(),
      userId: user.id,
      date: new Date().toISOString(),
      result,
      playerScore: this.playerScore,
      dealerScore: this.dealerScore,
      playerCards: this.playerCards,
      dealerCards: this.dealerCards
    });
  }
}
