import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  validatePokemonName,
  validatePokemonHP,
  validatePokemonHeight,
} from './formeditPokemonValidate';

const EditPokemon = () => {
  const { id } = useParams();
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonHP, setPokemonHP] = useState('');
  const [pokemonHeight, setPokemonHeight] = useState('');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const db = getFirestore();
        const pokemonDoc = await getDoc(doc(db, 'pokemons', id));

        if (pokemonDoc.exists()) {
          const data = pokemonDoc.data();
          setPokemonName(data.name);
          setPokemonHP(data.hp);
          setPokemonHeight(data.height);
        }
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const handleEditPokemon = async () => {
    const nameError = validatePokemonName(pokemonName);
    const hpError = validatePokemonHP(pokemonHP);
    const heightError = validatePokemonHeight(pokemonHeight);

    if (nameError || hpError || heightError) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        html: `${nameError ? nameError + '<br>' : ''}${hpError ? hpError + '<br>' : ''}${heightError ? heightError : ''}`,
      });
      return;
    }

    try {
      const db = getFirestore();
      const pokemonRef = doc(db, 'pokemons', id);

      await updateDoc(pokemonRef, {
        name: pokemonName,
        hp: pokemonHP,
        height: pokemonHeight,
      });

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: '¡Pokémon editado con éxito!',
      });
    } catch (error) {
      console.error('Error editing Pokémon:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Editar Pokémon</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="editPokemonName" className="form-label">Nombre del Pokémon:</label>
          <input
            type="text"
            id="editPokemonName"
            className="form-control"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="editPokemonHP" className="form-label">HP:</label>
          <input
            type="text"
            id="editPokemonHP"
            className="form-control"
            value={pokemonHP}
            onChange={(e) => setPokemonHP(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="editPokemonHeight" className="form-label">Altura:</label>
          <input
            type="text"
            id="editPokemonHeight"
            className="form-control"
            value={pokemonHeight}
            onChange={(e) => setPokemonHeight(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleEditPokemon}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditPokemon;
