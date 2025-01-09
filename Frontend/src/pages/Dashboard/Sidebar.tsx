import { Button } from "@/components/ui/button"
import Doc from "@/icons/Doc"
import Link from "@/icons/Link"
import Tweet from "@/icons/Tweet"
import Video from "@/icons/Video"
import axios from "axios"
import { LogOut, LucideBrainCircuit, Trash2 } from "lucide-react"
import { Hash } from 'lucide-react';
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Sidebar = () => {

    const navigate = useNavigate();
    
    const logoutHandler = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/user/logout");
            if(res.data.success) {
                toast.success(res.data.message);
                navigate("/");
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="bg-gray-100 max-w-[15rem] min-h-screen p-4 fixed">
            <div className="flex items-center gap-1">
                <LucideBrainCircuit size={35} className="text-red-500 font-bold" />
                <h1 className="text-2xl font-semibold font-poppins text-red-500">BrainBox</h1>
            </div>

            <div className="mt-10 p-5 flex flex-col gap-5">
                <div className="flex items-center gap-1">
                    <Tweet />
                    <h1 className="text-md font-poppins text-slate-600">Tweet</h1>
                </div>
                <div className="flex items-center gap-1">
                    <Video/>
                    <h1 className="text-md font-poppins text-slate-600">Videos</h1>
                </div>
                <div className="flex items-center gap-1">
                    <Doc/>
                    <h1 className="text-md font-poppins text-slate-600">Documents</h1>
                </div>
                <div className="flex items-center gap-1">
                    <Link/>
                    <h1 className="text-md font-poppins text-slate-600">Links</h1>
                </div>
                <div className="flex items-center gap-1">
                    <Hash className="text-slate-600"/>
                    <h1 className="text-md font-poppins text-slate-600">Links</h1>
                </div>
                
            </div>

            <div className="flex flex-col mt-[17rem] gap-3">
                <Button onClick={logoutHandler} variant={"outline"}><LogOut/> Logout</Button>
                <Button variant={"outline"} className="border-red-500 text-red-500 hover:text-red-600"><Trash2/> Delete Account</Button>
            </div>
        </div>
  )
}

export default Sidebar