import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
  
  export default function Home({ pokemon }) {

    const [initialPokemon, setInitialPokemon] = useState(pokemon)

    const filterPoke = (e) => {
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
          
          {initialPokemon.map((poke, index) => (

            <li key={index} className='bg-gray-100 rounded-lg w-full sm:w-auto mx-auto py-6 hover:shadow-lg'>

              <Link href={`/pokemon/${poke.name}`}>

                <a className='flex flex-col items-center focus:ring focus:outline-none'>
                  <img src={poke.image} alt={poke.name} className='sm:w-6/12 w-3/12'/>

                  <div><span className='font-bold text-gray-500'>{index + 1 + '. '}</span><h2 className='capitalize inline font-bold text-xl sm:text-2xl text-gray-800'>{poke.name}</h2></div>
                </a>
              
              </Link>              

            </li>
          ))}

        </ul>
      </>
    )
  }


  export async function getStaticProps(context) {

    try {

      // Fetch request to the Pokemon API
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')

      // Destructure results 
      const {results} = await res.json()

      // Map through the results, getting each individual result and the index
      const pokemon = results.map((result, index) => {

        // Make a padded index for the image url, adding two zeroes to the index and then using slice to only get the last three digits. Add one to the index because the start at 0
        const paddedIndex = ('00' + (index + 1)).slice(-3)

        // Add the padded index to the image url
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`

        // Return an object with all the properties of the result (the name and url) and the image
        return {
          ...result,
          image
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

