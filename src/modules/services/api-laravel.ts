    import axios from "axios"

//.then(res:AxiosResponse<any>) => ...
export const api = axios.create({
    withCredentials: true,
    baseURL: 'https://april-server.ru/api',
    // baseURL: ' http://localhost:8000/api',

    headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },

})
//@ts-ignore
api.defaults.redirect = "follow";

export const addPlacementApp = async (domain: string, key: string, hook: string) => {
    try {
        let res = await api.post("/client", {
            domain, key, hook
        });

        if (res && res.data) {
            return res.data
        }

    } catch (error) {
        console.log(error)
        return error
    }


}

export const updatePlacements = async (isProd: boolean) => {
    try {
        let res = await api.post(`/refresh/`, {
            isProd
        });
        debugger
        if (res && res.data) {
            return res.data
        }

    } catch (error) {
        console.log(error)
        return error
    }


}


export enum ResultCodesEnum {
    Error = 1,
    Success = 0
}




