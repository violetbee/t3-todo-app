import { Todos } from "@prisma/client";
import React, { createContext, ReactNode, useContext } from "react";
import { trpc } from "../utils/trpc";
import { z } from "zod";

type ITodo = {
  id: string;
  name: string;
  checked: boolean;
};

type IMutations = {
  todos: ITodo[];
  isTodosLoading: boolean;
  addTodoMutation: any;
  setTodoMutation: any;
};

type Props = {
  children: ReactNode;
};

const mutationDefaultValues: IMutations = {
  todos: [],
  isTodosLoading: false,
  addTodoMutation: () => null,
  setTodoMutation: () => null,
};

const MutationContext = createContext<IMutations>(mutationDefaultValues);

export function useMutationProvider() {
  return useContext(MutationContext);
}

export function MutationProvider({ children }: Props) {
  const ctx = trpc.useContext();

  const { data: todos, isLoading: isTodosLoading } = trpc.todos.list.useQuery();

  const addTodoMutation = trpc.todos.addTodo.useMutation({
    onSuccess: () => {
      ctx.todos.list.invalidate();
    },
  });

  const setTodoMutation = trpc.todos.setTodo.useMutation({
    onSuccess: (input) => {
      ctx.todos.list.invalidate();
    },
  });

  const exports: any = {
    todos,
    addTodoMutation,
    setTodoMutation,
    isTodosLoading,
  };

  return (
    <MutationContext.Provider value={exports}>
      {children}
    </MutationContext.Provider>
  );
}
