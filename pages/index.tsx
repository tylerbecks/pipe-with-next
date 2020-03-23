/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import { NextPage } from "next";
import useSWR from "swr";
import { LIGHT_GRAY } from "../styles/colors";
import { Box, Grid, Heading } from "grommet";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Badge from "../components/Badge";
import MRRCard from "../components/MRRCard";
import ARRCard from "../components/ARRCard";
import IntegrationButtons from "../components/IntegrationButtons";
import { Subscription } from "../interfaces/subscription";

const TOTAL_PIPED = 300600;
const INTEGRATIONS = ["zuora"];
const BORDER_RADIUS = "5px";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const IndexPage: NextPage<{}> = () => {
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([] as Array<Subscription>);
  const { data: subscriptions, error } = useSWR("/api/subscriptions", fetcher);

  if (error) {
    return <div>There was an error, please try again!</div>;
  }

  if (!subscriptions) {
    return <div>You don't have any subscriptions. Please sync your provider.</div>;
  }

  const getTotalSelectedMrr = () => selectedSubscriptions.reduce((prevSum, curSub) => prevSum + curSub.mrr, 0);

  const handleSlideSelector = (delta: number) => {
    if (delta === 0) {
      return;
    }

    if (delta < 0) {
      // delta is negative here, so we add, not subtract
      return setSelectedSubscriptions(selectedSubscriptions.slice(0, selectedSubscriptions.length + delta));
    }

    const newSelectedSubscriptions = selectedSubscriptions.slice();
    let remainingDelta = delta;

    for (const s of subscriptions) {
      if (newSelectedSubscriptions.find(element => element === s)) {
        continue;
      }

      newSelectedSubscriptions.push(s);
      remainingDelta--;

      if (remainingDelta === 0) {
        return setSelectedSubscriptions(newSelectedSubscriptions);
      }
    }
  };

  const totalMRR = getTotalSelectedMrr();

  return (
    <Layout title="Pipe | Sync Inbox 💌">
      <Box align="center" direction="row" justify="between">
        <Box align="center" direction="row">
          <Heading level={3} margin={{ right: "10px" }}>
            Sync Inbox
          </Heading>
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
              border-right: 1px solid ${LIGHT_GRAY};
              border-bottom: 1px solid ${LIGHT_GRAY};
            `}
            gridArea="mrr"
            background="white"
            pad="large"
          >
            <MRRCard
              totalFormattedMRR={currencyFormatter.format(totalMRR)}
              onSlideSelector={handleSlideSelector}
              selectedCount={selectedSubscriptions.length}
              totalCount={subscriptions.length}
            />
          </Box>
          <Box
            css={css`
              border-top-right-radius: ${BORDER_RADIUS};
              border-bottom: 1px solid ${LIGHT_GRAY};
            `}
            gridArea="total"
            background="white"
            pad="large"
          >
            <ARRCard
              totalFormattedARR={currencyFormatter.format(totalMRR * 10)}
              selectedCount={selectedSubscriptions.length}
            />
          </Box>
          <Box
            align="center"
            justify="center"
            css={css`
              border-bottom: 1px solid ${LIGHT_GRAY};
            `}
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
