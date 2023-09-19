import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const areObjectsEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

const Summary = ({ jsonData, mode }) => {
  const lastSentJsonData = useRef(null); // Reference to store the last sent jsonData
  const commentsDiv = useRef(null);
  const commentsKey = useRef(null);
  const [shouldDisplaySummarization, setShouldDisplaySummarization] =
    useState(false);
  const [shouldDisplayKeyword, setShouldDisplayKeyword] = useState(false);
  const openedSessions = new Set(); // To keep track of all session IDs
  const displaySummary = (message) => {
    if (commentsDiv.current) {
      commentsDiv.current.innerHTML += message.replace(/\/n/g, "<br/>");
    }
  };

  const displayKeyword = (message) => {
    if (commentsKey.current) {
      commentsKey.current.innerHTML += message.replace(/\/n/g, "<br/>");
    }
  };

  const handleSummarize = async () => {
    const commentStrings = jsonData.data.comments.slice(0, 15).map((item) => item.Comments);
    setShouldDisplaySummarization(true);
  
    const sendData = async () => {
      try {
        const response = await fetch("https://threadmind-3bfd4831eee7.herokuapp.com/api/storeComments/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comments: commentStrings,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log("Response:", data);
  
        const { sessionId } = data;
        const source = new EventSource(`https://threadmind-3bfd4831eee7.herokuapp.com/stream/${sessionId}/`);
  
        // Check for duplicate session IDs
        if (openedSessions.has(sessionId)) {
          console.log("Duplicate session ID. Closing source.");
          source && source.close();
          return;
        }
  
        openedSessions.add(sessionId); // Add to the set of opened sessions
        commentsDiv.current.innerHTML = "";
  
        source.onmessage = (event) => {
          displaySummary(event.data);
          if (commentsDiv.current) {
            const textContent =
              commentsDiv.current.textContent || commentsDiv.current.innerText;
            const words = textContent.split(/\s+/).filter(Boolean);
            if (words.length >= 1000) {
              source.close(); // Close the source if words exceed 1000
              displaySummary("<span>Word limit reached. Closing stream...</span>");
            }
          }
        };
  
        source.addEventListener(
          "done",
          () => {
            source.close();
          },
          false
        );
  
        source.onerror = (event) => {
          console.error("EventSource failed:", event);
          source.close();
          displaySummary("<span>Error occurred while fetching data.</span>");
        };
  
      } catch (error) {
        console.error("There was an error sending the data", error);
      }
    };
  
    sendData();
  };
  

  const handleKeywords = async () => {
    const commentStrings = jsonData.data.comments.slice(0, 15).map((item) => item.Comments);
    setShouldDisplayKeyword(true);
  
    const sendData = async () => {
      try {
        const response = await fetch("https://threadmind-3bfd4831eee7.herokuapp.com/api/storeComments/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comments: commentStrings,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log("Response:", data);
  
        const { sessionId } = data;
        const source = new EventSource(`https://threadmind-3bfd4831eee7.herokuapp.com/stream/${sessionId}/keywords/`);
  
        // Check for duplicate session IDs
        if (openedSessions.has(sessionId)) {
          console.log("Duplicate session ID. Closing source.");
          source && source.close();
          return;
        }
  
        openedSessions.add(sessionId);
        commentsKey.current.innerHTML = "";
  
        source.onmessage = (event) => {
          displayKeyword(event.data);
          if (commentsKey.current) {
            const textContent =
              commentsKey.current.textContent || commentsKey.current.innerText;
            const words = textContent.split(/\s+/).filter(Boolean);
            if (words.length >= 1000) {
              source.close();
              displayKeyword("<span>Word limit reached. Closing stream...</span>");
            }
          }
        };
  
        source.addEventListener(
          "done",
          () => {
            console.log("EventSource 'done' event received");
            source.close();
          },
          false
        );
  
        source.onerror = (event) => {
          console.error("EventSource failed:", event);
          source.close();
          displayKeyword("<span>Error occurred while fetching data.</span>");
        };
  
      } catch (error) {
        console.error("There was an error sending the data", error);
      }
    };
  
    sendData();
  };
  

  
  useEffect(() => {
    if (!jsonData || !jsonData.data || !jsonData.data.comments) {
      // Handle this by setting a loading or error state
      return;
    }

    if (lastSentJsonData.current && areObjectsEqual(lastSentJsonData.current, jsonData)) {
      return;
    }

    // Update lastSentJsonData ref to the latest jsonData.
    lastSentJsonData.current = jsonData;

    console.log('I am running')
    handleSummarize();
    console.log('I am running after summary')
    handleKeywords();

  }, [jsonData]);

  return (
    <>
      {shouldDisplaySummarization && (
        <div
          style={{
            background: mode === "dark" ? "#1F1F1F" : "#FFFFFF",
            borderRadius: "15px",
            color: mode === "dark" ? "#FFFFFF" : "#1F1F1F",
            padding: "20px",
            margin: "20px auto",
            maxWidth: "100%",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            style={{
              paddingLeft: "0.5%",
              marginBottom: "20px",
              borderBottom: `3px solid ${
                mode === "dark" ? "#3F3F3F" : "#DFDFDF"
              }`,
              color: mode === "dark" ? "#F1F1F1" : "#212121",
            }}
          >
            Summary
          </h1>
          <div
            style={{
              background: mode === "dark" ? "#2E2E2E" : "#F7F7F7",
              color: mode === "dark" ? "#E1E1E1" : "#2E2E2E",
              padding: "15px",
              borderRadius: "10px",
              fontSize: window.innerWidth <= 768 ? "0.72rem" : "1rem",
              lineHeight: "1.6",
            }}
            ref={commentsDiv}
          >
          </div>
        </div>
      )}

      {shouldDisplayKeyword && (
        <div
          style={{
            background: mode === "dark" ? "#1F1F1F" : "#FFFFFF",
            borderRadius: "15px",
            color: mode === "dark" ? "#FFFFFF" : "#1F1F1F",
            padding: "20px",
            margin: "20px auto",
            maxWidth: "100%",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            style={{
              paddingLeft: "0.5%",
              marginBottom: "20px",
              borderBottom: `3px solid ${
                mode === "dark" ? "#3F3F3F" : "#DFDFDF"
              }`,
              color: mode === "dark" ? "#F1F1F1" : "#212121",
            }}
          >
            Keywords
          </h1>
          <div
            style={{
              background: mode === "dark" ? "#2E2E2E" : "#F7F7F7",
              color: mode === "dark" ? "#E1E1E1" : "#2E2E2E",
              padding: "15px",
              borderRadius: "10px",
              fontSize: window.innerWidth <= 768 ? "0.72rem" : "1rem",
              lineHeight: "1.6",
            }}
            ref={commentsKey}
          >
          </div>
        </div>
      )}
    </>
  );
};

Summary.propTypes = {
  jsonData: PropTypes.object,
};

export default Summary;