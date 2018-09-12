import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { extractFiles } from 'extract-files';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadService } from '@app/core/services/upload.service';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private uploadService: UploadService
  ) {
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Support to Upload Files and progress
    const files = extractFiles(req.body);

    if (files.length) {
      const headers = req.headers.delete('content-type');
      const body = new FormData();

      body.append('operations', JSON.stringify(req.body));

      body.append(
        'map',
        JSON.stringify(
          files.reduce(function(map1, _ref2, index) {
            const path = _ref2.path;
            map1[''.concat(index)] = [path];
            return map1;
          }, {})
        )
      );

      files.forEach(function(_ref3, index) {
        const file = _ref3.file;
        return body.append(index, file, file.name);
      });

      const newReq = req.clone({
        headers: headers,
        body: body,
        reportProgress: true
      });

      return next.handle(newReq).pipe(
        map((event: any) => {
          this.uploadService.setPercent(event);
          return event;
        })
      );
    }

    return next.handle(req);
  }
}
