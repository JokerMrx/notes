export interface INote {
  title: string;
  date: string;
  message: string;
}

export interface IProps {
  notes: Array<INote>;
}