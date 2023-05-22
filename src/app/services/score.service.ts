import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { Score } from '../models/score.model';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor(private readonly firebaseStoreProvider: FirebaseStoreProvider) {}

  public saveScoreWithIdInStore(score: Score) {
    return this.firebaseStoreProvider.saveDoc(
      'scores',
      JSON.parse(JSON.stringify(score))
    );
  }
}
