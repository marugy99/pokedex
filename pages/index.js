  export default function Home({ pokemon }) {
    return (
      <>
        <h1 className='text-4xl text-center mt-4'>Pokedex by Maru</h1>

        {pokemon.map((poke, index) => (

          <div key={poke.name} className='flex justify-center items-center gap-12 bg-gray-100 my-6 rounded-lg w-3/5 mx-auto hover:shadow-lg'>

            <div>
              <span className='font-bold'>{index + 1 + '. '}</span><h2 className='capitalize inline'>{poke.name}</h2>
            </div>

            <img src={poke.image} alt={poke.name} className='w-1/4'/>

          </div>
        ))}
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

