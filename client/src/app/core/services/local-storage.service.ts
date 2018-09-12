import { Injectable } from '@angular/core';

const APP_PREFIX = 'APP-';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any) {
    localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  getItem(key: string) {
    try {
      return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
    } catch (error) {
      console.log(error);
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(`${APP_PREFIX}${key}`);
  }

}

