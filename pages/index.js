import Link from 'next/link'
import { useState } from 'react'
  
  export default function Home({ pokemon }) {

    const initialNum = 11;

    const [pokeNum, setPokeNum] = useState(initialNum)
    const [initialPokemon, setInitialPokemon] = useState(pokemon)

    const loadMore = () => {
      setPokeNum(pokeNum + initialNum)
    }

    const filterPoke = (e) => {
      setPokeNum(initialNum)
      const searchString = e.target.value.toLowerCase()
      const filteredPoke = pokemon.filter(poke => poke.name.toLowerCase().includes(searchString))
      setInitialPokemon(filteredPoke)
    }

    return (
      <>
        <div className='flex justify-center mt-2'>
          <img src='/pokebola.svg' alt='pokeball logo' className='w-7 h-7 sm:w-10 sm:h-10 mt-1'/>
          <h1 className='text-3xl sm:text-5xl text-center text-gray-800 font-bold ml-2'>Pokédex</h1>
        </div>
        <p className='text-center pt-2 text-gray-600 ml-3 sm:text-lg'>Made by <a href='https://github.com/marugy99' target='_blank' className='underline hover:opacity-80'>Maru</a></p>

        <input
                type="text"
                name="searchBar"
                id="searchBar"
                placeholder="Search for a Pokémon"
                className='border border-gray-200 p-2 block mx-auto sm:w-3/5 w-full my-4 rounded-lg shadow-md focus:ring focus:outline-none'
                onKeyUp={filterPoke}
            />

        <ul className='grid sm:grid-cols-3 gap-6 pb-6'>
          
          {initialPokemon.slice(0, pokeNum).map((poke, index) => (

            <Link href={`/pokemon/${poke.name}`}>

              <a className='focus:ring focus:outline-none rounded-lg p-0 transform hover:translate-y-1.5 transition-transform duration-500 ease-in-out relative'>

                <li key={index} className='bg-gray-100 rounded-lg w-full sm:w-auto mx-auto py-6 shadow-md flex flex-col items-center transition hover:bg-green-50'>
                  
                  <span className='font-bold text-gray-300 absolute text-5xl md:text-7xl left-4 top-2'>{poke.id}</span>
                  
                  <img src={poke.image} alt={poke.name} className='sm:w-6/12 w-3/12 z-10'/>

                  <div><h2 className='capitalize inline font-bold text-xl sm:text-2xl text-gray-800'>{poke.name}</h2></div>

                </li>
              </a>

            </Link>              
          ))}

        </ul>

        {/* Show load more btn if: 
            - the pokemon array is greater than 0
            - the pokemon number shown is NOT greater than or equal to the pokemon array
            - the pokemon number shown is NOT greater than or equal to 151 */}

        {initialPokemon.length > 0 && !(pokeNum >= initialPokemon.length) && !(pokeNum >= 151) && <button onClick={loadMore} className="block bg-green-700 py-2 mx-auto rounded-lg w-36 text-white hover:opacity-80 focus:ring focus:outline-none">Load More</button>}
        {initialPokemon.length <= 0 && <p className='text-center text-gray-800'>No results found!</p>}
        <br />
      </>
    )
  }


  export async function getStaticProps(context) {

    try {

      // Fetch request to the Pokemon API
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')

      // Destructure results 
      const {results} = await res.json()

      // Map through the results, getting each individual result and the index
      const pokemon = results.map((result, index) => {

        // Create id
        const id = index + 1

        // Grab image
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

        // Return an object with all the properties of the result (the name and url), image and id
        return {
          ...result,
          image,
          id
        }
      })
      // Return the pokemon constant
      return {
        props: { pokemon } // will be passed to the page component as a prop
      }

    } catch (err) {
      console.log(err)
    }
        
  }

