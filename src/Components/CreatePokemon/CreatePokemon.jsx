// CreatePokemon.js
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { isValidPokemonName, isValidPokemonStat } from './formValidation';
import Swal from 'sweetalert2';

const firebaseConfig = {
    apiKey: "AIzaSyCoNm86faO7tyMHdf6MyazrG_PrujCY42U",
    authDomain: "pokemon-e3cc7.firebaseapp.com",
    projectId: "pokemon-e3cc7",
    storageBucket: "pokemon-e3cc7.appspot.com",
    messagingSenderId: "137844763123",
    appId: "1:137844763123:web:a5ffec1dcaa2faff694a86",
    measurementId: "G-9ZQXPEHNKM"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

const CreatePokemon = ({ onPokemonCreated }) => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonHP, setPokemonHP] = useState('');
  const [pokemonHeight, setPokemonHeight] = useState('');

  const handleInputChange = (e) => {
    //Desestructura e.target para obtener las propiedades name y value. e.target 
    const { name, value } = e.target;

    //El switch evalúa el valor de name y ejecuta el código correspondiente al caso que coincida. En este caso, hay tres casos posibles: 'name', 'hp', y 'height'.
    switch (name) {
        //Si name es igual a 'name', se llama a setPokemonName(value) para actualizar el estado de pokemonName con el nuevo valor del campo de entrada.
      case 'name':
        setPokemonName(value);
        break;

        //Si name es igual a 'hp', se llama a setPokemonHP(value) para actualizar el estado de pokemonHP.
      case 'hp':
        setPokemonHP(value);
        break;

        //Si name es igual a 'height', se llama a setPokemonHeight(value) para actualizar el estado de pokemonHeight.
      case 'height':
        setPokemonHeight(value);
        break;

        //El default no contiene ninguna acción específica y se utiliza como un caso por defecto si ninguno de los casos anteriores coincide. En este caso, no realiza ninguna acción.
      default:
        break;
    }
  };

  const handleCreatePokemon = async () => {
    // Validaciones antes de crear el Pokémon
    if (!isValidPokemonName(pokemonName)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Nombre de Pokémon no válido, no puede contener numeros',
          });
      return;
    }

    if (!isValidPokemonStat(pokemonHP)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'HP no válido, no puede contener letras',
          });
      return;
    }

    if (!isValidPokemonStat(pokemonHeight)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Altura no válida, no puede contener letras',
          });
        return;
    }

    try {
      const docRef = await addDoc(collection(firestore, 'pokemons'), {
        name: pokemonName,
        hp: pokemonHP,
        height: pokemonHeight,
      });

      // Llama a la función proporcionada desde el componente padre cuando se crea un Pokémon
      onPokemonCreated({ id: docRef.id, name: pokemonName, hp: pokemonHP, height: pokemonHeight });

      // Muestra un alert después de crear el Pokémon
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: '¡Pokémon creado con éxito!',
      });
    } catch (error) {
      console.error('Error creating Pokémon:', error);
    }
  };

  

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form>
            <div className="mb-3">
              <label htmlFor="pokemonName" className="form-label">
                Pokemon Name:
              </label>
              <input
                type="text"
                className={`form-control ${isValidPokemonName(pokemonName) ? 'is-valid' : 'is-invalid'}`}
                id="pokemonName"
                name="name"
                value={pokemonName}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">Nombre de Pokémon no válido, no puede contener numeros</div>
            </div>
            <div className="mb-3">
              <label htmlFor="pokemonHP" className="form-label">
                HP:
              </label>
              <input
                type="text"
                className={`form-control ${isValidPokemonStat(pokemonHP) ? 'is-valid' : 'is-invalid'}`}
                id="pokemonHP"
                name="hp"
                value={pokemonHP}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">HP no válido, no puede contener letras</div>
            </div>
            <div className="mb-3">
              <label htmlFor="pokemonHeight" className="form-label">
                Height:
              </label>
              <input
                type="text"
                className={`form-control ${isValidPokemonStat(pokemonHeight) ? 'is-valid' : 'is-invalid'}`}
                id="pokemonHeight"
                name="height"
                value={pokemonHeight}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">Altura no válida, no puede contener letras</div>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleCreatePokemon}>
              Create Pokemon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePokemon;
