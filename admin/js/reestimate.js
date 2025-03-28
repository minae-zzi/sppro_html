// 견적 상세 toggle (클래스 기반 hidden 토글 방식)
function initEstimateDetailToggle() {
  document.querySelectorAll(".toggle-detail").forEach((btn) => {
    btn.addEventListener("click", () => {
      const detail = btn.closest(".bg-formGray").querySelector(".detail-area");

      detail.classList.toggle("hidden");
      btn.textContent = detail.classList.contains("hidden")
        ? "견적서 상세보기"
        : "견적서 상세닫기";
    });
  });
}

// GSAP 애니메이션 기반 토글
function initEstimateGsapToggle() {
  const toggles = document.querySelectorAll(".toggle-estimate");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.dataset.target;
      const detail = document.getElementById(targetId);

      const isOpen = detail.classList.contains("open");

      if (isOpen) {
        gsap.to(detail, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            detail.classList.remove("open");
            toggle.textContent = "견적서 상세보기";
          },
        });
      } else {
        detail.style.display = "block";
        detail.style.height = "auto";
        const fullHeight = detail.scrollHeight;
        detail.style.height = "0";

        gsap.to(detail, {
          height: fullHeight,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          onStart: () => {
            detail.classList.add("open");
          },
          onComplete: () => {
            detail.style.height = "auto";
            toggle.textContent = "견적서 상세닫기";
          },
        });
      }
    });
  });
}
