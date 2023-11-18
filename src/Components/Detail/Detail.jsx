// Importa las dependencias necesarias
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import style from "./Detail.module.css"

const Detail = () => {
  const { id } = useParams();
  const [pokemonDetailsAPI, setPokemonDetailsAPI] = useState(null);
  const [pokemonDetailsDB, setPokemonDetailsDB] = useState(null);

  useEffect(() => {
    const fetchPokemonDetailsAPI = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemonDetailsAPI(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon details from API:', error);
      }
    };

    const fetchPokemonDetailsDB = async () => {
      try {
        const db = getFirestore();
        const pokemonDocRef = doc(db, 'pokemons', id);
        const pokemonDoc = await getDoc(pokemonDocRef);

        if (pokemonDoc.exists()) {
          // Si el documento existe, actualiza el estado con los detalles del Pokémon de la DB
          setPokemonDetailsDB(pokemonDoc.data());
        } else {
          console.log('No se encontró el Pokémon en la DB.');
        }
      } catch (error) {
        console.error('Error fetching Pokémon details from DB:', error);
      }
    };

    // Llama a ambas funciones de obtención de detalles
    fetchPokemonDetailsAPI();
    fetchPokemonDetailsDB();
  }, [id]);

  // Muestra los detalles del Pokémon
  return (
    <div className={style.detailmain}>
      <h2>Pokémon Details</h2>
      {pokemonDetailsAPI ? (
        <div>
          <p>ID : {pokemonDetailsAPI.id}</p>
          <p>Name : {pokemonDetailsAPI.name}</p>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetailsAPI.id}.png`} className={style.imgdetail} alt="" />
          <p>HP : {pokemonDetailsAPI.stats[0].base_stat}</p>
          <p>Height : {pokemonDetailsAPI.height}</p>
        </div>
      ) : (
        <p>Loading Pokémon details from API...</p>
      )}
      {pokemonDetailsDB ? (
        <div>
          <p>ID (DB): {pokemonDetailsDB.id}</p>
          <p>Name (DB): {pokemonDetailsDB.name}</p>
          {/* Otros detalles de la DB */}
          <Link to={`/edit/${id}`}>
            <button>Editar Pokémon</button>
          </Link>
        </div>
      ) : (
        <p>Loading Pokémon details from DB...</p>
      )}
    </div>
  );
};

export default Detail;
