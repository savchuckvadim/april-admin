import { Button } from "@mui/material"



const Settings = (props) => {

    return (
        <div>
            {
                props.settings.actions.map(s =>
                    <Button onClick={
                        
                        () => props.settingAction(s.name)
                    }>{s.name}</Button>
                )
            }

        </div>
    )

}


export default Settings