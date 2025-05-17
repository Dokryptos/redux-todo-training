import type { Metadata } from "next";
import TodoList from "./components/todo/TodoList";

export default function IndexPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <TodoList />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
