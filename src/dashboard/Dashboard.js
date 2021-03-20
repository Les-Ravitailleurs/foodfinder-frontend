import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "moment/locale/fr";
import Chart from "chart.js";

import queryString from "query-string";
import CopyPaste from "../copyPaste/CopyPaste";
import fouet from "./fouet.svg";
import spatule from "./spatule.svg";
import lemontomato from "../collectesSummary/lemon-tomato.svg";

import "./Dashboard.css";

import api from "../api";
import CollectesSummary from "../collectesSummary/CollectesSummary";

moment.locale("fr");

const showChart = (fullData, count, chartId, prevCountRef) => {
  const ctx = document.getElementById(chartId);
  if (ctx) {
    const slicedData = fullData.slice(
      count ? fullData.length - count : 0,
      fullData.length
    );
    const data = slicedData.map((p) => p.donationsCount);
    const labels = Array(data.length);
    for (let i = 0; i < data.length; i++) {
      labels[i] = i;
    }
    var pos = window.jQuery(document).scrollTop();
    if (window[chartId] && window[chartId].destroy) {
      window[chartId].destroy();
    }
    prevCountRef.current = count;
    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: "#e8e8e8",
            fill: false,
            lineTension: 0,
            borderWidth: 4,
            pointBorderColor: "#000000",
            pointRadius: 2,
            pointBackgroundColor: "#000000",
          },
        ],
      },
      options: {
        layout: {
          padding: {
            left: 0,
            right: 4,
            top: 0,
            bottom: 0,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
        },
        chartArea: {
          backgroundColor: "#f4f4f4",
          isHorizontal: true,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: true,
                lineWidth: 0,
                display: true,
                zeroLineColor: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                display: false,
                max: Math.max(...data) + 1,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: true,
              },
              ticks: {
                display: false,
                max: data.length + 1,
              },
            },
          ],
        },
        devicePixelRatio: 2,
        tooltips: {
          // Disable the on-canvas tooltip
          enabled: false,

          custom: function (tooltipModel) {
            // Tooltip Element
            var tooltipEl = document.getElementById("chartjs-tooltip");

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement("div");
              tooltipEl.id = "chartjs-tooltip";
              tooltipEl.innerHTML = "<div class='chartjsTooltip'></div>";
              document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }

            function getBody(bodyItem) {
              return bodyItem.lines;
            }

            const tooltipIndex =
              tooltipModel.dataPoints &&
              tooltipModel.dataPoints[0] &&
              tooltipModel.dataPoints[0].index;
            const data = slicedData[tooltipIndex];

            const average = data.donationsCount
              ? parseInt((data.amount / 100 / data.donationsCount) * 100) / 100
              : 0;
            tooltipEl.innerHTML = `
            <div class="chartjsTooltip">
              <div class="row">
                <div class="col-6">
                  <div class="tooltipLeft">
                    Dons&nbsp;récoltés
                    <h3>${(data.amount / 100).toLocaleString()}€</h3>
                  </div>
                </div>
                <div class="col-6">
                  <div class="tooltipRight">
                    <div><span class="white">${data.mealCount.toLocaleString()}</span>&nbsp;Repas</div>
                    <div><span class="white">${data.donationsCount.toLocaleString()}</span>&nbsp;Dons</div>
                    <div><span class="white">${average.toLocaleString()}€</span>&nbsp;Don&nbsp;moyen</div>
                  </div>
                </div>
              </div>
              <div class="tooltipDate">Le&nbsp;${data.date}</div>
            </div>`;

            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect();

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = "absolute";
            tooltipEl.style.left =
              position.left + window.pageXOffset + tooltipModel.caretX + "px";
            tooltipEl.style.top =
              position.top + window.pageYOffset + tooltipModel.caretY + "px";
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + "px";
            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
            tooltipEl.style.padding =
              tooltipModel.yPadding + "px " + tooltipModel.xPadding + "px";
            tooltipEl.style.pointerEvents = "none";
          },
        },
      },
    });
    window[chartId] = newChart;
    window.jQuery(document).scrollTop(pos);
  }
};

