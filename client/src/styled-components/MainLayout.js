import React from "react";
import { Global, css } from "@emotion/react/macro";
//import Helmet from "react-helmet";
//import Header from "./header";
//import Footer from "./footer";

const Layout = ({ children }) => {

  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
          }

          html,
          body {
            margin: 0;
            width: 100vw;
            overflow-x: hidden;
            background-color: #848FA5;
            color: #555;
            font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-size: 18px;
            line-height: 1.4;

            /* remove margin for main div that Gatsby mounts into */
            line-height > div {
              margin-top: 0;
            }
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: black;
            line-height: 1.1;
            /* font-family: "Reem Kufi"; */
            + * {
              margin-top: 0.5rem;
            }
          }

          p {
            font-family: Montserrat;
            color: black;
          }

          strong {
            color: black;
          }
        `}
      />
      {/* <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet> */}
      {/* <Header /> */}
      <main
        css={css`
          margin: 72px auto 0;
          position: relative;
          width: 100%;
          height: fit-content;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          @media (max-width: 960px) {
            margin: 60px auto 0;
          }
        `}
      >
        {children}
        {/* <Footer /> */}
      </main>
    </>
  );
};

export default Layout;