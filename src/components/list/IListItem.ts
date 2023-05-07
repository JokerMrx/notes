import { INote } from "../../models/INote";

export interface IProps {
  notes: Array<INote>;
  selectNote: Function;
}