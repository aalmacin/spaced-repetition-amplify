import { Injectable } from '@angular/core';
import { APIService } from '../API.service';
import { map, switchMap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Topic } from './topic';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  public constructor(private apiService: APIService, private userService: AuthService) {}

  public getTopics(): Observable<Topic[]> {
    return this.userService.getCurrentUser().pipe(
      switchMap(user => this.apiService.ListTopics({ user: { eq: user.email } }, 99999)),
      filter((res: any) => res && res.items),
      map((res: any) =>
        res.items.map(item => ({
          id: item.id,
          name: item.name
        }))
      )
    );
  }

  public async addTopic(name: string) {
    const { email } = await this.userService.getCurrentUser().toPromise();
    this.apiService.CreateTopic({
      user: email,
      name
    });
  }
}
