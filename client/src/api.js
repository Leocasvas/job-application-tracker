const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const request = async (path, options = {}) => {
  const token = localStorage.getItem('job_tracker_token');
  const response = await fetch(`${API}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).message || 'Request failed');
  return response.status === 204 ? null : response.json();
};
export const api = { me: () => request('/auth/me'), jobs: (params = '') => request(`/jobs${params}`), create: (job) => request('/jobs', { method: 'POST', body: JSON.stringify(job) }), update: (id, job) => request(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(job) }), remove: (id) => request(`/jobs/${id}`, { method: 'DELETE' }) };
export const googleLoginUrl = `${API}/auth/google`;
