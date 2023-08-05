import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs"

const Header = () => {
    const { isSignedIn } = useUser();

    return (
        <header className="">
            <div className="">My Todo App</div>
            {isSignedIn ? (
                <UserButton />
            ) : (
                <div className="">
                    <SignInButton />
                    {" "}
                    <SignUpButton />
                </div>
            )}
        </header>
    );

}
export default Header;