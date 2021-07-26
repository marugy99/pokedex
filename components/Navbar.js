import Link from 'next/link'

const Navbar = () => {
    return ( 
        <nav className='w-full text-center py-4 font-bold text-blue-800 bg-gray-300 fixed'>

            <Link href='/'>
                <a className='hover:text-blue-600'>Home</a>
            </Link>

            <Link href='/generator'>
                <a className='ml-6 hover:text-blue-600'>Generator</a>
            </Link>
            
        </nav>
     );
}
 
export default Navbar;