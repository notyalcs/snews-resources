const getConfig = (canLevel) => {
    return { 
        width: 0,           // Default width, 0 = full parent element width; 
                            // height is determined by projection
        //projection: "armadillo",    // Map projection used: see below
        // projection: "airy",
        projection: "mollweide",
        projectionRatio: null,   // Optional override for default projection ratio
        transform: "equatorial", // Coordinate transformation: equatorial (default),
                                // ecliptic, galactic, supergalactic
        center: null,       // Initial center coordinates in set transform
                            // [longitude, latitude, orientation] all in degrees 
                            // null = default center [0,0,0]
        orientationfixed: true,  // Keep orientation angle the same as center[2]
        geopos: null,       // optional initial geographic position [lat,lon] in degrees, 
                            // overrides center
        follow: "zenith",   // on which coordinates to center the map, default: zenith, if location enabled, 
                            // otherwise center
        zoomlevel: null,    // initial zoom level 0...zoomextend; 0|null = default, 1 = 100%, 0 < x <= zoomextend
        zoomextend: 10,     // maximum zoom level
        adaptable: true,    // Sizes are increased with higher zoom-levels
        interactive: true,  // Enable zooming and rotation with mousewheel and dragging
        form: true,         // Display form for interactive settings. Needs a div with
                            // id="celestial-form", created automatically if not present
        location: false,    // Display location settings. Deprecated, use formFields below
        formFields: {"location": true,  // Set visiblity for each group of fields with the respective id
                    "general": true,  
                    "stars": true,  
                    "dsos": false,  
                    "constellations": true,  
                    "lines": true,  
                    "other": true,  
                    "download": true},  
        advanced: true,     // Display fewer form fields if false 
        daterange: [],      // Calender date range; null: displaydate-+10; [n<100]: displaydate-+n; [yr]: yr-+10; 
                            // [yr, n<100]: [yr-n, yr+n]; [yr0, yr1]  
        controls: true,     // Display zoom controls
        lang: "",           // Global language override for names, any name setting that has the chosen language available
                            // Default: desig or empty string for designations, other languages as used anywhere else
        culture: "",        // Source of constellations and star names, default "iau", other: "cn" Traditional Chinese
        container: "celestial-map",   // ID of parent element, e.g. div, null = html-body
        datapath: "https://www.sclayton.ca/TEST/starmap/Data/",  // Path/URL to data files, empty = subfolder 'data'
        stars: {
        show: true,    // Show stars
        limit: 16,      // Show only stars brighter than limit magnitude
        colors: true,  // Show stars in spectral colors, if not use default color
        style: { fill: "#ffffff", opacity: 1 }, // Default style for stars
        designation: false, // Show star names (Bayer, Flamsteed, Variable star, Gliese or designation, 
                            // i.e. whichever of the previous applies first); may vary with culture setting
        designationType: "desig",  // Which kind of name is displayed as designation (fieldname in starnames.json)
        designationStyle: { fill: "#ddddbb", font: "11px 'Palatino Linotype', Georgia, Times, 'Times Roman', serif", align: "left", baseline: "top" },
        designationLimit: 2.5,  // Show only names for stars brighter than nameLimit
        propername: false,   // Show proper name (if present)
        propernameType: "name", // Languge for proper name, default IAU name; may vary with culture setting 
                                // (see list below of languages codes available for stars)
        propernameStyle: { fill: "#ddddbb", font: "13px 'Palatino Linotype', Georgia, Times, 'Times Roman', serif", align: "right", baseline: "bottom" },
        propernameLimit: 1.5,  // Show proper names for stars brighter than propernameLimit
        size: 7,       // Maximum size (radius) of star circle in pixels
        exponent: -0.28, // Scale exponent for star size, larger = more linear
        data: (canLevel == "All") ? "stars.6.json" : `candidate${canLevel}.json` // Data source for stellar data, 
                            // number indicates limit magnitude
        },
        dsos: {
        show: false,    // Show Deep Space Objects 
        limit: 6,      // Show only DSOs brighter than limit magnitude
        colors: true,  // // Show DSOs in symbol colors if true, use style setting below if false
        style: { fill: "#cccccc", stroke: "#cccccc", width: 2, opacity: 1 }, // Default style for dsos
        names: true,   // Show DSO names
        namesType: "name",  // Type of DSO ('desig' or language) name shown
                            // (see list below for languages codes available for dsos)
        nameStyle: { fill: "#cccccc", font: "11px Helvetica, Arial, serif", 
                    align: "left", baseline: "top" }, // Style for DSO names
        nameLimit: 6,  // Show only names for DSOs brighter than namelimit
        size: null,    // Optional seperate scale size for DSOs, null = stars.size
        exponent: 1.4, // Scale exponent for DSO size, larger = more non-linear
        data: 'dsos.bright.json', // Data source for DSOs, 
                                    // opt. number indicates limit magnitude
        symbols: {  //DSO symbol styles, 'stroke'-parameter present = outline
            gg: {shape: "circle", fill: "#ff0000"},          // Galaxy cluster
            g:  {shape: "ellipse", fill: "#ff0000"},         // Generic galaxy
            s:  {shape: "ellipse", fill: "#ff0000"},         // Spiral galaxy
            s0: {shape: "ellipse", fill: "#ff0000"},         // Lenticular galaxy
            sd: {shape: "ellipse", fill: "#ff0000"},         // Dwarf galaxy
            e:  {shape: "ellipse", fill: "#ff0000"},         // Elliptical galaxy
            i:  {shape: "ellipse", fill: "#ff0000"},         // Irregular galaxy
            oc: {shape: "circle", fill: "#ffcc00", 
                stroke: "#ffcc00", width: 1.5},             // Open cluster
            gc: {shape: "circle", fill: "#ff9900"},          // Globular cluster
            en: {shape: "square", fill: "#ff00cc"},          // Emission nebula
            bn: {shape: "square", fill: "#ff00cc", 
                stroke: "#ff00cc", width: 2},               // Generic bright nebula
            sfr:{shape: "square", fill: "#cc00ff", 
                stroke: "#cc00ff", width: 2},               // Star forming region
            rn: {shape: "square", fill: "#00ooff"},          // Reflection nebula
            pn: {shape: "diamond", fill: "#00cccc"},         // Planetary nebula 
            snr:{shape: "diamond", fill: "#ff00cc"},         // Supernova remnant
            dn: {shape: "square", fill: "#999999", 
                stroke: "#999999", width: 2},               // Dark nebula grey
            pos:{shape: "marker", fill: "#cccccc", 
                stroke: "#cccccc", width: 1.5}              // Generic marker
        }
        },
        planets: {  //Show planet locations, if date-time is set
        show: false,
        // List of all objects to show
        which: ["sol", "mer", "ven", "ter", "lun", "mar", "jup", "sat", "ura", "nep"],
        // Font styles for planetary symbols
        symbols: {  // Character and color for each symbol in 'which' above (simple circle: \u25cf), optional size override for Sun & Moon
            "sol": {symbol: "\u2609", letter:"Su", fill: "#ffff00", size:""},
            "mer": {symbol: "\u263f", letter:"Me", fill: "#cccccc"},
            "ven": {symbol: "\u2640", letter:"V", fill: "#eeeecc"},
            "ter": {symbol: "\u2295", letter:"T", fill: "#00ccff"},
            "lun": {symbol: "\u25cf", letter:"L", fill: "#ffffff", size:""}, // overridden by generated crecent, except letter & size
            "mar": {symbol: "\u2642", letter:"Ma", fill: "#ff6600"},
            "cer": {symbol: "\u26b3", letter:"C", fill: "#cccccc"},
            "ves": {symbol: "\u26b6", letter:"Ma", fill: "#cccccc"},
            "jup": {symbol: "\u2643", letter:"J", fill: "#ffaa33"},
            "sat": {symbol: "\u2644", letter:"Sa", fill: "#ffdd66"},
            "ura": {symbol: "\u2645", letter:"U", fill: "#66ccff"},
            "nep": {symbol: "\u2646", letter:"N", fill: "#6666ff"},
            "plu": {symbol: "\u2647", letter:"P", fill: "#aaaaaa"},
            "eri": {symbol: "\u26aa", letter:"E", fill: "#eeeeee"}
        },
        symbolStyle: { fill: "#00ccff", font: "bold 17px 'Lucida Sans Unicode', Consolas, sans-serif", 
                align: "center", baseline: "middle" },
        symbolType: "symbol",  // Type of planet symbol: 'symbol' graphic planet sign, 'disk' filled circle scaled by magnitude
                                // 'letter': 1 or 2 letters S Me V L Ma J S U N     
        names: false,          // Show name in nameType language next to symbol
        nameStyle: { fill: "#00ccff", font: "14px 'Lucida Sans Unicode', Consolas, sans-serif", align: "right", baseline: "top" },
        namesType: "desig"     // Language of planet name (see list below of language codes available for planets), 
                                // or desig = 3-letter designation
        },
        constellations: {
        names: true,      // Show constellation names 
        namesType: "iau", // Type of name Latin (iau, default), 3 letter designation (desig) or other language (see list below)
        nameStyle: { fill:"#cccc99", align: "center", baseline: "middle", 
                    font: ["14px Helvetica, Arial, sans-serif",  // Style for constellations
                            "12px Helvetica, Arial, sans-serif",  // Different fonts for diff.
                            "11px Helvetica, Arial, sans-serif"]},// ranked constellations
        lines: true,   // Show constellation lines, style below
        lineStyle: { stroke: "#cccccc", width: 1, opacity: 0.6 }, 
        bounds: false, // Show constellation boundaries, style below
        boundStyle: { stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4] }
        },  
        mw: {
        show: false,     // Show Milky Way as filled multi-polygon outlines 
        style: { fill: "#ffffff", opacity: 0.1 }  // Style for MW layers
        },
        lines: {  // Display & styles for graticule & some planes
        graticule: { show: true, stroke: "#cccccc", width: 0.6, opacity: 0.8,   
            // grid values: "outline", "center", or [lat,...] specific position
            lon: {pos: [""], fill: "#eee", font: "10px Helvetica, Arial, sans-serif"}, 
            // grid values: "outline", "center", or [lon,...] specific position
            lat: {pos: [""], fill: "#eee", font: "10px Helvetica, Arial, sans-serif"}},    
        equatorial: { show: true, stroke: "#aaaaaa", width: 1.3, opacity: 0.7 },  
        ecliptic: { show: true, stroke: "#66cc66", width: 1.3, opacity: 0.7 },     
        galactic: { show: true, stroke: "#cc6666", width: 1.3, opacity: 0.7 },    
        supergalactic: { show: false, stroke: "#cc66cc", width: 1.3, opacity: 0.7 }
        },
        background: {        // Background style
        fill: "#000000",   // Area fill
        opacity: 1, 
        stroke: "#000000", // Outline
        width: 1.5
        }, 
        horizon: {  //Show horizon marker, if location is set and map projection is all-sky
        show: true, 
        stroke: "#cccccc", // Line
        width: 1.0, 
        fill: "#000000",   // Area below horizon
        opacity: 0.5
        },  
        daylight: {  //Show day sky as a gradient, if location is set and map projection is hemispheric
        show: true
        }
    };
}

  function deg2hms (deg) {
    if (deg === null || isNaN(parseFloat(deg))) return;
    var ra = deg < 0 ? (deg + 360) / 15 : deg / 15, 
       h = Math.floor (ra),
       rest1 = (ra - h) * 60,
       m = Math.floor(rest1),
       rest2 = (rest1 - m) * 60;
       s = Math.round(rest2);
    return '' + pad(h) + 'ʰ ' + pad(m) + 'ᵐ ' + pad(s) + 'ˢ';
  }
  function deg2dms (deg) {
    if (deg === null || isNaN(parseFloat(deg))) return;
    var d = Math.floor (deg),
       rest1 = (deg - d) * 60,
       m = Math.floor(rest1),
       rest2 = (rest1 - m) * 60;
       s = Math.round(rest2);
    return '' + pad(d) + '° ' + pad(m) + '′ ' + pad(s) + '″';
  }

  function pad(n) { 
    if (n < 0) return n > -10 ? '-0' + Math.abs(n) : n;
    return n < 10 ? '0' + n : n; 
  }

