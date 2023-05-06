import { FC } from "react"

import { IProps } from "./ISidebar";

import ListItem from "../list/ListItem";

import styles from "./Sidebar.module.scss";

const Sidebar: FC<IProps> = ({notes}) => {
  return (
    <div className={styles.container}>
      <ListItem notes={notes}/>
    </div>
  )
}

export default Sidebar