Chart.pluginService.register({
  beforeDraw: function (chart, easing) {
    if (
      chart.config.options.chartArea &&
      chart.config.options.chartArea.backgroundColor
    ) {
      // var helpers = Chart.helpers;
      var ctx = chart.chart.ctx;
      var chartArea = chart.chartArea;
      var values = chart.data.datasets[0].data; // Added
      // var columnCount = chart.data.datasets[0].data.length;
      var columnCount = chart.controller.scales["x-axis-0"].ticks.length - 1;
      var rowCount = 9; //values.length;// Math.ceil(Math.max.apply(null, values) / 10); // Replace by the number of rows you need
      var width = chart.controller.scales["x-axis-0"].width; //chartArea.right - chartArea.left;
      var height = chartArea.bottom - chartArea.top;

      var columnWidth = width / columnCount;
      var rowHeight = height / rowCount;
      ctx.save();
      ctx.fillStyle = chart.config.options.chartArea.backgroundColor;

      if (chart.config.options.chartArea.isHorizontal) {
        //vertical background
        var startPoint = chartArea.left;
        while (startPoint < chartArea.right) {
          ctx.fillRect(startPoint, chartArea.top, columnWidth, height);
          startPoint += columnWidth * 2;
        }
      } else {
        //horizontal background
        var startPoint = chartArea.top;
        while (startPoint < chartArea.bottom) {
          ctx.fillRect(chartArea.left, startPoint, width, rowHeight);
          startPoint += rowHeight * 2;
        }
      }

      ctx.restore();
    }
  },
});

