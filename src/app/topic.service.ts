import { Injectable } from '@angular/core';
import { Topic } from './topic';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  public getTopics(): Observable<Topic[]> {
    return of([{ id: 1, name: 'Science' }, { id: 2, name: 'Math' }, { id: 3, name: 'TypeScript' }]);
  }
}
