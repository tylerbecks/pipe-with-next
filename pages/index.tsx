/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { NextPage } from "next";
import useSWR from "swr";
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
      {error && <div>There was an error, please try again!</div>}
      {subscriptions && <Table data={subscriptions} />}
    </Layout>
  );
};

export default IndexPage;
