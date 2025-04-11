function setBreadcrumbByPath() {
  const path = window.location.pathname;

  let depth1 = ""; // ex: 견적요청
  let depth2 = ""; // ex: Draft견적, 세부견적의뢰

  if (path.includes("/dashboard")) depth1 = "대시보드";
  else if (path.includes("/mspanel")) depth1 = "MS 정보검색";
  else if (path.includes("/estimate")) depth1 = "견적요청";
  else if (path.includes("/panelprofile")) depth1 = "패널프로파일조사";
  else if (path.includes("/dataarea")) depth1 = "MS 패널자료실";
  else if (path.includes("/knowhow")) depth1 = "KNOW-HOW";
  else if (path.includes("/mypage")) depth1 = "마이페이지";

  if (path.includes("estimate.html")) depth2 = "Draft견적";
  else if (path.includes("estimate-advanced.html")) depth2 = "세부견적의뢰";
  else if (path.includes("estimate-rewrite.html")) depth2 = "재견적 요청";
  else if (path.includes("estimate-prevlist.html")) depth2 = "이전견적목록";
  else if (path.includes("mypage.html")) depth2 = "내견적보기";
  else if (path.includes("estimate-detail.html")) depth2 = "내견적보기";
  else if (path.includes("mspanel.html")) depth2 = "B2C 패널";
  else if (path.includes("mspanel-b2b.html")) depth2 = "B2B 패널";
  else if (path.includes("mspanel-expert.html")) depth2 = "전문가패널";
  else if (path.includes("mspanel-patient.html")) depth2 = "유병인 패널";
  else if (path.includes("mspanel-msinfo.html")) depth2 = "MS보유 세부정보";
  else if (path.includes("mymodify.html")) depth2 = "내정보수정";

  const pageTitle = document.getElementById("pageTitle");
  const d1 = document.getElementById("breadcrumbDepth1");
  const d2 = document.getElementById("breadcrumbDepth2");
  const d3 = document.getElementById("breadcrumbDepth3");

  if (pageTitle) {
    pageTitle.textContent = depth2 || depth1;
    pageTitle.classList.remove("opacity-0");
  }

  if (d1) d1.textContent = "홈";
  if (d2) d2.textContent = depth1;
  if (d3) d3.textContent = depth2;
}
