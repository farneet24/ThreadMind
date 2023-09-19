import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import FAQ from "./FAQ";
import Tech from "./Technologies";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* This aligns the child components to the start */
`;

const TabButtons = styled.div`
  display: inline-flex; /* Changed from flex to inline-flex */
  max-width : 100%;
  flex-wrap: nowrap; // Prevent line wrapping
  overflow-x: auto; // Enable horizontal scrolling
  -webkit-overflow-scrolling: touch; // Enable smooth scrolling on iOS
  background-color: #282c34;
  border-radius: 8px 8px 0 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 1);
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }

  @media (max-width: 600px) {
    overflow-x: auto;
  }
`;

const TabButton = styled.button`
  padding: 16px;
  min-width: 120px;
  font-size: 16px;
  color: ${(props) => (props.active ? "#FFFFFF" : "#9FA2B4")};
  background-color: ${(props) => (props.active ? "#3D5AFE" : "#171A20")};
  border: none;
  transition: background-color 0.3s ease-in-out;
  flex-shrink: 0; // Prevent shrinking smaller than content size
  &:hover {
    background-color: #3d5afe;
    color: #ffffff;
  }

  @media (max-width: 600px) {
    flex: none;
  }
`;

const TabContent = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  padding: 20px;
  border-radius: 0 0 8px 8px;
  background-color: ${(props) => (props.mode === "dark" ? "black" : "white")};
  box-shadow: ${(props) =>
    props.mode === "dark"
      ? "0px 4px 10px rgba(255, 255, 255, 0.1)"
      : "0px 4px 10px rgba(0, 0, 0, 0.1)"};
`;

export default function About(props) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  let tabcontentStyle = {
    color: props.mode === "dark" ? "#EAEAEA" : "#191919",
    backgroundColor: props.mode === "dark" ? "#1E1E1E" : "white",
  };

  // let myStyle = {
  //   color: props.mode === "dark" ? "white" : "#191919",
  //   backgroundColor: props.mode === "dark" ? "#191919" : "white",
  // };

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      title: "Real-Time Data",
      content: (
        <>
          ThreadMind utilizes robust social media APIs to pull in real-time comments and information including statistics, descriptions, etc from platforms like YouTube and Reddit. Stay ahead of the curve by understanding the sentiment around your content as it happens.
          <br />
          {/* <img src="https://images.theconversation.com/files/191827/original/file-20171025-25516-g7rtyl.jpg?ixlib=rb-1.1.0&rect=0%2C70%2C7875%2C5667&q=45&auto=format&w=926&fit=clip" alt="Description" /> */}
        </>
      ),
    },
    {
      title: "Advanced Analysis",
      content: (
        <>
          ThreadMind uses Natural Language Processing to analyze comments for sentiment, emotion, and cyberbullying, supplemented by keyword extraction and summarization features. For better data interpretation, the platform leverages Highcharts.js to present these analytical insights in the form of interactive charts.
          <br />
          {/* <img src="https://images.theconversation.com/files/191827/original/file-20171025-25516-g7rtyl.jpg?ixlib=rb-1.1.0&rect=0%2C70%2C7875%2C5667&q=45&auto=format&w=926&fit=clip" alt="Description" /> */}
        </>
      ),
    },
    {
      title: "Time Saver",
      content: (
        <>
          ThreadMind helps you quickly understand what people are talking about in YouTube and Reddit comments. It uses smart tech to figure out the mood of the conversation and even spots mean or harmful comments. You get easy-to-read summaries and charts, so you don't have to go through every single comment yourself.
          <br />
          {/* <img src="https://images.theconversation.com/files/191827/original/file-20171025-25516-g7rtyl.jpg?ixlib=rb-1.1.0&rect=0%2C70%2C7875%2C5667&q=45&auto=format&w=926&fit=clip" alt="Description" /> */}
        </>
      ),
    },
    {
      title: "Dark Theme",
      content: (
        <>
          ThreadMind supports both dark and light modes, allowing users to customize their viewing experience according to their preference. This feature enhances usability and comfort, making it easier to interact with the analytical data presented by the tool.
          <br />
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <h1
        className="my-3 text-center"
        style={{
          color: props.mode === "dark" ? "white" : "black",
          animation: "fadeInUp 1s forwards",
        }}
      >
        About ThreadMind
      </h1>
      <br />
      <br />
      <div>
        <div className="row">
          <div
            className="col-md-6 order-md-1 order-2 d-flex align-items-center fade-in"
            style={{
              color: props.mode === "dark" ? "white" : "black",
            }}
          >
            <p className="lead">
              Welcome to ThreadMind! We are a cutting-edge platform aimed at
              providing you with in-depth analysis of online discussions, be it
              on YouTube or Reddit.
              <br />
              <br />
              Our intuitive interface offers you an array of functionalities
              including smart API integrations, customizable analytics, and
              user-friendly dark/light modes. Experience the next level of
              discussion analysis with ThreadMind. 
            </p>
          </div>
          <div className="col-md-6 order-md-2 order-1 d-flex align-items-center">
            <img
              className="img-fluid"
              src="https://cdn.questionpro.com/userimages/site_media/text-analysis.png"
              alt="Text Analysis"
              height="4px"
            />
          </div>
        </div>
      </div>

      <br />
      <br />
      <h1
        className="text-center"
        style={{
          color: props.mode === "dark" ? "white" : "black",
          animation: "fadeInUp 1s forwards",
        }}
      >
        Features
      </h1>
      <br />
      <br />
      <TabContainer>
        <TabButtons>
          {tabs.map((tab, index) => (
            <TabButton
              key={index}
              active={activeTab === index}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </TabButton>
          ))}
        </TabButtons>
        <div>
          {tabs.map((tab, index) => (
            <TabContent
              key={index}
              active={activeTab === index}
              style={tabcontentStyle}
            >
              {tab.content}
            </TabContent>
          ))}
        </div>
      </TabContainer>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1
        className="my-3 text-center"
        style={{
          color: props.mode === "dark" ? "white" : "black",
          animation: "fadeInUp 1s forwards",
        }}
      >
        Under the Hood: Technologies Powering the Platform
      </h1>
      <br />
      <br />
      <br />
      <Tech />
      <br />
      <br />
      <br />
      <br />
      <h1
        className="text-center"
        style={{
          color: props.mode === "dark" ? "white" : "black",
          animation: "fadeInUp 1s forwards",
        }}
      >
        Frequently Asked Questions (FAQs)
      </h1>
      <br />
      <br />
      <FAQ />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
