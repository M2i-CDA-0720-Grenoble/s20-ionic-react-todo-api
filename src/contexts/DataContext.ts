import { createContext } from "react";
import { ITodo } from "../models";

export interface DataContextValue {
  todos: ITodo[],
  fetchState: number,
  actions: {
    [actionName: string]: Function,
  }
}

const defaultValue: DataContextValue = {
  todos: [],
  fetchState: 0,
  actions: {},
}

const DataContext = createContext(defaultValue);

export default DataContext;
