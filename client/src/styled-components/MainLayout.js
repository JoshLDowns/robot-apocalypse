import React from "react";
import { Global, css } from "@emotion/react/macro";
import styled from "@emotion/styled/macro";
//import Helmet from "react-helmet";
import Footer from "./Footer";

const Main = styled("main")`
  margin: 0 auto;
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
`;

/*
* Palette
 #29d409 green
 #d40929 red
 #d4098f purple
*/

const Layout = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap");
          * {
            box-sizing: border-box;
            margin: 0;
          }

          html,
          body {
            margin: 0;
            width: 100vw;
            overflow-x: hidden;
            background-color: black;
            color: #29d409;
            font-family: "syne mono", --apple-system, BlinkMacSystemFont,
              "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
              "Helvetica Neue", sans-serif;
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
            color: #29d409;
            line-height: 1.1;
            font-family: "syne mono";
            + * {
              margin-top: 0.5rem;
            }
          }

          p {
            font-family: "syne mono";
            color: #29d409;
          }

          strong {
            color: #29d409;
          }
        `}
      />
      {/* <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet> */}
      <Main
      >
        {children}
        <Footer />
      </Main>
    </>
  );
};

export default Layout;
