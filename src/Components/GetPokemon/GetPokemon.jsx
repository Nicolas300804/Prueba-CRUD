import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import axios from "axios";
import style from "./GetPokemon.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const Getpokemons = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchFirestoreData = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "pokemons"));

      const createdPokemons = [];
      querySnapshot.forEach((doc) => {
        createdPokemons.push({ id: doc.id, isDbPokemon: true, ...doc.data() });
      });

      setPokemonList(createdPokemons);
    };

    fetchFirestoreData();
  }, []);

  const deletePokemon = async (id) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "pokemons", id));
      setPokemonList((prevList) =>
        prevList.filter((pokemon) => pokemon.id !== id)
      );

      // Muestra un alert después de borrar el Pokémon
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "¡Pokémon eliminado con éxito!",
      });
    } catch (error) {
      console.error("Error deleting Pokemon:", error);
    }
  };

  const loadMorePokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=12`
      );

      const apiPokemons = await Promise.all(
        response.data.results.map(async (pokemon, index) => {
          const pokemonDetails = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${index + 1}`
          );
          return {
            id: index + 1,
            name: pokemon.name,
            hp: pokemonDetails.data.stats[0].base_stat,
            height: pokemonDetails.data.height,
          };
        })
      );

      setPokemonList((prevList) => [...prevList, ...apiPokemons]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="container mt-4" className={ style.allpoke}>
      <div className="row" >
        {pokemonList.map((pokemon) => (
          <div key={pokemon.id} className= {`col-md-4 mb-3`}>
            <div className="card">
            <Link to={`/detail/${pokemon.id}`} className="btn btn-primary btn btn-block mt-2 " >
                   Detalles
                </Link>
              <div className={`card-body  ${style.allpoke2}`}>
                <h5 className="card-title">{`ID: ${pokemon.id}`}</h5>
                <p className="card-text">{`Name: ${pokemon.name}`}</p>
                <p className="card-text">{`HP: ${pokemon.hp}`}</p>
                <p className="card-text">{`Height: ${pokemon.height}`}</p>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  className={` ${style.img} `}
                />
                <br />
                {/* <Link to={`/detail/${pokemon.id}`} className="btn btn-primary btn btn-block mt-2 " >
                   Detalles
                </Link>  */}
                <br />
                {pokemon.isDbPokemon && (
                  <button
                    onClick={() => deletePokemon(pokemon.id)}
                    className="btn btn-danger mt-2 ml-25 btn btn-block"
                  >
                    Borrar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <button onClick={loadMorePokemon} className="btn btn-success">
            Cargar más Pokémon de la API
          </button>
        </div>
      </div>
    </div>
  );
};

export default Getpokemons;
