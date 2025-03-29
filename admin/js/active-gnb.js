function setActiveGNB() {
  const pathSegments = location.pathname.split("/");

  // "page" 다음 위치를 currentFolder로 잡기
  const pageIndex = pathSegments.indexOf("page");
  const currentFolder = pageIndex !== -1 ? pathSegments[pageIndex + 1] : "";

  const currentPath = window.location.pathname;
  const links = document.querySelectorAll(".gnb-link");

  links.forEach((link) => {
    const path = link.getAttribute("data-path");
    if (!path) return;

    if (currentPath.includes(path)) {
      link.classList.add("bg-pblue", "text-white");
    }
  });
}
