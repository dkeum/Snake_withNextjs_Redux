import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

export type user = {
  id: string,
  name: string,
};

const initialState: user[] = [
  {
    id: "1",
    name: "Dan",

  },
  {
    id: "2",
    name: "Bob",
  },
];

export const userSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
  },
});



export default userSlice.reducer;
