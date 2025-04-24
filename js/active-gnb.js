function setActiveGNB() {
  const pathSegments = location.pathname.split("/");
  const currentFolder = pathSegments.includes("page") ? pathSegments[2] : "";

  const links = document.querySelectorAll(".gnb-link");

  links.forEach((li) => {
    const a = li.querySelector("a");
    if (a) {
      const href = a.getAttribute("href");
      if (href && href.includes(`/${currentFolder}/`)) {
        li.classList.remove("gnb-link");
        li.classList.add("gnb-active");

        const img = a.querySelector("img");
        if (img) {
          img.classList.add("brightness-0", "invert");
        }
      }
    }
  });
}
