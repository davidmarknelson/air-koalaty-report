import { Component, OnInit } from '@angular/core';
// Angular Material
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mat-snack-bar',
  templateUrl: './mat-snack-bar.component.html',
  styleUrls: ['./mat-snack-bar.component.css']
})
export class MatSnackBarComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string, className: string) {

    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: [className]
    });
  }

}
