import { useState, useEffect } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

import SearchBox from "./components/searchbox/SearchBox";
import Sidebar from "./components/sidebar/Sidebar";
import Workspace from "./components/workspace/Workspace";
import { INote } from "./models/INote";
import { Context } from "./context/context";
import { IndexedDB } from "./utils/IndexedDB";

import styles from "./App.module.scss";

const DB_NAME = "notes-db";
const STORE_NAME = "notes";
// const DB_VERSION = 1;

const DB = new IndexedDB();
const ACTIVE_COLOR = "#c0bfc0";

function App() {
  const [allNotes, setAllNotes] = useState<INote[] | null>(null);
  const [note, setNote] = useState<INote | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [searchNotes, setSearchNotes] = useState<INote[] | null>(null);

  const isDisableBtn = Boolean(!note);

  useEffect(() => {
    DB.createCollection(DB_NAME, STORE_NAME);
    DB.getAllNotes(DB_NAME, STORE_NAME, setAllNotes);
  }, []);

  useEffect(() => {
    if (!note || !isEdit) return;

    DB.saveNote(DB_NAME, STORE_NAME, note);
    DB.getAllNotes(DB_NAME, STORE_NAME, setAllNotes);
  }, [note, isEdit]);

  const selectNote = (_note: INote) => {
    setNote(_note);
    setIsEdit(false);
  };

  const handleAddNote = () => {
    const dateNow = Date.now().toString();
    DB.saveNote(DB_NAME, STORE_NAME, {
      id: dateNow,
      title: "New Note",
      date: new Date().toString(),
      content: "",
    });
    DB.getAllNotes(DB_NAME, STORE_NAME, setAllNotes);
  };

  const handleDeleteNote = () => {
    const isDelete = window.confirm("You definitely want to delete this note?");

    if (isDelete && note?.id) {
      DB.deleteNote(DB_NAME, STORE_NAME, note.id);
      DB.getAllNotes(DB_NAME, STORE_NAME, setAllNotes);
    }
  };

  return (
    <Context.Provider
      value={{
        note,
        setNote,
        isEdit,
        setIsEdit,
        allNotes,
        setAllNotes,
        selectNote,
        searchNotes,
        setSearchNotes,
      }}
    >
      <div className={styles.container}>
        <header>
          <div className={styles.buttons}>
            <button className={styles.btn} onClick={handleAddNote}>
              <AiOutlinePlus />
            </button>
            <button
              className={isDisableBtn ? styles.disabledBtn : styles.btn}
              disabled={isDisableBtn}
              onClick={handleDeleteNote}
            >
              <RiDeleteBin6Line />
            </button>
            <button
              className={isDisableBtn ? styles.disabledBtn : styles.btn}
              disabled={isDisableBtn}
              style={isEdit ? { backgroundColor: ACTIVE_COLOR } : undefined}
              onClick={() => setIsEdit(!isEdit)}
            >
              <FiEdit />
            </button>
          </div>
          <div className={styles.search}>
            <SearchBox />
          </div>
        </header>
        <main>
          <Sidebar />
          <Workspace />
        </main>
      </div>
    </Context.Provider>
  );
}

export default App;