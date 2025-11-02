import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";




export default function LoginForm(){
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");

    return(
        <form className="shadow-lg w-1/3 rounded-3xl gap-3 py-5 px-10 flex flex-col">
            <h1 className="text-3xl font-extrabold">Sign In</h1>
            <Input value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <div className="flex flex-col mb-4">
            <Input  type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <div className="flex justify-end text-xs text-gray-400 mt-1">
            <button className="hover:text-primary mt-1">Forgot Password?</button>
            </div>
            </div>
            <div className="flex flex-col items-center gap-4">
            <Button label="Login" className="rounded-full" iconPosition="right" icon={<ArrowRightIcon />} />
            <span className="text-xs items-center text-gray-400 flex gap-3">don't have an account ?<Link to="/signup" className="text-primary text-sm hover:underline" >Sign Up</Link></span>
            </div>
        </form>
    )
}