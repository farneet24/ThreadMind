# ThreadMind Front-End Repository

## Table of Contents
1. [Home Screen](#home-screen)
2. [Analysis](#analysis)
3. [Comment Exploration](#comment-exploration)
4. [Additional Features](#additional-features)
5. [Contributing](#contributing)

## Home Screen
The ThreadMind interface initiates with an input field where users can submit YouTube or Reddit links for analysis. Alternatively, users can commence analysis by selecting one of the six predefined cards labeled "Get Started."

## Analysis

### YouTube Analysis
- **Overview**: Provides comprehensive metadata, including video and channel statistics as well as descriptions.
- **User Interaction**: Users can view a snapshot by clicking on the associated image and have the option to watch the video within the ThreadMind interface via the "Watch Video" button.

### Reddit Analysis
- **Overview**: Furnishes metadata including post and subreddit descriptions and statistics.
- **User Interaction**: Users can click on an accompanying image to enlarge it and can also view any videos embedded within the Reddit post.

### Summary and Keywords
- **Overview**: A succinct summary of comment content is provided in the form of ten bullet points. Keywords are identified and defined.
- **Implementation**: This is achieved through advanced Natural Language Processing algorithms hosted on Google Cloud.

## Comment Exploration
ThreadMind also allows users to browse through comments and their corresponding replies, thus offering a more nuanced understanding of public sentiment in addition to the analytical data provided.

## Additional Features

### Navigation Links
- **Overview**: Users can navigate to the original YouTube video or Reddit post.
- **User Interaction**: Achieved via the "Go to Video" and "Go to Post" buttons respectively.

### Interactive Data Visualization
- **Overview**: The distribution of sentiment, emotion, and levels of cyberbullying among the comments are visualized.
- **Implementation**: This feature utilizes HighchartsJS and the data is sourced from models executed on Google Cloud.

## Contributing
Individuals interested in contributing to the project are encouraged to connect through [LinkedIn](https://www.linkedin.com/in/farneet-singh-6b155b208/).

## Live Demo
The application is live and can be accessed [here](https://thread-mind.vercel.app/).
