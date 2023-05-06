export interface INote {
  title: string;
  date: string;
  text: string;
}

export interface IProps {
  notes: Array<INote>;
}