import { useContext } from "react";

import { Context } from "../../context/context";

import { INote } from "../../models/INote";
import { IContext } from "../../context/IContext";
import { getDate } from "../../utils/date";

import styles from "./ListItem.module.scss";

const COUNT_SYMBOLS = 15;

const ListItem = () => {
  const { allNotes, searchNotes, selectNote } = useContext(Context) as IContext;

  const renderList = (arrNotes: Array<INote> | null) => {
    return arrNotes?.map((note, index) => {
      const subTitle = note.content.indexOf('\n') !== -1 ? note.content.split('\n')[1]?.slice(0, COUNT_SYMBOLS) : note.content?.slice(0, COUNT_SYMBOLS);

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
            <p>{subTitle}</p>
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