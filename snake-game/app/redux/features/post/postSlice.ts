import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

export type post = {
  id: string,
  title: string,
  content: string,
};

const initialState: post[] = [
  {
    id: "1",
    title: "learning Redux",
    content: "I heard good things",
  },
  {
    id: "2",
    title: "learning Redux pt 2",
    content: "I heard good things pt 2",
  },
];

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
        reducer(state, action : PayloadAction<post>){
            state.push(action.payload)
        },
        prepare(title: string, content : string){
            return {
                payload:{
                    id : nanoid(),
                    title,
                    content
                }
            }
        }
    }
  },
});


export const {postAdded} = postSlice.actions
export default postSlice.reducer;
