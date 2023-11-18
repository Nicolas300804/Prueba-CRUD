// formValidations.js

export const validatePokemonName = (name) => {
    if (!name.trim()) {
      return 'El nombre del Pokémon no puede estar vacío.';
    }
    return null;
  };
  
  export const validatePokemonHP = (hp) => {
    const numericValue = Number(hp);
    if (isNaN(numericValue) || numericValue <= 0) {
      return 'HP debe ser un número positivo.';
    }
    return null;
  };
  
  export const validatePokemonHeight = (height) => {
    const numericValue = Number(height);
    if (isNaN(numericValue) || numericValue <= 0) {
      return 'La altura debe ser un número positivo.';
    }
    return null;
  };
  