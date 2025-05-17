"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  Todo,
} from "@/app/store/todoSlice";
import styles from "./TodoList.module.css";

export default function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const todos = useSelector(
    (state: { todos: { todos: Todo[]; filter: string } }) => state.todos.todos
  );
  const filter = useSelector(
    (state: { todos: { todos: Todo[]; filter: string } }) => state.todos.filter
  );
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo("");
    }
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className={styles.container}>
      <h1>Ma Liste de Tâches</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Ajouter une nouvelle tâche..."
          className={styles.input}
        />
        <button type="submit" className={styles.addButton}>
          Ajouter
        </button>
      </form>

      <div className={styles.filters}>
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={filter === "all" ? styles.activeFilter : ""}
        >
          Toutes
        </button>
        <button
          onClick={() => dispatch(setFilter("active"))}
          className={filter === "active" ? styles.activeFilter : ""}
        >
          Actives
        </button>
        <button
          onClick={() => dispatch(setFilter("completed"))}
          className={filter === "completed" ? styles.activeFilter : ""}
        >
          Complétées
        </button>
      </div>

      <ul className={styles.todoList}>
        {filteredTodos.map((todo: Todo) => (
          <li key={todo.id} className={styles.todoItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
              className={styles.checkbox}
            />
            <span
              className={`${styles.todoText} ${
                todo.completed ? styles.completed : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className={styles.deleteButton}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
