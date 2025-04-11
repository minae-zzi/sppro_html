function escapeHtml(str) {
  return str.replace(
    /[&<>"']/g,
    (match) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      }[match])
  );
}

// 댓글 리스트 렌더링
async function renderComments(
  list,
  comments,
  editingIdx = null,
  templatePath = "/common/comment-item.html",
  countEl = null
) {
  list.innerHTML = "";

  for (let i = 0; i < comments.length; i++) {
    const c = comments[i];
    const template = await fetch(templatePath).then((res) => res.text());

    const html = template
      .replace("{{author}}", escapeHtml(c.author))
      .replace("{{createdAt}}", c.createdAt)
      .replace(
        "{{buttons}}",
        editingIdx === i
          ? `<button class="btn btn-neutral btn-sm save-edit-btn">수정완료</button>
           <button class="btn bg-red-400 text-white border-none btn-sm cancel-edit-btn">취소</button>`
          : `<button class="btn btn-soft btn-sm edit-btn">수정</button>
           <button class="btn btn-soft btn-sm delete-btn">삭제</button>`
      )
      .replace(
        "{{contentBlock}}",
        editingIdx === i
          ? `<input type="text" class="edit-input input input-bordered w-full mt-2" value="${escapeHtml(
              c.content
            )}" />`
          : `<div class="text-zinc-600 whitespace-pre-wrap w-full">${escapeHtml(
              c.content
            )}</div>`
      );

    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    const item = wrapper.firstElementChild;

    // 이벤트 바인딩
    if (editingIdx === i) {
      item.querySelector(".save-edit-btn").addEventListener("click", () => {
        const newContent = item.querySelector(".edit-input").value.trim();
        if (newContent) {
          comments[i].content = newContent;
          renderComments(list, comments, null, templatePath, countEl);
        }
      });
      item.querySelector(".cancel-edit-btn").addEventListener("click", () => {
        renderComments(list, comments, null, templatePath, countEl);
      });
    } else {
      item.querySelector(".edit-btn")?.addEventListener("click", () => {
        renderComments(list, comments, i, templatePath, countEl);
      });
      item.querySelector(".delete-btn")?.addEventListener("click", () => {
        if (confirm("댓글을 삭제하시겠습니까?")) {
          comments.splice(i, 1);
          renderComments(list, comments, null, templatePath, countEl);
        }
      });
    }

    list.appendChild(item);
  }

  //  댓글 수 업데이트
  if (countEl) {
    countEl.textContent = `(${comments.length})`;
  }
}

// 초기화 함수
function initCommentSection(container) {
  const list = container.querySelector(".comment-list");
  const input = container.querySelector(".comment-input");
  const addBtn = container.querySelector(".add-comment-btn");
  const count = container.querySelector(".comment-count");
  const templatePath =
    container.dataset.template || "/common/comment-item.html";

  const localComments = [];

  addBtn.addEventListener("click", () => {
    const content = input.value.trim();
    if (!content) return;

    localComments.push({
      author: "사용자",
      content,
      createdAt: new Date().toLocaleString(),
    });

    input.value = "";
    renderComments(list, localComments, null, templatePath, count);
  });

  renderComments(list, localComments, null, templatePath, count);
}
