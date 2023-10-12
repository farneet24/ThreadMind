import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import VideoAndChannelInfo from "./Youtube.js";
import Summary from "./Summary.js";
import SentimentChart from "./SentimentChart.js";
import EmotionChart from "./EmotionChart.js";
import CyberChart from "./CyberChart.js";
import loadingGif1 from "./Infinity-1s-230px-light.gif";
import loadingGif2 from "./Infinity-1s-230px-dark.gif";
import Reddit from "./Reddit.js";
import RatingForm from "./Rating";

// Sample data for the cards
const sampleLinks = [
  {
    title: "How does a blockchain work",
    description: "A guide to understanding the blockchain.",
    link: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
    image: "https://i.ytimg.com/vi/SSo_EIwHSd4/maxresdefault.jpg",
  },
  {
    title: "Cryptography: Crash Course",
    description: "A quick dive into the world of cryptography.",
    link: "https://www.youtube.com/watch?v=jhXCTbFnK8o",
    image: "https://i.ytimg.com/vi/jhXCTbFnK8o/maxresdefault.jpg",
  },
  {
    title: "Climate change: Earth's giant game of Tetris",
    description: "Exploring the complex interplay of climate change factors.",
    link: "https://www.youtube.com/watch?v=ztWHqUFJRTs",
    image: "https://i.ytimg.com/vi/ztWHqUFJRTs/maxresdefault.jpg",
  },
  {
    title: "What Is Intelligence? Where Does it Begin?",
    description: "An inquiry into the nature and origins of intelligence.",
    link: "https://www.youtube.com/watch?v=ck4RGeoHFko",
    image: "https://i.ytimg.com/vi/ck4RGeoHFko/maxresdefault.jpg",
  },
  {
    title: "How to Learn Any Language",
    description: "Effective strategies for mastering a new language.",
    link: "https://www.youtube.com/watch?v=J_EQDtpYSNM",
    image: "https://i.ytimg.com/vi/J_EQDtpYSNM/maxresdefault.jpg",
  },
  {
    title: "Introduction to Stoicism",
    description: "An introduction to the ancient philosophy of Stoicism.",
    link: "https://www.youtube.com/watch?v=o0MzQZ_eFEY",
    image: "https://i.ytimg.com/vi/o0MzQZ_eFEY/maxresdefault.jpg",
  },
  {
    title: "Do schools kill creativity?",
    description: "A critical look at the modern education system.",
    link: "https://www.youtube.com/watch?v=iG9CE55wbtY",
    image: "https://pi.tedcdn.com/r/pe.tedcdn.com/images/ted/6b6eb940bceab359ca676a9b486aae475c1df883_2880x1620.jpg?u%5Br%5D=2&u%5Bs%5D=0.5&u%5Ba%5D=0.8&u%5Bt%5D=0.03&quality=82w=640",
  },
  {
    title: "Double Rainbow",
    description: "Viral nature wonder.",
    link: "https://www.youtube.com/watch?v=OQSNhk5ICTI",
    image: "https://i.ytimg.com/vi/oFSSdUhid6Q/hq720.jpg",
  },
  {
    title: "Rick Astley - Never Gonna Give You Up",
    description: "Iconic '80s hit.",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    image: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    title: "Billie Eilish - Happier Than Ever",
    description: "Eilish's emotional ballad.",
    link: "https://www.youtube.com/watch?v=5GJWxDKyk3A",
    image: "https://i.ytimg.com/vi/5GJWxDKyk3A/maxresdefault.jpg",
  },
  {
    title: "NASA: Journey to Mars",
    description: "Mars mission explained.",
    link: "https://www.youtube.com/watch?v=SgEsf4QcR0Q",
    image: "https://i.ytimg.com/vi/SgEsf4QcR0Q/maxresdefault.jpg",
  },
  {
    title: "Key & Peele: Substitute Teacher",
    description: "Comedic classroom skit.",
    link: "https://www.youtube.com/watch?v=Dd7FixvoKBw",
    image: "https://i.ytimg.com/vi/Dd7FixvoKBw/maxresdefault.jpg",
  },
  {
    title: "How to Add Music to Your YouTube Video in 2022",
    description: "Music addition guide.",
    link: "https://www.youtube.com/watch?v=VPqAPjNsmgA",
    image: "https://i.ytimg.com/vi/VPqAPjNsmgA/maxresdefault.jpg",
  },
  

  {
    title: "I Hunted 100 People!",
    description: "Epic Mr. Beast challenge.",
    link: "https://www.youtube.com/watch?v=65fN_OUawjk",
    image: "https://i.ytimg.com/vi/65fN_OUawjk/maxresdefault.jpg",
  },
  {
    title: "Taylor Swift - Bejeweled (Official Music Video)",
    description: "Taylor's hit single.",
    link: "https://www.youtube.com/watch?v=b7QlX3yR2xs",
    image: "https://i.ytimg.com/vi/b7QlX3yR2xs/maxresdefault.jpg",
  },
  {
    title: "Selena Gomez - Slow Down (Official)",
    description: "Selena's sultry new track.",
    link: "https://www.youtube.com/watch?v=Z8eXaXoUJRQ",
    image: "https://i.ytimg.com/vi/Z8eXaXoUJRQ/maxresdefault.jpg",
  },
  {
    title: "Evolution of Dance",
    description: "Iconic dance moves.",
    link: "https://www.youtube.com/watch?v=dMH0bHeiRNg",
    image: "https://i.ytimg.com/vi/dMH0bHeiRNg/mqdefault.jpg",
  },
  {
    title: "The Fermi Paradox — Where Are All The Aliens?",
    description: "Alien existence explored.",
    link: "https://www.youtube.com/watch?v=sNhhvQGsMEc",
    image: "https://i.ytimg.com/vi/sNhhvQGsMEc/sddefault.jpg",
  },
  {
    title: "The Weeknd - Save Your Tears",
    description: "Emotional Weeknd hit.",
    link: "https://www.youtube.com/watch?v=XXYlFuWEuKI",
    image: "https://i.ytimg.com/vi/XXYlFuWEuKI/maxresdefault.jpg",
  },
  {
    title: "Adele Carpool Karaoke",
    description: "Adele's car sing-along.",
    link: "https://www.youtube.com/watch?v=Nck6BZga7TQ",
    image: "https://i.ytimg.com/vi/nV8UZJNBY6Y/maxresdefault.jpg",
  },
  {
    title: "Quantum Computing Explained",
    description: "Intro to quantum tech.",
    link: "https://www.youtube.com/watch?v=u1XXjWr5frE",
    image: "https://i.ytimg.com/vi/u1XXjWr5frE/maxresdefault.jpg",
  },
  
  {
    title: "Fortnite Chapter 2",
    description: "New chapter, new adventures.",
    link: "https://www.youtube.com/watch?v=3KgmY5NrEzU",
    image: "https://i.ytimg.com/vi/3KgmY5NrEzU/maxresdefault.jpg",
  },
  {
    title: "The Egg - A Short Story",
    description: "Life, death, and rebirth.",
    link: "https://www.youtube.com/watch?v=h6fcK_fRYaI",
    image: "https://i.ytimg.com/vi/h6fcK_fRYaI/maxresdefault.jpg",
  },
  {
    title: "Shawn Mendes: Wonder",
    description: "A musical journey.",
    link: "https://www.youtube.com/watch?v=fHeQemJJQII",
    image: "https://pbs.twimg.com/media/EjS8USrXgAASwUc.jpg",
  },
  {
    title: "How to Draw a Dragon",
    description: "Sketch your own dragon.",
    link: "https://www.youtube.com/watch?v=C9akmV8aR44",
    image: "https://i.ytimg.com/vi/C9akmV8aR44/maxresdefault.jpg",
  },
  {
    title: "Making Humans a Multiplanetary Species",
    description: "SpaceX's grand vision.",
    link: "https://www.youtube.com/watch?v=H7Uyfqi_TE8",
    image: "https://i.ytimg.com/vi/H7Uyfqi_TE8/maxresdefault.jpg",
  },
  {
    title: "Cute Animals Compilation",
    description: "Adorable animal moments.",
    link: "https://www.youtube.com/watch?v=-XHySh2TN94",
    image: "https://i.ytimg.com/vi/-XHySh2TN94/maxresdefault.jpg",
  },
  {
    title: "DO WHAT YOU CAN'T",
    description: "Break your limits.",
    link: "https://www.youtube.com/watch?v=jG7dSXcfVqE",
    image: "https://i.ytimg.com/vi/jG7dSXcfVqE/maxresdefault.jpg",
  },
  
  {
    title: "The operating system of life",
    description: "Life's inner workings",
    link: "https://www.youtube.com/watch?v=JufLDxmCwB0",
    image: "https://i.ytimg.com/vi/JufLDxmCwB0/maxresdefault.jpg",
  },
  {
    title: "The History of the Internet",
    description: "Internet's origin story",
    link: "https://www.youtube.com/watch?v=9hIQjrMHTv4",
    image: "https://i.vimeocdn.com/video/517497617-9ac258f6394c694c2baf982620972f1cc87eed1ae84d4a9caf048c742e076663-d_640?f=webp",
  },
  {
    title: "Lin-Manuel Miranda Performs ‘My Shot’",
    description: "Hamilton's iconic song",
    link: "https://www.youtube.com/watch?v=dFjIPacvz2c",
    image: "https://i.ytimg.com/vi/dFjIPacvz2c/maxresdefault.jpg",
  },
  {
    title: "Football Highlights: Messi vs Ronaldo",
    description: "Soccer legends duel",
    link: "https://www.youtube.com/watch?v=a6ae_-lCggc",
    image: "https://i.ytimg.com/vi/a6ae_-lCggc/maxresdefault.jpg",
  },
  {
    title: "What is a Neural Network?",
    description: "AI basics explained",
    link: "https://www.youtube.com/watch?v=aircAruvnKk",
    image: "https://i.ytimg.com/vi/aircAruvnKk/maxresdefault.jpg",
  },
  {
    title: "GitHub Basics Tutorial",
    description: "Master GitHub",
    link: "https://www.youtube.com/watch?v=x0EYpi38Yp4",
    image: "https://i.ytimg.com/vi/x0EYpi38Yp4/maxresdefault.jpg",
  },
  {
    title: "Quantum Computing for Computer Scientists",
    description: "Quantum computing 101",
    link: "https://www.youtube.com/watch?v=F_Riqjdh2oM",
    image: "https://ahelwer.ca/img/quantum-video-preview.png",
  },
  {
    title: "The Science of Emotions",
    description: "Emotions decoded",
    link: "https://www.youtube.com/watch?v=65e2qScV_K8",
    image: "https://i.ytimg.com/vi/65e2qScV_K8/maxresdefault.jpg",
  },
  {
    title: "Arctic Sea Ice",
    description: "Ice crisis",
    link: "https://www.youtube.com/watch?v=Q7iJPQFrrJs",
    image: "https://i.ytimg.com/vi/Q7iJPQFrrJs/maxresdefault.jpg",
  },
  {
    title: "Mathematics of Machine Learning",
    description: "ML math basics",
    link: "https://www.youtube.com/watch?v=1VSZtNYMntM",
    image: "https://i.ytimg.com/vi/1VSZtNYMntM/maxresdefault.jpg",
  },
  {
    title: "How to be an Entrepreneur",
    description: "Startup essentials",
    link: "https://www.youtube.com/watch?v=lJjILQu2xM8",
    image: "https://i.ytimg.com/vi/lJjILQu2xM8/maxresdefault.jpg",
  },
  {
    title: "The Science of Productivity",
    description: "Be more productive",
    link: "https://www.youtube.com/watch?v=lHfjvYzr-3g",
    image: "https://i.ytimg.com/vi/lHfjvYzr-3g/maxresdefault.jpg",
  },
  
];

