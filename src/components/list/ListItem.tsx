import { FC } from "react";

import { IProps } from "./IListItem";

import styles from "./ListItem.module.scss";

const ListItem: FC<IProps> = ({ notes }) => {
  return (
    <div className={styles.notes}>
      {notes?.map(({ title, date, text }, index) => {
        return (
          <div className={styles.note} key={index}>
            <div className={styles.title}>
              <h3>{title}</h3>
            </div>
            <div className={styles.info}>
              <p>{date}</p>
              <p>{text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListItem;