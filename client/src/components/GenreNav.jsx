import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../App";

export function GenreNav() {
    
    const [genres, setGenre] =useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`${API_URL}/api/books/genre`);
                const result = await response.json();
                setGenre(result)
            } catch (error) {
                console.log(error);
            }
        };
        fetchGenres();
    }, []);

    return (
        <>
        {genres.map((genre) => {
            return <div key={genre.id}> <Link to={`/books/genre/${genre.id}`}>{genre.name}</Link> </div>
        })}

        </>
    );
}