var titles = [
  "@",
  "@c",
  "@c0",
  "@c0m",
  "@c0mp",
  "@c0mpl",
  "@c0mple",
  "@c0mplex",
  "@c0mple",
  "@c0mpl",
  "@c0mp",
  "@c0m",
  "@c0",
  "@c"
];

function changeTitle() {
  var index = 0;

  setInterval(function() {
      document.title = titles[index];
      index = (index + 1) % titles.length;
  }, 1000);
}

changeTitle();
