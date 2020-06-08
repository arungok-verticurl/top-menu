$.ajax("./assets/menu.json").done(function (res) {
  res.map(function(data, i) {
    topMenu(document.getElementById("nav-" + (parseInt(i) + 1)), data);
  });
});