const distance = (p1, p2) => {
    let d1 = p2[0] - p1[0];
    let d2 = p2[1] - p1[1];

    return Math.sqrt(d1 * d1 + d2 * d2);
}

const getMousePosition = (e) => {
    let p = document.getElementById("celestial-map").getBoundingClientRect();
    x = e.offsetX;
    y = e.offsetY;
    inv = Celestial.mapProjection.invert([x, y]);

    document.getElementById("myCoords").innerHTML = `RA: ${deg2hms(inv[0])}  |  DEC: ${deg2dms(inv[1])}`;
    
    return inv;
}

let CURRENT_DATA = 1;

const mapClickEvent = (e) => {
    let clickLocation = getMousePosition(e);
    console.log(clickLocation);
    
    let currentData;
    
    switch (CURRENT_DATA) {
        case 1:
            currentData = goldJSON;
            break;
        case 2:
            currentData = silverJSON;
            break;
        case 3:
            currentData = bronzeJSON;
            break;
        default:
            currentData = 0;
    }
    
    for (let star in currentData) {
        //console.log(goldJSON[star]);
        let ra = currentData[star].ra;
        let dec = currentData[star].dec;
        let currentStar = [ra, dec];
        
        //console.log(`${ra} |  ${dec}`);
        
        //console.log(`CurrentStar: ${currentStar}  |  Distance: ${distance(clickLocation, currentStar)}`);
        
        if (distance(clickLocation, currentStar) < 0.75) {
            console.log(currentData[star]);
            let currentStar = currentData[star];
            document.getElementById("currentStar").innerHTML = (currentStar.Alias != "") ? `Alias: ${currentStar.Alias}` : `Gaia ID: ${currentStar.Gaia_id}`;
        }
    }
}

