import React, { createContext, useState } from 'react';
import {version as app_version} from '../../package.json'

const default_value = {showSidebar: undefined, app_version}

export const GlobalContext = createContext(default_value)

export const GlobalProvider = ({children}) => {

    const [showSidebar, setShowSidebar] = useState(default_value.showSidebar)
    const handleActiveSidebar = () => {
        setShowSidebar(true)
    }
    function handleDeactiveSidebar(){
        setShowSidebar(false)
    }
    function handleResetSidebar(){
        setShowSidebar(undefined)
    }
    return (
        <GlobalContext.Provider value={{
            app_version,
            showSidebar,
            handleActiveSidebar,
            handleDeactiveSidebar,
            handleResetSidebar
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
