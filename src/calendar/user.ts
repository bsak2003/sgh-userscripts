declare function $(any); // jQuery workaround?
declare function show_hide(idd: any)

const showCalendar = function (this: any) {
  let jump_date = new Date("2022-10-03T09:50:00");

  if (jump_date.valueOf() < Date.now()) {
    jump_date = new Date(Date.now());
  }

  $("#calendar").fullCalendar("gotoDate", jump_date);

  show_hide(this);
};

let button = document.querySelector('input[data-id="1"]') as HTMLElement; // ?
button.onclick = showCalendar;