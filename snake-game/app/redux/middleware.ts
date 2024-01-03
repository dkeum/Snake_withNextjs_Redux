import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import type { TypedStartListening, TypedAddListener } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from './store'

import {postAdded} from "./features/post/postSlice"

import {MiddleWare_MAKEMOVE, MAKEMOVE, SET_DIS_DIRECTION, RESET} from "./features/snake/snakeSlice"



const listenerMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>

listenerMiddleware.startListening({
    actionCreator: MAKEMOVE,
    effect: async (action, listenerApi) => {
      // Run whatever additional side-effect-y logic you want here
      // console.log('Middleware is listening, post added: ', action.payload)
        
    //   // Can cancel other running instances
         listenerApi.cancelActiveListeners()
         let snake_isGameEnded = listenerApi.getState().games.gamesEnded; 

         while(!snake_isGameEnded){
          snake_isGameEnded = listenerApi.getState().games.gameEnded
          // console.log("middleware is gamesEnded: ", listenerApi.getState().games)
          listenerApi.dispatch(MiddleWare_MAKEMOVE(action.payload));
          listenerApi.dispatch(SET_DIS_DIRECTION(action.payload.direction));
          await listenerApi.delay(100);
         }

    },
  })


  export default listenerMiddleware; 