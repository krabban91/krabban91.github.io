
let k = 0;

let lastDateString = "";
function calculate() {
    let now = new Date();
    let dateString = now.toISOString().split(".")[0]
    if (lastDateString !== dateString) {
        lastDateString = dateString
        let ts = now.valueOf();
        
        let ms = ts % 1000;
        let decTs = (ts - ms);


        // Target
        let birthSecond = parseFrom();

        console.log(birthSecond);
        let birthTs = birthSecond.valueOf();
        let bDateField = document. getElementById("dateTo");
        bDateField.innerHTML = formattedDate(birthSecond);
        
        let birthDelta = (decTs - birthTs);
        let birthDeltaS = birthDelta / 1000;
        
        let bdecField = document.getElementById("decTo");
        bdecField.innerHTML = birthDeltaS;
        
        let birthBin = birthDeltaS.toString(2);
        let bbinField = document.getElementById("binTo");
        bbinField.innerHTML = birthBin;
        
        let birthHex = birthDeltaS.toString(16);
        let bhexField = document.getElementById("hexTo");
        bhexField.innerHTML = birthHex;

        let birthFactors = factors(birthDelta, true);
        let bfactorsField = document. getElementById("factorsTo");
        bfactorsField.innerHTML = birthFactors;

        // Left
        let oneGig = 2 ** 30 * 1000;
        let partyTs = birthTs + oneGig;
        let partyDate = new Date(partyTs);
        console.log(partyDate)

        let partyDelta = (partyTs - decTs) / 1000;

        let tDateField = document.getElementById("dateLeft");
        tDateField.innerHTML = formattedDate(partyDate);
        
        let tdecField = document.getElementById("decLeft");
        tdecField.innerHTML = partyDelta;
        
        let partyBin = partyDelta.toString(2);
        let tbinField = document.getElementById("binLeft");
        tbinField.innerHTML = partyBin;
        
        let partyHex = partyDelta.toString(16);
        let thexField = document.getElementById("hexLeft");
        thexField.innerHTML = partyHex;
        let partyFactors = factors(partyDelta * 1000, true);
        let tfactorsField = document.getElementById("factorsLeft");
        tfactorsField.innerHTML = partyFactors;

        if (partyDelta === 0) {
            alert("Congratulations old timer! Consider yourself 1 Gigaseconds old!")
        }

    }
}

function formattedDate(date) {
    return `${date.toISOString().split("T")[0]} ${date.toLocaleTimeString()}`;
}

function parseFrom() {
    let fallback = new Date(1991,9,10,4,26,0,0);
    let params = new URLSearchParams(window.location.search);
    let paramFrom = params.get("from");
    if (!!paramFrom) {
        let test = new Date(paramFrom);
        if (!isNaN(test)) {
            return test;
        }
    }
    return fallback;
}

function factors(ts, simple) {
    let neg = ts < 0;
    let v = neg ? -ts : ts;
    let s = Number(1000);
    let min = Number(1000 * 60);
    let hour = Number(1000 * 3600);
    let day = Number(1000 * 3600 * 24);
    let y = Number(1000 * 3600 * 24 * 365.25);
    let years = Math.floor(v / y);
    //console.log(years);
    let modY = (v + y) % y;
    let days = Math.floor(modY / day);
    let modD = (modY + day) % day;
    let hours = Math.floor(modD / hour);
    let modH = (modD + hour) % hour;
    let mins = Math.floor(modH / min);
    let modM = (modH + min) % min;
    let secs = Math.floor(modM / s);
    let sign = neg?-1:1
    let arr = [years * sign, days * sign, hours * sign, mins * sign, secs * sign]
    if (!!simple) {
        return (arr[0] === 0 ? "" : `${arr[0]} Years, `) + 
            (arr[1] === 0 ? "" : `${arr[1]} Days, `) + 
            (arr[2] === 0 ? "" : `${arr[2]} Hours, `) + 
            (arr[3] === 0 ? "" : `${arr[3]} Minutes, `) + 
            `${arr[4]} Seconds`;
    } else {
        return `${arr[0]} Years, ${arr[1]} Days, ${arr[2]} Hours, ${arr[3]} Minutes, ${arr[4]} Seconds`;
    }
}
setInterval(calculate, 50);