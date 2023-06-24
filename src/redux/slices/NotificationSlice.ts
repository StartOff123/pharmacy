import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type TypeNotification = 'error' | 'success' | 'warning'

type Notification = {
    code: string
    uniqureCode: number
    type: TypeNotification
    description: string
}

interface NotificationSliceState {
    notifications: Notification[]
}

const initialState: NotificationSliceState = {
    notifications: [],
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        getNotificarion: (state, action: PayloadAction<Notification>) => {
            state.notifications = new Array(...state.notifications, action.payload)
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(n => n.uniqureCode !== action.payload)
        }
    }
})

export const { getNotificarion, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer