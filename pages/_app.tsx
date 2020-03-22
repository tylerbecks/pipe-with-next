/** @jsx jsx */
import { css, jsx, Global } from "@emotion/core";
import { AppProps } from "next/app";
import { Grommet } from "grommet";

const fontFamily = "Gilroy, sans-serif";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Grommet
    theme={{
      global: {
        font: {
          family: fontFamily
        }
      }
    }}
  >
    <Global
      styles={css`
        body {
          background: rgb(244, 247, 249);
          font-family: ${fontFamily};
          margin: 0;
        }
      `}
    />
    <Component {...pageProps} />
  </Grommet>
);

export default MyApp;
