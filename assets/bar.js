// 모든 실습 페이지 맨 아래에 이 한 줄을 넣습니다.
// <script src="../../../assets/bar.js" data-no="23" data-kind="follow"></script>
// 오른쪽 아래에 작은 표시(← 아카이브 · 번호 · 원본 이름 · 바꾼 점)를 띄웁니다. 실습 화면은 건드리지 않습니다.
(function () {
  var me = document.currentScript;
  var no = Number(me.dataset.no);
  var kind = me.dataset.kind === "mine" ? "mine" : "follow";
  var base = me.src.replace(/assets\/bar\.js.*$/, "");

  function draw() {
    var item = (window.WORKS && window.WORKS.items || []).find(function (i) { return i.no === no; }) || { title: "", mine: {} };
    var box = document.createElement("div");
    box.setAttribute("role", "note");
    box.style.cssText = "position:fixed;right:12px;bottom:12px;z-index:2147483647;max-width:min(320px,calc(100vw - 24px));" +
      "background:rgba(20,20,18,.86);color:#fff;font:12px/1.5 -apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;" +
      "padding:8px 12px;border-radius:10px;word-break:keep-all;pointer-events:auto";
    var label = kind === "follow" ? "따라 하기" : "내 응용";
    var html = '<a href="' + base + 'index.html" style="color:#9fb0ff;text-decoration:none">← 아카이브</a>' +
      " · " + String(no).padStart(2, "0") + " " + (item.title || "") + " · " + label;
    if (kind === "mine" && item.mine && item.mine.changed) html += "<br>바꾼 점: " + item.mine.changed.replace(/</g, "&lt;");
    box.innerHTML = html;
    document.body.appendChild(box);
  }

  if (window.WORKS) { draw(); return; }
  var s = document.createElement("script");
  s.src = base + "data/works.js";
  s.onload = draw;
  s.onerror = draw;
  document.head.appendChild(s);
})();
