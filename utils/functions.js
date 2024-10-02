import moment from "jalali-moment";

export function separate(Number) {
  Number += "";
  Number = Number.replace(",", "");
  x = Number.split(".");
  y = x[0];
  z = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
  return y + z;
}
export function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function nextWeek() {
  const day1 = moment().locale("fa").format("YYYY/MM/DD");
  const day1Title = moment().locale("fa").format("dddd");
  const day2 = moment().add(1, "days").locale("fa").format("YYYY/MM/DD");
  const day2Title = moment().add(1, "days").locale("fa").format("dddd");
  const day3 = moment().add(2, "days").locale("fa").format("YYYY/MM/DD");
  const day3Title = moment().add(2, "days").locale("fa").format("dddd");
  const day4 = moment().add(3, "days").locale("fa").format("YYYY/MM/DD");
  const day4Title = moment().add(3, "days").locale("fa").format("dddd");
  const day5 = moment().add(4, "days").locale("fa").format("YYYY/MM/DD");
  const day5Title = moment().add(4, "days").locale("fa").format("dddd");
  const day6 = moment().add(5, "days").locale("fa").format("YYYY/MM/DD");
  const day6Title = moment().add(5, "days").locale("fa").format("dddd");
  const day7 = moment().add(6, "days").locale("fa").format("YYYY/MM/DD");
  const day7Title = moment().add(6, "days").locale("fa").format("dddd");
  return [
    { day: day1, dayTitle: day1Title },
    { day: day2, dayTitle: day2Title },
    { day: day3, dayTitle: day3Title },
    { day: day4, dayTitle: day4Title },
    { day: day5, dayTitle: day5Title },
    { day: day6, dayTitle: day6Title },
    { day: day7, dayTitle: day7Title },
  ];
}

export function roundMinutes(date) {
  const hour = moment().add(1, "hour").locale("fa").format("hh:mm");

  return hour;
}
export function daysRemaining() {
  const times = [];
  const thisTime = Number(moment().add(1, "hour").locale("fa").format("HH"));
  let hour = { from: thisTime, to: thisTime + 1 };

  const todayHouer = 23 - hour.from;
  for (let i = 1; i <= todayHouer; i++) {
    hour = {
      from: hour.from + 1,
      to: hour.to + 1,
    };
    times.push(hour);
  }
  return times;
}

export function moreDaysHour() {
  const times = [];
  let hour = { from: 0, to: 1 };
  const todayHouer = 23;
  for (let i = 1; i <= todayHouer; i++) {
    hour = {
      from: hour.from + 1,
      to: hour.to + 1,
    };
    times.push(hour);
  }
  return times;
}
