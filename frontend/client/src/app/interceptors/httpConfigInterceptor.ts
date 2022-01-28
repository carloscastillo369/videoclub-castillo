import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

//NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getToken } from 'src/app/state/auth/auth.selector';


@Injectable({
  providedIn: 'root'
})
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req = request;
    return this.store.select(getToken).pipe(
      take(1),
      exhaustMap((token) => {
        if(!token) {
          return next.handle(req);
        }
        let modifiedReq = req.clone({
          headers: request.headers.set('Authorization', token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
