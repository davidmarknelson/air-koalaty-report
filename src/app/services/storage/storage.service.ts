import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Used in interceptor
  createAqiValueWithTimestamp(eventBody): object {
    eventBody.timestamp = Date.now();
    return eventBody;
  }

  createCountriesValueWithTimestamp(eventBody): object {
    let countries = eventBody
    let timestamp = Date.now();
    let body = {
      timestamp: timestamp,
      countries: countries
    }
    return body;
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

  hasTimestampExpired(storedObj): boolean {
    if (!storedObj) return true;
    let timestamp = storedObj.timestamp;
    let now = Date.now();
    let hour = 60 * 60 * 1000;
    return (now - hour) > timestamp;
  }

  createCityObj(city, state, country): object {
    let cityObj = {
      city: city,
      state: state,
      country: country
    }
    return cityObj;
  }
}
