import { Component, OnInit } from '@angular/core';
import { AppState } from './reducers';
import { Store } from '@ngrx/store';
import { LoadApplication } from './app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadApplication());
  }
}
