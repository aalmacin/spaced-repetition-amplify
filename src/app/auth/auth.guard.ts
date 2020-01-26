import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser } from '@spaced-repetition/reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(select(selectUser)).pipe(
      map(user => {
        if (user) {
          return true;
        }

        this.router.navigate(['/auth', 'signin']);
        return false;
      })
    );
  }
}
