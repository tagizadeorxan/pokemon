import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import './home.css'


const Home = () => {

    const [data, setData] = useState([])
    const [offset, setOffset] = useState(0)
    const [pokemons, setPokemons] = useState(JSON.parse(localStorage.getItem("pokemons")))
    const [direction, setDirection] = useState("All")

    useEffect(() => {
        getPokemons()
    }, [])


    const getPokemons = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`).then(data => setData(data.data.results))
    }

    const addToFavorites = (pokemon) => {
        let result = localStorage.getItem('pokemons')
        let dataPokemons = []
        if (result) {
            dataPokemons = JSON.parse(result)
            dataPokemons.push(pokemon.name)
        } else {
            dataPokemons.push(pokemon.name)
        }

        localStorage.setItem("pokemons", JSON.stringify(dataPokemons))
        setPokemons(dataPokemons)
    }

    const removeFromFavorites = (pokemon) => {
        let result = JSON.parse(localStorage.getItem('pokemons'))
        let dataPokemons = result.filter(e => e !== pokemon.name)
        localStorage.setItem("pokemons", JSON.stringify(dataPokemons))
        setPokemons(dataPokemons)
    }

    const changeType = (e) => {
        switch (e.target.value) {
            case "Favorites":
                setDirection("Favorites")
                let newData = []
                data.map(e => {
                    if (pokemons.indexOf(e.name) !== -1) {
                        newData.push(e)
                    }
                    return e
                })
                setData(newData)
                break;
            case "All":
                setDirection("All")
                getPokemons()
                break;
            default:
                break;
        }
    }


    const changePage = (direction) => {
        switch (direction) {
            case 'prev':
                if (offset > 0) {
                    setOffset(offset - 20)
                    getPokemons()
                }

                break;
            case 'next':
                console.log("next")
                setOffset(offset + 20)
                getPokemons()
                break;
            default:
                break;
        }
    }

    return (
        <div className="pokemons-container">
            <select onChange={changeType}>
                <option>All</option>
                <option>Favorites</option>
            </select>
            <section className="pokemons">
                {data && data.length ? data.map((pokemon, index) => <div key={index}>
                    <p>{pokemon.name}</p>
                    <img alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.url.split("/")[6]}.png`} />
                    <NavLink to={`/${pokemon.url.split("/")[6]}`}>more info..</NavLink>
                    {pokemons && pokemons.indexOf(pokemon.name) !== -1 ? <button onClick={() => removeFromFavorites(pokemon)}>remove from favorite</button> : <button onClick={() => addToFavorites(pokemon)}>add to favorite ♡</button>}
                </div>) : null}
            </section>


            {direction === "All" ? <div>
                <button onClick={() => changePage('prev')}>previous</button>
                <button onClick={() => changePage('next')}>next</button>
            </div> : null}

        </div>
    )
}

export default Home