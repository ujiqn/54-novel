import { AppProps } from 'next/app';
import '../styles/common.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id="wrapper">
      <Component { ...pageProps } />
    </div>
  );
}