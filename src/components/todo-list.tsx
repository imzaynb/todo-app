"use client";

import supabaseClient from "@/lib/database";
import { Database } from "@/types/supabase";
import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const TodoList = ({ todos, setTodos }) => {
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

                setTodos(todos);
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
            {todos?.length > 0 ? (
                <div>
                    <ol>
                        {todos.map((todo) => (
                            <li key={todo.id}>{todo.title}</li>
                        ))}
                    </ol>
                </div>
            ) : (
                <div>You don't have any todos!</div>
            )}
        </>
    );
}

export default TodoList;