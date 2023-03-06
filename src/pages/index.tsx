import Head from 'next/head'
import { NextPage } from 'next'
import { MapComponent } from '@/features/cemeteryMap/components/MapComponent'
import { NumberSelectorWidget } from '@/features/tombNumberSelector/components/numberSelectorWidget'

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tokyo Cemeteries Map</title>
      </Head>
      <main className='w-full h-screen static'>
        <MapComponent />
        <div className='absolute top-0 left-0 max-h-full max-w-96 p-8'>
          <NumberSelectorWidget />
        </div>
      </main>
    </>
  )
}

export default IndexPage
