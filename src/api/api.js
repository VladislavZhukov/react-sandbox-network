import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '65a763c4-ba06-4579-9df2-fac8d10b5af3'
    }
});

export const friendsAPI = {
    async getUsers(currentPage, pageSize) {
        const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    },
    async follow(id) {
        const response = await instance.post(`follow/${id}`, {});
        return response.data;
    },
    async unfollow(id) {
        const response = await instance.delete(`follow/${id}`, {});
        return response.data;
    }
};

export const authAPI = {
    async auth() {
        const response = await instance.get(`auth/me`);
        return response.data;
    },
    async login(email, password, rememberMe = false) {
        const response = await instance.post(`auth/login`, { email, password, rememberMe }, {});
        return response.data;
    },
    async logout() {
        const response = await instance.delete(`auth/login`);
        return response.data;
    }
};

export const profileAPI = {
    getProfile(userId) {
        return (instance
            .get(`profile/${userId}`)
        ).then(response => response.data);
    },
    getStatus(userId) {
        return (instance
            .get(`profile/status/${userId}`)
        ).then(response => response.data);
    },
    updateStatus(status) {
        return (instance
            .put(`profile/status/`, { status: status })
        ).then(response => response.data);
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return (instance
            .put(`profile/photo/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        ).then(response => response.data);
    }
}