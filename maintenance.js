async function cekMaintenance() {
  try {
    const response = await fetch('https://api.yydz.biz.id/api/user/maintenance', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const api = await response.json();
    const data = api.data;
    const path = window.location.pathname.replace(/\/$/, '');
    const isMaintenancePage = path === '/maintenance' || path === '/maintenance.html';
    const isOwnerPage = path === '/owner' || path === '/owner.html';
    const isRoot = path === '' || path === '/' || path === '/index.html';
    const formatTanggal = (iso) => {
      if (!iso) return '-';
      const d = new Date(iso);
      const pad = (n) => n.toString().padStart(2, '0');
      return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }
    if (data.maintenance === true && !isMaintenancePage && !isOwnerPage) {
      window.location.href = '/maintenance';
      return;
    }
    if (data.maintenance === false && isMaintenancePage) {
      window.location.href = '/';
      return;
    }
    console.log(`✅ Status Maintenance: ${data.maintenance ? 'Aktif' : 'Non-aktif'} | Tanggal: ${formatTanggal(data.date)} | Path: ${path}`);
  } catch (error) {
    console.warn('⚠️ Tidak bisa memeriksa status maintenance:', error);
  }
}

cekMaintenance();