import { useEffect, useState } from 'react'
import axios from 'axios'

const Pokemon = (props) => {

    const [data, setData] = useState()

    useEffect(() => {
        getPokemon(props.match.params.id)
    }, [])


    const getPokemon = (pokemonID) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`).then(data => setData(data.data))
    }

    return (
        <div>
            {data ? <div>
                <p>{data.name}</p>
                <p>height: {data.height}</p>
                <div>
                    <img alt="back-default" src={data.sprites.back_default} />
                    <img alt="back-default" src={data.sprites.back_shiny} />
                    <img alt="back-default" src={data.sprites.front_default} />
                    <img alt="back-default" src={data.sprites.front_shiny} />
                </div>

            </div> : null}
        </div>
    )
}

export default Pokemon