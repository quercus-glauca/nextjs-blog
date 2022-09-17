import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnLoad"
        onLoad={() =>
          console.log(`Script loaded correctly, window.FB has been populated`)
        }
      />
      <h1>First Post</h1>
      <h2><Link href="/">Back to home</Link></h2>
      <Image
        src="/images/profile.png"
        height={144}
        width={144}
        alt="Quercus Glauca"
      />
    </Layout>
  )
}