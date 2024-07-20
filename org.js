const timings = (dt) => {
  const yr = dt.getFullYear();
  const mn = dt.getMonth() + 1;
  const day = dt.getDate();
  const dayw = ["Mon", "Tue", "Wed", "Thu", "Fri"][dt.getDay() - 1];
  const fmt = (n, k = 2) => String(n).padStart(k, "0");
  const DATE = `${fmt(yr, 4)}-${fmt(mn)}-${fmt(day)} ${dayw}`;

  return dayw === "Mon"
    ? [
        `SCHEDULED: <${DATE} 07:50-09:30>`,
        `SCHEDULED: <${DATE} 10:45-11:20>`,
        `SCHEDULED: <${DATE} 11:30-12:05>`,
        `SCHEDULED: <${DATE} 12:15-12:50>`,
        `SCHEDULED: <${DATE} 13:00-13:35>`,
      ]
    : [
        `SCHEDULED: <${DATE} 07:40-07:50>`,
        `SCHEDULED: <${DATE} 08:00-08:45>`,
        `SCHEDULED: <${DATE} 09:00-09:45>`,
        `SCHEDULED: <${DATE} 10:05-10:50>`,
        `SCHEDULED: <${DATE} 11:05-11:50>`,
        `SCHEDULED: <${DATE} 12:05-12:50>`,
      ];
};

const timetable = JSON.parse(
  require("fs").readFileSync("./timetable.json").toString()
);

/*
 * Tuesday
 ** School
 *** Thing
 SCHEDULED: <whatever>
 */

let dt = new Date();
// dt.setDate(dt.getDate() + 1);
for (const [day, classes] of Object.entries(timetable)) {
  const fmt = (n) => String(n).padStart(2, "0");
  console.log(
    `* ${dt.getFullYear()}-${fmt(dt.getMonth() + 1)}-${fmt(
      dt.getDate()
    )} ${day}\n** School`
  );
  const t = timings(dt);
  for (const i in classes) {
    console.log(`*** EVENT ${classes[i]}`);
    console.log(t[i]);
  }
  console.log();

  dt.setDate(dt.getDate() + 1);
}
