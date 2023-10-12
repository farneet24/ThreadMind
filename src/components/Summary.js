import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const areObjectsEqual = (obj1, obj2) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

const OpenAI = require("openai");

const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Replace with your OpenAI API key
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

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
    // Initialize variables to store the included comments and total word count
    let includedComments = [];
    let totalWordCount = 0;
  
    // Loop through each comment to check if it can be included without exceeding the 3000-word limit
    for (let commentObj of jsonData.data.comments) {
      const comment = commentObj.Comments;
      const commentWordCount = comment.split(/\s+/).filter(Boolean).length;
  
      if (totalWordCount + commentWordCount <= 1500) {
        includedComments.push(comment);
        totalWordCount += commentWordCount;
      } else {
        break; // Stop including comments if the 3000 words mark is crossed
      }
    }
  
    // Activate the summarization display
    setShouldDisplaySummarization(true);

    console.log("Total comments included: ",includedComments.length)
    async function sendData() {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {"role": "user", "content": `Summarize the following comments clearly in 10 points: ${includedComments}`}
          ],
          stream: true,
        });
  
        for await (const chunk of completion) {
          if (chunk.choices && chunk.choices[0] && chunk.choices[0].delta) {
            let content = chunk.choices[0].delta.content;
            if (content !== undefined) {
              content = content.replace(/\n/g, '/n');  // Replace all occurrences of \n with /n
              displaySummary(content);
  
              const textContent =
                commentsDiv.current.textContent ||
                commentsDiv.current.innerText;
              const words = textContent.split(/\s+/).filter(Boolean);
              if (words.length >= 1000) {
                displaySummary(
                  "<span>Word limit reached. Closing stream...</span>"
                );
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    }
  
    sendData();
  };
  
  const handleKeywords = async () => {
    // Initialize variables to store the included comments and total word count
    let includedComments = [];
    let totalWordCount = 0;
  
    // Loop through each comment to check if it can be included without exceeding the 3000-word limit
    for (let commentObj of jsonData.data.comments) {
      const comment = commentObj.Comments;
      const commentWordCount = comment.split(/\s+/).filter(Boolean).length;
  
      if (totalWordCount + commentWordCount <= 1500) {
        includedComments.push(comment);
        totalWordCount += commentWordCount;
      } else {
        break; // Stop including comments if the 3000 words mark is crossed
      }
    }
  
    // Activate the summarization display
    setShouldDisplayKeyword(true);

    console.log("Total comments included: ",includedComments.length)
    async function sendData() {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {"role": "user", "content": `Extract Top 10 proper nouns and what they mean: ${includedComments}`}
          ],
          stream: true,
        });
  
        for await (const chunk of completion) {
          if (chunk.choices && chunk.choices[0] && chunk.choices[0].delta) {
            let content = chunk.choices[0].delta.content;
            if (content !== undefined) {
              content = content.replace(/\n/g, '/n');  // Replace all occurrences of \n with /n
              displayKeyword(content);
  
              const textContent =
                commentsDiv.current.textContent ||
                commentsDiv.current.innerText;
              const words = textContent.split(/\s+/).filter(Boolean);
              if (words.length >= 1000) {
                displayKeyword(
                  "<span>Word limit reached. Closing stream...</span>"
                );
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    }
  
    sendData();
  };

  useEffect(() => {
    if (!jsonData || !jsonData.data || !jsonData.data.comments) {
      // Handle this by setting a loading or error state
      return;
    }

    if (
      lastSentJsonData.current &&
      areObjectsEqual(lastSentJsonData.current, jsonData)
    ) {
      return;
    }

    // Update lastSentJsonData ref to the latest jsonData.
    lastSentJsonData.current = jsonData;

    console.log("I am running");
    handleSummarize();
    console.log("I am running after summary");
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
              fontSize: window.innerWidth <= 768 ? "0.85rem" : "1rem",
              lineHeight: "1.6",
            }}
            ref={commentsDiv}
          ></div>
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
              fontSize: window.innerWidth <= 768 ? "0.85rem" : "1rem",
              lineHeight: "1.6",
            }}
            ref={commentsKey}
          ></div>
        </div>
      )}
    </>
  );
};

Summary.propTypes = {
  jsonData: PropTypes.object,
};

export default Summary;
