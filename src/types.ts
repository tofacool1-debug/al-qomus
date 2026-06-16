export interface Transaction {
  id: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  itemDetails: string;
  status: 'pending' | 'settlement' | 'success' | 'expire' | 'cancel' | 'deny';
  paymentType: string;
  createdAt: string;
  updatedAt: string;
  midtransTransactionId?: string;
}

export interface NotificationLog {
  id: string;
  transactionId: string;
  status: 'sent' | 'failed';
  title: string;
  message: string;
  payload: string; // JSON String
  createdAt: string;
}

export interface SyncConfig {
  midtransMerchantId: string;
  midtransClientKey: string;
  midtransServerKey: string;
  oneSignalAppId: string;
  oneSignalRestKey: string;
}
