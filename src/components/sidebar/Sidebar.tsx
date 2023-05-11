import ListItem from "../list/ListItem";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <ListItem/>
    </div>
  )
}

export default Sidebar