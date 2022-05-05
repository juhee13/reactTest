import propTypes from "prop-types";
import Head from "next/head";
import wrapper from "../store/configureStore";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LayoutHeader from "../components/LayoutHeader";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <title>타이틀!</title>
      </Head>
        <LayoutHeader />
      <Component />

    </>
  );
};

App.propTypes = {
  Component: propTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
