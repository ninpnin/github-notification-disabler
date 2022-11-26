function saveOptions(e) {
  browser.storage.sync.set({
    workdayStarts: document.querySelector("#onfrom").value,
    workdayEnds: document.querySelector("#offfrom").value
  });
  e.preventDefault();
}

function restoreOptions() {
  let workdayStarts = browser.storage.sync.get('workdayStarts');
  workdayStarts.then((res) => {
    document.querySelector("#onfrom").value = res.workdayStarts || '09:00';
  });

  let workdayEnds = browser.storage.sync.get('workdayEnds');
  workdayEnds.then((res) => {
    document.querySelector("#offfrom").value = res.workdayEnds || '18:00';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
