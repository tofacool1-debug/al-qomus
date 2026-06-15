import crypto from 'crypto';

export default async function handler(req, res) {
  // 1. Cuma terima POST dari Midtrans
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const notification = req.body;
    const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

    if (!SERVER_KEY) {
      console.error('SERVER_KEY kosong bang');
      return res.status(500).json({ error: 'Server error' });
    }

    // 2. Validasi signature biar gak dipalsu hacker
    const signature = crypto
     .createHash('sha512')
     .update(notification.order_id + notification.status_code + notification.gross_amount + SERVER_KEY)
     .digest('hex');

    if (signature!== notification.signature_key) {
      console.error('Signature salah:', notification.order_id);
      return res.status(403).json({ error: 'Invalid signature' });
    }

    console.log('Notifikasi Midtrans masuk:', {
      order_id: notification.order_id,
      status: notification.transaction_status,
      amount: notification.gross_amount
    });

    // 3. Ambil user_id dari order_id
    // Format order_id wajib: premium-USER_ID-timestamp
    // Contoh: premium-USER123-1699000123
    const order_id = notification.order_id;
    const transaction_status = notification.transaction_status;
    const user_id = order_id.split('-')[1];

    // 4. LOGIKA BUKA PREMIUM - EDIT DI SINI
    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      console.log(`✅ User ${user_id} LUNAS. Buka premium!`);

      // TODO: Ganti ini pake database lu. Contoh pake Supabase/Firebase:
      // await supabase.from('users').update({ premium: true }).eq('id', user_id)

      console.log(`Database user ${user_id} udah diupdate jadi premium`);

    } else if (transaction_status === 'pending') {
      console.log(`⏳ User ${user_id} masih pending bayar`);
    } else if (transaction_status === 'expire' || transaction_status === 'cancel') {
      console.log(`❌ User ${user_id} batal/expired`);
    }

    // 5. WAJIB bales 200 ke Midtrans biar dia stop spam notif
    return res.status(200).json({ status: 'success' });

  } catch (error) {
    console.error('Error webhook:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
}
