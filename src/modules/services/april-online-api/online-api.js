import axios from "axios"


export const online = axios.create({
    withCredentials: true,
    baseURL: 'https://april-online.ru/api',
    // baseURL: 'http://localhost:8000/api',
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },

})


export const onlineAPI = {


    uploadGeneralDescriptionFile: async (formData) => {
        let result = null
        try {
            const data = await online.post('upload/description/general', formData)
            result = data.data
            return result
        } catch (error) {
            console.log(error)
            return result
        }

    },

    uploadPortalTemplateFile: async (formData) => {

        // $file = $request->file('file');
        // $filename = $request->input('fileName');
        // $portal = $request->input('portal');
        // $type = $request->input('type');




        let result = null
        try {
            const data = await online.post('portal/template', formData)
            result = data.data
            debugger
            return result
        } catch (error) {
            console.log(error)
            return result
        }

    },

    processFile: async (fileName, fields) => {

        try {
            const response = await online.post('createAprilTemplate', {
                fileName, fields
            })

            if (response && response.data && response.data.resultCode === 0) {
                let link = response.data.file
                // setUpdatedFile(link)
                window.open(link, "_blank")
            }
        } catch (err) {
            console.log(err)
            err && err.message && console.log(err.message)
        }

    },

    getDescription: async (domain, userId, complect, infoblocks) => {
        let result = null
        try {
            const response = await online.post('getDescription', {
                domain, userId, complect, infoblocks
            })
            if (response && response.data && response.data.resultCode === 0) {
                let link = response.data.file
                window.open(link, "_blank")
            }

        } catch (error) {
            console.log(error)
            return result
        }

    },

    getPortal: async (domain) => {
        let result = null
        try {
            const response = await online.post(`getportal`, {
                domain
            })
            if (response) {
                console.log(response)

            }

        } catch (error) {
            console.log(error)
            return result
        }

    },
    setPortal: async (
        domain,
        key,   //placement key 
        clientId,  //from hook 
        secret,    //from hook 
        hook //hook url

    ) => {

        // $domain  = $request->input('domain');
        // $key = $request->input('key'); //placement key
        // $clientId  = $request->input('clientId');
        // $secret = $request->input('secret');
        // $hook = $request->input('hook');
        // return Portal::setPortal($domain, $key, $clientId, $secret, $hook);

        let result = null
        try {
            let data = {
                domain: domain,
                key: key,
                clientId: clientId,
                clientSecret: secret,
                hook: hook
            }
            console.log(data)
            const response = await online.post(`portal`, data)
           
            if (response) {
                console.log(response)

            }

        } catch (error) {
            console.log(error)
            return result
        }

    },

    getPortals: async () => {
        let result = null
        try {
            const response = await online.get(`portals`)
            if (response) {
                console.log(response)

            }

        } catch (error) {
            console.log(error)
            return result
        }

    },

    getDeals: async (prop, value) => {

        let result = null
        try {
            const response = await online.post(`getdeals`, {
                parameter: prop,
                value
            })

            debugger
            if (response) {
                console.log(response)

            }

        } catch (error) {
            console.log(error)
            return result
        }
    },

    setCollection: async (name, items) => {
        let result = null
        try {
            const data = {
                [name]: items
            }
            const response = await online.post(name, data)
            if (response) {
                if (response.data.resultCode === 0) {
                    result = response.data.data
                } else {
                    console.log(response.data.message)
                }
            }
            return result
        } catch (error) {
            console.log('error')
            return result
        }

    }

}