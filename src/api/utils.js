import moment from "moment";

const measurements = [
  "years",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
];

const evaluate = (duration) => measurements.map((m) => duration[m]());

const zeroPadding = (array) => {
  while (array[0] == 0) array.shift();

  return array.map((n) => `${n}`.padStart(2, "0")).join(":");
};

const pairMeasurements = (values) => {
  let names = [...measurements];

  while (values[0] == 0) {
    values.shift();
    names.shift();
  }

  return values
    .map((n) => n + " " + names.shift())
    .map((period) =>
      parseInt(period.split(" ")[0]) < 2 ? period.slice(0, -1) : period
    )
    .join(", ");
};

///

export const parseVideoDuration = (dur) =>
  zeroPadding(evaluate(moment.duration(dur)));

export const sumDurations = (durs) =>
  durs.reduce(
    (total, dur) => total.add(moment.duration(dur)),
    moment.duration(0, "seconds")
  );

export const sumDurationsAsSeconds = (durs) => sumDurations(durs).asSeconds();

///
///

export const humanize = (seconds) =>
  pairMeasurements(evaluate(moment.duration(seconds, "seconds")));

///
///

/*
const testDur = moment.duration(2530 * 360 + 50, "seconds");

console.log(zeroPadding(evaluate(testDur)));
console.log(humanize(testDur));
*/
