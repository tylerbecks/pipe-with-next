/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { NextPage } from "next";
import useSWR from "swr";
import { LIGHT_GRAY } from "../styles/colors";
import { Box, Grid } from "grommet";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Badge from "../components/Badge";
import IntegrationButtons from "../components/IntegrationButtons";

const TOTAL_PIPED = 300600;
const INTEGRATIONS = ["zuora"];

const BORDER_RADIUS = "5px";

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
      <Box align="center" direction="row" justify="between">
        <Box align="center" direction="row">
          <h3
            css={css`
              margin-right: 10px;
            `}
          >
            Sync Inbox
          </h3>
          <Badge content={`PipeLine: ${currencyFormatter.format(TOTAL_PIPED)}`} />
        </Box>
        <IntegrationButtons integrations={INTEGRATIONS} />
      </Box>
      <Box
        elevation="small"
        css={css`
          border-radius: ${BORDER_RADIUS};
          border: 1px solid ${LIGHT_GRAY};
        `}
      >
        <Grid
          columns={["50%", "50%"]}
          rows={["30%", "10%", "50%"]}
          areas={[
            { name: "mrr", start: [0, 0], end: [0, 0] },
            { name: "total", start: [1, 0], end: [1, 0] },
            { name: "collapse", start: [0, 1], end: [1, 1] },
            { name: "table", start: [0, 2], end: [1, 2] }
          ]}
        >
          <Box
            css={css`
              border-top-left-radius: ${BORDER_RADIUS};
            `}
            gridArea="mrr"
            background="white"
            align="center"
            justify="center"
            pad={{ vertical: "small", horizontal: "medium" }}
          >
            <div>One</div>
          </Box>
          <Box
            css={css`
              border-top-right-radius: ${BORDER_RADIUS};
            `}
            gridArea="total"
            background="white"
            align="center"
            justify="center"
            pad={{ vertical: "small", horizontal: "medium" }}
          >
            <div>Two</div>
          </Box>
          <Box
            align="center"
            justify="center"
            css={css``}
            gridArea="collapse"
            background="white"
            pad={{ vertical: "small", horizontal: "medium" }}
          >
            <div>Hide</div>
          </Box>
          <Box
            css={css`
              border-bottom-radius: ${BORDER_RADIUS};
            `}
            gridArea="table"
            background="white"
          >
            <Table data={subscriptions} />
          </Box>
        </Grid>
      </Box>
    </Layout>
  );
};

export default IndexPage;
