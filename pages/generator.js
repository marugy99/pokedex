import { useState } from "react";

const Generator = () => {

    const [initialPokemon, setInitialPokemon] = useState(null)
    const [image, setImage] = useState(null)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const fetchData = async () => {

        try {
            setIsRefreshing(true)
            
            // Generate a random id number
            const id = Math.floor((Math.random() + 1) * (150))
    
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        
            const data = await res.json()
    
            setInitialPokemon(data)

            setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${('00' + data.id).slice(-3)}.png`)

            setIsRefreshing(false)
            
        } catch (error) {
            
            console.log(error)
            
        }
    }
    
    const generatePokemon = () => {
        fetchData()
    }

    return ( 
        
        <section className='text-center'>
            <h1 className='text-4xl my-4'>Pokemon Generator</h1>
            <button onClick={generatePokemon} className='bg-blue-800 text-white p-2 rounded-lg my-4 hover:opacity-80'>Generate Pokemon</button>

            {isRefreshing && <p className='text-2xl font-bold py-4'>Loading...</p>}
            
            {initialPokemon && !isRefreshing && <div>

                <img src={image} className='mx-auto w-1/4'/>
                <h2 className='capitalize text-3xl mt-6'>{initialPokemon.name}</h2>

            </div>}

        </section>
     );
}
 
export default Generator;
