import React from "react";
import style from "./Landing.module.css"

const Landing = () => {
  return (
    <div className={`${style.imgs} `}>
      <section>
        <img src="https://res.cloudinary.com/dpbrs6n4j/image/upload/v1700342756/1366_2000_oatxl0.jpg" alt="" />
        <img src="https://res.cloudinary.com/dpbrs6n4j/image/upload/v1700342756/wallpapersden.com_pokemon-charizard-mega-charizard-x_1280x720_hjtnph.jpg" alt="" />
        <img src="https://res.cloudinary.com/dpbrs6n4j/image/upload/v1700342756/wallpaperflare.com_wallpaper_1_iilnqi.jpg" alt="" />
        <img src="https://res.cloudinary.com/dpbrs6n4j/image/upload/v1700342756/174003-pokemon_pikachu-detective_pikachu-ash_ketchum-ashs_pikachu-pokmon_ir-1280x720_piww9n.jpg" alt="" />
        <img src="https://res.cloudinary.com/dpbrs6n4j/image/upload/v1700342756/wallpaperflare.com_wallpaper_bnkshe.jpg" alt="" />
      </section>
      
    </div>
  );
};

export default Landing;
