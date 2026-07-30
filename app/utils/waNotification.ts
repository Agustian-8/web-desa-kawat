// ============================================
// UTILITY WHATSAPP NOTIFICATION (TANPA API)
// ============================================

/**
 * Generate link WhatsApp dengan pesan otomatis
 */
export const generateWALink = (
  phoneNumber: string,
  message: string
): string => {
  // Format nomor HP
  let formattedNumber = phoneNumber.replace(/\s/g, '')
  
  // Hapus 0 di depan, tambahkan 62
  if (formattedNumber.startsWith('0')) {
    formattedNumber = '62' + formattedNumber.substring(1)
  }
  
  // Jika tidak dimulai dengan 62, tambahkan 62
  if (!formattedNumber.startsWith('62')) {
    formattedNumber = '62' + formattedNumber
  }

  // Encode pesan untuk URL
  const encodedMessage = encodeURIComponent(message)
  
  return `https://wa.me/${formattedNumber}?text=${encodedMessage}`
}

/**
 * Template pesan berdasarkan status
 */
export const getStatusMessage = (
  nama: string,
  layanan: string,
  status: string,
  nomorPengajuan: string,
  catatan?: string
): string => {
  // ✅ PERBAIKAN: Link hanya sampai /tracking (tanpa parameter)
  const baseUrl = 'https://web-desa.vercel.app/tracking'
  
  const messages: Record<string, string> = {
    'menunggu': `Halo ${nama} 🙏

Pengajuan Anda untuk *${layanan}* telah kami terima.

📋 Nomor Pengajuan: ${nomorPengajuan}
📅 Tanggal: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}

Status: ⏳ Menunggu diproses

Kami akan segera memproses pengajuan Anda. Silakan cek status secara berkala di:
🔗 ${baseUrl}

Terima kasih.`,

    'diproses': `Halo ${nama} 📌

Pengajuan Anda untuk *${layanan}* sedang kami proses.

📋 Nomor Pengajuan: ${nomorPengajuan}

Status: 🔄 Sedang Diproses

Mohon tunggu, kami akan segera menyelesaikan pengajuan Anda.

Cek status: 🔗 ${baseUrl}

Terima kasih.`,

    'selesai': `Halo ${nama} ✅

Selamat! Pengajuan Anda untuk *${layanan}* telah SELESAI.

📋 Nomor Pengajuan: ${nomorPengajuan}

Status: ✅ Selesai

Silakan datang ke Balai Desa untuk mengambil surat/dokumen dengan membawa KTP.

Jam Pelayanan: Senin-Jumat, 08:00-15:00 WIB

Cek status: 🔗 ${baseUrl}

Terima kasih.`,

    'ditolak': `Halo ${nama} ❌

Maaf, pengajuan Anda untuk *${layanan}* ditolak.

📋 Nomor Pengajuan: ${nomorPengajuan}

Status: ❌ Ditolak

Alasan penolakan:
${catatan || 'Silakan hubungi admin desa untuk informasi lebih lanjut.'}

Silakan perbaiki data dan ajukan kembali jika diperlukan.

Cek status: 🔗 ${baseUrl}

Terima kasih.`
  }

  return messages[status] || messages['menunggu']
}