// formValidation.js
const isValidPokemonName = (name) => {
    // El nombre no puede contener números
    const nameRegex = /^[^\d]+$/;
    return nameRegex.test(name);
  };
  
  const isValidPokemonStat = (stat) => {
    // HP y Height no pueden contener letras
    const statRegex = /^\d+$/;
    return statRegex.test(stat);
  };
  
  export { isValidPokemonName, isValidPokemonStat };
  