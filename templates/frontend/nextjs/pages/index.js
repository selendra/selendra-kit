import Head from 'next/head'
import WalletConnection from '../components/WalletConnection'

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Selendra dApp</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">
                    Welcome to your Selendra dApp
                </h1>

                <p className="description">
                    Get started by connecting your wallet
                </p>

                <WalletConnection />
            </main>

            <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }

        .description {
          text-align: center;
          line-height: 1.5;
          font-size: 1.5rem;
        }
      `}</style>
        </div>
    )
}