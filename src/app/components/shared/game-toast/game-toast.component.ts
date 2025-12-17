import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef
} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-toast.component.html',
  styleUrl: './game-toast.component.css',
  encapsulation: ViewEncapsulation.None
})
export class GameToastComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: {
      type: 'win' | 'lose';
      title: string;
      message: string;
    },
    private snackBarRef: MatSnackBarRef<GameToastComponent>
  ) { }

  close(): void {
    this.snackBarRef.dismiss();
  }
}