const dashboardBox = (
  data,
  title,
  stats,
  chartId,
  chartCount,
  setChartCount,
  subtitle
) => {
  const average = data.donationsCount
    ? parseInt((data.amount / 100 / data.donationsCount) * 100) / 100
    : 0;
  return (
    <div className="DashboardBox DashboardBoxMetrics">
      <h3>
        {title}
        {subtitle && (
          <div
            style={{
              fontFamily: "Open Sans",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {subtitle}
          </div>
        )}
      </h3>
      <div>
        <h3 className="green">{(data.amount / 100).toLocaleString()}€</h3>
        De&nbsp;dons
      </div>
      <div className="DashboardBoxRow">
        <div className="row">
          <div className="col-4">
            <h3 className="green">{data.mealCount.toLocaleString()}</h3>
            Repas
          </div>
          <div className="col-4">
            <h3 className="green">{data.donationsCount.toLocaleString()}</h3>
            Dons
          </div>
          <div className="col-4">
            <h3 className="green">{average.toLocaleString()}€</h3>
            Don&nbsp;moyen
          </div>
        </div>
      </div>
      {stats && (
        <div className="DashboardBoxChart">
          <div className="CanvasContainer">
            <canvas id={chartId}></canvas>
          </div>
          <div className="DashboardBoxChartButtons">
            <div className="row no-gutters">
              <div className="col-3" onClick={() => setChartCount(7)}>
                <div
                  className={
                    chartCount === 7 ? "DashboardChartButtonSelected" : ""
                  }
                >
                  7j
                </div>
              </div>
              <div className="col-3" onClick={() => setChartCount(14)}>
                <div
                  className={
                    chartCount === 14 ? "DashboardChartButtonSelected" : ""
                  }
                >
                  14j
                </div>
              </div>
              <div className="col-3" onClick={() => setChartCount(30)}>
                <div
                  className={
                    chartCount === 30 ? "DashboardChartButtonSelected" : ""
                  }
                >
                  30j
                </div>
              </div>
              <div className="col-3" onClick={() => setChartCount(0)}>
                <div
                  className={
                    chartCount === 0 ? "DashboardChartButtonSelected" : ""
                  }
                >
                  Tout
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const history = useHistory();
  const { token: volunteerId } = queryString.parse(window.location.search);
  const [dashboardData, setDashboardData] = useState(null);
  if (!volunteerId) {
    history.push("/");
  }

  const [showAllList, setShowAllList] = useState(true);
  const [showAllEmoji, setShowAllEmoji] = useState(true);
  const [poolData, setPoolData] = useState(null);
  const [updatedLikeCount, setUpdatedLikeCount] = useState({});
  const [showExtendedEmojiList, setShowExtendedEmojiList] = useState(false);

  const incrementLikeCount = (donation) => () => {
    const currentLikeCount = parseInt(
      updatedLikeCount[donation.id] || donation.likeCount || 0,
      0
    );
    setUpdatedLikeCount({
      ...updatedLikeCount,
      [donation.id]: currentLikeCount + 1,
    });
    api.post(
      `/dashboard/increment?volunteerId=${volunteerId}&donationId=${donation.id}`
    );
  };

  const chart1 = useRef();
  const chart2 = useRef();

  const getDashboardData = useCallback(async () => {
    try {
      const { data } = await api.get(`/dashboard?volunteerId=${volunteerId}`);
      localStorage.setItem(`ravit-volunteer`, JSON.stringify(data.volunteer));
      setDashboardData(data);
    } catch (e) {
      history.push("/");
    }
  }, [history, volunteerId]);

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  const poolId = process.env.REACT_APP_RAVIT_POOL_ID;

  const getPool = useCallback(async () => {
    try {
      const { data } = await api.get(`/pool/${poolId}`);
      setPoolData(data);
    } catch (e) {
      console.log(e);
    }
  }, [poolId]);

  useEffect(() => {
    getPool();
  }, [getPool]);

  const donationsRows = [];
  const myDonationsRows = [];
  const myDailyTotal = {
    amount: 0,
    mealCount: 0,
    donationsCount: 0,
  };
  const dailyTotal = {
    amount: 0,
    mealCount: 0,
    donationsCount: 0,
  };
  const myTotal = {
    amount: 0,
    mealCount: 0,
    donationsCount: 0,
  };
  const total = {
    amount: 0,
    mealCount: 0,
    donationsCount: 0,
  };
  const now = moment();
  let firstDay = null;
  let byDay = {};
  dashboardData &&
    dashboardData.donations.forEach((donation) => {
      const donationDate = moment(donation.createdAt);
      const isToday = moment(donation.createdAt).isSame(now, "day");
      firstDay = moment(donationDate).format("YYYY-MM-DD");
      byDay[firstDay] = byDay[firstDay] || [];
      byDay[firstDay].push(donation);
      if (donation.me) {
        myTotal.amount += donation.amount;
        myTotal.mealCount += donation.mealCount;
        myTotal.donationsCount += 1;
        if (isToday) {
          myDailyTotal.amount += donation.amount;
          myDailyTotal.mealCount += donation.mealCount;
          myDailyTotal.donationsCount += 1;
        }
      } else if (isToday) {
        dailyTotal.amount += donation.amount;
        dailyTotal.mealCount += donation.mealCount;
        dailyTotal.donationsCount += 1;
      }
      total.amount += donation.amount;
      total.mealCount += donation.mealCount;
      total.donationsCount += 1;
      const donationRow = (
        <div key={donation.id} className="DonationRow">
          <div
            className="DonationEmoji noselect"
            onClick={incrementLikeCount(donation)}
          >
            <div>{donation.volunteerEmoji || "👏"}</div>
            <div className="DonationLikeCount">
              {updatedLikeCount[donation.id] || donation.likeCount || 0}
            </div>
          </div>
          <div className="DonationContent">
            <div>
              <b className="black">{donation.amount / 100}€</b>&nbsp;soit&nbsp;
              <b className="black">{donation.mealCount}</b>&nbsp;repas
            </div>
            <div>
              {donation.me && donation.name ? (
                <span>
                  De <b>{donation.name} </b>
                </span>
              ) : (
                ""
              )}
              {donation.volunteerName ? (
                <span>
                  via <b>{donation.volunteerName}</b>
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      );
      donationsRows.push(donationRow);
      if (donation.me) {
        myDonationsRows.push(donationRow);
      }
    });

  // Now let's loop for every day
  const myStatsByDay = [];
  const statsByDay = [];
  const numberOfDays = now.diff(moment(firstDay), "days");
  for (let i = 0; i <= numberOfDays; i++) {
    const day = moment(firstDay).add(i, "days");
    const date = day.format("YYYY-MM-DD");
    const frenchDate = day.format("DD MMMM");
    const donationsOfThisDay = byDay[date] || [];
    const myDonationsOfThisDay = donationsOfThisDay.filter((d) => d.me);

    myStatsByDay.push({
      donationsCount: myDonationsOfThisDay.length,
      mealCount: myDonationsOfThisDay.reduce((a, b) => a + b.mealCount, 0),
      amount: myDonationsOfThisDay.reduce((a, b) => a + b.amount, 0),
      date: frenchDate,
    });
    statsByDay.push({
      donationsCount: donationsOfThisDay.length,
      mealCount: donationsOfThisDay.reduce((a, b) => a + b.mealCount, 0),
      amount: donationsOfThisDay.reduce((a, b) => a + b.amount, 0),
      date: frenchDate,
    });
  }

  const [chart1Count, setChart1Count] = useState(7);
  const [chart2Count, setChart2Count] = useState(7);

  const prevCount1Ref = useRef();
  const prevCount2Ref = useRef();

  useEffect(() => {
    showChart(myStatsByDay, chart1Count, "chart1");
    showChart(statsByDay, chart2Count, "chart2");
  }, []);

  useEffect(() => {
    if (chart1Count !== prevCount1Ref.current) {
      showChart(myStatsByDay, chart1Count, "chart1", prevCount1Ref);
    }
    if (chart2Count !== prevCount2Ref.current) {
      showChart(statsByDay, chart2Count, "chart2", prevCount2Ref);
    }
  });

  const [allEmojiList, setAllEmojiList] = useState([]);
  const [myEmojiList, setMyEmojiList] = useState([]);

  useEffect(() => {
    const newAllEmojiList = [];
    const newMyEmojiList = [];
    dashboardData &&
      dashboardData.donations.forEach((donation) => {
        for (let i = 0; i < donation.mealCount; i++) {
          const emojiDiv = (
            <div key={`${donation.id}-${i}`} className="EmojiElement">
              {donation.volunteerEmoji || "👏"}
            </div>
          );
          newAllEmojiList.push(emojiDiv);
          if (donation.me) {
            newMyEmojiList.push(emojiDiv);
          }
        }
        setAllEmojiList(newAllEmojiList);
        setMyEmojiList(newMyEmojiList);
      });
  }, [dashboardData]);

  if (!dashboardData) return null;

  return (
    <div className="secondary Dashboard">
      <img src={spatule} className="DashboardSpatule" />
      <div className="container">
        <img className="logo mt-5 mb-5" src="/landing/images/logo.svg" />
        <div className="row">
          <div className="col-12 col-lg-8">
            <img src={fouet} className="DashboardFouet" />
            <h1>
              Hello{" "}
              <span className="green">{dashboardData.volunteer.name}</span>
            </h1>
            <div className="DashboardBox">
              <h3>Votre lien vers la collecte</h3>
              <CopyPaste
                poolId={""}
                volunteerUsername={dashboardData.volunteer.username}
              />
              <h3 style={{ fontSize: 18, marginTop: 30 }}>
                Le lien vers le guide du bénévole
              </h3>
              <a
                style={{ opacity: 0.7 }}
                href="https://bit.ly/3pTSU1c"
                target="_blank"
              >
                https://bit.ly/3pTSU1c
              </a>
            </div>
            <div class="row DashboardScrollBoxes">
              <div class="col-12">
                <div className="row DashboardScrollContainer">
                  <div className="col-6 DashboardScrollContainerElement">
                    {dashboardBox(myDailyTotal, "Mes dons du jour")}
                  </div>
                  <div className="col-6 DashboardScrollContainerElement">
                    {dashboardBox(dailyTotal, "Total du jour")}
                  </div>
                </div>
              </div>
            </div>
            <div class="row DashboardScrollBoxes">
              <div class="col-12">
                <div className="row DashboardScrollContainer">
                  <div className="col-6 DashboardScrollContainerElement">
                    {dashboardBox(
                      myTotal,
                      "Total de mes dons",
                      myStatsByDay,
                      "chart1",
                      chart1Count,
                      setChart1Count,
                      "Depuis la création de mon lien"
                    )}
                  </div>
                  <div className="col-6 DashboardScrollContainerElement">
                    {dashboardBox(
                      total,
                      "Total de tous les dons",
                      statsByDay,
                      "chart2",
                      chart2Count,
                      setChart2Count,
                      "Depuis le lancement des collectes"
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12" style={{marginTop: 30}}>
                <CollectesSummary
                  title="Challenge : financement du budget 2021 des Ravitailleurs"
                  mealsCount={
                    poolData ? poolData.startAt + poolData.mealCount : 0
                  }
                  donatorsCount={poolData ? poolData.donationsCount : 0}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <h1>&nbsp;</h1>
            <div className="DashboardBox DashboardDonationListContainer">
              <img
                src={lemontomato}
                className="DashboardLemonTomato d-none d-lg-inline"
              />
              <h3>Liste des dons</h3>
              <div className="DashboardSelectors">
                <div className="row no-gutters">
                  <div
                    className={`DashboardSelector ${
                      showAllList ? "DashboardSelectorSelected" : ""
                    }`}
                    onClick={() => setShowAllList(true)}
                  >
                    Tous
                  </div>
                  <div
                    className={`DashboardSelector ${
                      showAllList ? "" : "DashboardSelectorSelected"
                    }`}
                    onClick={() => setShowAllList(false)}
                  >
                    Via mon lien
                  </div>
                </div>
              </div>
              <div className="DashboardDonationList">
                {showAllList ? donationsRows : myDonationsRows}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className="DashboardBox">
              <h3>Votre impact 💪</h3>
              <p>
                Ci-dessous, un repas récolté = un emoji. Vous pouvez filtrer les
                dons que vous avez récoltés et les dons totaux.
              </p>
              <div
                className="DashboardSelectors"
                style={{ maxWidth: 322, margin: "30px auto 38px auto" }}
              >
                <div className="row no-gutters">
                  <div
                    className={`DashboardSelector ${
                      showAllEmoji ? "DashboardSelectorSelected" : ""
                    }`}
                    onClick={() => setShowAllEmoji(true)}
                  >
                    Tous les dons
                  </div>
                  <div
                    className={`DashboardSelector ${
                      showAllEmoji ? "" : "DashboardSelectorSelected"
                    }`}
                    onClick={() => {
                      setShowAllEmoji(false);
                      setShowExtendedEmojiList(false);
                    }}
                  >
                    Via mon lien
                  </div>
                </div>
              </div>
              <div className="EmojiList">
                {showAllEmoji
                  ? showExtendedEmojiList
                    ? allEmojiList
                    : allEmojiList.slice(0, 160)
                  : myEmojiList}
              </div>
              {!showExtendedEmojiList && showAllEmoji && (
                <div class="text-center">
                  <div
                    class="button"
                    onClick={() => setShowExtendedEmojiList(true)}
                  >
                    Tout afficher
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="footer pt-3 pb-3 mt-5 mb-0"
        style={{ backgroundColor: "#EDEBDA" }}
      >
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-sm-3 col-12 mb-3 mb-sm-0">
              <img src="/landing/images/logo.svg" />
            </div>
            <div className="col-sm-6 col-12 mb-3 mb-sm-0">
              <span>
                Design par{" "}
                <a href="https://source.paris/" target="_blank">
                  Source
                </a>{" "}
                &amp; Développement par
                <a
                  href="https://www.linkedin.com/in/noemalzieu"
                  target="_blank"
                >
                  Noé Malzieu
                </a>
              </span>
            </div>
            <div className="col-sm-3 col-12">
              <span>Tous droits réservés © 2020</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
