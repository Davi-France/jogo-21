import { Injectable } from "@angular/core";

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersKey = 'users';
  private currentUserKey = 'currentUser';

  register(name: string, email: string): boolean {
    const users = this.getUsers();

    if (users.some(u => u.email === email)) {
      return false;
    }

    users.push({
      id: crypto.randomUUID(),
      name,
      email
    });

    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  login(email: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === email);

    if (!user) return false;

    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    return true;
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.currentUserKey);
    return data ? JSON.parse(data) : null;
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  private getUsers(): User[] {
    const data = localStorage.getItem(this.usersKey);
    return data ? JSON.parse(data) : [];
  }
}
