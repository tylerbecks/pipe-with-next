/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import _ from "lodash";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import { LIGHT_GRAY } from "../styles/colors";
import { Box, Grid, Heading } from "grommet";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Badge from "../components/Badge";
import MRRCard from "../components/MRRCard";
import ARRCard from "../components/ARRCard";
import IntegrationButtons from "../components/IntegrationButtons";
import { Subscription } from "../interfaces/subscription";
import { formatCurrency } from "../utils/format";

const INTEGRATIONS = ["zuora"];
const BORDER_RADIUS = "5px";

const IndexPage: NextPage<{}> = () => {
  const [subscriptions, setSubscriptions] = useState([] as Array<Subscription>);
  const [error, setError] = useState(null as null | string);
  const handleError = () => setError("There was an error, please try again!");

  const loadSubscriptions = async () => {
    const data = await fetch("/api/subscriptions").catch(handleError);
    if (!data) {
      return;
    }

    const json = await data.json();
    const massagedJson = json.map((s: Subscription) =>
      Object.assign({}, s, {
        isSelected: false
      })
    );

    setSubscriptions(massagedJson);
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!subscriptions) {
    return <div>You don't have any subscriptions. Please sync your provider.</div>;
  }

  const handleSlideSelector = (delta: number) => {
    console.log(delta);
    if (delta === 0) {
      return;
    }

    if (delta < 0) {
      const newSubscriptions = removeSubscriptions(subscriptions, -delta);
      return setSubscriptions(newSubscriptions);
    }

    const newSubscriptions = addSubscriptions(subscriptions, delta);
    return setSubscriptions(newSubscriptions);
  };

  const totalMRR = subscriptions.reduce((prevSum, curSub) => {
    if (curSub.isSelected) {
      return prevSum + curSub.mrr;
    }
    return prevSum;
  }, 0);

  const totalPipeline = subscriptions.reduce((prevSum, curSub) => prevSum + curSub.mrr, 0);

  const selectedCount = subscriptions.reduce((prevSum, curSub) => {
    if (curSub.isSelected) {
      return prevSum + 1;
    }
    return prevSum;
  }, 0);

  const handleSelectRows = (rows: Array<Subscription>) => {
    const newSubscriptions = subscriptions.map((s: Subscription) => {
      if (rows.find(r => r === s)) {
        return Object.assign({}, s, { isSelected: true });
      }

      return Object.assign({}, s, { isSelected: false });
    });

    setSubscriptions(newSubscriptions);
  };

  return (
    <Layout title="Pipe | Sync Inbox 💌">
      <Box align="center" direction="row" justify="between">
        <Box align="center" direction="row">
          <Heading level={3} margin={{ right: "10px" }}>
            Sync Inbox
          </Heading>
          <Badge content={`PipeLine: ${formatCurrency(totalPipeline)}`} />
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
          rows={["30%", "70%"]}
          areas={[
            { name: "mrr", start: [0, 0], end: [0, 0] },
            { name: "total", start: [1, 0], end: [1, 0] },
            { name: "table", start: [0, 1], end: [1, 1] }
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
              totalMRR={totalMRR}
              onSlideSelector={handleSlideSelector}
              selectedCount={selectedCount}
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
              totalARR={totalMRR * 10}
              selectedCount={selectedCount}
              onPipe={() => {
                handleSelectRows([]);
              }}
            />
          </Box>
          <Box
            css={css`
              border-bottom-radius: ${BORDER_RADIUS};
            `}
            gridArea="table"
            background="white"
          >
            <Table data={subscriptions} onSelectRows={handleSelectRows} />
          </Box>
        </Grid>
      </Box>
    </Layout>
  );
};

const removeSubscriptions = (subscriptions: Array<Subscription>, countToRemove: number) => {
  const subscriptionsCopy = subscriptions.slice();
  let remainingCount = countToRemove;

  for (let i = subscriptionsCopy.length - 1; i > 0; i--) {
    const current = subscriptionsCopy[i];
    if (current.isSelected) {
      subscriptionsCopy[i] = Object.assign({}, current, { isSelected: false });
      remainingCount--;
      if (remainingCount === 0) {
        break;
      }
    }
  }

  return subscriptionsCopy;
};

const addSubscriptions = (subscriptions: Array<Subscription>, countToAdd: number) => {
  const subscriptionsCopy = subscriptions.slice();
  let remainingCount = countToAdd;

  for (let i = 0; i < subscriptions.length; i++) {
    const current = subscriptionsCopy[i];
    if (!current.isSelected) {
      subscriptionsCopy[i] = Object.assign({}, current, { isSelected: true });
      remainingCount--;
      if (remainingCount === 0) {
        break;
      }
    }
  }

  return subscriptionsCopy;
};

export default IndexPage;
