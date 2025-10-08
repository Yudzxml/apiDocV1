async function cekMaintenance() {
  try {
    const response = await fetch('https://api.yydz.biz.id/api/user/maintenance', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const api = await response.json();
    const data = api.data;
    const path = window.location.pathname;
    const isMaintenancePage = path.endsWith('/maintenance.html');
    const isOwnerPage = path.endsWith('/owner.html');
    const isRoot = path === '/' || path === '/index.html';
    const formatTanggal = (iso) => {
      const d = new Date(iso);
      return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
    }
    if (data.maintenance === true && !isMaintenancePage && !isOwnerPage) {
      window.location.href = '/maintenance.html';
      return;
    }
    if (data.maintenance === false && isMaintenancePage) {
      window.location.href = '/';
      return;
    }
    console.log(`✅ Status Maintenance: ${data.maintenance ? 'Aktif' : 'Non-aktif'} | Tanggal: ${data.date ? formatTanggal(data.date) : '-'} | Path: ${path}`);
  } catch (error) {
    console.warn('⚠️ Tidak bisa memeriksa status maintenance:', error);
  }
}

cekMaintenance();