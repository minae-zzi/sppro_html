function setActiveGNB() {
  const pathSegments = location.pathname.split("/");
  const currentFolder = pathSegments.includes("page") ? pathSegments[2] : "";

  const links = document.querySelectorAll(".gnb-link");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href.includes(`/${currentFolder}/`)) {
      link.classList.remove("bg-white");
      link.classList.add("bg-neutral-800", "text-white");

      const img = link.querySelector("img");
      if (img) {
        img.classList.add("brightness-0", "invert");
      }
    }
  });
}
