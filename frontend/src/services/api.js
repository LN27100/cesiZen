import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export const registerUser = (userData) => axios.post(`${API_URL}/users/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/users/login`, userData);
export const getActivities = () => axios.get(`${API_URL}/activities`);
export const addActivity = (activityData) => axios.post(`${API_URL}/activities`, activityData);
export const getInfo = () => axios.get(`${API_URL}/info`);
export const addInfo = (infoData) => axios.post(`${API_URL}/info`, infoData);
