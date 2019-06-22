import { Injectable } from '@angular/core';
import { Topic } from './topic';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  public getTopics(): Observable<Topic[]> {
    return of([
      { id: 1, name: 'Philosophy' },
      { id: 2, name: 'Science' },
      { id: 3, name: 'TypeScript' },
      { id: 4, name: 'Biology' },
      { id: 5, name: 'Math' }
    ]);
  }
}
