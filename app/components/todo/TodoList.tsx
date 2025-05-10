"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from "@/app/store/todoSlice";
import styles from "./TodoList.module.css";

export default function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const todos = useSelector((state: any) => state.todos.todos);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo("");
    }
  };

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

      <ul className={styles.todoList}>
        {todos.map((todo: any) => (
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
