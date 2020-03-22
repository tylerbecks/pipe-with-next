/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { NextPage } from "next";
import useSWR from "swr";
import { Box, Grid } from "grommet";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Badge from "../components/Badge";
import IntegrationButtons from "../components/IntegrationButtons";

const TOTAL_PIPED = 300600;
const INTEGRATIONS = ["zuora"];

const fetcher = (url: string) => fetch(url).then(r => r.json());

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const IndexPage: NextPage<{}> = () => {
  const { data: subscriptions, error } = useSWR("/api/subscriptions", fetcher);

  if (error) {
    return <div>There was an error, please try again!</div>;
  }

  if (!subscriptions) {
    return <div>You don't have any subscriptions. Please sync your provider.</div>;
  }

  return (
    <Layout title="Pipe | Sync Inbox 💌">
      <div
        css={css`
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        `}
      >
        <h3
          css={css`
            margin-right: 10px;
          `}
        >
          Sync Inbox
        </h3>
        <Badge content={`PipeLine: ${currencyFormatter.format(TOTAL_PIPED)}`} />
        <IntegrationButtons integrations={INTEGRATIONS} />
      </div>
      <Grid
        columns={["50%", "50%"]}
        rows={["auto", "auto", "auto"]}
        areas={[
          { name: "mrr", start: [0, 0], end: [0, 0] },
          { name: "total", start: [1, 0], end: [1, 0] },
          { name: "collapse", start: [0, 1], end: [1, 1] },
          { name: "table", start: [0, 2], end: [1, 2] }
        ]}
        fill="horizontal"
      >
        <Box gridArea="mrr">
          <div>One</div>
        </Box>
        <Box gridArea="total">
          <div>Two</div>
        </Box>
        <Box gridArea="collapse">
          <div>Hide</div>
        </Box>
        <Box gridArea="table">
          <Table data={subscriptions} />
        </Box>
      </Grid>
    </Layout>
  );
};

export default IndexPage;
