import { useState } from "react";

import styles from "./SearchBox.module.scss";

const PLACEHOLDER = "\uf002 Search";

const SearchBox = () => {

    const [isFocus, setIsFocus] = useState<boolean>(false);
    

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder={!isFocus ? PLACEHOLDER : ""}
        className={`fas ${styles.inpSearch}`}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </div>
  );
};

export default SearchBox;