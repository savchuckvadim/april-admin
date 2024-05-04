import { Button } from "@mui/material"



const Settings = (props) => {

    return (
        <div>
            {
                props.settings.actions.map(s => {
                 

                 
                    return <Button onClick={

                        () => props.settingAction(s.type)
                    }>{s.name}</Button>
                })
            }

        </div>
    )

}


export default Settings