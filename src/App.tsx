import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

import SearchBox from "./components/searchbox/SearchBox";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.buttons}>
          <button className=""><AiOutlinePlus/></button>
          <button className=""><RiDeleteBin6Line/></button>
          <button className=""><FiEdit/></button>

        </div>
        <div className={styles.search}>
          <SearchBox/>
        </div>
      </header>
    </div>
  );
}

export default App;