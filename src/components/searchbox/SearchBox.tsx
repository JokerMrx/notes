import { useState, useContext } from "react";

import { Context } from "../../context/context";
import { IContext } from "../../context/IContext";

import styles from "./SearchBox.module.scss";

const PLACEHOLDER = "\uf002 Search";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const {allNotes, setSearchNotes} = useContext(Context) as IContext;
    
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    search 
      ? setSearchNotes(allNotes?.filter((note: any) => note.title.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1))
      : setSearchNotes(null);
    setSearchValue(search);
  }

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder={!isFocus ? PLACEHOLDER : ""}
        className={`fas ${styles.inpSearch}`}
        value={searchValue}
        onChange={handleChangeSearch}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </div>
  );
};

export default SearchBox;