import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (user) => {
    const {data} = await $host.post('user/registration', {...user, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('users/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const deleteUser = async (id) => {
    const {data} = await $host.delete('users/' + id)
    return data
}

export const updateUser = async (id, object) => {
    const {data} = await $host.put('users/' + id, object)
    return data
}

export const checkAuth = async () => {
    if (!localStorage.getItem('token')) {
        return {};
    }
    const {data} = await $authHost.get('users/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
