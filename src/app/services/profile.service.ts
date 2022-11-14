import { Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public isDataFetched: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private snackBar: MatSnackBar) {}

  saveNewProfile(cities: string[]) {
    const profiles = this.getProfiles();
    const profileName = `List ${profiles.length + 1}`;
    const newProfile = { profileName, cities };
    profiles.push(newProfile);
    this.setToLocalStorage(profiles);
    this.isDataFetched.next(true);
    this.snackBar.open("List saved!", 'Done', {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

  public getProfiles(): Profile[] {
    const profiles = JSON.parse(localStorage.getItem('weather-cities') as string);
    return profiles ? profiles : [];
  }

  public deleteProfile(profileIndex: number) { 
    const profiles = this.getProfiles();
    profiles.splice(profileIndex, 1);
    this.setToLocalStorage(profiles);
    this.isDataFetched.next(true);
    this.snackBar.open("Profile removed!", 'Done', {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

  public loadFromLocalStorage() {
    if (localStorage.getItem('weather-cities') === null || localStorage.getItem('weather-cities') === undefined) {
      this.snackBar.open("Cities not found!", 'Done', {
        duration: 2000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["error-notification"]
      });
    } else {
      setTimeout(() => {
        this.snackBar.open("Loading cities...", 'Done', {
          duration: 2000,
          verticalPosition: "bottom",
          horizontalPosition: "center" 
        });
      });
    }
  }

  private setToLocalStorage(profiles: Profile[]): void {
    localStorage.setItem('weather-cities', JSON.stringify(profiles));
  }
  
}