import { useState, useEffect } from "react";
import Character from "./Character";

import "../styles/CharacterList.css"

function NavPage({page, setPage}) {
  return(
    <header className="d-flex justify-content-between align-items-center">
      <p>{`Pages: ${page}`}</p>
      <button className="btn btn-primary btn-sm" onClick={() => setPage(page + 1)}>
        Next Page
      </button>
    </header>
  )
}

export default function CharacterList() {

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      setLoading(false);
      setCharacters(data.results);
    }
    fetchData();
  }, [page]);

  return (
    <div className="container">

      <NavPage page={page} setPage={setPage} />

      {loading ? (
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      ) : (
        <div className="row">
          {characters.map((character) => {
            return (
              <div className="col-md-4" key={character.id}>
              <Character character={character} />
            </div>
            )
          })}
        </div>
      )}

      <NavPage page={page} setPage={setPage} />
    </div>
  );
}