const AddRegion = (Celestial) => {
    var jsonLine = {
        "type" : "FeatureCollection",
        "features" : [{
          "type" : "Feature",
          "id" : "SummerTriangle",
          "properties" : {
            "n" : "Summer Triangle Test",
            "loc" : [-67.5, 52]
          }, "geometry" : {
            "type" : "MultiLineString",
            "coordinates" : [[
              [-80.7653, 38.7837],
              [-62.3042, 8.8683],
              [-49.642, 45.2803],
              [-80.7653, 38.7837]
            ]]
          }
        }]
    };

    var lineStyle = {
        stroke: "#ff0000",
        fill: "rgba(255, 204, 204, 0.4)",
        width: 3
    };
      
    var textStyle = {
        stroke: "#ff0000",
        font: "bold 15px Helvetica, Arial, sans-serif",
        align: "center",
        baseline: "bottom"
    };

    const Hour2Degree = (ra) => {
        return ra > 12 ? (ra - 24) * 15 : ra * 15;
    }
    
    const regionCallback = (error, json) => {
        if (error) return console.warn(error);
        
        var asterism = Celestial.getData(jsonLine, config.transform);
        
        Celestial.container.selectAll(".asterisms")
            .data(asterism.features)
            .enter().append("path")
            .attr("class", "ast");
        
        Celestial.redraw();
    }
    
    const regionRedraw = () => {
        Celestial.container.selectAll(".ast").each((d) => {
            Celestial.setStyle(lineStyle),
            Celestial.map(d);
            Celestial.context.fill();
            Celestial.context.stroke();
        
            if (Celestial.clip(d.properties.loc)) {
                pt = Celestial.mapProjection(d.properties.loc);
                Celestial.setTextStyle(textStyle);
                Celestial.context.fillText(d.properties.n, pt[0], pt[1]);
            }
        })
    }

    Celestial.add({type:"line", callback: regionCallback, redraw: regionRedraw});
}

