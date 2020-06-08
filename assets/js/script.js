(function () {
  var _ = {};
  _.getEleClass = function (cls) {
    var eles = document.getElementsByClassName(cls);
    return eles.length > 1 ? eles : eles.length === 1 ? eles[0] : null;
  };
  _.getEleTag = function (tag) {
    var eles = document.getElementsByTagName(tag);
    return eles.length > 1 ? eles : eles.length === 1 ? eles[0] : null;
  };
  _.getComputedStyles = function (ele) {
    return window.getComputedStyle(ele);
  };
  _.toggleClass = function (ele, clsName) {
    ele.classList.contains(clsName)
      ? ele.classList.remove(clsName)
      : ele.classList.add(clsName);
  };
  _.navEle = _.getEleClass("nav-list");
  _.expand = _.getEleClass("expand-icon");
  $.ajax("./assets/menu.json").done(function (res) {
    _.data = res;
    _.init();
  });

  _.init = function () {
    var ang = 180 / _.data.length;
    _.data.map(function (nav) {
      var span = document.createElement("span");
      var a = document.createElement("a");
      a.href = "javascript:void(0)";
      a.title = nav.name;
      var i = document.createElement("i");
      i.className = nav.icon;
      a.append(i);
      span.append(a);
      _.navEle.append(span);
    });
    for (var index in _.navEle.childNodes) {
      var a = _.navEle.childNodes[index];
      if (!isNaN(index)) {
        var rotAng = -((index * 1 + 1) * (ang - 1.95)) + 90;
        a.style.paddingTop = _.navEle.childNodes.length * 50 + "px";
        a.style.transform = "translateX(-50%) rotate(" + rotAng + "deg)";
        a.addEventListener("hover", function () {
          this.style.transform += " scale(1.2)";
        });
      }
    }
    _.navEle.style.top = (-_.navEle.childNodes[0].clientHeight / 2 + 40) + "px";
    _.navEle.style.height = _.navEle.childNodes[0].clientHeight + "px";
    _.navEle.style.width = _.navEle.childNodes[0].clientHeight + "px";
  };
})();
