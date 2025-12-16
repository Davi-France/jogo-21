import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'header-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  username = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    const user = this.auth.getCurrentUser();
    this.username = user?.name ?? '';
  }
}
