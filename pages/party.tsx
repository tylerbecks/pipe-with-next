/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import _ from "lodash";
import { NextPage } from "next";
import { Box } from "grommet";
import Layout from "../components/Layout";

const IndexPage: NextPage<{}> = () => (
  <Layout title="Pipe | 🎉">
    <Box align="center" direction="row" justify="center">
      <img
        src="https://media0.giphy.com/media/13CoXDiaCcCoyk/giphy.gif"
        css={css`
          animation: rotation 2s infinite linear;
        `}
      />
    </Box>
  </Layout>
);

export default IndexPage;
