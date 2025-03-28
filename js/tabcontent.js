function initAnswerTabs() {
  console.log("🔁 initAnswerTabs 실행됨");

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  console.log("탭버튼 수:", tabButtons.length);
  console.log("탭콘텐츠 수:", tabContents.length);

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = btn.dataset.tab;

      console.log("클릭된 탭:", target);

      // 버튼 스타일 초기화
      tabButtons.forEach((b) => {
        b.classList.remove("text-pblue");
        b.classList.add("text-zinc-500");
      });
      btn.classList.add("text-pblue");

      // 콘텐츠 전환
      tabContents.forEach((c) => c.classList.add("hidden"));
      const targetContent = document.getElementById(`tab-${target}`);
      if (targetContent) {
        targetContent.classList.remove("hidden");
      } else {
        console.warn("❌ 콘텐츠 없음:", `tab-${target}`);
      }
    });
  });
}