export default function TextForm(props) {
  const location = useLocation();
  const [text, setText] = useState("");
  const [data, setData] = useState({});
  const [invalidUrl, setInvalidUrl] = useState(false); // New state variable
  const [showComponents, setShowComponents] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state
  const [refresh, setRefresh] = useState(false); // New state
  const [urlType, seturlType] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isSentimentLoading, setIsSentimentLoading] = useState(false);
  const [isEmotionLoading, setIsEmotionLoading] = useState(false);
  const [isCyberLoading, setIsCyberLoading] = useState(false);
  const [showCards, setShowCards] = useState(true); // New state variable
  const [backenderror, setBackend] = useState(false);

  const handleCardClick = (link) => {
    console.log("The link is", link);
    setText(link);
    setBackend(false);
    setInvalidUrl(false);
    analyzeURL(link);
    setShowComponents(true);
    setShowCards(false); // Hide the cards and show loading/analysis
  };

  const handleClearClick = () => {
    setText("");
    setData({});
    setShowComponents(false);
    setShowCards(true); // Show the cards again
  };

  // <----------- THESE FUNCTIONS JUST CHECK IF THE LINK IS ACCEPTABLE OR NOT ------------------------->

  // Youtube Function to extract the ID from the video link
  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be|m\.youtube\.com)\/(?:watch\?v=|embed\/|shorts\/|v\/|share\?v=|attribution_link\?.*u=\/watch\?v=)?([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Reddit Function to extract the ID of the post
  const extractRedditPostId = async (url) => {
    const standardRegex =
      /(?:https?:\/\/)?(?:www\.)?reddit\.com\/r\/\w+\/comments\/([a-zA-Z0-9_]+)\//;
    let standardMatch = url.match(standardRegex);
    if (standardMatch) return standardMatch[1];

    // Adjusted embeddedRegex
    const embeddedRegex =
      /https:\/\/www\.reddit\.com\/r\/\w+\/comments\/([a-zA-Z0-9_]+)\//;
    let embeddedMatch = decodeURIComponent(url).match(embeddedRegex);
    if (embeddedMatch) return embeddedMatch[1];

    // New block to handle special URL format
    const specialRegex =
      /(?:https?:\/\/)?(?:www\.)?reddit\.com\/r\/\w+\/s\/([a-zA-Z0-9_]+)/;
    let specialMatch = url.match(specialRegex);
    if (specialMatch) {
      return specialMatch[1];
    }

    return null;
  };

  const analyzeURL = async (link = null) => {
    console.log("Initial text is ", link);

    // Using a variable to hold the text you're going to analyze
    const textToAnalyze = link || text;

    // Now textToAnalyze can be reliably used for further operations
    console.log("Text to analyze is ", textToAnalyze);
    setText(textToAnalyze);
    // Assuming extractRedditPostId is an async function
    const redditId = await extractRedditPostId(textToAnalyze);

    // Assuming extractVideoId is a synchronous function
    const youtubeId = extractVideoId(textToAnalyze);

    if (redditId) {
      seturlType("reddit"); // Make sure seturlType is defined
      setInvalidUrl(false); // Make sure setInvalidUrl is defined
      await fetchData(textToAnalyze);
    } else if (youtubeId) {
      seturlType("youtube"); // Make sure seturlType is defined
      setInvalidUrl(false); // Make sure setInvalidUrl is defined
      await fetchData(textToAnalyze);
    } else {
      setInvalidUrl(true); // Make sure setInvalidUrl is defined
    }
  };

  const fetchData = async (textToAnalyze) => {
    setIsLoading(true);
    setIsSentimentLoading(true);
    setIsEmotionLoading(true);

    try {
      const response = await fetch(
        "https://threadmind-3bfd4831eee7.herokuapp.com/api/urls/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: textToAnalyze, // Use the text from the input field
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const outer_json = await response.json();
      console.log("Backend Response:", outer_json); // Debugging line

      setData(outer_json);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setBackend(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handle = (event) => {
    setText(event.target.value);
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the array and get the first 6 items
  const [selectedLinks, setSelectedLinks] = useState([]);

  useEffect(() => {
    const shuffledLinks = shuffleArray([...sampleLinks]);
    setSelectedLinks(shuffledLinks.slice(0, 6));
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  return (
    <>
      <div className="container">
        <h1
          className={`text-${
            props.mode === "dark" ? "light" : "dark"
          } text-center`}
        >
          {props.heading}
        </h1>
        <br />
      </div>
      <div
        className={`dropdown container custom-dropdown`}
        style={{ marginBottom: "10px" }}
      >
        <button
          className="btn btn-warning dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Acceptable Content Types
        </button>
        <ul
          className={`dropdown-menu custom-dropdown text-${
            props.mode === "dark" ? "light" : "dark"
          } bg-${props.mode === "dark" ? "dark" : "light"}`}
          aria-labelledby="dropdownMenuButton1"
        >
          <li
            className={`safe-zone ${
              props.mode === "dark" ? "safe-zone-dark" : ""
            }`}
          >
            <h6
              className={`dropdown-header text-${
                props.mode === "dark" ? "light" : "dark"
              }`}
            >
              Safe Zone:
            </h6>
            <div
              className={`zone-item ${
                props.mode === "dark" ? "zone-item-dark" : "zone-item-light"
              }`}
            >
              <span className="icon-container">
                <i className="fab fa-reddit"></i>
              </span>
              Reddit Posts
            </div>
            <div
              className={`zone-item ${
                props.mode === "dark" ? "zone-item-dark" : "zone-item-light"
              }`}
            >
              <span className="icon-container">
                <i className="fab fa-youtube"></i>
              </span>
              YouTube Videos
            </div>
            <div
              className={`zone-item ${
                props.mode === "dark" ? "zone-item-dark" : "zone-item-light"
              }`}
            >
              <span className="icon-container">
                <i className="fas fa-video"></i>
              </span>
              YouTube Shorts
            </div>
          </li>
          <li
            className={`danger-zone ${
              props.mode === "dark" ? "danger-zone-dark" : ""
            }`}
          >
            <h6
              className={`dropdown-header text-${
                props.mode === "dark" ? "light" : "dark"
              }`}
            >
              Danger Zone
            </h6>

            <div
              className={`zone-item ${
                props.mode === "dark" ? "zone-item-dark" : "zone-item-light"
              }`}
            >
              <span className="icon-container">
                <i className="fas fa-times"></i>
              </span>
              Playlists, Channels, Subreddits
            </div>
          </li>
        </ul>
      </div>

      <div className="container my-container">
        <input
          type="text"
          placeholder="Enter the link of a YouTube video or Reddit post"
          onChange={handle}
          value={text}
          onKeyPress={(e) => {
            if (e.key === "Enter" && text.length > 0) {
              analyzeURL();
              setShowComponents(true);
              setRefresh(!refresh); // Toggle refresh state to force re-render
              setShowCards(false);
              setBackend(false);
              setInvalidUrl(false);
            }
          }}
          className={`bg-${props.mode === "dark" ? "dark" : "light"} text-${
            props.mode === "dark" ? "light" : "dark"
          } form-control `}
        />
        <div className="button-container">
          <button
            disabled={text.length === 0 || isLoading}
            className="btn btn-success rounded-2 py-2 px-3"
            onClick={() => {
              analyzeURL();
              setShowComponents(true);
              setRefresh(!refresh); // Toggle refresh state to force re-render
              setShowCards(false);
              setBackend(false);
              setInvalidUrl(false);
            }}
          >
            Analyze
          </button>
          <button
            disabled={text.length === 0 || isLoading}
            className="btn btn-danger rounded-2 py-2 px-3"
            onClick={handleClearClick}
          >
            Clear
          </button>
        </div>
      </div>

      <br />
      <br />
      {showCards && (
        <div className="card-container-home">
          {selectedLinks.map((sample, index) => (
            <div
              className={`img-card iCard-style3`}
              key={index}
              style={{
                boxShadow:
                  props.mode === "dark"
                    ? "0px 5px 9px 0px rgba(255,255,255,0.5)"
                    : "",
              }}
            >
              <div className="card-content">
                <div className="card-image">
                  <img src={sample.image} alt={sample.title} />
                </div>

                <div
                  className={`card-text text-${
                    props.mode === "dark" ? "light" : "dark"
                  }`}
                >
                  <h4 title={sample.title}>{sample.title}</h4>{" "}
                  <p className="card-type-text">{sample.description}</p>
                </div>
              </div>

              <div className="card-link">
                <a
                  style={{
                    color: isHovered
                      ? props.mode === "dark"
                        ? "#16FF00"
                        : "#e80786"
                      : props.mode === "dark"
                      ? "#16FF00"
                      : "#e80786",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  title="Click to Analyze"
                  rel="noopener noreferrer"
                >
                  <span
                    onClick={() => {
                      handleCardClick(sample.link);
                      window.scrollTo(0, 0); // This will scroll the page to the top
                    }}
                  >
                    Get Started
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
          }}
        >
          <img
            src={props.mode === "dark" ? loadingGif2 : loadingGif1}
            alt="Loading..."
          />
        </div>
      )}

      {invalidUrl && showComponents && (
        <div className="alert alert-danger" role="alert">
          Invalid URL
        </div>
      )}

      {backenderror && showComponents && (
        <div className="alert alert-danger" role="alert">
          We are unable to fetch details for the video/post requested. Sorry for
          the inconvenience.
        </div>
      )}


      {!isLoading && showComponents && urlType === "youtube" && (
        <VideoAndChannelInfo jsonData={data} mode={props.mode} />
      )}

      {!isLoading && showComponents && urlType === "reddit" && (
        <Reddit jsonData={data} mode={props.mode} />
      )}

      {!isLoading && showComponents && (
        <Summary jsonData={data} mode={props.mode} />
      )}
      <br />
      <br />

      {!isLoading && showComponents && (
        <SentimentChart
          jsonData={data}
          mode={props.mode}
          isLoading={isSentimentLoading}
          setIsLoading={setIsSentimentLoading}
        />
      )}

      <br />
      <br />
      {!isLoading && showComponents && (
        <EmotionChart
          jsonData={data}
          mode={props.mode}
          isLoading={isEmotionLoading}
          setIsLoading={setIsEmotionLoading}
        />
      )}

      {!isLoading && showComponents && (
        <CyberChart
          jsonData={data}
          mode={props.mode}
          isLoading={isCyberLoading}
          setIsLoading={setIsCyberLoading}
        />
      )}
      <br />
      <br />
      {!isLoading && showComponents && (<RatingForm mode={props.mode}/>)}

    </>
  );
}
