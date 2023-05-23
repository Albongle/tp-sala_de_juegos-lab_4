import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { Survey } from '../models/survey.model';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private readonly firebaseStoreProvider: FirebaseStoreProvider) {}

  public saveSurveyInStore(survey: Survey) {
    return this.firebaseStoreProvider.saveDoc(
      'encuestas',
      JSON.parse(JSON.stringify(survey))
    );
  }

  public getAllSurveys() {
    return this.firebaseStoreProvider.getCollection('encuestas');
  }
}
