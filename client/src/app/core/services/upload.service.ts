import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private _percent = new BehaviorSubject(0);

  constructor() {}

  public setPercent(event: HttpEvent<any>): void {

    switch (event.type) {
      case HttpEventType.Sent:
        this._percent.next(0);
        break;
      case HttpEventType.UploadProgress:
        this._percent.next(Math.round((100 * event.loaded) / event.total));
        break;
      default:
        this._percent.next(0);
    }
  }

  public getPercent(): Observable<number> {
    return this._percent;
  }
}
