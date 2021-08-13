import Link from 'next/link'

const Navbar = () => {
    return ( 
        <nav className='w-full text-center sm:text-lg py-4 font-bold text-green-700 bg-gray-300 fixed top-0 z-10'>

            <Link href='/'>
                <a className='hover:text-green-600 focus:outline-none focus:ring rounded-lg p-2'>Home</a>
            </Link>

            <Link href='/generator'>
                <a className='ml-6 hover:text-green-600 focus:outline-none focus:ring rounded-lg p-2'>Generator</a>
            </Link>
            
        </nav>
     );
}
 
export default Navbar;