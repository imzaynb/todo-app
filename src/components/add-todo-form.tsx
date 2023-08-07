"use client";

import supabaseClient from "@/lib/database";
import { useAuth } from "@clerk/nextjs"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Todo } from "@/types/todo";

const formSchema = z.object({
    todo: z.string().min(2),
});

export interface AddTodoFormProps {
    todos: Todo[] | null,
    setTodos: (todos: Todo[] | null) => void,
}

const AddTodoForm = ({ todos, setTodos }: AddTodoFormProps) => {
    const { getToken, userId } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            todo: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const thisTodo = values.todo;

        if (thisTodo === "") {
            return;
        }

        const supabaseAccessToken = await getToken({
            template: "supabase",
        });
        const supabase = await supabaseClient((supabaseAccessToken as string));
        const { data } = await supabase
            .from("todos")
            .insert({ title: thisTodo, user_id: userId })
            .select();

        // FIXME: is this desired behavior?
        if (todos && data) {
            setTodos([...todos, data[0]]);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="todo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Todo</FormLabel>
                            <FormControl>
                                <Input placeholder="cook eggs" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your next todo.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default AddTodoForm;