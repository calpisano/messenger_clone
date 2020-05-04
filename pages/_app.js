import '../global-styles.css' //example global import

//bootstrap stuff
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css' //bootstrap global import


export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
  }