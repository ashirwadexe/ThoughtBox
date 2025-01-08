import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { LockKeyholeIcon, User } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {

    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const inputHandler = (e: any) => {
        setInput({...input, [e.target.name]: e.target.value});
    };

    const submitHandler = async () => {
        console.log(input);
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/register", input, 
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            if(res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="border border-red-200 p-5 rounded-md">
                <h1 className='text-2xl font-semibold text-red-500'>Create Your Account</h1>
                <div className="relative w-[300px] mt-4">
                <Input
                type="text"
                placeholder="Username"
                className="pl-10 py-2 pr-4 "
                name="username"
                value={input.username}
                onChange={inputHandler}
                required
                />
                <User size={19} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <div className="relative w-[300px] mt-4">
                    <Input
                    type="password"
                    placeholder="Password"
                    className="pl-10 py-2 pr-4"
                    value={input.password}
                    name="password"
                    onChange={inputHandler}
                    required
                    />
                    <LockKeyholeIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <Button onClick={submitHandler} className="w-full mt-4 bg-red-500 hover:bg-red-400">Signup</Button>
                <p className="text-[10px] text-center mt-2 text-slate-400 hover:underline hover:text-sky-600"><Link to={"/login"}>Already have an account ? click here</Link></p>
            </div>
        </div>
    )
}

export default SignUp