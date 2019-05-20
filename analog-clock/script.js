const HOUR_HAND = document.querySelector("#hour");
const MINUTE_HAND = document.querySelector("#minute");
const SECOND_HAND = document.querySelector("#second");

let date = new Date(),
    hr = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds(),
    secPosition = sec * 360 / 60,
    minPosition = min * 360 / 60 + secPosition / 60,
    hrPosition = hr * 360 / 12 + minPosition / 12;

function runClock() {
    hrPosition += 1/120;
    minPosition += 0.1;
    secPosition += 6;
    HOUR_HAND.style.transform = "rotate(" + hrPosition + "deg)";
    MINUTE_HAND.style.transform = "rotate(" + minPosition + "deg)";
    SECOND_HAND.style.transform = "rotate(" + secPosition + "deg)";
}

let interval = setInterval(runClock, 1000);