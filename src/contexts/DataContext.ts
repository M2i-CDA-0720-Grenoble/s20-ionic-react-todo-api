import { createContext } from "react";
import { ITodo } from "../models";
import RequestState from "../request-state";

export interface DataContextValue {
  todos: ITodo[],
  fetchState: RequestState,
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
