function toggleSynopsis(bookId) {
  var modal = document.getElementById("modal");
  var modalContent = document.getElementById("modalContent");
  var modalSynopsis = document.getElementById("modalSynopsis");
  var book = document.getElementById(bookId);
  var bookSynopsis = book.querySelector(".synopsis").innerText;
 
  modalSynopsis.textContent = bookSynopsis;
  

  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}



function searchBooks() {
  var input, filter, books, book, title, i, txtValue;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  books = document.querySelectorAll('.book');

  books.forEach(function (book) {
    title = book.querySelector('h2');
    txtValue = title.textContent || title.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      book.style.display = '';
    } else {
      book.style.display = 'none';
    }
  });
}
