import { quiz_datas } from './quiz_data.js';
import { hide_show2 } from './hide_show.js';
import { searchFilter } from "./search.js";

const middle_div = document.getElementById("middle_div");
const container = document.getElementById("container");
const cancel_container = document.getElementById("cancel_container");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

hide_show2(middle_div, container, cancel_container);


if (searchInput && searchResults) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    searchResults.innerHTML = "";

    if (!query) {
      searchResults.style.display = "none";
      return;
    }

    const results = searchFilter(quiz_datas, query);

    results.forEach(b => {
      const div = document.createElement("div");
      div.className = "search-item";
      div.textContent = b.book_name || b.title || `Quiz ${b.id}`;
      div.addEventListener("click", () => {
        // navigate to quiz preview page for quizzes
        location.href = `preview_quiz.html?id=${b.id}`;
      });
      searchResults.appendChild(div);
    });

    searchResults.style.display = results.length ? "block" : "none";
  });

  // hide search results when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchResults.contains(e.target) && e.target !== searchInput) {
      searchResults.style.display = "none";
    }
  });
}

const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

const bookDetail = document.getElementById("book_detail");

const book = quiz_datas.find(b => String(b.id) === String(bookId));

bookDetail.innerHTML = book
  ? `
    <div class="img"><img src="${book.book_photo}" class="imgs"></div>
    <div class="details">
      <h1>${book.book_name}</h1>
      <p>${book.curriculum || ''}</p>
      <p>${book.prev_description || ''}</p>
      <p>PDF · ${book.size || ''}</p>
    </div>
    <div class="start_back_btn">
      <!-- Pass subject & grade to quiz page -->
      <button class="back" id="backBtn"> back</button>
      <button class="start" id="startQuizBtn">start quiz</button>
    </div>
  `
  : "<p>Quiz not found.</p>";

  // BACK
  document.getElementById("backBtn").onclick = () => {
    window.location.href = "quiz.html";
  };

  // START (VALIDATED REDIRECT)
  document.getElementById("startQuizBtn").onclick = () => {
      window.location.href =
      `quiz_page.html?subject=${book.subject}&grade=${book.grade}`;
  };