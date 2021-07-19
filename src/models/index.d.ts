import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TareasMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type NoteMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Tareas {
  readonly id: string;
  readonly tareas?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Tareas, TareasMetaData>);
  static copyOf(source: Tareas, mutator: (draft: MutableModel<Tareas, TareasMetaData>) => MutableModel<Tareas, TareasMetaData> | void): Tareas;
}

export declare class Note {
  readonly id: string;
  readonly note?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Note, NoteMetaData>);
  static copyOf(source: Note, mutator: (draft: MutableModel<Note, NoteMetaData>) => MutableModel<Note, NoteMetaData> | void): Note;
}