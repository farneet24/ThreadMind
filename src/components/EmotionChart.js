import React, { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts";
import Highcharts3d from "highcharts/highcharts-3d";

Highcharts3d(Highcharts);

const areObjectsEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
const EmotionChart = ({ jsonData, mode, isLoading ,setIsLoading }) => {
  const lastSentJsonData = useRef(null);
  const [emotionData, setemotionData] = useState(null);

  const fetchemotionData = async () => {
    console.log(jsonData.data.comments);
    setIsLoading(true)

    try {
      const response = await fetch("https://threadmind-3bfd4831eee7.herokuapp.com/emotion/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: jsonData.data.comments }),
      });

      if (response.ok) {
        const rawData = await response.json();
        const parsedData = JSON.parse(rawData.emotion);
        setemotionData(parsedData);
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

    fetchemotionData();
  }, [jsonData]);

  useEffect(() => {
    if (!emotionData) {
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    const preparedEmotionData = Object.keys(emotionData).map((key) => ({
      name: key,
      y: parseFloat(emotionData[key].toFixed(2)),
    }));

    Highcharts.chart("emotionContainer", {
      chart: {
        type: "pie",
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
        style : {
          fontSize: window.innerWidth <= 768 ? "1.2em" : "1.2em",
        },
        backgroundColor: mode === "dark" ? "rgb(17, 17, 17)" : "#fff",
        margin: window.innerWidth <= 768 ? [10, 0, 0, 0] : [50, 0, 0, 0],
        credits: {
          enabled: false,
        },
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "Emotion Distribution",
        style: {
          color: mode === "dark" ? "#fff" : "#000",
          fontSize: window.innerWidth <= 768 ? "1.2em" : "1.2em",
        },
      },
      tooltip: {
        formatter: function () {
          const pointName = this.point.name;
          const capitalizedPointName =
            pointName.charAt(0).toUpperCase() + pointName.slice(1);
          return (
            this.series.name +
            ": <b>" +
            this.point.percentage.toFixed(1) +
            "%</b><br/>Name: <b>" +
            capitalizedPointName +
            "</b>"
          );
        },
      },
      plotOptions: {
        pie: {
          depth: 40,
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            style: {
              fontSize: window.innerWidth <= 768 ? "9px" : "14px",
            },
            formatter: function () {
              const pointName = this.point.name;
              const capitalizedPointName =
                pointName.charAt(0).toUpperCase() + pointName.slice(1);
              return (
                "<b>" +
                capitalizedPointName +
                "</b>: " +
                this.point.percentage.toFixed(1) +
                " %"
              );
            },
          },
          pointPadding: 0,
          groupPadding: 0,
        },
      },
      series: [
        {
          name: "Emotions",
          colorByPoint: true,
          data: preparedEmotionData,
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
  }, [emotionData, mode]);

  return (
    <div>
      <div id="emotionContainer"></div>
    </div>
  );
};

export default EmotionChart;
