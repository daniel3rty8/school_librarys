export function displayboxes(data, { previewPage = null } = {}) {
  const box = document.getElementById("books_box");
  box.innerHTML = "";

  data.forEach(item => {
    const a = document.createElement("a");
    a.className = "object";

    if (previewPage) {
      a.href = `${previewPage}?id=${encodeURIComponent(item.id)}`;
    } else {
      a.href = "javascript:void(0)";
    }

    a.innerHTML = `
    <div class="image_box">
      <img src="${item.book_photo}" class="imgs">
    </div>
    <div class="object">
      <div class="books_name">${item.book_name}</div>
      <div class="books_grade">Grade ${item.grade_level}</div>
      <div class="books_dicription">
        ${item.home_dicription}
      </div>
    </div>
  `;

    box.appendChild(a);
  });
}
