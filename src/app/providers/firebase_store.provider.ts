import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStoreProvider {
  constructor(private readonly firestore: Firestore) {}

  public getCollection(col: string) {
    return collectionData(collection(this.firestore, col));
  }

  public saveDoc(col: string, doc: any) {
    return addDoc(collection(this.firestore, col), doc);
  }
}
