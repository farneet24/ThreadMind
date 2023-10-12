import React, { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts";

const areObjectsEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
const SentimentChart = ({ jsonData, mode, isLoading ,setIsLoading }) => {
  const lastSentJsonData = useRef(null);
  const [sentimentData, setSentimentData] = useState(null);

  const fetchSentimentData = async () => {
    console.log(jsonData.data.comments);
    setIsLoading(true);

    try {
      const response = await fetch("https://threadmind-3bfd4831eee7.herokuapp.com/sentiment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: jsonData.data.comments }),
      });

      if (response.ok) {
        const rawData = await response.json();
        const parsedData = JSON.parse(rawData.sentiment);
        setSentimentData(parsedData);
        console.log(parsedData);
      }
       else {
        console.error("Failed to fetch sentiment data");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("There was an error sending the data", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!jsonData || !jsonData.data || !jsonData.data.comments) {
      // Handle this by setting a loading or error state
      return;
    }

    if (lastSentJsonData.current && areObjectsEqual(lastSentJsonData.current, jsonData)) {
      return;
    }

    // Update lastSentJsonData ref to the latest jsonData.
    lastSentJsonData.current = jsonData;

    fetchSentimentData();
  }, [jsonData]);

  useEffect(() => {
    if (!sentimentData) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);

    // Initialize with defaults
    let preparedData = [
      { name: "Positive", y: 0, color: "green" },
      { name: "Neutral", y: 0, color: "gray" },
      { name: "Negative", y: 0, color: "red" },
    ];

    // Update with actual values if they exist
    preparedData.forEach((item) => {
      if (sentimentData.hasOwnProperty(item.name)) {
        item.y = parseFloat(sentimentData[item.name].toFixed(2));
      }
    });

    Highcharts.chart("sentimentContainer", {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: true,
        type: "pie",
        backgroundColor: mode === "dark" ? "rgb(17, 17, 17)" : "#fff",
        style: {
          color: mode === "dark" ? "#fff" : "#000", // text color based on mode
          fontSize: window.innerWidth <= 768 ? "1.2em" : "1.2em",
        },
        margin: [70, 0, 0, 0],
        padding: [0, 0, 0, 0],
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "Sentiment Distribution",
        style: {
          color: mode === "dark" ? "#fff" : "#000", // title text color based on mode
        },
      },
      tooltip: {
        backgroundColor: mode === "dark" ? "#666666" : "#ffffff", // dark or light background for the tooltip
        borderWidth: 0,
        style: {
          color: mode === "dark" ? "#ffffff" : "#333333", // tooltip text color based on mode
        },
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
          pointPadding: 0,
          groupPadding: 0,
        },
      },

      series: [
        {
          name: "Percentage",
          colorByPoint: true,
          data: preparedData,
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                align: "center",
                verticalAlign: "bottom",
                layout: "horizontal",
              },
              yAxis: {
                labels: {
                  align: "left",
                  x: 0,
                  y: -5,
                },
                title: {
                  text: null,
                },
              },
              subtitle: {
                text: null,
              },
              credits: {
                enabled: false,
              },
            },
          },
        ],
      },
    });
  }, [sentimentData, mode]);

  return <div id="sentimentContainer"></div>;
};

export default SentimentChart;
