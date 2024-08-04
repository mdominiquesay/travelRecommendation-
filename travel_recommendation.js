
function showTime(sCity) {
    const sCities = sCity.split(",");
    var sTimeZone = sCities[1].trim() + "/" + sCities[0].trim();
    if (sCities[1].trim() === "Japan") {
        sTimeZone = "Asia/Tokyo";
    }
    else if (sCities[1].trim() === "Brazil") {
        sTimeZone = "America/Sao_Paulo";
    }
    const options = { timeZone: sTimeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const newYorkTime = new Date().toLocaleTimeString('en-US', options);
    console.log("Current time in " + sCity, newYorkTime);
}
function clearInput() {
    document.getElementById("search-input").value = "";
    fetchData();
}
function show_data(aData, sID) {
    var sRecommendation = "";
    var sCityID = 0;
    aData.forEach(city => {
        sRecommendation += "<div >";
        sRecommendation += "<div class='recommendation_img'>";
        sRecommendation += "<img src='" + city.imageUrl + "'>";
        sRecommendation += "</div>";
        sRecommendation += "<div class='recommendation_desc'>";
        sRecommendation += "<h3>" + city.name + "</h3>";
        sRecommendation += "<div class='recommendation_details'>";
        sRecommendation += city.description;
        sRecommendation += "</div>";
        if (sID !== "") {
            sRecommendation += "<button class='book-button' id='visit" + sID + "-" + sCityID + "'>Visit</button>";
        }
        else {
            sRecommendation += "<button class='book-button' >Visit</button>";
        }
        sRecommendation += "</div>";
        sRecommendation += "</div>";
        if (sID !== "") {
            sIDList.push({
                id: "visit" + sID + "-" + sCityID,
                city: city.name
            });

        }
        sCityID++;
    });

    return sRecommendation;
}
function fetchData() {
    const sInput = document.getElementById("search-input").value.toLowerCase();
    axios({
        method: 'GET',
        url: 'travel_recommendation_api.json',
        headers: {
            // Headers (optional)
        },
        data: {
        }
    }).then(response => {
        console.log(response.data);
        const countriesData = response.data;
        var innerHTML = document.getElementById("recommendation");
        var sRecommendation = "";
        var sID = 0;
        if (sInput === "" || sInput === "country" || sInput === "countries") {// Iterating over countries and cities
            countriesData.countries.forEach(country => {
                sRecommendation += show_data(country.cities, sID);
                sID++;

            });

        }

        if (sInput === "" || sInput === "temple" || sInput === "temples") {// Iterating over countries and cities
            sRecommendation += show_data(countriesData.temples, "");
        }
        if (sInput === "" || sInput === "beaches" || sInput === "beach") {// Iterating over countries and cities
            sRecommendation += show_data(countriesData.beaches, "");
        }
        innerHTML.innerHTML = sRecommendation;
        sIDList.forEach(sData => {
            const oVisitBtn = document.getElementById(sData.id);
            oVisitBtn.addEventListener("click", () => {
                showTime(sData.city);
            });
        });
    })

        .catch(error => {
            // Handle errors
        });
}
fetchData();

const searchBtn = document.getElementById("search-button");
searchBtn.addEventListener("click", fetchData);
const clearBtn = document.getElementById("clear-button");
clearBtn.addEventListener("click", clearInput);
var sIDList = [];