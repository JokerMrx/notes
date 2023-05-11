import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/context";

import { INote } from "../../models/INote";
import { IContext } from "../../context/IContext";
import { getDateTime } from "../../utils/date";

import styles from "./Workspace.module.scss";

const COUNT_SYMBOLS = 20;

const Workspace = () => {
  const { note, isEdit, setNote } = useContext(Context) as IContext;
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    note && setContent(note.content);
  }, [note]);

  const handleChange = (e: any) => {
    if (!e.target) return;
    setContent(e.target.value);
  };

  if (!note) return <h2 className={styles.title}>Select Note</h2>;

  const getTitle = (text: string): string => {
    return text.length > COUNT_SYMBOLS ? text.slice(0, COUNT_SYMBOLS) + '...' : text;
  }

  let title: string = ''; 

  if(content.indexOf('\n') !== -1) {
    const copyContent = content;
    const arrContent = copyContent.split('\n')[0];
    title = getTitle(arrContent)
  } else{
    title = getTitle(content);
  }

  return (
    <div className={styles.container}>
      <p className={styles.date}>{note && getDateTime(note.date)}</p>
      <textarea
        className={styles.workspace}
        disabled={!isEdit}
        value={content}
        onChange={handleChange}
        onBlur={() =>
          setNote((prev: INote) => ({
            ...prev,
            title,
            content
          }))
        }
      />
    </div>
  );
};

export default Workspace;