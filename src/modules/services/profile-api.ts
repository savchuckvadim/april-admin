import { api } from "./api-laravel";


type AboutMeType = {
    resultCode: number
    aboutMe: string
    message: string
}



export const profileAPI = {
    // async getProfile(userId: number) {
    //     const res = await api.get(`api/profile/${userId}`)
    //     return res.data
    // },
    async getAboutMe(userId: number) {
        const res = await api.get<AboutMeType>(`api/profile/aboutme/${userId}`);
        return res.data;
    },

    async updateAboutMe(aboutMe: string) {
        const res = await api.put<AboutMeType>(`api/profile/aboutme`, {
            aboutMe
        });

        return res.data;
    },
};
