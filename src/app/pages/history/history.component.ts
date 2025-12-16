import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/storage.service';
import { AuthService } from '../../core/services/auth.service';
import { MatchResult, type Match } from '../../shared/models/match.model';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';


@Component({
  standalone: true,
  selector: 'app-history',
  imports: [CommonModule, MatIconModule, RouterModule, HeaderComponent],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
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