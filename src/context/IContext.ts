import { INote } from "../models/INote"

export interface IContext {
    note: INote | null,
    setNote: Function,
    isEdit: boolean
    setIsEdit: Function,
    allNotes: Array<INote> | null,
    selectNote: Function
}