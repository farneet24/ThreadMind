// I made 2 copies of the FAQ code newacc.css for FAQ.js and newacc2.css for Technologies.js, just to avoid ruining each other at the same time
import React, { useEffect } from "react";
import "../newacc2.css";

const Tech = () => {
  var accordionnewButtons = document.querySelectorAll(".accordion-new2 button");

  accordionnewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      button.blur();
    });
  });

  useEffect(() => {
    const items = document.querySelectorAll(".accordion-new2 button");

    function toggleAccordion() {
      const itemToggle = this.getAttribute("aria-expanded");

      for (let i = 0; i < items.length; i++) {
        items[i].setAttribute("aria-expanded", "false");
      }

      if (itemToggle === "false") {
        this.setAttribute("aria-expanded", "true");
      }
    }

    items.forEach((item) => item.addEventListener("click", toggleAccordion));

    return () => {
      items.forEach((item) =>
        item.removeEventListener("click", toggleAccordion)
      );
    };
  }, []);

  // Your JSX code here...
  return (
    <div class="container">
      {/* <h1 style={{textAlign : 'center'}}>Under the Hood: Technologies Powering the Platform</h1> */}
      <div class="accordion-new2">
        <div class="accordion-new2-item">
          <button id="accordion-new2-button-1" aria-expanded="false">
            <span class="accordion-new2-title">
              <i className="fas fa-code" style={{ marginRight: "10px" }}></i>{" "}
              <strong>Front-end and Back-end Frameworks</strong>
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new2-content">
            <p>
              Front-end development utilizes the React framework, capitalizing
              on its component-based structure to offer a dynamic and responsive
              user interface. The back-end is constructed with Django, and
              seamless data flow between the user interface and server is
              achieved through REST API. Django Channels are also implemented
              for real-time data streaming from the back-end to the front-end.
            </p>
          </div>
        </div>
        <div class="accordion-new2-item">
          <button id="accordion-new2-button-2" aria-expanded="false">
            <span class="accordion-new2-title">
              <i className="fas fa-brain" style={{ marginRight: "10px" }}></i>{" "}
              <strong>Pre-trained Machine Learning Models</strong>
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new2-content">
            <p>
            ThreadMind employs advanced NLP models like RoBERTa and XLNet to deliver reliable sentiment analysis, emotion recognition, and cyberbullying detection. These pre-trained models ensure high accuracy in analytical outcomes. Performance is further optimized through fine-tuning on a diverse dataset of quality comments from social media platforms such as Twitter, Reddit, and YouTube.
            </p>
          </div>
        </div>
        <div class="accordion-new2-item">
          <button id="accordion-new2-button-3" aria-expanded="false">
            <span class="accordion-new2-title">
              <i className="fas fa-cogs" style={{ marginRight: "10px" }}></i>
              {"   "}
              <strong>APIs and Text Summarization</strong>
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new2-content">
            <p>
            Integration with the GPT-4 API enhances text summarization and keyword extraction capabilities, providing deeper and more actionable insights. Real-time data streaming from the API ensures quick response times and immediate availability of analyzed information.
            </p>
          </div>
        </div>
        <div class="accordion-new2-item">
          <button id="accordion-new2-button-4" aria-expanded="false">
            <span class="accordion-new2-title">
              <i className="fas fa-video" style={{ marginRight: "10px" }}></i>{" "}
              <strong>Social Media APIs</strong>
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new2-content">
            <p>
            Real-time comments and post details from YouTube and Reddit are collected via their official APIs. This allows for a thorough, multi-platform analysis and sentiment tracking. Beyond text, associated images, videos, and descriptions are also extracted, offering a nearly complete view of a post or video for better contextual understanding.
            </p>
          </div>
        </div>
        <div class="accordion-new2-item">
          <button id="accordion-new2-button-5" aria-expanded="false">
            <span class="accordion-new2-title">
              <i
                className="fas fa-chart-pie"
                style={{ marginRight: "10px" }}
              ></i>{" "}
              <strong>Data Visualization with Highcharts</strong>
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new2-content">
            <p>
            Highcharts is utilized for visually engaging and easy-to-understand data representation. This enables the creation of pie charts, column charts, and other visual aids to better comprehend sentiments and emotions expressed in comments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tech;
