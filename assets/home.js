const book1 = new Book("img/1.jpg", "Book 1", "Author 1", "Genre 1", "Description 1", 10.99, "New");
const book2 = new Book("img/2.jpg", "Book 2", "Author 2", "Genre 2", "Description 2", 15.99, "Used");
const book3 = new Book("img/3.jpg", "Book 3 ", "Author 1", "Genre 1", "Description 1", 10.99, "New");
const book4 = new Book("img/4.jpg", "Book 4", "Author 2", "Genre 2", "Description 2", 15.99, "Used");
const book5 = new Book("img/5.jpg", "Book 1", "Author 1", "Genre 1", "Description 1", 10.99, "New");
const book6 = new Book("img/6.jpg", "Book 2", "Author 2", "Genre 2", "Description 2", 15.99, "Used");
const book7 = new Book("img/7.jpg", "Book 3 ", "Author 1", "Genre 1", "Description 1", 10.99, "New");
const book8 = new Book("img/8.jpg", "Book 4", "Author 2", "Genre 2", "Description 2", 15.99, "Used");

const user = new User("admin", "admin", "admin@example.com", "admin", "server", 10000);

const displaySearchResults = (results) => {
  document.getElementById("searchResults").innerHTML = "";

  results.forEach((result, index) => {
    const resultElement = document.createElement("div");
    resultElement.innerHTML = `
          <div class="book">
            <img src="${result.image}" alt="${result.title}">
            <p>${result.title} - ${result.author} - $${result.price}</p>
            <button class="buyButton" data-index="${index}">Buy</button>
            <button class="editButton" data-index="${index}">Edit</button>
          </div>
        `;
    document.getElementById("searchResults").appendChild(resultElement);
  });
};

document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const searchQuery = document.getElementById("searchQuery").value.toLowerCase();

  const searchResults = [book1, book2, book3, book4, book5, book6, book7, book8].filter((book) =>
    book.title.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery)
  );

  displaySearchResults(searchResults);
});

const addToCart = (book) => {
  const cartList = document.getElementById("cartList");
  const cartItem = document.createElement("li");
  cartItem.innerHTML = `
        ${book.title} - $${book.price}
        <button class="removeButton" data-title="${book.title}">Remove</button>
      `;
  cartList.appendChild(cartItem);

  user.balance -= book.price;
  document.getElementById("totalCost").textContent = (parseFloat(document.getElementById("totalCost").textContent) + book.price).toFixed(2);
};

document.getElementById("searchResults").addEventListener("click", function (event) {
  if (event.target.classList.contains("buyButton")) {
    const bookIndex = event.target.dataset.index;
    const selectedBook = [book1, book2, book3, book4, book5, book6, book7, book8][bookIndex];
    addToCart(selectedBook);
  } else if (event.target.classList.contains("editButton")) {
    const bookIndex = event.target.dataset.index;
    const selectedBook = [book1, book2, book3, book4, book5, book6, book7, book8][bookIndex];
    editBook(selectedBook, bookIndex);
  }
});
const editBook = (book, index) => {
  const modal = document.getElementById("editModal");
  modal.style.display = "block";

  const newTitleInput = document.getElementById("newTitle");
  const newAuthorInput = document.getElementById("newAuthor");
  const newGenreInput = document.getElementById("newGenre");
  const newDescriptionInput = document.getElementById("newDescription");
  const newPriceInput = document.getElementById("newPrice");
  const newConditionInput = document.getElementById("newCondition");

  newTitleInput.value = book.title;
  newAuthorInput.value = book.author;
  newGenreInput.value = book.genre;
  newDescriptionInput.value = book.description;
  newPriceInput.value = book.price;
  newConditionInput.value = book.condition;

  const editForm = document.getElementById("editForm");
  editForm.onsubmit = function (event) {
    event.preventDefault();

    const newTitle = newTitleInput.value;
    const newAuthor = newAuthorInput.value;
    const newGenre = newGenreInput.value;
    const newDescription = newDescriptionInput.value;
    const newPrice = parseFloat(newPriceInput.value);
    const newCondition = newConditionInput.value;

    book.editBook(newTitle, newAuthor, newGenre, newDescription, newPrice, newCondition);

    const searchResults = [book1, book2, book3, book4, book5, book6, book7, book8];
    displaySearchResults(searchResults);

    modal.style.display = "none";
  };
};

const closeEditModal = () => {
  const modal = document.getElementById("editModal");
  modal.style.display = "none";
};


document.getElementById("cartList").addEventListener("click", function (event) {
  if (event.target.classList.contains("removeButton")) {
    const removedTitle = event.target.dataset.title;
    removeFromCart(removedTitle);
  }
});

const removeFromCart = (title) => {
  const cartList = document.getElementById("cartList");
  const removedItem = Array.from(cartList.children).find((item) => item.textContent.includes(title));
  const removedPrice = parseFloat(removedItem.textContent.match(/\$([\d.]+)/)[1]);

  cartList.removeChild(removedItem);

  user.balance += removedPrice;
  document.getElementById("totalCost").textContent = user.balance.toFixed(2);
};

document.getElementById("clearCartButton").addEventListener("click", function () {
  clearCart();
});

const clearCart = () => {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  document.getElementById("totalCost").textContent = "0.00";
};