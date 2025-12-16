import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  login() {
    if (!this.email) return;

    const success = this.auth.login(this.email);

    if (!success) {
      this.auth.register('Jogador', this.email);
    }

    this.router.navigate(['/dashboard']);
  }
}
