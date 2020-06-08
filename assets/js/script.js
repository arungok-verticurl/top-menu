(function () {
  const _ = {};
  _.getEleClass = (cls) => {
    const eles = document.getElementsByClassName(cls);
    return eles.length > 1 ? eles : eles.length === 1 ? eles[0] : null;
  };
  _.getEleTag = (tag) => {
    const eles = document.getElementsByTagName(tag);
    return eles.length > 1 ? eles : eles.length === 1 ? eles[0] : null;
  };
  _.getComputedStyles = (ele) => {
    return window.getComputedStyle(ele);
  };
  _.toggleClass = (ele, clsName) => {
    ele.classList.contains(clsName)
      ? ele.classList.remove(clsName)
      : ele.classList.add(clsName);
  };
  _.navEle = _.getEleClass("nav-list");
  _.expand = _.getEleClass("expand-icon");

  $.ajax("./assets/menu.json")
    .done((res) => {
      _.data = JSON.parse(res);
      init();
    });

  init = () => {
    const ang = 180 / _.data.length;
    _.data.map((nav) => {
      const span = document.createElement("span");
      const a = document.createElement("a");
      a.href = "javascript:void(0)";
      a.title = nav.name;
      const i = document.createElement("i");
      i.className = nav.icon;
      a.append(i);
      span.append(a);
      _.navEle.append(span);
    });
    for (const index in _.navEle.childNodes) {
      const a = _.navEle.childNodes[index];
      if (!isNaN(index)) {
        const tmp = _.getComputedStyles(a);
        a.style.paddingTop = _.navEle.childNodes.length * 50 + "px";
        a.style.transform = `translateX(-50%) rotate(${
          -((index * 1 + 1) * (ang - 1.95)) + 90
        }deg)`;
        a.addEventListener('hover', () => {
          this.style.transform += ' scale(1.2)';
        })
      }
    }
    _.navEle.style.top = `-${(_.navEle.childNodes[0].clientHeight) / 2 + 40}px`;
    _.navEle.style.height = `${_.navEle.childNodes[0].clientHeight}px`;
    _.navEle.style.width = `${_.navEle.childNodes[0].clientHeight}px`;
  };
})();
