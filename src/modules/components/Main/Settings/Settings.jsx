import { Button } from "@mui/material"



const Settings = (settings, settingAction) => {

    return (
        <div>
            {
                settings.map(s =>
                    <Button onClick={
                        () => settingAction(s.name)
                    }>{s.name}</Button>
                )
            }

        </div>
    )

}


export default Settings