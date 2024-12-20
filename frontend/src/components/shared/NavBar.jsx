import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function NavBar() {
  // const [user, setUser] = useState(false); 
  const { user } = useSelector((store) => store.auth);

  return (
    <nav className="max-w-screen-xl mx-auto mt-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold font-serif">
          Hire<span className="text-blue-400">Nest</span>
        </h3>
        <div className="flex items-center gap-10 ">
          <ul className="flex items-center gap-6 font-medium cursor-pointer">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Job</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
          <div>
            {!user ? (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline">Signup</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      className="w-10 h-10 cursor-pointer  rounded-full"
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-80 p-2 mt-2 mr-4 flex flex-col gap-2 shadow-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        className="w-10 h-10 cursor-pointer  rounded-full"
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-serif font-medium">Sidhant Singh</h4>
                      <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-1 cursor-pointer w-fit pl-2">
                      <User2 />
                      <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer w-fit pl-2">
                      <LogOut />
                      <Button variant="link">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
