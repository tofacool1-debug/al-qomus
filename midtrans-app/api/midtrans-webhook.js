import midtransClient from 'midtrans-client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const notificationJson = req.body;
  const orderId = notificationJson.order_id;
  const transactionStatus = notificationJson.transaction_status;
  const fraudStatus = notificationJson.fraud_status;

  console.log(`Notif order ${orderId}: ${transactionStatus}`);

  // Cek pembayaran sukses
  if (transactionStatus === 'settlement' && fraudStatus === 'accept') {
    
    // Ambil OneSignal Player ID dari database lu berdasarkan orderId
    // Contoh: const playerId = await getPlayerIdFromDB(orderId);
    const playerId = "ISI_PLAYER_ID_USER_DISINI"; 

    // Kirim notif via OneSignal REST API
    await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${process.env.ONESIGNAL_REST_KEY}`
      },
      body: JSON.stringify({
        app_id: "e07da120-ca3a-4583-bc59-b39570e3c2a9",
        include_player_ids: [playerId],
        headings: { en: "Pembayaran Berhasil ✅" },
        contents: { en: `Order ${orderId} sudah lunas. Makasih bang!` }
      })
    });
  }

  res.status(200).json({ received: true });
}
