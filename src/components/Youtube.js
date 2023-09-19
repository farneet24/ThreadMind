import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Modal,
} from "@mui/material";
import styled, { keyframes } from "styled-components";
import defaultImage from "./no-image-available-like-missing-picture-vector-43938299.jpg";
// <----------------------- ScrollableContent Code --------------------------------------->
const ScrollableContent = styled.div`

  max-height: 300px;
  overflow: auto; // Enables both x and y scrolling
  padding: 8px;
  border-radius: 15px;
  background: mode === "dark" ? "#333" : "#f1f3f6";

  /* Neumorphic style for light mode */
  border: mode === "dark" ? "1px solid #2b2b2b" : "1px solid #d1d9e6";
  box-shadow: ${(props) =>
    props.mode === "dark"
      ? "2px 2px 5px #F8F6F4, -7px -7px 14px #3b3b3b"
      : "7px 7px 14px #bfc7d1, -7px -7px 14px #ffffff"};
  
      transition: all 0.3s ease; // This makes the hover effect smooth
      &:hover {
    /* Change these values to whatever you like */
    transform: translateY(-5px);
    box-shadow: ${(props) =>
      props.mode === "dark"
        ? "4px 4px 8px #F8F6F4, -10px -10px 20px #3b3b3b"
        : "10px 10px 20px #bfc7d1, -10px -10px 20px #ffffff"};
  }

  margin-top: 30px;
  /* For Webkit browsers like Chrome, Safari */
  &::-webkit-scrollbar {
    width: 4px; // Vertical scrollbar width
    height: 4px; // Horizontal scrollbar height
  }

  &::-webkit-scrollbar-thumb {
    background: #888; // Scrollbar color
    border-radius: 2px; // Rounded corners
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; // Scrollbar color when hovered
  }

  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;
`;

const ReadMoreButton = styled(Button)`
  margin-top: 10px;
  background-color: ${(props) => (props.mode === "dark" ? "#444" : "#ccc")};
  color: ${(props) => (props.mode === "dark" ? "#fff" : "#000")};
`;

const zoomIn = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
`;

const ModalContainer = styled.div`
  animation: ${zoomIn} 0.3s ease;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  background: ${(props) => (props.mode === "dark" ? "#333" : "#fff")};
  padding: 20px;
  border-radius: 15px;
  width: 80%;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  &::-webkit-scrollbar {
    width: 4px; // Vertical scrollbar width
    height: 4px; // Horizontal scrollbar height
  }

  &::-webkit-scrollbar-thumb {
    background: #888; // Scrollbar color
    border-radius: 2px; // Rounded corners
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; // Scrollbar color when hovered
  }

  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 15px;
  }
`;

// <------------------------------------- CARD FUNCTION ---------------------------------------->

const StyledCard = styled(Card)`
  background-color: ${(props) => (props.mode === "dark" ? "#333" : "#fff")};
  color: ${(props) => (props.mode === "dark" ? "#fff" : "#000")};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// <------------------------------------- REAL FUNCTION CODE STARTS ---------------------------------------->
