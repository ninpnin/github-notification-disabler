function getClocktime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let day = now.getDay();
    let clockTime = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
    return [clockTime, day];
}

function hideLoop(times, delay) {
    document.getElementsByTagName("notification-indicator")[0].style.display = "None";
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
        hideLoop(25, 100);

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