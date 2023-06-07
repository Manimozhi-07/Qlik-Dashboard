var prefix = window.location.pathname.substr(
  0,
  window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1
);
var config = {
  host: window.location.hostname,
  prefix: prefix,
  port: window.location.port,
  isSecure: window.location.protocol === "https:",
};
require.config({
  baseUrl:
    (config.isSecure ? "https://" : "http://") +
    config.host +
    (config.port ? ":" + config.port : "") +
    config.prefix +
    "resources",
});

require(["js/qlik"], function (qlik) {
  //open app
  var app = qlik.openApp("a92e83cb-98b5-4c02-9dad-753067b309bd", config);

  //get object
  app.getObject("CurrentSelections", "CurrentSelections");
  app.getObject("kpi1", "Mucjqa");
  app.getObject("kpi2", "TrRcd");
  app.getObject("kpi3", "mpfTcL");
  app.getObject("kpi4", "zmXPJPa");
  app.getObject("obj2", "ewbPV");
  app.getObject("obj3", "tTZQUX");
  app.getObject("obj4", "cbBHXD");
  app.getObject("obj5", "sqYtfY");
  app.getObject("obj6", "pvJDPB");
  app.getObject("obj7", "FbmGRwK");
  app.getObject("obj8", "JNhxrdy");
  // app.getObject("obj9", "pvJDPB");
  // app.getObject("obj10", "ewbPV");
  // app.getObject("obj11", "tTZQUX");
  // app.getObject("obj12", "cbBHXD");
  // app.getObject("obj13", "sqYtfY");
  // app.getObject("obj14", "pvJDPB");
  // app.getObject("obj15", "FbmGRwK");
  // app.getObject("obj16", "JNhxrdy");
  // app.getObject("obj17", "sqYtfY");
  // app.getObject("obj18", "pvJDPB");
  // app.getObject("obj19", "FbmGRwK");
  // app.getObject("obj20", "JNhxrdy");

  $("document").ready(function () {
    // async function getObj() {
    //   const response = await fetch("object.json");
    //   const data = await response.json();
    //   console.log(data);
    // }
    // getObj();
    // fetch("object.json")
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));
    //Language Dropdown
    $("#myDropdown").ddslick({
      width: "125px",
      imagePosition: "left",
    });
    //UserName
    qlik.getGlobal().getAuthenticatedUser(function (reply) {
      var username = reply.qReturn.split(";")[1].split("=")[1];
      $("#name").text(username.toUpperCase());
    });

    //Tabs
    function removeActive() {
      $("#list a").removeClass("activeli");
      $("#content .main").removeClass("active");
    }

    $("#list a").each(function (i) {
      $(this).on("click", function () {
        removeActive();
        $(this).addClass("activeli");
        $("#content .main").eq(i).addClass("active");
        //qlik resize
        qlik.resize();
      });
    });

    //list display
    $(window).on("resize load", function () {
      if ($(this).innerWidth() > 1110) {
        $("#list").show();
      } else {
        $("#list").hide();
      }
    });

    //Collapse Expand

    $(" #brand button ").click(function () {
      $("#list").slideToggle(1000);
    });

    //Dynamic items

    $("#list a").click(function () {
      var textval = $.trim($(this).text());
      $("#item h4").text(textval);
      //Getting objects
      // var myObj = {
      //   Dashboard: {
      //     kpi1: "Mucjqa",
      //     kpi2: "TrRcd",
      //     kpi3: "mpfTcL",
      //     kpi4: "zmXPJPa",
      //     obj2: "ewbPV",
      //     obj3: "tTZQUX",
      //     obj4: "cbBHXD",
      //     obj5: "sqYtfY",
      //     obj6: "pvJDPB",
      //     obj7: "FbmGRwK",
      //     obj8: "JNhxrdy",
      //   },
      //   Leaderboard: {
      //     obj9: "pvJDPB",
      //     obj10: "ewbPV",
      //     obj11: "tTZQUX",
      //     obj12: "cbBHXD",
      //   },
      //   Order: {
      //     obj13: "sqYtfY",
      //     obj14: "pvJDPB",
      //     obj15: "FbmGRwK",
      //     obj16: "JNhxrdy",
      //   },
      //   Products: {
      //     obj17: "sqYtfY",
      //     obj18: "pvJDPB",
      //     obj19: "FbmGRwK",
      //     obj20: "JNhxrdy",
      //   },
      // };

      // fetch("object.json")
      //   .then((response) => response.json())
      //   .then((data) => {
      //     const myObj = data;
      //     function renderObj(textval) {
      //       var objects = myObj[textval]; //objects

      //       Object.entries(objects).forEach(([key, value]) => {
      //         app.getObject(key, value);
      //       });
      //     }
      //     renderObj(textval);
      //   });
      function renderObj(textval) {
        async function getObj() {
          const response = await fetch("object.json");
          const data = await response.json();
          var objects = data[textval];
          Object.entries(objects).forEach(([key, value]) => {
            app.getObject(key, value);
          });
        }
        getObj();
      }
      renderObj(textval);
    });

    //ToggleChart
    $("#grphbutton").on("click", function () {
      var lineChart = '<i class="bi bi-graph-up"></i>&nbsp;LineChart';
      var barChart = '<i class="bi bi-bar-chart"></i>&nbsp;BarChart';
      if ($(this).html() === barChart) {
        app.getObject("obj3", "tTZQUX");
        $(this).html(lineChart);
      } else {
        app.getObject("obj3", "sWCYRqh");
        $(this).html(barChart);
      }
    });

    //jQuery(Togglebar)
    $("#first").on("click", function () {
      $(".first-i").toggleClass("slide");
      myToggle();
    });
    function myToggle() {
      const isSlide = $(".first-i").hasClass("slide");
      console.log(isSlide ? "Monthly" : "Weekly");
      $("#monthly").toggleClass("bold", isSlide);
      $("#weekly").toggleClass("bold", !isSlide);
    }

    $("#second").on("click", function () {
      $(".second-i").toggleClass("slide");
      myToggleChart();
    });
    function myToggleChart() {
      const isSlideChart = $(".second-i").hasClass("slide");
      isSlideChart
        ? app.getObject("obj8", "CJypqPR")
        : app.getObject("obj8", "JNhxrdy");
      $("#pieChart i").toggleClass("bold-icon", isSlideChart);
      $("#barChart i").toggleClass("bold-icon", !isSlideChart);
    }

    //Table Radiobtn
    $("#table").on("click", function () {
      app.getObject("obj9", "pvJDPB");
    });
    $("#bar").on("click", function () {
      app.getObject("obj9", "JNhxrdy");
    });
    $("#line").on("click", function () {
      app.getObject("obj9", "ewbPV");
    });

    //Export Button
    $("#export-btn").on("click", () => {
      app.visualization.get("ewbPV").then(function (vis) {
        vis
          .exportData({ state: "A", filename: "Data.xlsx" })
          .then(function (link) {
            fetch(link)
              .then((response) => response.blob())
              .then((blob) => {
                const url = URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = url;
                anchor.download = "Data.xlsx";
                anchor.click();
              });
          });
      });
    });
  });
});
