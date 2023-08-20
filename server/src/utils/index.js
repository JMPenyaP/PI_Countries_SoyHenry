const cleanerApiInfo = (array) => {
    return array.map((country) => {
        return {
            id: country.cca3,
            nombre: country.name.common,
            bandera: country.flags.png,
            continente: country.continents[0],
            //capital: Array.isArray(country.capital) ? country.capital[0] : "Capital doesnt exist", //country.capital,
            capital: country.capital ? info.capital[0] : 'Capital doesnt exist',
            subregion: country.subregion ? country.subregion : "Subregion doesnt exist",
            area: country.area,
            poblacion: country.population,
            created: false,
        };
    });
};

module.exports = { cleanerApiInfo };