import axios from "axios";

// Base da URL: https://api.themoviedb.org/3/
// URL da API: /movie/now_playing?api_key=525de608a9027a0ed36ab83390653bef&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;