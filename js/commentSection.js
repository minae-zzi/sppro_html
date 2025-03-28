function initCommentSection(container) {
  if (!container) {
    console.warn("initCommentSection: 유효한 container가 필요합니다.");
    return;
  }

  const input = container.querySelector(".comment-input");
  const addBtn = container.querySelector(".add-comment-btn");
  const list = container.querySelector(".comment-list");
  const count = container.querySelector(".comment-count");

  const localComments = [];
  let editingIdx = null;

  const render = () => {
    list.innerHTML = "";
    count.textContent = `(${localComments.length})`;

    localComments.forEach((c, idx) => {
      const item = document.createElement("div");
      item.className =
        "flex flex-col gap-2 rounded-md p-6 " +
        (editingIdx === idx ? "bg-white border border-pblue" : "bg-formGray");

      item.innerHTML = `
          <div class="flex flex-col items-start">
            <div class="flex items-center justify-between w-full">
              <p class="text-zinc-800 font-semibold">${c.author}</p>
              <div class="comment-buttons flex items-center gap-2">
                ${
                  editingIdx === idx
                    ? `
                      <button class="btn btn-neutral btn-sm save-edit-btn">수정완료</button>
                      <button class="btn bg-red-400 text-white border-none btn-sm cancel-edit-btn">취소</button>
                    `
                    : `
                      <button class="btn btn-soft btn-sm edit-btn">수정</button>
                      <button class="btn btn-soft btn-sm delete-btn">삭제</button>
                    `
                }
              </div>
            </div>
            <p class="text-zinc-400 text-sm">${c.createdAt}</p>
          </div>
          ${
            editingIdx === idx
              ? `<input type="text" class="edit-input input input-bordered w-full mt-2" value="${c.content}" />`
              : `<div class="text-zinc-600 whitespace-pre-wrap w-full">${c.content}</div>`
          }
        `;

      if (editingIdx === idx) {
        item.querySelector(".save-edit-btn").addEventListener("click", () => {
          const newContent = item.querySelector(".edit-input").value.trim();
          if (newContent) {
            localComments[idx].content = newContent;
            editingIdx = null;
            render();
          }
        });

        item.querySelector(".cancel-edit-btn").addEventListener("click", () => {
          editingIdx = null;
          render();
        });
      } else {
        item.querySelector(".edit-btn").addEventListener("click", () => {
          editingIdx = idx;
          render();
        });

        item.querySelector(".delete-btn").addEventListener("click", () => {
          if (confirm("댓글을 삭제하시겠습니까?")) {
            localComments.splice(idx, 1);
            editingIdx = null;
            render();
          }
        });
      }

      list.appendChild(item);
    });
  };

  addBtn.addEventListener("click", () => {
    const content = input.value.trim();
    if (!content) return;

    localComments.push({
      author: "사용자",
      content,
      createdAt: new Date().toLocaleString(),
    });

    input.value = "";
    editingIdx = null;
    render();
  });

  render();
}