const csvToJSON = (csv) => {
    let lines = csv.split("\n");
    let results = [];
    let titles = lines[0].split(",");

    for (let i = 1; i < lines.length; ++i) {
        let obj = {};
        let currentLine = lines[i].split(",");

        for (let j = 0; j < titles.length; ++j) {
            obj[titles[j]] = currentLine[j];
        }

        results.push(obj);
    }

    return results;
}

const getTotalJSON = (data, level) => {
    let parsedData = [];
    for (let i in data) {
        let currentStar = data[i];
        if (currentStar["Sample"] == level) {
            parsedData.push(currentStar);
        }
    }
    return parsedData;
}

const parseStarJSON = (data, level) => {
    let parsedData = [];
    for (let i in data) {
        let currentStar = data[i];
        if (currentStar["Sample"] == level) {
            console.log(level + " star");
            parsedData.push({
                "type": "Feature",
                "id": currentStar["Gaia_id"],
                "properties": {
                    "mag": currentStar["Jmag_2mass"],
                    "bv": currentStar["(B-V)_0"]
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [currentStar["ra"], currentStar["dec"]]
                }
            });
        }
    }

    let starData = {
        "type": "FeatureCollection",
        "features": parsedData
    };

    return starData;
}

const PROXIMITY_LIMIT = 20;

