import { Badge } from '@/components/ui/badge';
import Share from '@/icons/Share';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Tweet } from 'react-tweet';
import ReactPlayer from 'react-player';
import './Card.css'
import Video from '@/icons/Video';
import TweetLogo from '@/icons/TweetLogo';
import Doc from '@/icons/Doc';
import Image from '@/icons/Image';

const Card = () => {

  interface Tag {
    _id: string;
    title: string;
  }

  interface Content {
    _id: string;
    title: string;
    link: string;
    type: string;
    tags: Tag[];
  }

  const [content, setContent] = useState<Content[]>([]);

  const fetchContent = async () => {
    try {
      const res = await axios.get(
        'http://localhost:3000/api/v1/content/getAllContent',
        { withCredentials: true }
      );
      if (res.data.success) {
        console.log(res.data.contents);
        setContent(res.data.contents);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Helper function to extract tweet ID from the tweet URL
  const extractTweetId = (link: string): string | null => {
    const tweetIdRegex = /status\/(\d+)/;
    const match = link.match(tweetIdRegex);
    return match ? match[1] : null;
  };

  // Helper function to render content based on type of the content
  const renderContent = (type: string, link: string) => {
    switch (type) {
      case 'video':
        return (
          <ReactPlayer url={link} height={170}/>
        );
      case 'tweet': {
        const tweetId = extractTweetId(link);
        return tweetId ? <Tweet id={tweetId} /> : <p>Invalid Tweet Link</p>;
      }
      case 'audio':
        return <audio controls src={link} className="w-full"></audio>;
      case 'article':
        return (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            <img src="https://img.freepik.com/free-vector/man-signing-contract-with-big-pen_74855-10909.jpg?t=st=1736438592~exp=1736442192~hmac=3e187233f84fdeb39487a51939ed0af91297f312112ea01a9a536df45a0f0875&w=996" alt="docment-img" />
          </a>
        );
      case 'image':
        return <img src={link} alt="Content Image" className="w-full h-auto rounded" />;
      default:
        return <p>Unsupported content type</p>;
    }
  };

  const handleDelete = async (contentId: string) => {
    try {
      const res = await axios.delete("http://localhost:3000/api/v1/content/deleteContent", 
        {
          data: { contentId },
          withCredentials: true
        }
      );
      if(res.data.success) {
        toast.success(res.data.message);
        fetchContent();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  
  //helper function to render logoType
  const renderLogo = (type: string) => {
    switch(type) {
      case 'video': return <Video/>;
      case 'tweet': return <TweetLogo/>;
      case 'article': return <Doc/>
      case 'image': return <Image/>
      default: return <p>#</p>
    }
  };

  return (
    <div className="mr-5 ml-[13rem] px-7 py-4 grid grid-cols-4 gap-4">
      {content.map((item) => (
        <div key={item._id} className="border w-[18rem] flex flex-col p-3 rounded-md">
          {/* HEADING */}
          <div className="flex items-center justify-between">
            <div className='flex gap-1 items-center'>
              {renderLogo(item.type)}
              <p className="text-md font-semibold">{item.title}</p>
            </div>
            <div className="flex gap-2">
              <p>
                <Share />
              </p>
              <p 
                onClick={() => handleDelete(item._id)}
                className='cursor-pointer'
              >
                <Trash2 className='hover:text-red-500' />
              </p>
            </div>
          </div>

          {/* MEDIA */}
          <div className="flex items-center justify-center my-5">
            {renderContent(item.type, item.link)}
          </div>

          {/* TAGS */}
          <div className="flex gap-2 flex-wrap">
            {item.tags.map((tag, idx) => (
              <Badge key={idx}>#{tag.title}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
