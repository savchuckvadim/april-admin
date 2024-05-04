import { Navigate } from "react-router-dom"
import Button from "@mui/material/Button"
import { useState, useEffect } from "react"

const CreateField = ({ templateId }) => {
    const [isRedirect, setIsRedirect] = useState(false)
    const [urlRedirect, setUrlRedirect] = useState(false)


    const clickHendler = () => {
        
        setIsRedirect(true)
      

    }    

    useEffect(() => {
        
        isRedirect && setUrlRedirect(`../../tfield/add/${templateId}`)
    }, [isRedirect])
    
    return !urlRedirect ? <Button
        onClick={clickHendler}
    >
        Добавить FIELD
    </Button>
    : <Navigate replace to={urlRedirect} />

}

export default CreateField