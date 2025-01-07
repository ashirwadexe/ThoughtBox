import { Button } from "@/components/ui/button";
import { LucideBrainCircuit, LucideMoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-1">
        <LucideBrainCircuit size={35} className="text-red-500 font-bold" />
        <h1 className="text-2xl font-semibold font-poppins text-red-500">
          BrainBox
        </h1>
      </div>
      <h1 className="text-5xl text-gradient text-center font-bold text">
        Your Hub for Links, Videos, and Docs – All in One Place
      </h1>
      <p className="text-center text-slate-500 text-">
        Save and organize tweets, YouTube videos, docs, and links effortlessly.
        Share individual collections or your entire vault – all secured with
        advanced authentication.
      </p>

      <Button 
        className="bg-red-500 text-lg hover:bg-red-600"
        onClick={() => navigate("/sign-up")}
    >
        Get Started Now <LucideMoveRight />
      </Button>
    </div>
  );
};

export default Hero;
