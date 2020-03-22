import * as React from "react";
import { Main } from "grommet";
import Head from "next/head";
import Header from "./Header";

type Props = {
  title: string;
};

const Layout: React.FunctionComponent<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <Main
      pad={{
        vertical: "medium",
        horizontal: "xlarge"
      }}
    >
      {children}
    </Main>
  </>
);

export default Layout;
