const cleanerApiInfo = (array) => {
    return array.map((country) => {
        return {
            id: country.cca3,
            name: country.name.common,
            flag: country.flags.svg,
            continent: country.continents[0],
            //capital: Array.isArray(country.capital) ? country.capital[0] : "Capital doesnt exist", //country.capital,
            capital: country.capital ? country.capital[0] : 'Capital doesnt exist',
            subregion: country.subregion ? country.subregion : "Subregion doesnt exist",
            area: country.area,
            population: country.population ? country.population : 'No data.',
        };
    });
};

module.exports = { cleanerApiInfo };