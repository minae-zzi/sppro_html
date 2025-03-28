function initAnimations() {
  // 데스크탑 프로필 관련
  const toggleWrapper = document.getElementById("profileToggleWrapper");
  const profileIcon = document.getElementById("profileToggle");
  const profileMenu = document.getElementById("profileMenu");

  let isProfileOpen = false;

  toggleWrapper?.addEventListener("click", () => {
    isProfileOpen = !isProfileOpen;

    gsap.to(profileIcon, {
      rotation: isProfileOpen ? 180 : 0,
      duration: 0.3,
      ease: "power2.out",
    });

    if (isProfileOpen) {
      profileMenu.classList.remove("hidden");
      gsap.fromTo(
        profileMenu,
        { opacity: 0, y: -10, height: 0 },
        {
          opacity: 1,
          y: 0,
          height: "auto",
          duration: 0.4,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(profileMenu, {
        opacity: 0,
        y: -10,
        height: 0,
        duration: 0.35,
        ease: "power2.inOut",
        onComplete: () => {
          profileMenu.classList.add("hidden");
        },
      });
    }
  });

  // 모바일 프로필 관련
  const mobileProfile = document.getElementById("mobileProfile");
  const mobileProfileBtn = document.querySelector(
    ".fixed.bottom-20.left-0.md\\:hidden.z-50"
  );
  const closeBtn = mobileProfile?.querySelector("button");

  let isMobileOpen = false;

  mobileProfileBtn?.addEventListener("click", () => {
    if (isMobileOpen) return;
    isMobileOpen = true;
    mobileProfile.classList.remove("hidden");

    gsap.fromTo(
      mobileProfile,
      { x: "-100%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }
    );
  });

  function closeMobileProfile() {
    gsap.to(mobileProfile, {
      x: "-100%",
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        mobileProfile.classList.add("hidden");
        isMobileOpen = false;
      },
    });
  }

  closeBtn?.addEventListener("click", closeMobileProfile);

  // 외부 클릭 시 닫기
  document.addEventListener("click", (e) => {
    if (
      !mobileProfile.contains(e.target) &&
      !mobileProfileBtn.contains(e.target)
    ) {
      if (isMobileOpen) {
        closeMobileProfile();
      }
    }
  });

  // 페이지 이동 시 닫기
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (isMobileOpen) {
        closeMobileProfile();
      }
    });
  });
}
