import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link2, LogOut } from "lucide-react";

const Header = () => {

    const navigate = useNavigate()
    const user = false;

    return (
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
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>IS</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Ishan</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link2 className="mr-2 h-4 w-4" />
                                    <span>My Links</span>
                                    </DropdownMenuItem>
                                <DropdownMenuItem className={"text-red-400"}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            </div>
        </nav>
    )
}

export default Header