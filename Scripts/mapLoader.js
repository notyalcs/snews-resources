// let config = getConfig();
  
// // AddPoint(Celestial, [-80.7653, 38.7837], "TestPoint", 500);
// // AddPoint(Celestial, [-110.45, 27.123], "AnotherPoint", 500);
// // AddPoint(Celestial, [30.234, 10.23], "2", 500);
// // AddPoint(Celestial, [0, 0], "2", 500);

let customDataJSON = csvToJSON(starDataCSV);

let goldJSON = getTotalJSON(customDataJSON, "Gold");
let silverJSON = getTotalJSON(customDataJSON, "Silver");
let bronzeJSON = getTotalJSON(customDataJSON, "Bronze");

// let candidateGolds = parseStarJSON(customDataJSON, "Gold");
// let candidateSilver = parseStarJSON(customDataJSON, "Silver");
// let candidateBronze = parseStarJSON(customDataJSON, "Bronze");

// //AddPointsFromJson(Celestial, candidateGolds);

const loadAllBTN = () => {
    CURRENT_DATA = 0;
    
    document.getElementById("celestial-form").innerHTML = "";
    let config = getConfig("All");
    Celestial.display(config);
    
    document.getElementById('celestial-map').addEventListener('mousemove', getMousePosition, false);
}

const loadGoldBTN = () => {
    CURRENT_DATA = 1;
    
    document.getElementById("celestial-form").innerHTML = "";
    let config = getConfig("Gold");
    Celestial.display(config);
    
    document.getElementById('celestial-map').addEventListener('mousemove', getMousePosition, false);
    document.getElementById('celestial-map').addEventListener('click', mapClickEvent, false);
}

const loadSilverBTN = () => {
    CURRENT_DATA = 2;
    
    document.getElementById("celestial-form").innerHTML = "";
    let config = getConfig("Silver");
    Celestial.display(config);
}

const loadBronzeBTN = () => {
    CURRENT_DATA = 3;
    
    document.getElementById("celestial-form").innerHTML = "";
    let config = getConfig("Bronze");
    Celestial.display(config);
}

loadGoldBTN();
