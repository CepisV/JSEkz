class Book {
    constructor(image, title, author, genre, description, price, condition) {
      this.image = image;
      this.title = title;
      this.author = author;
      this.genre = genre;
      this.description = description;
      this.price = price;
      this.condition = condition;
    } 
    editBook(newTitle, newAuthor, newGenre, newDescription, newPrice, newCondition) {
      this.title = newTitle;
      this.author = newAuthor;
      this.genre = newGenre;
      this.description = newDescription;
      this.price = newPrice;
      this.condition = newCondition;
    }
  }
  
  