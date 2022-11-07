const now = new Date();
let hours = now.getHours();
let day = now.getDay();

function hideLoop(times, delay) {
    document.getElementsByTagName("notification-indicator")[0].style.display = "None";
    if (times >= 0) {
        setTimeout(hideLoop, delay, times - 1, delay);
    }
}

let afterWorkingHours = hours >= 18 || hours < 9;
let weekend = day >= 5;


console.log("Time", hours, " day", day);
console.log("afterWorkingHours", afterWorkingHours, " weekend", weekend);

if (afterWorkingHours || weekend) {
    console.log("You should not be working at this hour for fuck's sake");
    console.log("Time", hours, " day", day);
    console.log("Disable GitHub notifications...");
    hideLoop(25, 100);

    window.addEventListener('load', (event) => {
      document.getElementsByTagName("notification-indicator")[0].style.display = "None";
    });
}
