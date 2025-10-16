import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link2, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { logout } from "db/apiAuth";
import { BarLoader } from "react-spinners";

const Header = () => {

    const navigate = useNavigate()

   const { user, fetchUser } = UrlState();
   const { loading, fn:fnLogout } = useFetch(logout);

    return (
        <>
        <nav className="py-4 flex justify-between items-center mr-4">
            <Link to={"/"}>
                <img src="logo.png" className="h-20" alt="URLy Logo" />
            </Link>

            <div>
                {!user ?
                    <Button onClick={() => { navigate("/auth") }}>Login</Button>
                    : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none w-10 overflow-hidden rounded-full">
                                <Avatar className={"cursor-pointer"}>
                                    <AvatarImage src= {user?.user_metadata?.profile_pic} />
                                    <AvatarFallback>IS</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link to={"/dashboard"} className="flex items-center">
                                    <Link2 className="mr-2 h-4 w-4" />
                                    <span>My Links</span>
                                    </Link>
                                    </DropdownMenuItem>
                                <DropdownMenuItem className={"text-red-400"}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span className="cursor-pointer"
                                        onClick={() => {
                                            fnLogout().then(() =>{
                                                fetchUser();
                                                navigate("/")
                                            });
                                        }}
                                    >Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            </div>
        </nav>
        { loading && <BarLoader className="mb-4" width= "100%" color="#36d7b7" />}
    </>
    );
};

export default Header