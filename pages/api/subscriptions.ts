import { NextApiRequest, NextApiResponse } from "next";
import subscriptionSampleData from "../../subscriptions.json";
import { SubscriptionRaw } from "../../interfaces/subscription";

export default (_: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(subscriptionSampleData)) {
      throw new Error("Cannot find subscription data");
    }

    const massagedData = massageData(subscriptionSampleData);

    res.status(200).json(massagedData);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

const massageData = (subscriptionSampleData: Array<SubscriptionRaw>) =>
  subscriptionSampleData.map(s =>
    Object.assign({}, s, {
      syncedFrom: "Zuora",
      startDate: new Date(s.startDate),
      endDate: new Date(s.endDate)
    })
  );
