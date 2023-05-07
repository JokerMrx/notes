import { INote } from "../models/INote";

export class IndexedDB {
  DB: any;
  transaction: any;
  store: any;

  constructor() {
    this.DB =
      window.indexedDB ||
      (window as any).mozIndexedDB ||
      (window as any).webkitIndexedDB ||
      (window as any).msIndexedDB ||
      (window as any).shimIndexedDB;
    this.transaction =
      window.IDBTransaction || (window as any).webkitIDBTransaction;
  }

  createCollection(dbName: string, storeName: string) {
    if (!this.DB) {
      console.log("This browser doesn support IndexedDB");
      return;
    }

    console.log(this.DB);

    const request = this.connectDB(dbName);

    request.onerror = (e: any) => {
      console.log("Error", e);
      console.log("An error occured with IndexedDB");
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      console.log({ db });
      db.onerror = () => {
        alert("Throw new Error");
        throw new Error("Failed to create object store");
      };

      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, {
          keyPath: "id",
        });
      }
    };

    request.onsuccess = () => {
      console.log("Database opened successfuly");
    };
  }

  connectDB(nameDatabase: string, dbVersion: number = 1) {
    return this.DB.open(nameDatabase, dbVersion);
  }

  saveNote(dbName: string, storeName: string, note: INote) {
    const openDB = this.connectDB(dbName);

    openDB.onsuccess = () => {
      const db = openDB.result;
      const tx = db.transaction(storeName, "readwrite");

      const noteData = tx.objectStore(storeName);

      const notes = noteData.put(note);

      notes.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();
        };
      };

      notes.onerror = (event: any) => {
        console.log({ event });
        alert("Error!");
      };
    };
  }

  getAllNotes(dbName: string, storeName: string, register: Function) {
    const request = this.connectDB(dbName);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const notesData = tx.objectStore(storeName);
      const notes = notesData.getAll();

      notes.onsuccess = (query: any) => {
        register(query.srcElement.result);
      };

      notes.onerror = () => {
        alert("Error! Get notes.");
      };

      tx.oncomplete = () => {
        db.close();
      };
    };
  }

  deleteNote(dbName: string, storeName: string, id: string) {
    const openDB = this.connectDB(dbName);

    openDB.onsuccess = () => {
      const db = openDB.result;
      const tx = db.transaction(storeName, "readwrite");

      const noteData = tx.objectStore(storeName);

      const notes = noteData.delete(id);

      notes.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();
        };
      };

      notes.onerror = (event: any) => {
        console.log({ event });
        alert("Error!");
      };
    };
  }
}