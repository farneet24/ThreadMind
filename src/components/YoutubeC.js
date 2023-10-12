import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import styled, { keyframes } from "styled-components";

const zoomIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledModal = styled(Modal)`
  & .modal-dialog {
    animation: ${zoomIn} 0.3s ease-in-out;
  }
  & .modal-header {
    border-bottom: none !important; // Removes border-bottom from header
  }
  & .modal-footer {
    border-top: none !important; // Removes border-top from footer
  }
`;


const YoutubeC = ({ jsonData, mode }) => {
  const [show, setShow] = useState(false);
  const [commentTree, setCommentTree] = useState([]);
  const [showReplies, setShowReplies] = useState({});
  const [avatarColors, setAvatarColors] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (jsonData && jsonData.data.comment_tree) {
      const initialColors = {};
      const generateColors = (comments) => {
        comments.forEach((comment, index) => {
          initialColors[index] = getRandomColor();
          if (comment.replies) {
            comment.replies.forEach((reply, replyIndex) => {
              initialColors[`${index}.${replyIndex}`] = getRandomColor();
            });
          }
        });
      };

      generateColors(jsonData.data.comment_tree.comment_tree);
      setAvatarColors(initialColors);
      setCommentTree(jsonData.data.comment_tree.comment_tree);
    }
  }, [jsonData]);

  const convertToClickableLinks = (text) => {
    // Regular expression to match URLs in anchor tags
    const regex = /<a href="([^"]+)">[^<]+<\/a>/g;
    
    // Replace URLs in anchor tags with the word "Link"
    const newText = text.replace(regex, '<a href="$1" target="_blank" rel="noopener noreferrer">Link</a>');
    
    return newText.replace(/\n/g, '<br />');
  };
  
  

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const containerStyle = {
    backgroundColor: mode === "dark" ? "#333" : "white",
    color: mode === "dark" ? "#fff" : "black",
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp); // ISO 8601 formatted date string
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const toggleReplies = (index) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const renderComments = (comments, level = 0, parentIndex = null) => {
    return comments.map((comment, index) => {
      const uniqueIndex =
        parentIndex !== null ? `${parentIndex}.${index}` : index;
      return (
        <div
          className={`comment-container level-${level} ${mode}`}
          key={uniqueIndex}
        >
          <Avatar
            alt={comment.author}
            src={comment.author_image_url}
            className="avatar mt-3"
          />

          <div className="comment-content" style={containerStyle}>
            <div className="comment-header">
              <Typography variant="subtitle2">
                <strong>{comment.author}</strong>
              </Typography>
              <span className={`upvotes ${mode}`}>
                <i
                  className={`fas fa-arrow-${
                    comment.upvotes >= 0 ? "up" : "down"
                  } ${comment.upvotes >= 0 ? "up" : "down"}`}
                ></i>
                {comment.upvotes}
              </span>
            </div>
            <Typography
              variant="body2"
              className="comment-text"
              style={{ color: mode === "dark" ? "#fff" : "#000" }}
              dangerouslySetInnerHTML={{
                __html: convertToClickableLinks(comment.text)
              }}
            />
            <Typography variant="caption" className="timestamp">
              {formatDate(comment.timestamp)}
            </Typography>
            {comment.replies && comment.replies.length > 0 && (
              <button
                className="modern-button my-1"
                onClick={() => toggleReplies(uniqueIndex)}
              >
                <i className="fas fa-comments"></i> {/* FontAwesome icon */}
                {showReplies[uniqueIndex] ? " Hide Replies" : " Show Replies"}
              </button>
            )}

            {showReplies[uniqueIndex] &&
              renderComments(comment.replies, level + 1, uniqueIndex)}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleShow}>
        Show Comments
      </Button>

      <StyledModal
        show={show}
        onHide={handleClose}
        size="lg"
        dialogClassName={`modal-90w modal-${mode}`}
      >
        <Modal.Header closeButton style={containerStyle}>
          <Modal.Title
            style={{
              fontSize: window.innerWidth <= 768 ? "1.2rem" : "1.7rem",
              fontWeight: "bold",
              background:
                "linear-gradient(90deg, rgba(255,0,150,1) 0%, rgba(0,204,255,1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            YouTube Comments
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={`modal-body-scrollable ${mode}`}
          style={containerStyle}
        >
          {renderComments(commentTree)}
        </Modal.Body>
        <Modal.Footer style={containerStyle}>
          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </StyledModal>
    </>
  );
};

export default YoutubeC;
