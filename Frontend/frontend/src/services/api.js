import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// أضيفي التوكن إذا موجود (اختياري حسب نظامك)
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);

export const getPendingRequests = () => API.get('/superadmin/pending-requests');
export const approveInstitution = (id) => API.put(`/superadmin/approve/${id}`);

export const rejectInstitution = (id) => API.delete(`/superadmin/reject/${id}`);

export const getApprovedInstitutions = () => API.get('/superadmin/approved-institutions');

export const getAllCertificates = () => API.get('/superadmin/certificates');
export const updatePassword = (data) => API.put('/admin/update-password', data);

export default API;