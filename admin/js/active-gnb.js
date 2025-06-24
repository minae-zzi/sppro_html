function setActiveGNB() {
  const currentPath = window.location.pathname;

  // 1뎁스 메뉴 활성화 체크
  document.querySelectorAll("h2[data-path]").forEach((h2) => {
    const path = h2.getAttribute("data-path");
    // ../../ 제거하고 실제 경로만 추출
    const cleanPath = path.replace("../../", "");
    if (currentPath.includes(cleanPath)) {
      h2.classList.add("bg-pblue", "text-white");
    } else {
      h2.classList.remove("bg-pblue", "text-white");
    }
  });

  // 2뎁스 메뉴 활성화 체크
  document.querySelectorAll(".gnb-link").forEach((link) => {
    const path = link.getAttribute("data-path");
    if (!path) return;

    if (currentPath.includes(path)) {
      link.classList.add("text-pblue");
    } else {
      link.classList.remove("text-pblue");
    }
  });
}
