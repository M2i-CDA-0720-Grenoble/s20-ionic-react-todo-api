import { createContext } from "react";
import { ITodo } from "../models";

export interface DataContextValue {
  todos: ITodo[],
  fetchState: number,
  actions?: {
    addTodo: (todo: ITodo) => void,
    removeTodo: (id: number) => void,
  }
}

const defaultValue: DataContextValue = {
  todos: [],
  fetchState: 0,
}

const DataContext = createContext(defaultValue);

export default DataContext;
