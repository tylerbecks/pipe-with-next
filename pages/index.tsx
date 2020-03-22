import { NextPage } from "next";
import useSWR from "swr";
import Layout from "../components/Layout";
import Table from "../components/Table";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const IndexPage: NextPage<{}> = () => {
  const { data: subscriptions, error } = useSWR("/api/subscriptions", fetcher);

  return (
    <Layout title="Pipe | Sync Inbox 💌">
      <h1>Hello Next.js 👋</h1>
      {error && <div>There was an error, please try again!</div>}
      {subscriptions && <Table data={subscriptions} />}
    </Layout>
  );
};

export default IndexPage;
