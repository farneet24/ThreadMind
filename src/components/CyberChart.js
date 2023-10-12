import React, { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsSolidGauge from "highcharts/modules/solid-gauge";

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

const areObjectsEqual = (obj1, obj2) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

const CyberChart = ({ jsonData, mode, isLoading ,setIsLoading }) => {
  const lastCyberJsonData = useRef(null);
  const [cyberData, setCyberData] = useState(null);

  const fetchCyberData = async () => {

    setIsLoading(true)
    try {
      const response = await fetch("https://threadmind-3bfd4831eee7.herokuapp.com/cyber/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: jsonData.data.comments }),
      });

      if (response.ok) {
        const rawData = await response.json();
        const parsedData = JSON.parse(rawData.cyber);
        setCyberData(parsedData);
      } else {
        console.error("Failed to fetch cyberbullying data");
      }
    } catch (error) {
      console.error("There was an error sending the data", error);
    }
  };

  useEffect(() => {
    if (!jsonData || !jsonData.data || !jsonData.data.comments) {
      return;
    }

    if (
      lastCyberJsonData.current &&
      areObjectsEqual(lastCyberJsonData.current, jsonData)
    ) {
      return;
    }

    lastCyberJsonData.current = jsonData;

    fetchCyberData();
  }, [jsonData]);

  useEffect(() => {
    if (!cyberData) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    // Extract cyberbullying data
    const notCyberbullying = parseFloat(cyberData.not_cyberbullying || 0);
    const ageSexual = parseFloat(cyberData["age/sexual"] || 0);
    const religion = parseFloat(cyberData.religion || 0);
    const ethnicityRace = parseFloat(cyberData["ethnicity/race"] || 0);

    let stops;
    let warningText;
    let alertClass;
    if (notCyberbullying >= 90) {
      stops = [[1, "#379237"]];
      warningText =
        "The content appears to be largely free of cyberbullying or harmful elements. Viewer discretion is still advised.";
      alertClass = "alert-success";
    } else if (notCyberbullying >= 80) {
      stops = [[1, "#F2BE22"]];
      warningText =
        "Moderate risk detected. While the content is mostly safe, be cautious as it contains some elements of sensitive nature.";
      alertClass = "alert-warning";
    } else {
      stops = [[1, "#CD1818"]];
      warningText =
        "High risk detected. This video or post has been flagged for containing bullying or harmful behavior. It's advisable to proceed with extreme caution.";
      alertClass = "alert-danger";
    }

    // Now update your Highcharts logic here using the updated cyberData
    // ...
    Highcharts.chart("cyberbullyingContainer", {
      chart: {
        type: "solidgauge",
        animation: {
          duration: 3000,
          easing: "easeOutBounce",
        },
        backgroundColor: mode === "dark" ? "rgb(17, 17, 17)" : "#fff",
        margin: [25, 0, 0, 0],
      },
      credits: {
        enabled: false,
      },
      title: {
        text: `Online Safety Index`,
        style: {
          color: mode === "dark" ? "#fff" : "#000",
          fontSize: "30px", // Made the heading big
        },
      },
      pane: {
        center: ["50%", "85%"],
        size: "140%",
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || "#EEE",
          innerRadius: "60%",
          outerRadius: "100%",
          shape: "arc",
        },
      },
      exporting: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        useHTML: true,
        formatter: function () {
          let tooltipText = `<strong>Not Cyberbullying:</strong> ${notCyberbullying.toFixed(
            2
          )}%<br/>`;
          if (ethnicityRace > 0) {
            tooltipText += `<strong>Ethnicity/Race:</strong> ${ethnicityRace.toFixed(
              2
            )}%<br/>`;
          }
          if (religion > 0) {
            tooltipText += `<strong>Religion:</strong> ${religion.toFixed(
              2
            )}%<br/>`;
          }
          if (ageSexual > 0) {
            tooltipText += `<strong>Age/Sexual:</strong> ${ageSexual.toFixed(
              2
            )}%<br/>`;
          }
          return tooltipText;
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        stops: stops,
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          y: -70,
        },
        labels: {
          y: 16,
          style: {
            color: mode === "dark" ? "#fff" : "#000",
          },
        },
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      series: [
        {
          data: [notCyberbullying],
          dataLabels: {
            format:
              '<div style="text-align:center">' +
              '<span style="font-size:20px">{y:.2f}</span> ' +
              '<span style="font-size:12px;opacity:0.8">%</span>' +
              "</div>",
          },
          tooltip: {
            valueSuffix: " %",
          },
        },
      ],
    });

    // Set the text and Bootstrap alert class
    const warningElement = document.getElementById("warningText");
    warningElement.textContent = warningText;
    warningElement.className = `alert ${alertClass}`;
  }, [cyberData, mode]);

  return (
    <>
      <div id="cyberbullyingContainer" style={{ height: "250px" }}></div>
      <br />
      <p id="warningText" class="alert"></p>
      <br />
      <br />
    </>
  );
};

export default CyberChart;
