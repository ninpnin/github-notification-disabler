function getClocktime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let day = now.getDay();
    // fix US based weekday counting
    if (day == 0) {
        day = 7;
    }
    let clockTime = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
    return [clockTime, day];
}

function elemIsNotification(elem) {
    let classString = Array.from(elem.classList).join(" ");
    return classString.toLowerCase().includes("notification");
}

function hideLoop(times, delay) {
    console.log("Attempt to hide the notification button...");
    let buttonClass = "prc-Button-ButtonBase-9n-Xk";
    let buttons = Array.from(document.getElementsByClassName(buttonClass));
    let notificationIndicators = buttons.filter(elemIsNotification);

    if (notificationIndicators.length >= 1) {
        notificationIndicators[0].style.display = "None";
    } else {
        console.log("Nothing to hide...")
    }
    if (times >= 0) {
        setTimeout(hideLoop, delay, times - 1, delay);
    }
}

function hideNotifications(start, end, current, day) {
    let isWorktime = start <= current && current <= end;
    let isWorkday = day <= 5;
    console.log("Work time:", isWorktime);
    console.log("Work day:", isWorkday);

    if (!isWorktime || !isWorkday) {
        console.log("You should not be working at this hour for fuck's sake");
        console.log("Time", current, " day", day);
        console.log("Disable GitHub notifications...");
        hideLoop(30, 15);
        hideLoop(30, 100);

        window.addEventListener('load', (event) => {
          document.getElementsByTagName("notification-indicator")[0].style.display = "None";
        });
    }

}

let workdayStarts = browser.storage.sync.get(['workdayStarts', 'workdayEnds']);
//var workdayStartsTime = null;
workdayStarts.then((res) => {
    //workdayStartsTime = res.workdayStarts || '09:00';
    console.log("workdayStarts", res.workdayStarts);
    console.log("workdayEnds", res.workdayEnds);
    let clockdatetime = getClocktime();
    let time = clockdatetime[0];
    let day = clockdatetime[1];

    hideNotifications(res.workdayStarts, res.workdayEnds, time, day)
});