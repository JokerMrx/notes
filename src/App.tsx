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

const DB = new IndexedDB();

function App() {
  const [allNotes, setAllNotes] = useState<INote[] | null>(null);
  const [note, setNote] = useState<INote | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const isDisableBtn = Boolean(!note);

  // console.log({ note, allNotes, isDisableBtn, isEdit });

  useEffect(() => {
    DB.createCollection();
    DB.getAllNotes(setAllNotes);
  }, []);

  useEffect(() => {
    if(!note || !isEdit) return;

    DB.saveNote(note, false);
    DB.getAllNotes(setAllNotes);
  }, [note, isEdit]);

  const selectNote = (_note: INote) => {
    setNote(_note);
  };

  const handleAddNote = () => {
    console.log('add note');
    const dateNow = Date.now().toString();
    DB.saveNote({
      id: dateNow,
      title: "New Note",
      date: new Date().toString(),
      text: "",
    }, true);
    DB.getAllNotes(setAllNotes);
  };

  const handleDeleteNote = () => {
    const isDelete = window.confirm("You definitely want to delete this note?");

    if(isDelete && note?.id) {
      DB.deleteNote(note.id);
      DB.getAllNotes(setAllNotes);
    }
  }

  return (
    <Context.Provider value={{
      note,
      setNote,
      isEdit,
      setIsEdit,
      allNotes,
      selectNote
    }}>
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
        <Sidebar/>
        <Workspace/>
      </main>
    </div>
    </Context.Provider>
  );
}

export default App;