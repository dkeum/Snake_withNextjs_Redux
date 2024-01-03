"use client"


import { useDispatch} from "react-redux";
import {increment, decrement, setCount, resetAll} from "@/app/redux/features/counter/counterSlice"
import { AppDispatch, useAppSelector } from "../redux/store";
import { useState } from "react";

const Counter = () =>{
    const count  = useAppSelector((state) => state.counter.total)
    const countBy  = useAppSelector((state) => state.counter.countBy)
    const dispatch  = useDispatch<AppDispatch>();

    const[ incrementBy, setIncrementBy] = useState(1);

    return(
        <section className="flex flex-row gap-x-10 justify-center align-middle">
                <p className="text-3xl font-bold">This is the count: {count}</p>
                <div className="flex flex-col gap-x-5 gap-y-4 text-1xl ">
                    <button className="border bg-blue-300 hover:bg-blue-500" onClick={()=>dispatch(increment())}>inc</button>
                    <button className="border bg-blue-300 hover:bg-blue-500" onClick={()=>dispatch(decrement())}>dec</button>
                    <button className="border bg-blue-300 hover:bg-blue-500" onClick={()=>{setIncrementBy((prev) => prev+1); dispatch(setCount(incrementBy))}}>Increment by: {incrementBy} </button>
                    <button className="border bg-blue-300 hover:bg-blue-500" onClick={()=>{dispatch(resetAll()); console.log("this is countBy: ", countBy); setIncrementBy((prev) => prev=countBy)}}>reset ALL</button>
                </div>
        </section>
    )
}

export default Counter;