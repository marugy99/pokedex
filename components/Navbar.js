import Link from 'next/link'

const Navbar = () => {
    return ( 
        <nav className='w-full text-center sm:text-lg pt-4 pb-3 font-bold text-white bg-green-700 shadow-lg fixed top-0 z-10'>

            <Link href='/'>
                <a className='hover:opacity-80 focus:outline-none focus:ring rounded-lg p-2'>Home</a>
            </Link>

            <Link href='/generator'>
                <a className='ml-6 hover:opacity-80 focus:outline-none focus:ring rounded-lg p-2'>Generator</a>
            </Link>
            
        </nav>
     );
}
 
export default Navbar;