import React, { useRef, PropsWithChildren } from "react";
import { Todo } from "../models/models";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  term: string;
  searchKeyword(arg: string): void
}

const TodoList: React.FC<PropsWithChildren<props>> = ({
  todos,
  setTodos,
  term,
  searchKeyword
}) => {
  const inputEl = useRef<HTMLInputElement>(null)

  const getSearchTerm = () => {
    searchKeyword(inputEl.current!.value);
  };

  return (
    <>
      <div className="input-search">
        <input
          ref={inputEl}
          type="text"
          placeholder="Search Tasks"
          className="prompt"
          value={term}
          onChange={getSearchTerm}
        />
        <i className="search icon"></i>
      </div>

      <div className="container">
        <Droppable droppableId="TodosList">
          {(provided, snapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Active Tasks</span>
              {todos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={todos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>

  );
};

export default TodoList;
