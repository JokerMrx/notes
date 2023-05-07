import { INote } from "../models/INote";

const DB_NAME = "notes-db";
const STORE_NAME = "notes";
const DB_VERSION = 1;

export class IndexedDB {
  DB: any;
  transaction: any;
  // openDB: any;
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

  createCollection() {
    if (!this.DB) {
      console.log("This browser doesn't support IndexedDB");
      return;
    }

    console.log(this.DB);

    const request = this.connectDB(DB_NAME);

    request.onerror = (e: any) => {
      console.log("Error", e);
      console.log("An error occured with IndexedDB");
    };

    request.onupgradeneeded = () => {
      const db = request.result;
        console.log({db});
      db.onerror = () => {
        alert("Throw new Error");
        throw new Error("Failed to create object store");
      };
      console.log('!ok');
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        console.log('!ok');
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });
      }
    };

    request.onsuccess = () => {
      console.log("Database opened successfuly");
    };
  }

  connectDB(nameDatabase: string) {
    return this.DB.open(nameDatabase, DB_VERSION);
  }

  saveNote(note: INote, isAdd = false) {
    const openDB = this.connectDB(DB_NAME);

    openDB.onsuccess = () => {
      const db = openDB.result;
      const tx = db.transaction(STORE_NAME, "readwrite");

      const noteData = tx.objectStore(STORE_NAME);

      const notes = noteData.put(note);

      notes.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();
          isAdd && alert("Note added");
        };
      };

      notes.onerror = (event: any) => {
        console.log({ event });
        alert("Error!");
      };
    };
  }

  getAllNotes(register: Function) {
    const request = this.connectDB(DB_NAME);

    request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(STORE_NAME, "readonly");
        const notesData = tx.objectStore(STORE_NAME);
        const notes = notesData.getAll();

        notes.onsuccess = (query: any) => {
            register(query.srcElement.result);
        };

        notes.onerror = () => {
            alert("Error! Get notes.");
        }

        tx.oncomplete = () => {
            db.close();
        }
    }
  }

  deleteNote(id: string) {
    const openDB = this.connectDB(DB_NAME);

    openDB.onsuccess = () => {
      const db = openDB.result;
      const tx = db.transaction(STORE_NAME, "readwrite");

      const noteData = tx.objectStore(STORE_NAME);

      const notes = noteData.delete(id);

      notes.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();
          alert("Note deleted");
        };
      };

      notes.onerror = (event: any) => {
        console.log({ event });
        alert("Error!");
      };
    };
  }
}
