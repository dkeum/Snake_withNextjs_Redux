import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  ISnakeCoord,
} from "../../actions";

export interface IGlobalState {
  snake: ISnakeCoord[] | [];
  disallowedDirection: string;
  score: number;
  gameEnded: boolean;
}


const globalState: IGlobalState = {
  snake: [
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
  disallowedDirection: "",
  score: 0,
  gameEnded: false,
};

function GamewithDirection(state: IGlobalState, action:{x :number,y : number, direction: string , apple_x: number, apple_y: number}) {
  let newSnake = [...state.snake];
  const new_x = state.snake[0].x + action.x;
  const new_y = state.snake[0].y + action.y;
 
  newSnake = [
    {
      x: new_x,
      y: new_y,
    },
    ...newSnake,
  ];

  if (new_x == action.apple_x && new_y == action.apple_y){
  }
  else{
    // console.log("being popped")
    newSnake.pop();
  }


  return {
    ...state,
    snake: newSnake,
  };
}

const gameReducerSlice = createSlice({
  name: "game",
  initialState: globalState,
  reducers: {
    MAKEMOVE: (state, action: PayloadAction<{x :number,y : number, direction: string, apple_x: number, apple_y: number}>) => {
      // state.snake = GamewithDirection(state, action.payload).snake;
    },
    MiddleWare_MAKEMOVE: (state, action: PayloadAction<{x :number,y : number, direction: string, apple_x: number, apple_y: number}>) => {
      state.snake = GamewithDirection(state, action.payload).snake;
    },
    SET_DIS_DIRECTION: (state, action) => {
      state.disallowedDirection = action.payload;
    },
    RESET: (state) => {

     return state= globalState

    },
    STOP_GAME: (state) => {
      state.gameEnded = true
    },
    INCREASE_SNAKE: (state) => {
      const snakeLen = state.snake.length;
      state.snake = [
        ...state.snake,
        {
          x: state.snake[snakeLen - 1].x ,
          y: state.snake[snakeLen - 1].y ,
        },
      ];
    },
    RESET_SCORE: (state) => {
      state.score = 0;
    },
    INCREMENT_SCORE: (state) => {
      state.score += 1;
    },
  },
});

export const {MiddleWare_MAKEMOVE, MAKEMOVE, STOP_GAME, SET_DIS_DIRECTION,RESET,INCREASE_SNAKE,RESET_SCORE,INCREMENT_SCORE} = gameReducerSlice.actions
export default gameReducerSlice.reducer;
