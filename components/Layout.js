import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ title, children }) => {
    return ( 
        <div className='bg-gray-300'>
            <Navbar />
            <Head>
                <title>{ title }</title>
            </Head>
            <main className='container mx-auto min-h-screen pt-14 px-4'>
                { children }
            </main>
        </div>
     );
}
 
export default Layout;