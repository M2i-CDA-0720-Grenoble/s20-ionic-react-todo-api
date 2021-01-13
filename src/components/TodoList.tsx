import { IonList } from "@ionic/react";
import React, { FC } from "react";
import { ITodo } from "../models";
import Todo from "./Todo";

interface TodoListProps {
  todos: ITodo[],
}

const TodoList: FC<TodoListProps> = ({ todos }) =>
  <IonList>
    {
      todos.map(
        (todo, index) =>
          <Todo
            key={index}
            todo={todo}
          />
      )
    }
  </IonList>
;

export default TodoList;
