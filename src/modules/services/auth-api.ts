import { socket } from "./websocket/socket";
import { api } from "./api-laravel";
import { UserType } from "../types/types";


type getAuthAppUserType = {
    resultCode: number
    authUser: UserType
    message: string
}


export const authAPI = {
    async initial() {
        let res = await api.get("/sanctum/csrf-cookie");
        return res;
    },

    async register(name: string, surname: string, email: string, password: string, passwordConfirmation: string) {
        await api.get("/sanctum/csrf-cookie");
        let result = await api.post('register', {
            name: name,
            surname: surname,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
        });

        return result;

    },

    async login(email: string, password: string) {
        await api.get("/sanctum/csrf-cookie");
        let res = await api.post('login', {
            email: email,
            password: password,
            remember: true
        });
        return res;

    },
    async getAuthAppUser() {
        try {
            const res = await api.get<getAuthAppUserType>("api/user/auth");
            // const websocket = await socket.connection();

            return res.data;
        } catch (error) {
            return {
                'resultCode': 0,
                'authUser': null,
                'message': error
            };
            
        }

    },

    logout() {
        let res = api.post('logout').then(res => console.log(res));
        return res;
    },
    //TODO Verification
    /*
        updatePassword(payload) {
            return api.put("/user/password", payload)
        },
        sendVerification(payload) {
            return api.post("/email/verification-notification", payload)
        },
        updateUser(payload) {
            return api.put("/user/profile-information", payload)
        },
    
        */
};
