function initAnswerTabs() {
  const tabContainers = document.querySelectorAll(".custom-tab-container");

  tabContainers.forEach((container) => {
    const tabButtons = container.querySelectorAll(".stab-buttons a");
    const tabContents = container.querySelectorAll(".stab-content");

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute("data-tab-target");

        tabButtons.forEach((b) => b.classList.remove("active-stab-btn"));
        btn.classList.add("active-stab-btn");

        tabContents.forEach((content) => {
          content.classList.remove("active-stab-content");
          if (content.getAttribute("data-tab-id") === targetId) {
            content.classList.add("active-stab-content");
          }
        });
      });
    });

    tabButtons[0]?.click(); // 초기 탭 선택
  });
}
