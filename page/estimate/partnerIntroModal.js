// 파트너사 소개 모달 JavaScript
(function () {
  "use strict";

  // SweetAlert2 CDN 로드
  function loadSweetAlert2() {
    return new Promise((resolve, reject) => {
      // 이미 로드되어 있는지 확인
      if (typeof Swal !== "undefined") {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("SweetAlert2 로드 실패"));
      document.head.appendChild(script);
    });
  }

  // 파트너사 소개 모달 열기
  function openPartnerIntroModal() {
    const isMobile = window.innerWidth < 768;

    Swal.fire({
      title: "파트너사 소개",
      html: `
        <style>
          .partner-container {
            max-height: 70vh;
            overflow-y: auto;
            padding: 20px;
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
          }
          
          /* 데스크톱 테이블 스타일 */
          .partner-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            display: table;
          }
          
          .partner-table th {
            background: #f6f7fa;
            color: #374151;
            font-weight: 700;
            font-size: 14px;
            padding: 16px 12px;
            text-align: center;
            border-bottom: 2px solid #e5e7eb;
            position: sticky;
            top: 0;
            z-index: 10;
          }
          
          .partner-table td {
            padding: 14px 12px;
            border-bottom: 1px solid #f3f4f6;
            font-size: 13px;
            color: #374151;
            vertical-align: middle;
            text-align: center;
          }
          
          .partner-table td:first-child {
            text-align: left;
          }
          
          .partner-table tr:hover {
            background: #f9fafb;
          }
          
          .partner-table tr:last-child td {
            border-bottom: none;
          }
          
          /* 모바일 카드 스타일 */
          .partner-cards {
            display: none;
            gap: 16px;
          }
          
          .partner-card {
            background: #f6f7fa;
            border-radius: 10px;
            padding: 20px;
            border: 1px solid #e5e7eb;
          }
          
          .partner-card h3 {
            font-size: 18px;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 8px 0;
            font-family: inherit;
          }
          
          .partner-card p {
            font-size: 12px;
            color: #6b7280;
            margin: 0 0 16px 0;
            font-family: inherit;
          }
          
          .partner-card .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 16px;
            border-top:1px solid #e5e7eb;
            padding-top: 16px;
          }
          
          .partner-card .info-item {
            display: flex;
            flex-direction: column;
          }
          
          .partner-card .label {
            font-size: 12px;
            color: #222;
            font-weight: 800;
            margin-bottom: 4px;
            font-family: inherit;
          }
          
          .partner-card .value {
            font-size: 12px;
            color: #374151;
            font-weight: 500;
            font-family: inherit;
            text-align: left;
          }
          
          .partner-card .status-success {
            color: #5C7DEE;
            font-weight: 600;
            font-family: inherit;
          }
          
          .partner-card .status-error {
            color: #F2585F;
            font-weight: 600;
            font-family: inherit;
          }
          
          .partner-card .btn {
            display: inline-block;
            padding: 8px 16px;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            font-family: inherit;
            transition: background-color 0.2s ease;
            text-align: center;
            width: 100%;
          }
          
          /* 통일된 버튼 스타일 */
          .mbtn {
            display: inline-block;
            padding: 6px 12px;
            color: white;
            text-decoration: none;
            border-radius: 300px;
            font-size: 11px;
            font-weight: 500;
            font-family: inherit;
            transition: background-color 0.2s ease;
            text-align: center;
            min-width: 80px;
            width: 100%;
            background: #5C7DEE;
            height: 28px;
          }
          
          /* 배지 스타일 */
          .badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 300px;
            font-size: 11px;
            font-weight: 500;
            text-align: center;
            min-width: 80px;
            height: 28px;
            box-sizing: border-box;
            color: white;
          }
          
          .badge-ok {
            background: #F6F7FA;
            color: #5C7DEE;
          }
          
          .badge-no {
          background:#FDF1F1;
            color: #F2585F;
          }
          
          /* 공통 스타일 */
          .partner-name {
            font-weight: 700;
            color: #1f2937;
            font-size: 14px;
          }
          
          .partner-desc {
            color: #6b7280;
            font-size: 12px;
            margin-top: 4px;
          }
          
          .status-success {
            color: #5C7DEE;
            font-weight: 600;
          }
          
          .status-error {
            color: #F2585F;
            font-weight: 600;
          }
          
          /* 반응형 처리 */
          @media (max-width: 767px) {
            .partner-table {
              display: none;
            }
            .partner-cards {
              display: grid;
              grid-template-columns: 1fr;
            }
          }
          
          @media (min-width: 768px) {
            .partner-cards {
              display: none;
            }
            .partner-table {
              display: table;
            }
          }
        </style>
        
        <div class="partner-container">
          <!-- 데스크톱용 테이블 -->
          <table class="partner-table">
            <thead>
              <tr>
                <th>파트너사</th>
                <th>조사 국가</th>
                <th>셋팅</th>
                <th>최소비용</th>
                <th>패널</th>
                <th>한국어</th>
                <th>Panelbook</th>
              </tr>
            </thead>
            <tbody>
              <!-- DataSpring -->
              <tr>
                <td>
                  <div class="partner-name">데이터스프링 (DataSpring)</div>
                  <div class="partner-desc">글로벌 패널 조사 전문 기업</div>
                </td>
                <td>약 35개국</td>
                <td>3일</td>
                <td>300,000원</td>
                <td>아시아 200만명</td>
                <td><span class="badge badge-ok">✓ 가능</span></td>
                <td>
                  <a href="https://ms.hrcglobal.com/etc/abroad/DATASPRING.pdf" target="_blank" class="mbtn">
                    보기
                  </a>
                </td>
              </tr>
              
              <!-- GMOR -->
              <tr>
                <td>
                  <div class="partner-name">GMOR</div>
                  <div class="partner-desc">아시아 태평양 지역 전문</div>
                </td>
                <td>약 52개국</td>
                <td>3일</td>
                <td>USD 300</td>
                <td>5,800만명</td>
                <td><span class="badge badge-no">✗ 불가능</span></td>
                <td>
                  <a href="https://ms.hrcglobal.com/etc/abroad/GMOR.pdf" target="_blank" class="mbtn">
                    보기
                  </a>
                </td>
              </tr>
              
              <!-- Dynata -->
              <tr>
                <td>
                  <div class="partner-name">다이나타 (Dynata)</div>
                  <div class="partner-desc">세계 최대 규모의 패널 제공업체</div>
                </td>
                <td>약 45개국</td>
                <td>3일</td>
                <td>1,500,000원</td>
                <td>7,000만명</td>
                <td><span class="badge badge-ok">✓ 가능</span></td>
                <td>
                  <a href="https://ms.hrcglobal.com/etc/abroad/DYNATA.pdf" target="_blank" class="mbtn">
                    보기
                  </a>
                </td>
              </tr>
              
              <!-- Toluna -->
              <tr>
                <td>
                  <div class="partner-name">롤루나 (Toluna)</div>
                  <div class="partner-desc">글로벌 온라인 패널 및 기술 솔루션</div>
                </td>
                <td>약 70개국</td>
                <td>3일</td>
                <td>USD 1,000</td>
                <td>79만명</td>
                <td><span class="badge badge-ok">✓ 가능</span></td>
                <td>
                  <a href="https://ms.hrcglobal.com/etc/abroad/TOLUNA.pdf" target="_blank" class="mbtn">
                    보기
                  </a>
                </td>
              </tr>
              
              <!-- MarketLink -->
              <tr>
                <td>
                  <div class="partner-name">마켓링크 (MarketLink)</div>
                  <div class="partner-desc">한국 시장조사 전문 패널 제공</div>
                </td>
                <td>약 83개국</td>
                <td>3일</td>
                <td>200,000원</td>
                <td>제휴 파트너사</td>
                <td><span class="badge badge-ok">✓ 가능</span></td>
                <td>
                  <a href="https://ms.hrcglobal.com/etc/abroad/MARKETLINK.pdf" target="_blank" class="mbtn">
                    보기
                  </a>
                </td>
              </tr>
              
              <!-- Kantar -->
              <tr>
                <td>
                  <div class="partner-name">칸타 (Kantar)</div>
                  <div class="partner-desc">세계적인 데이터, 인사이트 및 컨설팅 그룹</div>
                </td>
                <td>약 100개국</td>
                <td>3일</td>
                <td>USD 1,000</td>
                <td>170만명</td>
                <td><span class="badge badge-ok">✓ 가능</span></td>
                <td>
                  <a href="https://ms.hrcglobal.com/etc/abroad/KANTAR.pdf" target="_blank" class="mbtn">
                    보기
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- 모바일용 카드 -->
          <div class="partner-cards">
            <!-- DataSpring -->
            <div class="partner-card">
              <h3>데이터스프링 (DataSpring)</h3>
              <p>글로벌 패널 조사 전문 기업</p>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">조사 국가</span>
                  <span class="value">약 35개국</span>
                </div>
                <div class="info-item">
                  <span class="label">셋팅</span>
                  <span class="value">3일</span>
                </div>
                <div class="info-item">
                  <span class="label">최소비용</span>
                  <span class="value">300,000원</span>
                </div>
                <div class="info-item">
                  <span class="label">패널</span>
                  <span class="value">아시아 200만명</span>
                </div>
                <div class="info-item">
                  <span class="label">한국어</span>
                  <span class="badge badge-ok">✓ 가능</span>
                </div>
              </div>
              <a href="https://ms.hrcglobal.com/etc/abroad/DATASPRING.pdf" target="_blank" class="mbtn">
                Panelbook 보기
              </a>
            </div>

            <!-- GMOR -->
            <div class="partner-card">
              <h3>GMOR</h3>
              <p>아시아 태평양 지역 전문</p>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">조사 국가</span>
                  <span class="value">약 52개국</span>
                </div>
                <div class="info-item">
                  <span class="label">셋팅</span>
                  <span class="value">3일</span>
                </div>
                <div class="info-item">
                  <span class="label">최소비용</span>
                  <span class="value">USD 300</span>
                </div>
                <div class="info-item">
                  <span class="label">패널</span>
                  <span class="value">5,800만명</span>
                </div>
                <div class="info-item">
                  <span class="label">한국어</span>
                  <span class="badge badge-no">✗ 불가능</span>
                </div>
              </div>
              <a href="https://ms.hrcglobal.com/etc/abroad/GMOR.pdf" target="_blank" class="mbtn">
                Panelbook 보기
              </a>
            </div>

            <!-- Dynata -->
            <div class="partner-card">
              <h3>다이나타 (Dynata)</h3>
              <p>세계 최대 규모의 패널 제공업체</p>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">조사 국가</span>
                  <span class="value">약 45개국</span>
                </div>
                <div class="info-item">
                  <span class="label">셋팅</span>
                  <span class="value">3일</span>
                </div>
                <div class="info-item">
                  <span class="label">최소비용</span>
                  <span class="value">1,500,000원</span>
                </div>
                <div class="info-item">
                  <span class="label">패널</span>
                  <span class="value">7,000만명</span>
                </div>
                <div class="info-item">
                  <span class="label">한국어</span>
                  <span class="badge badge-ok">✓ 가능</span>
                </div>
              </div>
              <a href="https://ms.hrcglobal.com/etc/abroad/DYNATA.pdf" target="_blank" class="mbtn">
                Panelbook 보기
              </a>
            </div>

            <!-- Toluna -->
            <div class="partner-card">
              <h3>롤루나 (Toluna)</h3>
              <p>글로벌 온라인 패널 및 기술 솔루션</p>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">조사 국가</span>
                  <span class="value">약 70개국</span>
                </div>
                <div class="info-item">
                  <span class="label">셋팅</span>
                  <span class="value">3일</span>
                </div>
                <div class="info-item">
                  <span class="label">최소비용</span>
                  <span class="value">USD 1,000</span>
                </div>
                <div class="info-item">
                  <span class="label">패널</span>
                  <span class="value">79만명</span>
                </div>
                <div class="info-item">
                  <span class="label">한국어</span>
                  <span class="badge badge-ok">✓ 가능</span>
                </div>
              </div>
              <a href="https://ms.hrcglobal.com/etc/abroad/TOLUNA.pdf" target="_blank" class="mbtn">
                Panelbook 보기
              </a>
            </div>

            <!-- MarketLink -->
            <div class="partner-card">
              <h3>마켓링크 (MarketLink)</h3>
              <p>한국 시장조사 전문 패널 제공</p>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">조사 국가</span>
                  <span class="value">약 83개국</span>
                </div>
                <div class="info-item">
                  <span class="label">셋팅</span>
                  <span class="value">3일</span>
                </div>
                <div class="info-item">
                  <span class="label">최소비용</span>
                  <span class="value">200,000원</span>
                </div>
                <div class="info-item">
                  <span class="label">패널</span>
                  <span class="value">제휴 파트너사</span>
                </div>
                <div class="info-item">
                  <span class="label">한국어</span>
                  <span class="badge badge-ok">✓ 가능</span>
                </div>
              </div>
              <a href="https://ms.hrcglobal.com/etc/abroad/MARKETLINK.pdf" target="_blank" class="mbtn">
                Panelbook 보기
              </a>
            </div>

            <!-- Kantar -->
            <div class="partner-card">
              <h3>칸타 (Kantar)</h3>
              <p>세계적인 데이터, 인사이트 및 컨설팅 그룹</p>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">조사 국가</span>
                  <span class="value">약 100개국</span>
                </div>
                <div class="info-item">
                  <span class="label">셋팅</span>
                  <span class="value">3일</span>
                </div>
                <div class="info-item">
                  <span class="label">최소비용</span>
                  <span class="value">USD 1,000</span>
                </div>
                <div class="info-item">
                  <span class="label">패널</span>
                  <span class="value">170만명</span>
                </div>
                <div class="info-item">
                  <span class="label">한국어</span>
                  <span class="badge badge-ok">✓ 가능</span>
                </div>
              </div>
              <a href="https://ms.hrcglobal.com/etc/abroad/KANTAR.pdf" target="_blank" class="mbtn">
                Panelbook 보기
              </a>
            </div>
          </div>
        </div>
      `,
      width: window.innerWidth < 768 ? "95%" : 1200,
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        container: "swal2-container-custom",
        popup: "swal2-popup-custom",
        title: "swal2-title-custom",
        htmlContainer: "swal2-html-container-custom",
      },
      didOpen: () => {
        // 모달이 열린 후 스크롤 가능한 영역에 스타일 적용
        const htmlContainer = Swal.getHtmlContainer();
        if (htmlContainer) {
          htmlContainer.style.maxHeight = "70vh";
          htmlContainer.style.overflowY = "auto";
          htmlContainer.style.padding = "0";
        }
      },
    });
  }

  // 초기화 함수
  function init() {
    const partnerIntroBtn = document.getElementById("partnerIntroBtn");
    if (partnerIntroBtn) {
      partnerIntroBtn.addEventListener("click", openPartnerIntroModal);
    }
  }

  // SweetAlert2 로드 후 초기화
  loadSweetAlert2()
    .then(() => {
      // DOM이 준비되면 초기화
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
      } else {
        init();
      }
    })
    .catch((error) => {
      console.error("SweetAlert2 로드 실패:", error);
      // 폴백: 기본 alert 사용
      const partnerIntroBtn = document.getElementById("partnerIntroBtn");
      if (partnerIntroBtn) {
        partnerIntroBtn.addEventListener("click", () => {
          alert(
            "파트너사 소개\n\nDataSpring: 글로벌 패널 조사 전문 기업\nGMOR: 아시아 태평양 지역 전문\nDynata: 세계 최대 패널 제공업체\nToluna: 글로벌 온라인 패널 제공\nMarketLink: 한국 시장 전문\nKantar: 세계적인 데이터 그룹"
          );
        });
      }
    });
})();
