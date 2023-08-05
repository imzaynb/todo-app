import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
    const { isSignedIn } = useUser();

    return (
        <header className="bg-accent flex py-2 px-5 justify-between align-middle">
            <div className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">My Todo App</div>
            <div className="flex justify-between space-x-10 items-center">
                <div>
                    <ModeToggle />
                </div>
                {isSignedIn ? (
                    <UserButton />
                ) : (
                    <div className="">
                        <Button>
                            <SignInButton />
                        </Button>
                        {" "}
                        <Button>
                            <SignUpButton />
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );

}
export default Header;