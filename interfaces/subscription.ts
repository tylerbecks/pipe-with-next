export type Subscription = {
  company: string;
  endDate: Date;
  invoiceID: string;
  mrr: number;
  startDate: Date;
  status: string;
  syncedFrom: string;
};

export type SubscriptionRaw = {
  company: string;
  endDate: string;
  invoiceID: string;
  mrr: number;
  startDate: string;
  status: string;
};
