import React, {useState} from 'react';
import usePersistedState from "use-persisted-state-hook";
import {Alert, Button, Form} from "react-bootstrap";

const Settings = () => {
    const [settings, setSettings] = useChangeableSettings();
    const [tempSettings, setTempSettings] = useState(settings);
    const [saved, setSaved] = useState(false);


    const save = () => {
        setSettings(tempSettings);
        setSaved(true);
    }
    
    return (
        <div>
            <h1>Settings</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Home</Form.Label>
                    <Form.Control value={tempSettings.home || ""}
                                  onChange={e => {
                                      setTempSettings(tmpSettings => ({...tmpSettings, home: e.target.value}))
                                      setSaved(false);
                                  }}/>
                </Form.Group>
                <Button onClick={save}>Save</Button>
                {saved && <Alert variant="success">Saved settings.</Alert>}
            </Form>
        </div>
    );
};

const useChangeableSettings = () => usePersistedState("settings", {home: null});
const useSettings = () => {
    const [get] = useChangeableSettings()
    return get;
}

export {useSettings, useChangeableSettings};
export default Settings;