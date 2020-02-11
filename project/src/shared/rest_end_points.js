const PROTOCOL = 'http';
const ADDRESS = '192.168.10.4';
const PORT = '5000';

export const BASE_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;
export const BASE_USERS_URL = `${BASE_URL}/users`;
export const REGISTER_USER_REQUEST = `${BASE_USERS_URL}/register`;
export const LOGIN_USER_REQUEST = `${BASE_USERS_URL}/login`;
export const PROFILE_USER_REQUEST = `${BASE_USERS_URL}/profile`;
export const BASE_RECEPTION_URL = `${BASE_URL}/visits`;
export const NEW_APPOINTMENT_URL = `${BASE_RECEPTION_URL}/new`;

