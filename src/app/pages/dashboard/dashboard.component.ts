import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';
import { AuthService } from '../../core/services/auth.service';
import { Match, MatchResult } from '../../shared/models/match.model';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  wins = 0;
  losses = 0;

  constructor(
    private storage: StorageService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.auth.getCurrentUser();
    if (!user) return;

    const matches = this.storage.getMatchesByUser(user.id);

    this.wins = matches.filter(m => m.result === MatchResult.WIN).length;
    this.losses = matches.filter(m => m.result === MatchResult.LOSS).length;
  }

  startGame(): void {
    this.router.navigate(['/game']);
  }
}
