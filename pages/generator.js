import { useState } from "react";
import Image from 'next/image'

const Generator = () => {

    const [initialPokemon, setInitialPokemon] = useState(null)
    const [image, setImage] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const fetchData = async () => {

        try {
            setIsRefreshing(true)
            
            // Generate a random id number
            const id = Math.floor(Math.random() * 151)

            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        
            const data = await res.json()
    
            setInitialPokemon(data)

            setImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`)

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

            <div className='flex justify-center'>
                <Image src='/pokebola.svg' alt='pokeball logo' width={30} height={30}/>
                <h1 className='text-2xl sm:text-4xl my-4 ml-2 text-gray-800 font-bold'>Pokemon Generator</h1>
            </div>

            <button onClick={generatePokemon} className='bg-green-700 text-white p-2 rounded-lg my-4 hover:opacity-80 focus:ring focus:outline-none'>Generate Pokemon</button>

            {isRefreshing && <p className='text-lg sm:text-2xl font-bold py-4'>Loading...</p>}
            
            {initialPokemon && !isRefreshing && <div>

                <h2 className='capitalize text-xl sm:text-3xl mt-6 text-gray-800 font-bold'>{initialPokemon.name}</h2>
                <div className='max-w-sm mx-auto max-h-10'>
                    <img src={image}/>
                </div>

            </div>}

        </section>
     );
}
 
export default Generator;
