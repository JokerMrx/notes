import { INote } from "../models/INote"

export interface IContext {
    note: INote | null,
    allNotes: Array<INote> | null,
    searchNotes: INote[] | null;
    isEdit: boolean
    setNote: Function,
    setIsEdit: Function,
    selectNote: Function,
    setAllNotes: Function,
    setSearchNotes: Function,
}