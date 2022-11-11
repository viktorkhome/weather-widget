import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public latitude!: number;
  public longitude!: number;
  constructor(private snackBar: MatSnackBar) {}

  getPosition(): Observable<any> {
    return Observable.create((observer: any) => {
      window.navigator.geolocation.getCurrentPosition(position => {
        observer.next(position);
        observer.complete();
      },
        error => {
          setTimeout(() => {
            this.snackBar.open(`${error.message}`, 'Done', {
              duration: 100000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
              panelClass: ["error-notification"]
            });
          });
          observer.error(error)
        });
    });
}
}