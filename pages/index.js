export default function Home({ pokemon }) {
  return (
    <>
      <h1 className='text-4xl text-center mt-4'>Pokedex by Maru</h1>

      {pokemon.map(poke => (
        <div key={poke.name}>
          <img src={poke.image} alt={poke.name} />
          <h2>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h2>
        </div>
      ))}
    </>
  )
}


export async function getStaticProps(context) {

  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')

    const {results} = await res.json()

    const pokemon = results.map((result, index) => {

    const paddedIndex = ('00' + (index + 1)).slice(-3)

    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`

      return {
        ...result,
        image
      }
    })

    return {
      props: { pokemon } // will be passed to the page component as a prop
    }

  } catch (err) {
    console.log(err)
  }
      
}

