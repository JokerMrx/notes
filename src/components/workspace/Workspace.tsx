import { FC } from "react";

import { IProps } from "./IWorkspace";

import styles from "./Workspace.module.scss";

const Workspace: FC<IProps> = ({ note }) => {
  return (
    <div className={styles.container}>
      <p className={styles.date}>{note.date}</p>
      <textarea className={styles.workspace} value={note.text} />
    </div>
  );
};

export default Workspace;