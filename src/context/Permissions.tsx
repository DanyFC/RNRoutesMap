import { createContext, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';

import { check, openSettings, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

interface PermissionsState {
  locationStatus: PermissionStatus;
}

type PermissionsContextProps = {
  permissions: PermissionsState;

  askLocationPermission: () => void;
  checkLocationPermission: () => void;
}

const permissionsInitState: PermissionsState = {
  locationStatus: 'unavailable'
}

export const PermissionsContext = createContext({} as PermissionsContextProps)

export const PermissionsProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

  const [permissions, setPermissions] = useState(permissionsInitState)

  const askLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

        if (status === 'blocked') openSettings()

        setPermissions({ ...permissions, locationStatus: status })
      } catch (error) {
        console.log("🚀 ~ askLocationPermission ~ error:", error)
      }
    }

    return
  }

  const checkLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

        setPermissions({ ...permissions, locationStatus: status })
      } catch (error) {
        console.log("🚀 ~ checkLocationPermission ~ error:", error)
      }
    }

    return
  }

  useEffect(() => {
    checkLocationPermission()
  }, [])

  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state === 'active') checkLocationPermission()
    })
  }, [])

  return (
    <PermissionsContext.Provider
      value={{
        permissions,

        askLocationPermission,
        checkLocationPermission,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  )
}