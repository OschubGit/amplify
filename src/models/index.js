// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Tareas, Note } = initSchema(schema);

export {
  Tareas,
  Note
};