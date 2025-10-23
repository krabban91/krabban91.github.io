
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

        let birthTs = birthSecond.valueOf();
        let bDateField = document. getElementById("dateTo");
        bDateField.innerHTML = formattedDate(birthSecond);
        
        let birthDelta = (decTs - birthTs);
        let birthDeltaS = birthDelta / 1000;
        
        let bdecField = document.getElementById("decTo");
        bdecField.innerHTML = `${birthDeltaS} s`;
        
        let birthBin = birthDeltaS.toString(2);
        let bbinField = document.getElementById("binTo");
        bbinField.innerHTML = `${birthBin} s`;
        
        let birthHex = birthDeltaS.toString(16);
        let bhexField = document.getElementById("hexTo");
        bhexField.innerHTML = `${birthHex} s`;

        let birthFactors = factors(decTs, birthTs, true);
        let bfactorsField = document. getElementById("factorsTo");
        bfactorsField.innerHTML = birthFactors;

        // Left
        let oneGig = 2 ** 30 * 1000;
        let partyTs = birthTs + oneGig;
        let partyDate = new Date(partyTs);

        let partyDelta = (partyTs - decTs) / 1000;

        let tDateField = document.getElementById("dateLeft");
        tDateField.innerHTML = formattedDate(partyDate);
        
        let tdecField = document.getElementById("decLeft");
        tdecField.innerHTML = `${partyDelta} s`;
        
        let partyBin = partyDelta.toString(2);
        let tbinField = document.getElementById("binLeft");
        tbinField.innerHTML = `${partyBin} s`;
        
        let partyHex = partyDelta.toString(16);
        let thexField = document.getElementById("hexLeft");
        thexField.innerHTML = `${partyHex} s`;
        let partyFactors = factors(partyTs, decTs, true);
        let tfactorsField = document.getElementById("factorsLeft");
        tfactorsField.innerHTML = partyFactors;

        if (partyDelta === 0) {
            celebrate();
        }

    }
}

function celebrate() {
    let partyDiv = document.getElementById("top");
    partyDiv.hidden = false;
    //alert("Congratulations old timer! Consider yourself 1 Gigaseconds old!")
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

function factors(nowTs, targetTs, simple) {
    let targetDate = new Date(targetTs);
    let nowDate = new Date(nowTs);
    let ts = nowTs - targetTs;
    let neg = ts < 0;
    let v = neg ? -ts : ts;
    let dd = new Date(v);
    var arr = []
    if (neg) {
        let s = Number(1000);
        let min = Number(1000 * 60);
        let hour = Number(1000 * 3600);
        let day = Number(1000 * 3600 * 24);
        let y = Number(1000 * 3600 * 24 * 365.25);
        let years = Math.floor(v / y);
        let modY = (v + y) % y;
        let days = Math.floor(modY / day);
        let modD = (modY + day) % day;
        let hours = Math.floor(modD / hour);
        let modH = (modD + hour) % hour;
        let mins = Math.floor(modH / min);
        let modM = (modH + min) % min;
        let secs = Math.floor(modM / s);
        let sign = -1;
        arr = [years * sign, 0, days * sign, hours * sign, mins * sign, secs * sign];
    } else {
        let years = nowDate.getFullYear() - targetDate.getFullYear();
        let months = nowDate.getMonth() - targetDate.getMonth();
        let days = nowDate.getDate() - targetDate.getDate();
        let hours = nowDate.getHours() - targetDate.getHours();
        let mins = nowDate.getMinutes() - targetDate.getMinutes();
        let secs = nowDate.getSeconds() - targetDate.getSeconds();
        arr = [years, months, days, hours, mins, secs]
    }

    if (!!simple) {
        return (arr[0] === 0 ? "" : `${arr[0]} Years, `) +
            (arr[1] === 0 ? "" : `${arr[1]} Months, `) +
            (arr[2] === 0 ? "" : `${arr[2]} Days, `) +
            (arr[3] === 0 ? "" : `${arr[3]} Hours, `) +
            (arr[4] === 0 ? "" : `${arr[4]} Minutes, `) +
            `${arr[5]} Seconds`;
    } else {
        return `${arr[0]} Years, ${arr[1]} Months, ${arr[2]} Days, ${arr[3]} Hours, ${arr[4]} Minutes, ${arr[5]} Seconds`;
    }
}
setInterval(calculate, 50);
