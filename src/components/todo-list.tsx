"use client";

import supabaseClient from "@/lib/database";
import { Database } from "@/types/supabase";
import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { Todo } from "@/types/todo";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import AddTodoDialog from "./add-todo-dialog";

export interface TodoListProps {
    todos: Todo[] | null,
    setTodos: (todos: Todo[] | null) => void,
}

const TodoList = ({ todos, setTodos }: TodoListProps) => {
    const { session } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTodos = async () => {
            try {
                setLoading(true);

                const supabaseAccessToken = await session?.getToken({
                    template: "supabase",
                });
                const supabase = await supabaseClient((supabaseAccessToken as string));

                const { data: todos } = await supabase.from("todos").select("*");
                if (todos) {
                    setTodos(todos);
                }
            } catch (e) {
                alert(e);
            } finally {
                setLoading(false);
            }
        };
        loadTodos();
    }, []);

    if (loading) {
        return <div> Loading.... </div>;
    }

    return (
        <>
            {todos && todos?.length > 0 ? (
                <Table>
                    <TableCaption>A list of your todos.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Todo</TableHead>
                            <TableHead>Time Created</TableHead>
                            <TableHead className="text-right">
                                <AddTodoDialog todos={todos} setTodos={setTodos} />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {todos.map((todo) => (
                            <TableRow>
                                <TableCell className="font-medium">{todo?.title}</TableCell>
                                <TableCell>{todo?.created_at}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div>You don't have any todos!</div>
            )}
        </>
    );
}

export default TodoList;