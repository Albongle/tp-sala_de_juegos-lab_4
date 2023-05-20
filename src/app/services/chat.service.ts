import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from 'src/app/providers/firebase_store.provider';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private readonly firestoreProvider: FirebaseStoreProvider) {}

  public getAllMessages() {
    return this.firestoreProvider.getCollection('mensajes');
  }

  public saveMessage(message: any) {
    return this.firestoreProvider.saveDoc('mensajes', message);
  }
  public setMessageWithId(message: any, id: any) {
    return this.firestoreProvider.saveDoc('mensajes', { id, message });
  }
}
