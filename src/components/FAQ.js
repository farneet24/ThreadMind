import React, { useEffect } from "react";
import "../newacc.css";

const FAQ = () => {
  var accordionnewButtons = document.querySelectorAll(".accordion-new button");

  accordionnewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      button.blur();
    });
  });

  useEffect(() => {
    const items = document.querySelectorAll(".accordion-new button");

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
      {/* <h2>Frequently Asked Questions</h2> */}
      <div class="accordion-new">
        <div class="accordion-new-item">
          <button id="accordion-new-button-1" aria-expanded="false">
            <span class="accordion-new-title">
              How do I get started with ThreadMind?
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new-content">
            <p>
              Input the URL of either a YouTube video or a Reddit post into the designated field on the Home Page and  click 'Analyze' or press Enter. 
              Alternatively, If you do not have a URL, you may click on the 'Get Started' option in any of the showcased cards to experience the full capabilities of ThreadMind. The analysis will be presented shortly.
            </p>
          </div>
        </div>
        <div class="accordion-new-item">
          <button id="accordion-new-button-2" aria-expanded="false">
            <span class="accordion-new-title">
            What links are not supported by ThreadMind?
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new-content">
            <p>
            ThreadMind cannot process links to YouTube channels, YouTube playlists, or Reddit subreddits. Links to videos with disabled comments are also not supported, as the platform relies on comment-based NLP operations to deliver insights. Inconvenience is regretted.
            </p>
          </div>
        </div>
        <div class="accordion-new-item">
          <button id="accordion-new-button-3" aria-expanded="false">
            <span class="accordion-new-title">
              How accurate is ThreadMind's analysis?
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new-content">
            <p>
            Utilizing finely-tuned machine learning models, ThreadMind achieves an accuracy rate of over 95% on social media datasets. The analysis is comprehensive, covering not just top-rated but also less frequently rated comments for a robust understanding of sentiment, emotion, and cyberbullying levels.
            </p>
          </div>
        </div>
        <div class="accordion-new-item">
          <button id="accordion-new-button-4" aria-expanded="false">
            <span class="accordion-new-title">
              Why is my analysis taking too long?
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new-content">
            <p>
            While designed for quick performance, occasional delays can happen due to API response times from social media platforms or latency issues from Google Cloud's Cold Start.
            </p>
          </div>
        </div>
        <div class="accordion-new-item">
          <button id="accordion-new-button-5" aria-expanded="false">
            <span class="accordion-new-title">
              How do I report a bug or issue?
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new-content">
            <p>
              Navigate to the 'Contact' tab in the menu bar and fill out the
              provided form with relevant details and issues you're
              experiencing. Concerns will be addressed in a timely manner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
