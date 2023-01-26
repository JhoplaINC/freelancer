import axios from 'axios';

export async function loginRequest(email, password) {
    return await axios.post('http://localhost:4000/login', email, password);
}

export async function registerRequest(name, lastname, email, password, rol) {
    return await axios.post('http://localhost:4000/register', name, lastname, email, password, rol);
}

export async function getProfileDataRequest() {
    return await axios.get('http://localhost:4000/profile', { headers: { 'x-access-token': sessionStorage.getItem('token') } });
}

export async function getThirdUserProfileRequest(user_nick) {
    return await axios.get(`http://localhost:4000/profile/${user_nick}`);
}

export async function followUser(followed_id) {
    return await axios.post('http://localhost:4000/follow', {followed: followed_id}, 
    { headers: { 'x-access-token': sessionStorage.getItem('token') } });
}

export async function updateUserAccount(newAccountInfo) {
    return await axios.post(`http://localhost:4000/update`,
    newAccountInfo, { headers: { 'x-access-token': sessionStorage.getItem('token') } })
}

export async function updateUserImg(data) {
    return await axios.post(`http://localhost:4000/update-img`,
    data, { headers: { 'x-access-token': sessionStorage.getItem('token'), 'content-Type': 'multipart/form-data' } })
}