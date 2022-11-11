import { Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { PROFILES } from '../storage/storage';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() {}

  saveNewProfile(cities: string[]) {
      const profileName = `Profile ${PROFILES.length}`;
      const newProfile = { profileName, cities };
      PROFILES.push(newProfile);
  }

  public getProfiles() {
    return PROFILES;
  }

  public deleteProfile(profile: Profile) { 
    PROFILES.splice(PROFILES.indexOf(profile), 1);
  }
  
}