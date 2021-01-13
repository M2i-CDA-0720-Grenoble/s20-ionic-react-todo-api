import { IonItem } from "@ionic/react";
import React, { FC } from "react";
import { ITodo } from "../models";

interface TodoProps {
  todo: ITodo,
}

const Todo: FC<TodoProps> = ({ todo }) =>
  <IonItem>
    {todo.text}
  </IonItem>
;

export default Todo;
