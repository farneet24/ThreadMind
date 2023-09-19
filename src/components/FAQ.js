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
              Simply input the URL of the YouTube video or Reddit post into the
              designated field on the Home Page. Click 'Analyze,' and the
              analysis will be presented shortly.
            </p>
          </div>
        </div>
        <div class="accordion-new-item">
          <button id="accordion-new-button-2" aria-expanded="false">
            <span class="accordion-new-title">
              Which platforms does ThreadMind support?
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new-content">
            <p>
              As of now, ThreadMind supports YouTube and Reddit. We aim to
              expand to additional platforms in the upcoming future.
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
            ThreadMind employs finely tuned machine learning models that have demonstrated an accuracy rate exceeding 95% on social media datasets. For a comprehensive analysis, we go beyond examining just top-rated comments; we also analyze less frequently rated comments to provide a more robust and accurate understanding of sentiment, emotion, and cyberbullying levels across the board.
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
              Though ThreadMind is designed for speed, occasional delays occur
              due to API response times from social media platforms or latency issues associated with Google Cloud's Cold Start.
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
              experiencing. We'll address your concerns promptly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
