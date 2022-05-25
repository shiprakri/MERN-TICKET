import axios from 'axios';





const API = axios.create({ baseURL: 'http://localhost:8080' });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const signin = (formData) => API.post('/users/login', formData);

export const signup = (formData) => API.post('/users/register', formData);
export const getUsers = (formData) => API.get('/users/');
export const addTicket =(formData) => API.post('/tickets/add',formData);
export const getTickets = () => API.get('/tickets');
export const updateTicket = (id, updatedTicket) => {console.log(updatedTicket);API.put(`/tickets/${id}`, updatedTicket)};
export const deleteTicket = (deleteTicket) =>API.post('/tickets/delete',deleteTicket);