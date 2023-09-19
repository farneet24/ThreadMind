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

export default function TextForm(props) {
  const location = useLocation();
  const [text, setText] = useState("");
  const [data, setData] = useState({});
  const [invalidUrl, setInvalidUrl] = useState(false); // New state variable
  const [showComponents, setShowComponents] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // New state
  const [refresh, setRefresh] = useState(false); // New state
  const [urlType, seturlType] = useState('')
  const [isSentimentLoading, setIsSentimentLoading] = useState(false);
  const [isEmotionLoading, setIsEmotionLoading] = useState(false);
  const [isCyberLoading, setIsCyberLoading] = useState(false);

  const analyzeURL = () => {
    const redditPattern = new RegExp('https://www\\.reddit\\.com/r/\\w+/comments/([\\w\\d]+)/');
    const youtubePattern = new RegExp('https://www\\.youtube\\.com/watch\\?v=([\\w\\d-]+)');
    const youtubeShortsPattern = new RegExp('https://www\\.youtube\\.com/shorts/([\\w\\d-]+)');
    
    let urlType = '';
  
    if (redditPattern.test(text)) {
      fetchData(urlType);
      seturlType('reddit');
      setInvalidUrl(false);
    } else if (youtubePattern.test(text) || youtubeShortsPattern.test(text)) {
      fetchData(urlType);
      seturlType('youtube');
      setInvalidUrl(false);
    } else {
      setInvalidUrl(true);
    }
  
  };

  const fetchData = async (urlType) => {
    setIsLoading(true);
    setIsSentimentLoading(true);
    setIsEmotionLoading(true);
    console.log(setShowComponents);
  
    try {
      const response = await fetch("https://threadmind-3bfd4831eee7.herokuapp.com/api/urls/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: text, // Use the text from the input field
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const outer_json = await response.json();
      console.log("Backend Response:", outer_json); // Debugging line
      
      setData(outer_json);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handle = (event) => {
    setText(event.target.value);
  };

  console.log(isSentimentLoading);

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

    <div className={ `dropdown container`} style={{marginBottom : '10px'}}>
      <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Acceptable URLs
      </button>
      <ul className={`dropdown-menu dropdown-menu-sm text-${
            props.mode === "dark" ? "light" : "dark"
          } bg-${props.mode === "dark" ? "dark" : "light"}`} aria-labelledby="dropdownMenuButton1">
        <li><h6 className="dropdown-header">URLs should match:</h6></li>
        <li><span className="dropdown-item-text"><code>https://www.reddit.com/r/&lt;subreddit&gt;/comments/&lt;post_id&gt;/</code></span></li>
        <li><span className="dropdown-item-text"><code>https://www.youtube.com/watch?v=&lt;video_id&gt;</code></span></li>
        <li><span className="dropdown-item-text"><code>https://www.youtube.com/shorts/&lt;video_id&gt;</code></span></li>
      </ul>
    </div>

      <div className="container my-container">
        <input
          type="text"
          placeholder="Enter the link of a YouTube video or Reddit post"
          onChange={handle}
          value={text}
          className={`bg-${props.mode === "dark" ? "dark" : "light"} text-${
            props.mode === "dark" ? "light" : "dark"
          } form-control `}
        />
        <div className="button-container">
          <button
            disabled={text.length === 0}
            className="btn btn-primary rounded-2 py-2 px-3"
            onClick={() => {
              analyzeURL();
              setShowComponents(true);
              setRefresh(!refresh); // Toggle refresh state to force re-render
            }}
          >
            Analyze
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary rounded-2 py-2 px-3"
            onClick={() => {
              setText('');
              setData({});
              setShowComponents(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <br />
      <br />
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
      
      {!isLoading && showComponents && urlType === 'youtube' && (
        <VideoAndChannelInfo jsonData={data} mode={props.mode} />
      )}
      
      {!isLoading && showComponents && urlType === 'reddit' && (
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

    </>
  );
}
