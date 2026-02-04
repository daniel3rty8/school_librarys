
export function applyFilters(books, grade, selectedType) {
  return books.filter(book => {
    const gradeMatch =
      grade === "All" || String(book.grade) === grade ||  String(book.grade_level) === grade;

    const typeMatch =
      selectedType === "All" || book.type === selectedType;
      
    return gradeMatch && typeMatch;
  });
}

