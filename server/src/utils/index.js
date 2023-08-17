const cleanerApiInfo = (array) => {
    return array.map((country) => {
        return {
            nombre: country.name.common,
            bandera: country.flags.png,
            continente: country.continents[0],
            capital: Array.isArray(country.capital) ? country.capital[0] : country.capital,
            subregion: country.subregion,
            area: country.area,
            poblacion: country.population,
            created: false,
        };
    });
};

module.exports = { cleanerApiInfo };