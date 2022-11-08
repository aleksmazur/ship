interface Product {
  name: string,
  images: string[]
}

interface Invoice {
  subtotal: number,
  tax: number | null,
  total: number,
  amountDue: number,
  status: string,
  created: number,
}

export interface Subscription {
  _id: string;
  subscriptionId: string,
  priceId: string,
  customer: string,
  status: string,
  currentPeriodStartDate: number,
  currentPeriodEndDate: number,
  cancelAtPeriodEnd: boolean,
  product?: Product,
  pendingInvoice?: Invoice,
}
