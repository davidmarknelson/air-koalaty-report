import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Used in interceptor
  createAqiValueWithTimestamp(eventBody): Object {
    eventBody.timestamp = Date.now();
    return eventBody;
  }

  // Used in interceptor and components
  createAqiCityKey(cityObj): string {
    let city = cityObj.city;
    let state = cityObj.state;
    let country = cityObj.country;
    let storageKeyString = `${city}, ${state}, ${country} aqi`;
    return storageKeyString;
  }

  // Used in components
  checkStorageForCity(cityObj) {
    let key = this.createAqiCityKey(cityObj);
    console.log('check storage for city', localStorage.getItem(key));
    let storedCity = JSON.parse(localStorage.getItem(key));
    if (!storedCity) return null;
    let expiredTime = this.hasTimestampExpired(storedCity);
    if (expiredTime) {
      localStorage.removeItem(key);
      return null;
    } else {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  hasTimestampExpired(storedCityObj): Boolean {
    console.log('in timestamp');
    if (!storedCityObj) return true;
    let timestamp = storedCityObj.timestamp;
    let now = Date.now();
    let hour = 60 * 60 * 1000;
    console.log('timestamp', (now - hour) > timestamp);
    return (now - hour) > timestamp;
  }

  createCityObj(city, state, country): Object {
    let cityObj = {
      city: city,
      state: state,
      country: country
    }
    return cityObj;
  }
}
