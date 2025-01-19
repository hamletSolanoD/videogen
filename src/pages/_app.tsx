import { trpc } from '../utils/trpc';
import { AppProps } from 'next/app';
import '../app/globals.css'; 


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default trpc.withTRPC(MyApp);