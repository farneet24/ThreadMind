// Accordion Code
{/* <div className="accordion" id="techAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFramework">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFramework"
              aria-expanded="true"
              aria-controls="collapseFramework"
              style={myStyle}
            >
              <i className="fas fa-code" style={{ marginRight: "10px" }}></i>{" "}
              <strong>Front-end and Back-end Frameworks</strong>
            </button>
          </h2>
          <div
            id="collapseFramework"
            className="accordion-collapse collapse show"
            aria-labelledby="headingFramework"
            data-bs-parent="#techAccordion"
          >
            <div className="accordion-body" style={myStyle}>
              Our front-end is built using the React framework, leveraging its
              component-based architecture for a responsive and dynamic user
              interface. The back-end is built on Django, and both are connected
              through REST API, ensuring a seamless flow of data between the
              user interface and the server.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingModel">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseModel"
              aria-expanded="false"
              aria-controls="collapseModel"
              style={myStyle}
            >
              <i className="fas fa-brain" style={{ marginRight: "10px" }}></i>{" "}
              <strong>Pre-trained Machine Learning Models</strong>
            </button>
          </h2>
          <div
            id="collapseModel"
            className="accordion-collapse collapse"
            aria-labelledby="headingModel"
            data-bs-parent="#techAccordion"
          >
            <div className="accordion-body" style={myStyle}>
              ThreadMind employs state-of-the-art NLP models like RoBERTa and
              XLNet for tasks such as sentiment analysis, text emotion
              recognition, and cyberbullying classification. These pre-trained
              models ensure high accuracy and reliability in our analyses.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingAPI">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseAPI"
              aria-expanded="false"
              aria-controls="collapseAPI"
              style={myStyle}
            >
              <i className="fas fa-cogs" style={{ marginRight: "10px" }}></i>
              {"   "}
              <strong>APIs and Text Summarization</strong>
            </button>
          </h2>
          <div
            id="collapseAPI"
            className="accordion-collapse collapse"
            aria-labelledby="headingAPI"
            data-bs-parent="#techAccordion"
          >
            <div className="accordion-body" style={myStyle}>
              We utilize the GPT-4 API to send comments for text summarization
              and keyword extraction. This enhances the granularity of our
              analysis and provides more actionable insights.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSocialAPI">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSocialAPI"
              aria-expanded="false"
              aria-controls="collapseSocialAPI"
              style={myStyle}
            >
              <i className="fas fa-video" style={{ marginRight: "10px" }}></i>{" "}
              <strong>Social Media APIs</strong>
            </button>
          </h2>
          <div
            id="collapseSocialAPI"
            className="accordion-collapse collapse"
            aria-labelledby="headingSocialAPI"
            data-bs-parent="#techAccordion"
          >
            <div className="accordion-body" style={myStyle}>
              ThreadMind fetches real-time comments and post information from
              YouTube and Reddit using their respective APIs. This allows us to
              offer multi-platform analysis and sentiment tracking.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingCharts">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCharts"
              aria-expanded="false"
              aria-controls="collapseCharts"
              style={myStyle}
            >
              <i
                className="fas fa-chart-pie"
                style={{ marginRight: "10px" }}
              ></i>{" "}
              <strong>Data Visualization with Highcharts</strong>
            </button>
          </h2>
          <div
            id="collapseCharts"
            className="accordion-collapse collapse"
            aria-labelledby="headingCharts"
            data-bs-parent="#techAccordion"
          >
            <div className="accordion-body" style={myStyle}>
              For visually compelling and intuitive representation of analyzed
              data, we use Highcharts. It enables us to create pie charts,
              column charts, and other visual aids to better understand the
              sentiments and emotions expressed in the comments.
            </div>
          </div>
        </div>
      </div> */}


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
                    Subreddit Details
                  </span>
                </Typography>
                {/* <Typography
                  variant="h6"
                  style={{ marginTop: "20px", fontSize: channelfontSize }}
                >
                  Channel Name: {subredditInfo.channel_title}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    ...{ marginTop: "10px", fontSize: channelfontSize },
                    ...(mode === "dark" ? { color: "#fff" } : {}),
                  }}
                >
                  Channel Created At:{" "}
                  {formatDate(subredditInfo.channel_published_at)} (
                  {timeAgo(subredditInfo.channel_published_at)})
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
                    Subreddit Name:
                  </span>{" "}
                  {subredditInfo.title}
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
                    Subreddit Created At:
                  </span>{" "}
                  {formatDate(subredditInfo.created_at)} (
                  {timeAgo(subredditInfo.created_at)})
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
                      Subscribers: {formatNumber(subredditInfo.subscribers)}
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
                      Active Users: {formatNumber(subredditInfo.active_users)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    {/* <Typography
                      variant="body1"
                      style={{
                        ...{ fontSize: fontSize },
                        ...(mode === "dark" ? { color: "#fff" } : {}),
                      }}
                    >
                      <i className="fa fa-video-camera" aria-hidden="true"></i>{" "}
                      Video Count:{" "}
                      {formatNumber(
                        subredditInfo.channel_statistics.videoCount
                      )}
                    </Typography> */}
                    <Typography
                      variant="body1"
                      style={{
                        ...{ fontSize: fontSize },
                        ...(mode === "dark" ? { color: "#fff" } : {}),
                      }}
                    >
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      <button
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={handleOpen}
                      >
                        Subreddit Description
                      </button>
                    </Typography>

                    <Modal open={open} onClose={handleClose}>
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "80%",
                          backgroundColor: "white",
                          padding: "20px",
                          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                        }}
                      >
                        <h2>Subreddit Description</h2>
                        <p>{subredditInfo.description}</p>
                        <button onClick={handleClose}>Close</button>
                      </div>
                    </Modal>
                  </Grid>
                </Grid>
              </CardContent>
            </div>

            <ScrollableContent mode={mode}>
              <Typography
                variant="body1"
                style={{
                  color: mode === "dark" ? "#FFF" : "#000",
                  fontSize: window.innerWidth <= 768 ? "0.75rem" : "0.8rem",
                  paddingTop: "10px",
                  paddingLeft: "10px",
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
                  Post Description
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
                <ReadMoreButton
                  variant="contained"
                  mode={mode}
                  onClick={toggleModal}
                >
                  Read More
                </ReadMoreButton>
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