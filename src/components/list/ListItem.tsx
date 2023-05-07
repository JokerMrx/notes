import { useContext } from "react";

import { Context } from "../../context/context";

import { INote } from "../../models/INote";
import { getDate } from "../../utils/date";

import styles from "./ListItem.module.scss";

const COUNT_SYMBOLS = 15;

const ListItem = () => {
  const { allNotes, searchNotes, selectNote } = useContext<{
    allNotes: Array<INote>;
    searchNotes: Array<INote>;
    selectNote: Function;
  }>(Context);

  const renderList = (arrNotes: Array<INote>) => {
    return arrNotes?.map((note, index) => {
      return (
        <div
          className={styles.note}
          key={index}
          onClick={() => selectNote(note)}
        >
          <div className={styles.title}>
            <h3>{note.title}</h3>
          </div>
          <div className={styles.info}>
            <p>{getDate(note.date)}</p>
            <p>{note.text.slice(0, COUNT_SYMBOLS)}</p>
          </div>
        </div>
      );
    });
  };
  return (
    <div className={styles.notes}>{renderList(searchNotes || allNotes)}</div>
  );
};

export default ListItem;