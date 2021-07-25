import '/index.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout title='Pokedex by Maru'>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
