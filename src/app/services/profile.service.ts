import { Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profiles: Profile[];

  constructor() {
    this.profiles = [
        {
            profileName:  'Default Profile',
            cities: ['Kyiv', 'Milan', 'Barcelona']
        }
    ]
  }

  saveNewProfile(cities: string[]) {
      const profileName = `Profile ${this.profiles.length}`;
      const newProfile = {profileName, cities};
      this.profiles.push(newProfile);
  }

  public getProfiles() {
    return this.profiles;
  }

  public deleteProfile(profile: Profile) { 
     this.profiles.splice(this.profiles.indexOf(profile), 1);
  }
  
}