"use client";

import supabaseClient from "@/lib/database";
import { useAuth } from "@clerk/nextjs"
import { useState } from "react";

const AddTodoForm = ({ todos, setTodos }) => {
    const { getToken, userId } = useAuth();
    const [newTodo, setNewTodo] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newTodo === "") {
            return;
        }

        const supabaseAccessToken = await getToken({
            template: "supabase",
        });
        const supabase = await supabaseClient((supabaseAccessToken as string));
        const { data } = await supabase
            .from("todos")
            .insert({ title: newTodo, user_id: userId })
            .select();

        // FIXME: is this desired behavior?
        if (data) {
            setTodos([...todos, data[0]]);
        }
        setNewTodo("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo} />
            <button>Add Todo</button>
        </form>
    )
}

export default AddTodoForm;