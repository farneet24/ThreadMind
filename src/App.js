// Import required libraries and components
import "./App.css";
import "./index.css";
import { Helmet } from "react-helmet";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Navigationbar from "./components/Navigationbar";
import React, { useState } from "react";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [mode, setMode] = useState("light"); // Whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  
  // Function to show alert messages
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  // Function to toggle between dark and light modes
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#111111";
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
    }
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ThreadMind - In-depth Comment and Social Media Analysis</title>
        <meta
          name="description"
          content="ThreadMind leverages cutting-edge NLP technologies, including GPT-3.5 Turbo, to analyze comments on Reddit and YouTube. Perform sentiment analysis, emotion recognition, and cyberbullying detection with ease."
        />
        <meta
          name="keywords"
          content="ThreadMind, Reddit Analysis, YouTube Analysis, Comment Analysis, Sentiment Analysis, NLP, Natural Language Processing, GPT-3.5 Turbo, Text Emotion Recognition, Cyberbullying Detection, Social Media Analytics"
        />
        <meta name="author" content="Farneet Singh" />

        <meta
          property="og:title"
          content="ThreadMind - In-depth Comment and Social Media Analysis"
        />
        <meta
          property="og:description"
          content="Analyze comments from Reddit and YouTube. Perform sentiment analysis, detect emotions, and identify cyberbullying. Utilizes GPT-3.5 Turbo for comprehensive insights."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Router>
        <Navigationbar
          title="ThreadMind"
          mode={mode}
          toggleMode={toggleMode}
          key={new Date()}
        />
        <Alert alert={alert} />

        <div className="container my-3">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <TextForm
                  showAlert={showAlert}
                  heading="ThreadMind - Know the Mood, Catch the Tone."
                  mode={mode}
                />
              }
            ></Route>
            <Route exact path="/about" element={<About mode={mode} />}></Route>
            <Route
              exact
              path="/contact"
              element={<Contact mode={mode} />}
            ></Route>
          </Routes>
        </div>
        <br />
        <Footer mode={mode} />
      </Router>
    </>
  );
}

export default App;
