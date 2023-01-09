import { async } from "q";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import "./filme-info.css"

import api from "../../services/api";

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "525de608a9027a0ed36ab83390653bef",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("Componente foi desmontado")
        }
    }, [navigate, id])

    if(loading){
        return(
            <div className="filme-info">
                <h2>Carregando detalhes...</h2>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinbopse:</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} trailer`} target="_blank" rel="external">
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    );
}

export default Filme;