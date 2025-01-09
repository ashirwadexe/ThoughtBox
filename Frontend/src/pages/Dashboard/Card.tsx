import { Badge } from '@/components/ui/badge';
import Share from '@/icons/Share';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Tweet } from 'react-tweet';
import ReactPlayer from 'react-player';
import './Card.css'

const Card = () => {
  interface Content {
    _id: string;
    title: string;
    link: string;
    type: string;
    tags: string[];
  }

  const [content, setContent] = useState<Content[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/v1/content/getAllContent',
          { withCredentials: true }
        );
        if (res.data.success) {
          setContent(res.data.contents);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };
    fetchContent();
  }, []);

  // Helper function to extract tweet ID from the tweet URL
  const extractTweetId = (link: string): string | null => {
    const tweetIdRegex = /status\/(\d+)/;
    const match = link.match(tweetIdRegex);
    return match ? match[1] : null;
  };

  // Helper function to render content based on type
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
            Read Article
          </a>
        );
      case 'image':
        return <img src={link} alt="Content Image" className="w-full h-auto rounded" />;
      default:
        return <p>Unsupported content type</p>;
    }
  };

  return (
    <div className="mr-5 ml-[13rem] px-7 py-4 grid grid-cols-4 gap-4">
      {content.map((item) => (
        <div key={item._id} className="border w-[18rem] flex flex-col p-3 rounded-md">
          {/* HEADING */}
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">{item.title}</p>
            <div className="flex gap-2">
              <p>
                <Share />
              </p>
              <p>
                <Trash2 />
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
              <Badge key={idx}>#{tag}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
