// pages/_app.js
import "swagger-ui-react/swagger-ui.css";
import "../styles/swagger-modern.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}