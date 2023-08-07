import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, useForm } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form"
import supabaseClient from "@/lib/database"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Todo } from "@/types/todo"
import { FormEvent, FormEventHandler, ReactNode, SetStateAction, useState } from "react"



export interface AddTodoDialogProps {
    todos: Todo[] | null,
    setTodos: (todos: Todo[] | null) => void | null,
}

const AddTodoDialog = ({ todos, setTodos }: AddTodoDialogProps) => {
    const { getToken, userId } = useAuth();
    const [newTodo, setNewTodo] = useState(undefined);
    const [open, setOpen] = useState(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        if (todos && data) {
            setTodos([...todos, data[0]]);
        }
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">Add Todo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add a Todo</DialogTitle>
                        <DialogDescription>
                            Add a todo to your todo list!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-6 items-center gap-4 my-5">
                        <Label htmlFor="todo" className="text-right">Todo </Label>
                        <Input id="todo" className="col-span-5" onChange={(e) => setNewTodo(e.target.value as unknown as SetStateAction<undefined>)} value={newTodo} />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTodoDialog;