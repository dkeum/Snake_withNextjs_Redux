"use client"

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { MAKEMOVE,INCREASE_SNAKE,INCREMENT_SCORE,RESET, STOP_GAME} from "@/app/redux/features/snake/snakeSlice";
import { Heading } from "@chakra-ui/react";

import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
} from "../redux/actions";

import {
  clearBoard,
  drawObject,
  generateRandomPosition,
  hasSnakeCollided,
  IObjectBody,
} from "../utilities/index";
import Instruction from "./Instructions";
import { useAppSelector } from "../redux/store";
import ScoreCard from "./ScoreCard";

export interface ICanvasBoard {
  height: number;
  width: number;
}

const CanvasBoard = ({ height, width }: ICanvasBoard) => {
  const dispatch = useDispatch<AppDispatch>();
  const snake1 = useAppSelector((state) => state.games.snake);
  const gameScore = useAppSelector((state) => state.games.score);
  const disallowedDirection = useAppSelector((state) => state.games.disallowedDirection);

  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [pos, setPos] = useState<IObjectBody>( //position of the apple
    generateRandomPosition(width - 20, height - 20)
  );
  const [isConsumed, setIsConsumed] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D|null>(null);

  const moveSnake = useCallback(
    (dx = 0, dy = 0, ds: string) => {
      if (dx > 0 && dy === 0 && ds !== "RIGHT") {
        dispatch(MAKEMOVE({x: dx, y : dy, direction: MOVE_RIGHT, apple_x: pos.x, apple_y : pos.y}));
      }

      if (dx < 0 && dy === 0 && ds !== "LEFT") {
        dispatch(MAKEMOVE({x: dx, y : dy, direction: MOVE_LEFT, apple_x: pos.x, apple_y : pos.y}));
      }

      if (dx === 0 && dy < 0 && ds !== "UP") {
        dispatch(MAKEMOVE({x: dx, y : dy, direction: MOVE_UP, apple_x: pos.x, apple_y : pos.y}));
      }

      if (dx === 0 && dy > 0 && ds !== "DOWN") {
        dispatch(MAKEMOVE({x: dx, y : dy, direction: MOVE_DOWN, apple_x: pos.x, apple_y : pos.y}));
      }
    },
    [dispatch]
  );

  const handleKeyEvents = useCallback(
    (event: KeyboardEvent) => {
      if (disallowedDirection) {
        switch (event.key) {
          case "w":
            moveSnake(0, -20, disallowedDirection);
            break;
          case "s":
            moveSnake(0, 20, disallowedDirection);
            break;
          case "a":
            moveSnake(-20, 0, disallowedDirection);
            break;
          case "d":
            event.preventDefault();
            moveSnake(20, 0, disallowedDirection);
            break;
        }
      } else {
        if (
          disallowedDirection !== "LEFT" &&
          disallowedDirection !== "UP" &&
          disallowedDirection !== "DOWN" &&
          event.key === "d"
        )
          moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
      }
    },
    [disallowedDirection, moveSnake]
  );

  const resetBoard = useCallback(() => {
    window.removeEventListener("keypress", handleKeyEvents);

    dispatch(RESET());

    clearBoard(context);

  
    drawObject(context, snake1, "#91C483");
    drawObject(
      context,
      [generateRandomPosition(width - 20, height - 20)],
      "#676FA3"
    ); //Draws object randomly
    window.addEventListener("keypress", handleKeyEvents);
  }, [context, dispatch, handleKeyEvents, height, snake1, width]);

  useEffect(() => {
    //Generate new object
    if (isConsumed) {
      const posi = generateRandomPosition(width - 20, height - 20);
      setPos(posi);
      setIsConsumed(false);

      //Increase snake size when object is consumed successfully
      dispatch(INCREASE_SNAKE());

      //Increment the score
      dispatch(INCREMENT_SCORE());
    }
  }, [isConsumed, pos, height, width, dispatch]);

  useEffect(() => {
    //Draw on canvas each time
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
    clearBoard(context);

    drawObject(context, snake1, "#91C483");
    drawObject(context, [pos], "#676FA3"); //Draws object randomly

    //When the object is consumed
    if (snake1[0].x === pos?.x && snake1[0].y === pos?.y) {
      setIsConsumed(true);
    }

    if (
      hasSnakeCollided(snake1, snake1[0]) ||
      snake1[0].x >= width ||
      snake1[0].x < 0 ||
      snake1[0].y < 0 ||
      snake1[0].y >= height
    ) {

      setGameEnded(true);
      dispatch(STOP_GAME())
      window.removeEventListener("keypress", handleKeyEvents);
    } else setGameEnded(false);

  }, [context, pos, snake1, height, width, dispatch, handleKeyEvents]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyEvents);
    return () => {
      window.removeEventListener("keypress", handleKeyEvents);
    };
  }, [disallowedDirection, handleKeyEvents]);


  return (
    <div className= "bg-green-300 w-screen h-screen flex flex-col justify-center align-middle">
        <Heading as="h1" size="xl" className="flex justify-center">
                SNAKE GAME
              </Heading>
       <ScoreCard gameScore={gameScore}/>

       <div className={`flex justify-center w-[${width} h-[${height}]]`}>
        <canvas
          className="bg-green-200"
          ref={canvasRef}
          style={{
            border: `3px solid ${gameEnded ? "red" : "black"}`,
          }}
          width={width}
          height={height}
        />
       </div>
      
      <Instruction resetBoard={resetBoard} />
    </div>
  );
};

export default CanvasBoard;