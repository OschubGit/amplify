import React, {useState, useEffect} from "react";
import './App.css';
import { withAuthenticator, AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { DataStore } from '@aws-amplify/datastore';
import { Tareas } from './models';

function App() {

  const [tareas, setTareas] = useState([])
  const [tarea, setTarea] = useState("")

  React.useEffect(() => {

    const obtenerDatos = async () => {
      // LLAMAMOS A LAS NOTAS
      try {

        const models = await DataStore.query(Tareas);
        /* console.log(models); */
        const arrayData = models.map(item => ({id: item.id, tareas: item.tareas}))
        /* console.log(arrayData) */
        setTareas(arrayData)

      } catch (error) {
        console.log("error llamada")
      }

    }

    obtenerDatos();

  }, []);

  //agregamos tareas a la base de datos
  const agregar = async (e) => {
    e.preventDefault()
    if(!tarea.trim()){
        console.log('sin texto')
        return
    }

    try {
      const nuevaTarea = {
          tareas: tarea,
      }
      const data = await DataStore.save(
        new Tareas({
        "tareas": tarea,
      })
    );
      setTareas([
          ...tareas,
          {...nuevaTarea, id: data.id }
      ])
      /* console.log(setTareas) */

      setTarea('')
  } catch (error) {
      console.log(error)
  }
}

const eliminar = async (id) => {
  try {
    const modelToDelete = await DataStore.query(Tareas, id);
    const arrayFiltrado = tareas.filter(item => item.id !== id);
    console.log(modelToDelete)
    DataStore.delete(modelToDelete);
    setTareas(arrayFiltrado);
    console.log(arrayFiltrado)
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className="App">
      <header className="App-header">
      <AmplifyAuthenticator>
      <h3>Formulario</h3>
        <form onSubmit={agregar}>
          <input 
              type="text" 
              className="form-control mb-2"
              placeholder='Ingrese Tarea'
              value={tarea}
              onChange={e => setTarea(e.target.value)}
          />
          <button 
              type='submit'
              className="btn btn-dark btn-block btn-sm"
          >
              Agregar
          </button>
        </form>

        <h3>Lista de Tareas</h3>
            <ul className="list-group">
            {tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span style={{color: "black"}}>{item.tareas}</span>
                  <button 
                      className="btn btn-danger btn-sm float-right"
                      onClick={() => eliminar(item.id)}
                  >
                      Eliminar
                  </button>
                    <button 
                        className="btn btn-warning btn-sm float-right mr-2"
                    >
                        Editar
                    </button>
                </li>
                ))
            }
            </ul>
      </AmplifyAuthenticator>
      <AmplifySignOut/>
      </header>
    </div>
  );
};

export default withAuthenticator(App)
