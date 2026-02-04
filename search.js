// search
export function searchFilter(books, query) {
  if (!query) return books;

  const q = query.toLowerCase();

  return books.filter(book => {
    const nameMatch = book.book_name
      .toLowerCase()
      .includes(q);

  const hashtagMatch = book.hashtag
  ? book.hashtag.some(tag => tag.toLowerCase().includes(q))
  : false;


    return nameMatch || hashtagMatch;
  });
}
