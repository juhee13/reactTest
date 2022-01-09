import propTypes from "prop-types";
import Head from "next/head";
import wrapper from "../store/configureStore";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <title>타이틀!</title>
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: propTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
