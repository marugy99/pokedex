import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
  
  export default function Home({ pokemon }) {

    const initialNum = 11;

    const [pokeNum, setPokeNum] = useState(initialNum)
    const [initialPokemon, setInitialPokemon] = useState(pokemon)

    const loadMore = () => {
      setPokeNum(pokeNum + 11)
    }

    const filterPoke = (e) => {
      setPokeNum(initialNum)
      const searchString = e.target.value.toLowerCase()
      const filteredPoke = pokemon.filter(poke => poke.name.toLowerCase().includes(searchString))
      setInitialPokemon(filteredPoke)
    }

    return (
      <>
        <div className='flex justify-center'>
          <Image src='/pokebola.svg' alt='pokeball logo' width={30} height={30}/>
          <h1 className='text-3xl sm:text-4xl text-center text-gray-800 font-bold ml-2'>Pokedex by Maru</h1>
        </div>

        <input
                type="text"
                name="searchBar"
                id="searchBar"
                placeholder="Search for a Pokemon"
                className='border border-gray-200 p-2 block mx-auto sm:w-3/5 w-full my-4 rounded-lg focus:ring focus:outline-none'
                onKeyUp={filterPoke}
            />

        <ul className='grid sm:grid-cols-3 gap-6 pb-6'>
          
          {initialPokemon.slice(0, pokeNum).map((poke, index) => (

            <li key={index} className='bg-gray-100 rounded-lg w-full sm:w-auto mx-auto py-6 hover:shadow-lg'>

              <Link href={`/pokemon/${poke.name}`}>

                <a className='flex flex-col items-center focus:ring focus:outline-none'>
                  <img src={poke.image} alt={poke.name} className='sm:w-6/12 w-3/12'/>

                  <div><span className='font-bold text-gray-500'>{poke.id + '. '}</span><h2 className='capitalize inline font-bold text-xl sm:text-2xl text-gray-800'>{poke.name}</h2></div>
                </a>
              
              </Link>              

            </li>
          ))}

        </ul>

        {pokeNum <= 151 && <button onClick={loadMore} className="block bg-green-600 py-2 mx-auto rounded-lg w-36 text-white hover:opacity-80 focus:ring focus:outline-none">Load More</button>}

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

