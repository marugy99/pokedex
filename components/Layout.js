import Head from "next/head";

const Layout = ({ title, children }) => {
    return ( 
        <>
            <Head>
                <title>{ title }</title>
            </Head>
            <main className='container mx-auto min-h-screen pt-4 px-4 bg-gray-300'>
                { children }
            </main>
        </>
     );
}
 
export default Layout;