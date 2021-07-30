const Pokemon = ({ pokeman }) => {

    const {height, weight, name} = pokeman

    return (
        <article className='text-center text-gray-800'>
            <h1 className='capitalize text-4xl mt-6 font-bold'>{name}</h1>

            <img src={pokeman.sprites.other["official-artwork"]["front_default"]} alt={name} className='mx-auto w-1/4 pt-6'/>

            <p><span className='font-bold'>Height: </span>{height / 10} {height / 10 === 1 ? 'meter' : 'meters'}</p>
            <p><span className='font-bold'>Weight: </span>{weight / 10} kilograms</p>

            <p className='font-bold mt-4'>Types:</p>
            <ul>
                {pokeman.types.map((type, index) => (
                    <li key={index} className='capitalize'>
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