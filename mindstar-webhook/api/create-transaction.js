import midtransClient from 'midtrans-client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { order_id, amount, customer } = req.body;

  // Ambil key dari Vercel Environment Variables
  let snap = new midtransClient.Snap({
    isProduction: false, // ganti true kalo udah production
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
  });

  let parameter = {
    transaction_details: {
      order_id: order_id,
      gross_amount: amount
    },
    customer_details: {
      first_name: customer.name,
      email: customer.email,
      phone: customer.phone
    },
    enabled_payments: ["bank_transfer", "qris", "gopay", "shopeepay"]
  };

  try {
    let transaction = await snap.createTransaction(parameter);
    res.status(200).json({ 
      token: transaction.token,
      redirect_url: transaction.redirect_url 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
