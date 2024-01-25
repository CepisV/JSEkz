class App {
    constructor() {
      this.users = JSON.parse(localStorage.getItem('users')) || [];
      this.currentUser = null;
      this.books = [];
      this.orders = [];
      this.exchanges = [];
    }
    
    queryCatalog(bookCode) { 
    }
  
    editCatalog(bookCode, newAttributes) {
    }
  
    placeOrder(selectedBook, seller, buyer, price, status) {
    
    }
    registerUser(name, nickname, email, password, confirmPassword) {
      if (!name || !nickname || !email || !password || !confirmPassword) {
        console.error("All fields are required.");
        return false;
      }
  
      if (password !== confirmPassword) {
        console.error("Passwords do not match.");
        return false;
      }
  
      const emailExists = this.users.some(user => user.email === email);
      const nicknameExists = this.users.some(user => user.nickname === nickname);
  
      if (emailExists || nicknameExists) {
        console.error("Email or nickname is already in use.");
        return false;
      }
  
      const newUser = new User(name, nickname, email, password);
      this.users.push(newUser);
      localStorage.setItem('users', JSON.stringify(this.users));
  
      console.log("Registration successful.");
      return true;
    }
  
    loginUser(email, password) {
      const user = this.users.find(user => user.email === email && user.password === password);
      if (user) {
        this.currentUser = user;
        console.log("Login successful.");
        return true;
      } else {
        console.error("Invalid email or password.");
        return false;
      }
    }
  }
  