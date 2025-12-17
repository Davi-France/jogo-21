import { Injectable } from '@angular/core';
import { Match } from '../../shared/models/match.model';


@Injectable({ providedIn: 'root' })
export class StorageService {
  private MATCHES_KEY = 'blackjack_matches';


  getMatches(): Match[] {
    return JSON.parse(localStorage.getItem(this.MATCHES_KEY) || '[]');
  }

  saveMatch(match: Match) {
    const matches = this.getMatches();
    matches.push(match);
    localStorage.setItem(this.MATCHES_KEY, JSON.stringify(matches));
  }

  getMatchesByUser(userId: string): Match[] {
    return this.getMatches().filter(m => m.userId === userId);
  }
}