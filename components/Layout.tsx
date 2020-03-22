/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";
import Header from "./Header";
import Head from "next/head";

type Props = {
  title: string;
};

const style = css`
  padding: 40px 100px;
`;

const Layout: React.FunctionComponent<Props> = ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <div css={style}>{children}</div>
  </div>
);

export default Layout;
