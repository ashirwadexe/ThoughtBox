import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Share from '@/icons/Share';
import axios from "axios";
import { Plus } from 'lucide-react'; 
import { useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {

    const contentTypes = ['image', 'video', 'article', 'audio', 'tweet']; // Extend as needed

    const [input, setInput] = useState({
        title: "",
        link: "",
        type: contentTypes[0],  // default to 'image'
        tag: ""
    });

    const inputHandler = (e: any) => {
        setInput({...input, [e.target.name]: e.target.value});
    };

    // Handler for selecting content type
    const handleContentTypeChange = (value: string) => {
        setInput((prevState) => ({ ...prevState, type: value }));
    };

    const submitHandler = async () => {
        const payload = {
            ...input,
            tags: input.tag ? input.tag.split(",").map((t) => t.trim()) : [],  // Convert comma-separated tags to array
        };
        console.log(payload);  // Debugging
    
        try {
            const res = await axios.post("http://localhost:3000/api/v1/content/createContent", payload, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
    
            if(res.data.success) {
                toast.success(res.data.message);
                setInput({
                    title: "",
                    link: "",
                    type: contentTypes[0], // reset to default type
                    tag: ""  // Reset tag field
                });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex items-center justify-between p-7 mr-5 ml-[13rem]">
            <h1 className="text-2xl font-semibold">All Notes</h1>
            <div className="flex gap-2">
                <Button 
                    variant={"outline"} 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-500"
                >
                    <Share /> Share Brain
                </Button>
                
                <Popover>
                    <PopoverTrigger>
                        <Button 
                            variant={"outline"} 
                            className="bg-red-500 hover:bg-red-600 text-white hover:text-white"
                        >
                            <Plus /> Add Content 
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="mr-12 mt-5">
                        <div className="flex flex-col gap-4">
                            <Input
                                type="text"
                                placeholder="Title"
                                className="text-xs"
                                name="title"
                                value={input.title}
                                onChange={inputHandler}
                                required
                            />
                            <Input
                                type="text"
                                placeholder="Paste your link"
                                className="text-xs"
                                name="link"
                                value={input.link}
                                onChange={inputHandler}
                                required
                            />
                            <Select value={input.type} onValueChange={handleContentTypeChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Content Type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {contentTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Input
                                type="text"
                                placeholder="tag"
                                className="text-xs"
                                name="tag"
                                value={input.tag}
                                onChange={inputHandler}
                                required
                            />
                        </div>
                        <Button onClick={submitHandler} variant={"outline"} className="w-full mt-4 border-red-500 text-red-500 hover:text-red-600"><Plus/> Add</Button>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default Navbar;