const VideoAndChannelInfo = ({ jsonData, mode }) => {
  const [openImageModal, setOpenImageModal] = useState(false);

  const handleOpenImageModal = () => {
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const renderMedia = () => {
    if (videoInfo.maxres_thumbnail_url) {
      return (
        <div>
          <div onClick={handleOpenImageModal}>
            <CardMedia
              component="img"
              alt={videoInfo.title}
              height="200"
              image={videoInfo.maxres_thumbnail_url}
              style={{ cursor: "pointer" }}
            />
          </div>

          <Modal
            open={openImageModal}
            onClose={handleCloseImageModal}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                outline: "none",
                textAlign: "center",
                maxWidth: "90%",
                maxHeight: "90%",
              }}
            >
              <img
                src={videoInfo.maxres_thumbnail_url}
                alt={videoInfo.title}
                style={{
                  width: "100%",
                  height: "40vh",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
          </Modal>
        </div>
      );
    } else {
      return (
        <CardMedia
          component="img"
          alt={videoInfo.title}
          height="200"
          image={defaultImage}
        />
      );
    }
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [fontSize, setFontSize] = useState(
    window.innerWidth <= 768 ? "0.75rem" : "0.9rem"
  );
  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth <= 768 ? "0.75rem" : "0.9rem");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // <------------------------- Channel Card Font Size ------------------------------->

  const [channelfontSize, setchannelFontSize] = useState(
    window.innerWidth <= 768 ? "0.8rem" : "1rem"
  );
  useEffect(() => {
    const handlechannelResize = () => {
      setchannelFontSize(window.innerWidth <= 768 ? "0.75rem" : "0.9rem");
    };

    window.addEventListener("resize", handlechannelResize);

    return () => {
      window.removeEventListener("resize", handlechannelResize);
    };
  }, []);

  // Checking the Data sent to the function
  if (
    !jsonData ||
    !jsonData.data ||
    !jsonData.data.video_info ||
    !jsonData.data.channel_info
  ) {
    return null; // or return a placeholder component
  }

  //   Extracting the Information
  const videoInfo = jsonData.data.video_info;
  const channelInfo = jsonData.data.channel_info;

  //   <-------------------------  Making the Time thing right -------------------------------->
  const timeAgo = (dateString) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - publishedDate) / 1000);

    let interval = Math.floor(diffInSeconds / 31536000);
    if (interval > 1) {
      return `${interval} years ago`;
    }

    interval = Math.floor(diffInSeconds / 2592000);
    if (interval >= 1) {
      return `${interval} months ago`;
    }

    interval = Math.floor(diffInSeconds / 86400);
    if (interval >= 1) {
      return `${interval} days ago`;
    }

    interval = Math.floor(diffInSeconds / 3600);
    if (interval >= 1) {
      return `${interval} hours ago`;
    }

    interval = Math.floor(diffInSeconds / 60);
    if (interval >= 1) {
      return `${interval} minutes ago`;
    }

    return `${Math.floor(diffInSeconds)} seconds ago`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const suffix = ["th", "st", "nd", "rd"];
    const v = day % 100;
    const daySuffix = suffix[(v - 20) % 10] || suffix[v] || suffix[0];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${day}${daySuffix} ${monthNames[month]} ${year}`;
  };

  const formatNumber = (num) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + "B";
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + "M";
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + "K";
    }
    return num;
  };

  //   <-------------------------  Making the Links short -------------------------------->

  const linkifyDescription = (text) => {
    return text
      .split(" ")
      .map((token) => {
        const urlPattern = /(https?:\/\/[^\s]+)/;
        const match = token.match(urlPattern);

        if (match) {
          let displayText = "Website Link";
          const url = match[0];

          if (url.includes("youtube.com") || url.includes("youtu.be")) {
            displayText = "YouTube Link";
          } else if (url.includes("facebook.com")) {
            displayText = "Facebook Link";
          } else if (url.includes("instagram.com")) {
            displayText = "Instagram Link";
          } else if (url.includes("twitter.com")) {
            displayText = "Twitter Link";
          } else if (url.includes("linkedin.com")) {
            displayText = "LinkedIn Link";
          } else if (url.includes("reddit.com")) {
            displayText = "Reddit Link";
          } else if (url.includes("pinterest.com")) {
            displayText = "Pinterest Link";
          } else if (url.includes("snapchat.com")) {
            displayText = "Snapchat Link";
          } else if (url.includes("tiktok.com")) {
            displayText = "TikTok Link";
          } else if (url.includes("vimeo.com")) {
            displayText = "Vimeo Link";
          } else if (url.includes("github.com")) {
            displayText = "GitHub Link";
          } else if (url.includes("stackoverflow.com")) {
            displayText = "Stack Overflow Link";
          } else if (url.includes("medium.com")) {
            displayText = "Medium Link";
          } else if (url.includes("quora.com")) {
            displayText = "Quora Link";
          } else if (url.includes("google.com")) {
            displayText = "Google Link";
          } else if (url.includes("bing.com")) {
            displayText = "Bing Link";
          } else if (url.includes("yahoo.com")) {
            displayText = "Yahoo Link";
          } else if (url.includes("amazon.com")) {
            displayText = "Amazon Link";
          } else if (url.includes("ebay.com")) {
            displayText = "eBay Link";
          } else if (url.includes("netflix.com")) {
            displayText = "Netflix Link";
          } else if (url.includes("spotify.com")) {
            displayText = "Spotify Link";
          } else if (url.includes("apple.com")) {
            displayText = "Apple Link";
          } else if (url.includes("microsoft.com")) {
            displayText = "Microsoft Link";
          } else if (url.includes("dropbox.com")) {
            displayText = "Dropbox Link";
          } else if (url.includes("wikipedia.org")) {
            displayText = "Wikipedia Link";
          }

          return `<a href="${url}" target="_blank" rel="noreferrer">${displayText}</a>`;
        }

        return token;
      })
      .join(" ");
  };

  const descriptionLines = videoInfo.description
    .split("\n")
    .map((line, index) => {
      const linkedLine = linkifyDescription(line);
      return (
        <div key={index} dangerouslySetInnerHTML={{ __html: linkedLine }} />
      );
    });

  const capitalizeEachWord = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const Tag = styled.span`
    background: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
    color: white;
    padding: 8px 16px;
    margin: 2px;
    border-radius: 25px;
    box-shadow: ${(props) =>
      props.mode === "dark"
        ? "0px 0px 15px rgba(0, 0, 0, 0.1)"
        : "0px 0px 15px rgba(0, 0, 0, 0.2)"};
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: ${(props) =>
        props.mode === "dark"
          ? "0px 0px 20px rgba(0, 0, 0, 0.2)"
          : "0px 0px 20px rgba(0, 0, 0, 0.3)"};
      transform: translateY(-2px);
    }
  `;

  //   <-------------------------  returning the function -------------------------------->

  return (
    <Grid container spacing={2}>
      {/* Video Information */}
      <Grid item xs={12} md={6}>
        <StyledCard mode={mode}>
          <Card style={mode === "dark" ? { backgroundColor: "#333" } : {}}>
            {renderMedia()}
            <CardContent>
              <Typography
                variant="h5"
                style={{
                  ...{
                    fontFamily: "Merriweather",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    textDecorationColor:
                      mode === "dark" ? "#9fa8da" : "#3f51b5",
                    textDecorationThickness: "2px",
                  },
                  ...(mode === "dark" ? { color: "#fff" } : {}),
                }}
              >
                {videoInfo.title}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{
                  position: "relative",
                  padding: "5px 10px",
                  color: mode === "dark" ? "#fff" : "#000",
                }}
              >
                <span
                  title="Video Published On"
                  style={{
                    background: mode === "dark" ? "#333" : "#f2f2f2",
                    borderRadius: "10px",
                    padding: "5px 1px",
                    display: "inline-block",
                    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <i
                    className="fas fa-calendar-alt"
                    style={{
                      fontSize: "1rem",
                      verticalAlign: "middle",
                      marginRight: "5px",
                      color: mode === "dark" ? "#fff" : "#000",
                    }}
                  ></i>
                  {formatDate(videoInfo.published_at)} (
                  {timeAgo(videoInfo.published_at)})
                </span>
              </Typography>

              <br />
              <Typography
                variant="body1"
                style={mode === "dark" ? { color: "#fff" } : {}}
              >
                {videoInfo.tags
                  ? videoInfo.tags.map((tag, index) => (
                      <Tag key={index} mode={mode}>
                        {capitalizeEachWord(tag)}
                      </Tag>
                    ))
                  : null}
              </Typography>
              <br />
              <CardContent
                style={{
                  ...{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    padding: "20px",
                  },
                  ...(mode === "dark" ? { color: "#fff" } : {}),
                }}
              >
                <span
                  style={{
                    fontSize: window.innerWidth <= 768 ? "1.2rem" : "1.7rem",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(90deg, rgba(255,0,150,1) 0%, rgba(0,204,255,1) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    margin: "0 0 10px 0",
                  }}
                >
                  Video Statistics
                </span>
                <div
                  style={{
                    borderBottom: "2px solid #3f51b5",
                    width: "98%",
                  }}
                ></div>
                {/* ... Other card content ... */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "20px",
                    width: "100%",
                  }}
                >
                  <div
                    className="interactive-icon"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <i class="fas fa-thumbs-up"></i>
                    <span style={{ marginLeft: "10px" }}>
                      Likes: {formatNumber(videoInfo.statistics.likeCount)}
                    </span>
                  </div>
                  <div
                    className="interactive-icon"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <i class="fas fa-eye"></i>
                    <span style={{ marginLeft: "10px" }}>
                      Views: {formatNumber(videoInfo.statistics.viewCount)}
                    </span>
                  </div>
                  <div
                    className="interactive-icon"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <i class="fas fa-star"></i>
                    <span style={{ marginLeft: "10px" }}>
                      Favorites:{" "}
                      {formatNumber(videoInfo.statistics.favoriteCount)}
                    </span>
                  </div>
                  <div
                    className="interactive-icon"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <i class="fas fa-comments"></i>
                    <span style={{ marginLeft: "10px" }}>
                      Comments:{" "}
                      {formatNumber(videoInfo.statistics.commentCount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </CardContent>
          </Card>
        </StyledCard>
      </Grid>

      {/* Channel Information */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          style={mode === "dark" ? { backgroundColor: "#333" } : {}}
        >
          <CardContent>
            <div
              className="container my-3 raise"
              style={{
                ...{
                  border: "2px solid #ffa260",
                  padding: "10px",
                  borderRadius: "10px",
                  transition:
                    "border-color 0.5s, transform 0.5s, box-shadow 0.5s",
                  boxShadow: "0 0.5em 0.5em -0.4em #ffa260",
                },
                ...(mode === "dark" ? { color: "#fff" } : { color: "#000" }),
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#e5ff60";
                e.currentTarget.style.boxShadow =
                  "0 0.5em 0.5em -0.4em #e5ff60";
                e.currentTarget.style.transform = "translateY(-0.25em)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "#ffa260";
                e.currentTarget.style.boxShadow =
                  "0 0.5em 0.5em -0.4em #ffa260";
                e.currentTarget.style.transform = "none";
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  style={{
                    ...{
                      fontSize: window.innerWidth <= 768 ? "0.8rem" : "1.2rem",
                      borderBottom: "2px solid #3f51b5",
                    },
                    ...(mode === "dark" ? { color: "#fff" } : {}),
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.5em",
                      fontWeight: "bold",
                      background:
                        "linear-gradient(90deg, rgba(255,0,150,1) 0%, rgba(0,204,255,1) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "inline-block",
                      margin: "0 0 10px 0",
                    }}
                  >
                    Channel Details
                  </span>
                </Typography>
                {/* <Typography
                  variant="h6"
                  style={{ marginTop: "20px", fontSize: channelfontSize }}
                >
                  Channel Name: {channelInfo.channel_title}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    ...{ marginTop: "10px", fontSize: channelfontSize },
                    ...(mode === "dark" ? { color: "#fff" } : {}),
                  }}
                >
                  Channel Created At:{" "}
                  {formatDate(channelInfo.channel_published_at)} (
                  {timeAgo(channelInfo.channel_published_at)})
                </Typography> */}
                <Typography
                  variant="h6"
                  style={{ marginTop: "20px", fontSize: channelfontSize }}
                >
                  <span
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: mode === "dark" ? "#FCAEAE" : "#D71313",
                    }}
                  >
                    Channel Name:
                  </span>{" "}
                  {channelInfo.channel_title}
                </Typography>

                <Typography
                  variant="body2"
                  style={{
                    marginTop: "10px",
                    fontSize: channelfontSize,
                    color: mode === "dark" ? "#fff" : "#000",
                  }}
                >
                  <span
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: mode === "dark" ? "#91C8E4" : "#27005D",
                    }}
                  >
                    Channel Created At:
                  </span>{" "}
                  {formatDate(channelInfo.channel_published_at)} (
                  {timeAgo(channelInfo.channel_published_at)})
                </Typography>

                <Grid container spacing={3} style={{ marginTop: "20px" }}>
                  <Grid item xs={4}>
                    <Typography
                      variant="body1"
                      style={{
                        ...{ fontSize: fontSize },
                        ...(mode === "dark" ? { color: "#fff" } : {}),
                      }}
                    >
                      <i className="fa fa-user" aria-hidden="true"></i>{" "}
                      Subscribers:{" "}
                      {formatNumber(
                        channelInfo.channel_statistics.subscriberCount
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="body1"
                      style={{
                        ...{ fontSize: fontSize },
                        ...(mode === "dark" ? { color: "#fff" } : {}),
                      }}
                    >
                      <i className="fa fa-eye" aria-hidden="true"></i> Channel
                      Views:{" "}
                      {formatNumber(channelInfo.channel_statistics.viewCount)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="body1"
                      style={{
                        ...{ fontSize: fontSize },
                        ...(mode === "dark" ? { color: "#fff" } : {}),
                      }}
                    >
                      <i className="fa fa-video-camera" aria-hidden="true"></i>{" "}
                      Video Count:{" "}
                      {formatNumber(channelInfo.channel_statistics.videoCount)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </div>

            <ScrollableContent mode={mode}>
              <Typography
                variant="body1"
                style={{
                  color: mode === "dark" ? "#FFF" : "#000",
                  fontSize: window.innerWidth <= 768 ? "0.75rem" : "0.9rem",
                  paddingTop: "10px",
                  paddingLeft: "20px",
                  paddingRight: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "2em",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(90deg, rgba(255,0,150,1) 0%, rgba(0,204,255,1) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    margin: "0 0 10px 0",
                  }}
                >
                  Video Description
                </span>
                <div
                  style={{
                    borderBottom: "2px solid #3f51b5",
                    width: "98%",
                  }}
                ></div>
                <br />
                {descriptionLines.slice(0, 1)}{" "}
                {/* Slice based on your requirement */}
                <br />
                {
                  // Conditionally render the Read More button
                  Array.isArray(descriptionLines) && (
                    <ReadMoreButton
                      variant="contained"
                      mode={mode}
                      onClick={toggleModal}
                    >
                      Read More
                    </ReadMoreButton>
                  )
                }
              </Typography>
            </ScrollableContent>

            <Modal open={showModal} onClose={toggleModal}>
              <ModalContainer mode={mode}>
                <Typography
                  variant="body1"
                  style={{
                    color: mode === "dark" ? "#FFF" : "#000",
                    fontSize: window.innerWidth <= 768 ? "12px" : fontSize,
                  }}
                >
                  <span
                    style={{
                      fontSize: "2em",
                      fontWeight: "bold",
                      background:
                        "linear-gradient(90deg, rgba(255,0,150,1) 0%, rgba(0,204,255,1) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "inline-block",
                      margin: "0 0 10px 0",
                    }}
                  >
                    Video Description
                  </span>
                  <br />
                  <br />
                  {descriptionLines}
                </Typography>
                <br />
                <Button variant="contained" onClick={toggleModal}>
                  Close
                </Button>
              </ModalContainer>
            </Modal>
          </CardContent>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VideoAndChannelInfo;
