import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/context";

import { INote } from "../../models/INote";
import { getDateTime } from "../../utils/date";

import styles from "./Workspace.module.scss";

const COUNT_SYMBOLS = 20;

const Workspace = () => {
  const { note, isEdit, setNote } = useContext(Context);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    setContent(note?.text);
  }, [note]);

  console.log({ note, content });

  const handleChange = (e: any) => {
    if (!e.target) return;
    setContent(e.target.value);
  };

  if (!note) return <h2>Select Note</h2>;

  return (
    <div className={styles.container}>
      <p className={styles.date}>{getDateTime(note!.date)}</p>
      <textarea
        className={styles.workspace}
        disabled={!isEdit}
        value={content}
        onChange={handleChange}
        onBlur={() =>
          setNote((prev: INote) => ({
            ...prev,
            title:
              content.length > COUNT_SYMBOLS ? content.slice(0, COUNT_SYMBOLS) + '...' : content,
            text: content,
          }))
        }
      />
    </div>
  );
};

export default Workspace;
