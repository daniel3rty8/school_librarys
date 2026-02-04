import { books } from "./data.js";
import { displayboxes } from "./books.js";
import { applyFilters} from "./filter.js";
import {searchFilter} from "./search.js"
import {hide_show} from "./hide_show.js"
import { PREVIEW_PAGES } from "./previewConfig.js";
//  DOM ELEMENTS 
const middle_div = document.getElementById("middle_div");
const login_div = document.getElementById("login_div");
const container = document.getElementById("container");

const typeButtons = document.querySelectorAll("#navigation2 .btn");
const gradeSelect = document.getElementById("grade-level");
const navigation2 = document.getElementById("navigation2");
const navigation1 = document.getElementById("navigation1");
const searchInput = document.getElementById("searchInput");

// ===================== STATE =====================

let selectedType = "All";
let searchQuery = "";


// RESPONSIVE NAV 
hide_show(middle_div, login_div,container,navigation2)
//  MAIN DISPLAY PIPELINE 
function updateDisplay() {
  let filtered = applyFilters(
    books,
    gradeSelect.value,
    selectedType
  );

  filtered = searchFilter(filtered, searchQuery);

displayboxes(filtered, {
  previewPage: PREVIEW_PAGES.book
});
}

//  FILTER EVENTS 
gradeSelect.addEventListener("change", updateDisplay);

typeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedType = btn.dataset.type;
    updateDisplay();
  });
});

// SEARCH 
searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.trim();
  updateDisplay();
});

//  INITIAL RENDER 
updateDisplay();
 
//  SCROLL NAV EFFECT 

let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    navigation1.style.top = "-100px"; 
  } else {
    navigation1.style.top = "0"; 
  }
  lastScrollY = window.scrollY;
  
});
