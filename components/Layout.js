import Head from "next/head";

const Layout = ({ title, children }) => {
    return ( 
        <div className='bg-gray-300'>
            <Head>
                <title>{ title }</title>
            </Head>
            <main className='container mx-auto min-h-screen pt-4 px-4'>
                { children }
            </main>
        </div>
     );
}
 
export default Layout;