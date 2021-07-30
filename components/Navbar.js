import Link from 'next/link'

const Navbar = () => {
    return ( 
        <nav className='w-full text-center py-4 font-bold text-green-700 bg-gray-300 fixed'>

            <Link href='/'>
                <a className='hover:text-green-600 focus:outline-none focus:ring'>Home</a>
            </Link>

            <Link href='/generator'>
                <a className='ml-6 hover:text-green-600 focus:outline-none focus:ring'>Generator</a>
            </Link>
            
        </nav>
     );
}
 
export default Navbar;