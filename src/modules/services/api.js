
import axios from "axios"


export const api = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': 'f967f12a-dbe0-4d06-9642-2706475a80b8'
    }
})

export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 10) {
        return api.get(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    getUser(name) {

        return api.get(`users?term=${name}`).then(res => res.data)
    },

    follow(userId) {
        return api.post(`follow/${userId}`).then(res => res.data.resultCode)
    },

    unfollow(userId) {
        return api.delete(`follow/${userId}`).then(res => res.data.resultCode)
    }

}

export const profileAPI = {

    getProfile(userId) {

        if (!userId) {

            return api.get(`auth/me`).then(res => api.get(`profile/${res.data.id}`))

        } else {
            return api.get(`profile/${userId}`)
        }

    },

    getStatus(userId) {

        return api.get(`profile/status/${userId}`)
    },

    updateStatus(status) {

        return api.put(`profile/status`, {
            status: status
        })
    },
    loadPhoto(photo) {

        let formData = new FormData()

        formData.append('image', photo)

            return api.put(`profile/photo`, formData,  
            {headers: { "Content-Type": "multipart/form-data" }}
        )
        

    }
}

export const authAPI = {
        me() {
            return api.get(`auth/me`).then(res => res.data)
        },
        login(email, password, rememberMe = true) {

            return api.post('auth/login', {
                email: email,
                password: password,
                rememberMe: rememberMe

            })
        },
        logout() {

            return api.delete('auth/login')
        }
    }

export const  fishAPI = {
        get() {
            return axios.get('https://fish-text.ru/get?type=sentence&number=20&format=json').then(res => res.data.text)
        }
    }