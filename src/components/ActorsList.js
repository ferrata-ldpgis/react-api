import axios from "axios";
import { useEffect, useState } from "react";
import Card from "@/components/Card"

const apiUrlActors = "https://lanciweb.github.io/demo/api/actors/";
const apiUrlActresses = "https://lanciweb.github.io/demo/api/actresses/";

export default function ActorsList() {

   const [actors, setActors] = useState([]); 
   const [search, setSearch] = useState(""); // stato per la ricerca

    function clearDati() {
		setActors([]);
	}

	function getDati(apiUrl) { 
        apiUrl = apiUrl || apiUrlActors; //se non viene passato un url, usa quello di default
        axios.get(apiUrl).then(r => {
			console.log("Risposta", r.data);

            const data = r.data; //dati del server per come li incapsula axios
            setActors(data);
        
		}).catch(e => {
			console.log("Errore", e.message)
		});
    }
    
    // Se search è vuoto => mostra tutti, altrimenti filtra
    const displayedActors = search
        ? actors.filter(actor => {
            const movies = actor.known_for || actor.most_famous_movies || [];
            return (
            actor.name.toLowerCase().includes(search.toLowerCase()) ||
            movies.some(movie => movie.toLowerCase().includes(search.toLowerCase()))
            );
        })
        : actors; // default: tutti

    useEffect(getDati, []);

    return <div className="componente">
        <button onClick={clearDati}>Svuota</button>
		<button onClick={() => getDati(apiUrlActors)}>Actors</button>
        <button onClick={() => getDati(apiUrlActresses)}>actresses</button>

        {/* input di ricerca */}
        <input
            type="text"
            placeholder="Cerca un attore..."
            value={search}
            onChange={e => setSearch(e.target.value)}
        />

		<div className="characters-list">
			{displayedActors.map(actor =>
				<Card key={actor.id} 
                    name={actor.name} 
                    birth_year={actor.birth_year} 
                    nationality={actor.nationality} 
                    biography={actor.biography} 
                    known_for={
                        actor.known_for ||
                        actor.most_famous_movies ||
                        []
                    }
                    image={actor.image} 
                />
			)}
		</div>
	</div>
}