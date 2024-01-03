import { configureStore , createListenerMiddleware } from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counterSlice"
import postReducer from "./features/post/postSlice"
import userReducer from "./features/users/userSlice"
import gameReducer from './features/snake/snakeSlice'

import { TypedUseSelectorHook, useSelector } from 'react-redux'
import listenerMiddleware from './middleware'



export const store = configureStore({
  reducer: {
    counter : counterReducer,
    posts: postReducer,
    users: userReducer,
    games: gameReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;