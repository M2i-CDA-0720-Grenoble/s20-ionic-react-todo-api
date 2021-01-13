import { IonItem } from "@ionic/react";
import React, { FC } from "react";
import { ITodo } from "../models";
import DeleteTodoButton from "./DeleteTodoButton";

interface TodoProps {
  todo: ITodo,
}

const Todo: FC<TodoProps> = ({ todo }) =>
  <IonItem>
    {todo.text}

    {
      todo.id &&
      <DeleteTodoButton id={todo.id} />
    }

  </IonItem>
;

export default Todo;
