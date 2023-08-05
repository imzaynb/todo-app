import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button";

const Header = () => {
    const { isSignedIn } = useUser();

    return (
        <header className="">
            <div className="">My Todo App</div>
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
        </header>
    );

}
export default Header;