const Pokemon = ({ pokeman }) => {

    const {height, weight, name} = pokeman

    const normalBg = 'bg-gray-400'

    const typeColor = (input) => {
        if (input === 'grass') {
        return 'bg-green-400 text-green-800'
        } else if (input === 'fire') {
            return 'bg-yellow-500 text-yellow-800'
        } else if (input === 'poison') {
            return 'bg-purple-400 text-purple-800'
        } else if (input === 'water') {
            return 'bg-blue-400 text-blue-800'
        } else if (input === 'electric') {
            return 'bg-yellow-400 text-yellow-900'
        } else if (input === 'psychic') {
            return 'bg-pink-400 text-pink-800'
        } else if (input === 'bug') {
            return 'bg-green-500 text-green-800'
        } else if (input === 'flying') {
            return 'bg-indigo-400 text-indigo-800'
        } else if (input === 'fairy') {
            return 'bg-pink-300 text-pink-600'
        } else if (input === 'rock') {
            return 'bg-red-500 text-red-800'
        } else {
            return normalBg
        }
    }

    return (
        <article className='text-center text-gray-800'>
            <h1 className='capitalize text-4xl mt-6 font-bold'>{name}</h1>

            <img src={pokeman.sprites.other["official-artwork"]["front_default"]} alt={name} className='mx-auto w-1/2 sm:w-1/4 pt-6'/>

            <p><span className='font-bold'>Height: </span>{height / 10} {height / 10 === 1 ? 'meter' : 'meters'}</p>
            <p className='mt-2'><span className='font-bold'>Weight: </span>{weight / 10} kilograms</p>

            <p className='font-bold mt-4'>{pokeman.types.length > 1 ? 'Types:' : 'Type:'}</p>
            <ul>
                {pokeman.types.map((type, index) => (
                    <li key={index} className={`capitalize py-1 text-gray-700 w-20 mx-auto my-2 rounded-lg ${typeColor(type.type.name)}`}>
                        {type.type.name}
                    </li>
                ))}
            </ul>
        </article>
    );
}
 
export default Pokemon;

export async function getServerSideProps({ query }) {
    
    const { name } = query

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const pokeman = await res.json()

        return {
            props: { 
                pokeman
            }
        }
    } catch (error) {
        console.log(error)
    }
    
}