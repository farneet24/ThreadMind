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
              Our front-end is built using the React framework, leveraging its
              component-based architecture for a responsive and dynamic user
              interface. The back-end is built on Django, and both are connected
              through REST API, ensuring a seamless flow of data between the
              user interface and the server. We also employ Django Channels for real-time data streaming from the backend to the front-end.
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
            ThreadMind utilizes cutting-edge NLP models such as RoBERTa and XLNet for robust sentiment analysis, emotion recognition, and cyberbullying detection. These pre-trained models guarantee a high degree of accuracy and reliability in our analytical results. Further enhancing their performance, we've fine-tuned these models on a diverse dataset of high-quality comments sourced from various social media platforms like Twitter, Reddit, and YouTube.
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
            We integrate the GPT-4 API for text summarization and keyword extraction tasks, enriching the depth of our analysis and offering more actionable insights. To ensure a quicker user experience, data is streamed in real-time from the API, facilitating faster response times and immediate availability of analyzed information.
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
            ThreadMind gathers real-time comments and post details from YouTube and Reddit through their official APIs, enabling us to provide a comprehensive, multi-platform analysis and sentiment tracking. In addition to textual content, we also extract associated images, videos, and descriptions, offering users a nearly complete view of a post or video for a more informed understanding of the context.
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
              For visually compelling and intuitive representation of analyzed
              data, we use Highcharts. It enables us to create pie charts,
              column charts, and other visual aids to better understand the
              sentiments and emotions expressed in the comments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tech;
