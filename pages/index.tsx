import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>spotify 2.0</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <h1>this is a DOPE spotify 2.0 build</h1>

      <main>
        <Sidebar />
        {/* Center */}
      </main>

      <div>{/* Player */}</div>
    </div>
  )
}
