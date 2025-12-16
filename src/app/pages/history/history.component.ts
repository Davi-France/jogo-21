import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/storage.service';
import { AuthService } from '../../core/services/auth.service';
import { MatchResult, type Match } from '../../shared/models/match.model';


@Component({
  standalone: true,
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {

  matches: Match[] = [];
  MatchResult = MatchResult;


  constructor(
    private storage: StorageService,
    private auth: AuthService
  ) { }


  ngOnInit() {
    const user = this.auth.getCurrentUser();
    if (!user) return;

    this.matches = this.storage.getMatchesByUser(user.id);
  }
}