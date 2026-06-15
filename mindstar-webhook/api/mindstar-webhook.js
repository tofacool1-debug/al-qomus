import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const notification = req.body;
    const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

    // 1. Validasi signature Midtrans
    const signature = crypto
    .createHash('sha512')
    .update(notification.order_id + notification.status_code + notification.gross_amount + SERVER_KEY)
    .digest('hex');

    if (signature!== notification.signature_key) {
      return res.status(403).json({ error: 'Invalid signature' });
    }

    const order_id = notification.order_id;
    const transaction_status = notification.transaction_status;
    const user_id = order_id.split('-')[1];

    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      console.log(`✅ User ${user_id} LUNAS`);

      // 2. UPDATE DB PREMIUM - GANTI SESUAI DB LU
      // await supabase.from('users').update({ premium: true }).eq('id', user_id)
      // Ambil onesignal_id dari DB juga
      const user_onesignal_id = 'AMBIL_DARI_DB_LU'; // contoh: "abc-123-xyz"

      // 3. KIRIM NOTIF ONESIGNAL
      await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + process.env.ONESIGNAL_REST_KEY
        },
        body: JSON.stringify({
          app_id: process.env.ONESIGNAL_APP_ID,
          include_player_ids: [user_onesignal_id],
          headings: { en: 'ShorofApp Premium' },
          contents: { en: 'Pembayaran berhasil! Fitur premium sudah aktif.' }
        })
      });

      console.log(`Notif terkirim ke user ${user_id}`);
    }

    return res.status(200).json({ status: 'success' });

  } catch (error) {
    console.error('Error webhook:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
}
