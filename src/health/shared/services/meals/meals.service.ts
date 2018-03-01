import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService {

  meals$: Observable<any> = this.authState
    .switchMap(user => (user
      ? this.db.list(`meals/${user.uid}`)
          .do(next => this.store.set('meals', next))
      : []
    ));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  get authState() {
    return this.authService.authState;
  }

  getMeal(key: string) {
    if (!key) {
      return Observable.of({});
    }
    return this.store.select<Meal[]>('meals')
      .filter(Boolean)
      .map(meals => meals.find((meal: Meal) => meal.$key === key));
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}