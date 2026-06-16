# Panduan Pengembangan Expo.dev & Pembaruan Otomatis (EAS Update)

Dokumen ini berisi panduan teknis langkah-demi-langkah bagi developer untuk melakukan build APK/iOS serta mengelola sistem **auto-update otomatis (Over-The-Air/OTA)** secara jarak jauh menggunakan layanan gratis super-cepat dari **Expo.dev** dan **EAS (Expo Application Services)**.

---

## 🚀 Persiapan Awal di Laptop Anda

Sebelum memulai, pastikan Anda telah mendownload source-code project ini (melalui opsi menu ZIP di Google AI Studio) dan telah menginstall Node.js di laptop Anda.

1. **Buat Akun dan Login di Expo:**
   * Daftar akun gratis di [https://expo.dev/](https://expo.dev/)
   * Install alat baris perintah Expo secara global:
     ```bash
     npm install -g eas-cli
     ```
   * Kaitkan login akun Anda di terminal:
     ```bash
     eas login
     ```

2. **Pastikan Dependensi Pendukung Terbaca:**
   Kamus kita menggunakan file `app.json` yang berisi konfigurasi resmi dan file `App.native.js` yang berisi kode inisialisasi native Expo.

---

## 📦 Langkah 1: Mempersiapkan Konfigurasi EAS Build

Jalankan perintah inisialisasi berikut di folder root aplikasi Anda untuk menghubungkan project lokal ke dashboard Expo Cloud Anda:

```bash
eas project:init --id 71474c2a-503f-473b-97a8-bb87cd4b3e9e
```

Selanjutnya, buat file konfigurasi build EAS bernama `eas.json` secara otomatis dengan mengetikkan:

```bash
eas build:configure
```

Ini akan menghasilkan file `eas.json`. Pastikan bagian profil `production` dan `development` telah disesuaikan agar menghasilkan output berekstensi `.apk` (bukan bundel `.aab` Google Play Store khusus uji coba):

### Contoh Struktur `eas.json` yang Direkomendasikan:
```json
{
  "cli": {
    "version": ">= 9.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

---

## 🛠️ Langkah 2: Memulai Cloud Build di Expo.dev

Kami tidak perlu menguras daya laptop Anda untuk mengompilasi kode program ke biner Java/Kotlin. Semua kompilasi dilakukan secara cloud dan aman di server Expo:

* **Satu perintah untuk memicu Build APK Android:**
  ```bash
  eas build --platform android --profile preview
  ```
* **Untuk memicu Build iOS:**
  ```bash
  eas build --platform ios --profile preview
  ```

Setelah kompilasi selesai, terminal Anda akan secara otomatis memunculkan tautan unduhan langsung berekstensi `.apk` serta sebuah tautan **Barcode (QR Code)**. Anda cukup mengarahkan kamera HP Anda ke QR tersebut untuk menginstall aplikasi secara instan!

---

## 🔄 Langkah 3: Mengaktifkan & Merilis Pembaruan Otomatis (EAS Update)

Fitur paling keren dari konfigurasi ini adalah **Pembaruan Otomatis Tanpa Re-install (OTA Updates)**. 
Saat Anda merilis kosa kata atau perbaikan rumus tahrir/i'lal yang baru di database web, Anda tidak perlu lagi meminta murid/pengguna Anda mendownload ulang file `.apk` baru secara manual. Aplikasi di HP mereka akan memperbarui dirinya sendiri saat pertama kali dibuka!

### Bagaimana cara kerjanya?
Di file `App.native.js` kita, kami menyematkan listener dari library resmi `expo-updates`. 

### Langkah Merilis Update Baru:
1. Hubungkan / install library updates di lokal jika dibutuhkan:
   ```bash
   npx expo install expo-updates
   ```
2. Publikasikan perubahan / perbaikan program baru di web dengan satu baris perintah:
   ```bash
   eas update --branch production --message "Update kosakata dan optimasi i'lal mudhori bina mautal"
   ```

Aplikasi yang terpasang di seluruh handphone pengguna akan secara otomatis mengunduh bundel kosa kata baru ini di latar belakang saat dijalankan, memunculkan popup konfirmasi pembaruan, serta memuat data terbaru dengan mulus dan instan!

---

💡 *Tip Sukses: Seluruh aset gambar (seperti logo emerald `/public/icon.png`) telah dikonfigurasi masuk ke dalam aset statis kustom Android/iOS agar splash screen termuat cepat tanpa mengkonsumsi kuota data handphone murid Anda.*
