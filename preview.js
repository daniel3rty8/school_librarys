import { books } from "./data.js";
import { searchFilter } from "./search.js";
import {hide_show2} from "./hide_show.js"

const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

const middle_div = document.getElementById("middle_div");
const container = document.getElementById("container");
const bookDetail = document.getElementById("book_detail");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const cancel_container= document.getElementById("cancel_container")


 hide_show2(middle_div,container,cancel_container)
// BOOK DETAILS
const book = books.find(b => String(b.id) === String(bookId));

bookDetail.innerHTML = book
  ? `
    <div class="img">
      <img src="${book.book_photo}" class="imgs">
    </div>
    <div class="details">
      <h1>${book.book_name}</h1>
      <p>${book.curriculum}</p>
      <p>${book.prev_description}</p>
      <p>PDF · ${book.size}</p>
    </div>
    <div class="down_read_btn">
      <a href="${book.file}" download >Download</a>
      <a href="${book.file}" target="_blank">Read Online</a>
    </div>
  `
  : "<p>Book not found.</p>";

// SEARCH
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  searchResults.innerHTML = "";

  if (!query) {
    searchResults.style.display = "none";
    return;
  }

  const results = searchFilter(books, query);

  results.forEach(b => {
    const div = document.createElement("div");
    div.textContent = b.book_name;
    div.onclick = () => location.href = `preview.html?id=${b.id}`;
    searchResults.appendChild(div);
  });

  searchResults.style.display = "block";
});
