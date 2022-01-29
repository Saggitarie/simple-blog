import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BlogCommentsState {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