const AddPoint = (Celestial, location, desc, size) => {
    let jsonPoint = {
        "type" : "FeatureCollection",
        "features" : [{
            "type" : "Feature",
            "id" : "NewPoint",
            "properties" : {
                "n" : desc,
                "dim" : size,
            }, "geometry" : {
                "type" : "Point",
                "coordinates" : location
            }
        }]
    };

    let pointStyle = {
        stroke : "rgba(255, 0, 224, 1)",
        width : 3,
        fill : "rgba(255, 204, 255, 0.4)"
    };

    let pointTextStyle = {
        fill : "rgba(255, 0, 224, 1)",
        font : "bold 15px Helvetica, Arial, sans-serif",
        alight : "left",
        baseline : "bottom"
    };

    const lineCallback = (error, json) => {
        if (error) return console.warn(error);

        let dsos = Celestial.getData(jsonPoint, config.transform);

        console.log(dsos);
        console.log(Celestial.container.selectAll(".snrs"));

        Celestial.container.selectAll(".snrs")
            // .data(dsos.features.filter((d) => {
            //     return d.properties.type === "snr";
            // }))
            .data(dsos.features)
            .enter().append("path")
            .attr("class", "snr");
        
        Celestial.redraw();
    }

    const lineRedraw = () => {
        let m = Celestial.metrics();
        let quadTree = d3.geom.quadtree().extent([[-1, -1], [m.width + 1, m.height + 1]])([]);

        Celestial.container.selectAll(".snr").each((d) => {
            if (Celestial.clip(d.geometry.coordinates)) {
                let pt = Celestial.mapProjection(d.geometry.coordinates);
                let r = Math.pow(parseInt(d.properties.dim) * 0.25, 0.5);

                Celestial.setStyle(pointStyle);

                Celestial.context.beginPath();
                Celestial.context.arc(pt[0], pt[1], r, 0, 2 * Math.PI);
                Celestial.context.closePath();

                Celestial.context.stroke();
                Celestial.context.fill();

                let nearest = quadTree.find(pt);

                if (!nearest || distance(nearest, pt) > PROXIMITY_LIMIT) {
                    quadTree.add(pt);
                    Celestial.setTextStyle(pointTextStyle);
                    Celestial.context.fillText(d.properties.name, pt[0], + r + 2, pt[1] + r + 2);
                }
            }
        })
    }

    Celestial.add({type:"line",  callback: lineCallback, redraw: lineRedraw});
}

const AddPointsFromJson = (Celestial, jsonPath) => {
    let pointStyle = {
        stroke : "rgba(255, 0, 224, 1)",
        width : 3,
        fill : "rgba(255, 204, 255, 0.4)"
    };

    let pointTextStyle = {
        fill : "rgba(255, 0, 224, 1)",
        font : "bold 15px Helvetica, Arial, sans-serif",
        alight : "left",
        baseline : "bottom"
    };

    const pointJsonCallback = (error, json) => {
        if (error) return console.warn(error);

        let candidates = Celestial.getData(json, config.transform);
        
        console.log(candidates);
        console.log(Celestial.container.selectAll(".candidates"));

        Celestial.container.selectAll(".candidates")
            // .data(candidates.features.filter((d) => {
            //     return d.features.type === "candidate";
            // }))
            .data(candidates.features)
            .enter().append("path")
            .attr("class", "candidate");

        Celestial.redraw();
    }

    const pointJsonRedraw = () => {
        let m = Celestial.metrics();
        let quadtree = d3.geom.quadtree().extent([[-1, -1], [m.width + 1, m. height + 1]])([]);

        Celestial.container.selectAll(".candidate").each((d) => {
            if (Celestial.clip(d.geometry.coordinates)) {
                let pt = Celestial.mapProjection(d.geometry.coordinates);
                let r = Math.pow(parseInt(d.properties.dim) * 0.25, 0.5);

                Celestial.setStyle(pointStyle);

                Celestial.context.beginPath();
                Celestial.context.arc(pt[0], pt[1], r, 0, 2 * Math.PI);
                Celestial.context.closePath();

                Celestial.context.stroke();
                Celestial.context.fill();

                let nearest = quadtree.find(pt);

                if (!nearest || distance(nearest, pt) > PROXIMITY_LIMIT) {
                    quadtree.add(pt);
                    Celestial.setTextStyle(pointTextStyle);
                    Celestial.context.fillText(d.properties.n, pt[0] + r + 2, pt[1] + r + 2);
                }
            }
        });
    }

    Celestial.add({type: "json", 
        file: jsonPath, 
        callback: pointJsonCallback, 
        redraw: pointJsonRedraw});
}