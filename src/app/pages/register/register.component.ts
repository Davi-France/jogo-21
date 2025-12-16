import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  name = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  register() {
    if (!this.email || !this.name) {
      alert('Preencha nome e email');
      return;
    }

    const success = this.auth.register(this.name, this.email);

    if (!success) {
      alert('Email já cadastrado');
      return;
    }

    this.auth.login(this.email);

    this.router.navigate(['/dashboard']);
  }
}
