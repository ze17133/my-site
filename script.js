const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function readTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (e) {
    return null;
  }
}

function saveTheme(value) {
  try {
    localStorage.setItem("theme", value);
  } catch (e) {
    /* 本地文件在部分浏览器里禁用了存储，忽略即可 */
  }
}

function applyTheme(dark) {
  root.classList.toggle("dark", dark);
  toggle.textContent = dark ? "切换浅色" : "切换深色";
}

applyTheme(readTheme() === "dark");

toggle.addEventListener("click", () => {
  const dark = !root.classList.contains("dark");
  applyTheme(dark);
  saveTheme(dark ? "dark" : "light");
});

/* 用 dev-server.js 预览时，保存文件 1 秒内自动刷新 */
if (location.protocol === "http:") {
  let lastStamp = 0;
  setInterval(() => {
    fetch("/__livereload", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (lastStamp && d.mtime !== lastStamp) location.reload();
        lastStamp = d.mtime;
      })
      .catch(() => {});
  }, 1000);
}
