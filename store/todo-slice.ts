import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "@prisma/client";

// Define a type for the slice state
interface todoState {
  todos: Todo[];
}

// Define the initial state using that type
const initialState: todoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const { removeTodo, setTodos } = todoSlice.actions;

export default todoSlice.reducer;
