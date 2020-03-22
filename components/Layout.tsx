/** @jsx jsx */
import { css, jsx, Global } from "@emotion/core";
import * as React from "react";
import Header from "./Header";
import Head from "next/head";

type Props = {
  title: string;
};

const style = css``;

const Layout: React.FunctionComponent<Props> = ({ children, title }) => (
  <div css={style}>
    <Global
      styles={css`
        body {
          background: rgb(244, 247, 249);
          margin: 0;
        }
      `}
    />
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    {children}
  </div>
);

export default Layout;
