# Manga Store Node.js Project

This is a Node.js project for a manga store web application. Users can browse, search, review, add to cart, and order manga books. Additionally, there's an admin panel for managing the manga store.

##admin email and password to login
{

  "email":"devranishivam1121@gmail.com",
 
  "password":"qwerty1234",

  } 

## Functionalities

1. **User Authentication using JWT**: Users can sign up, log in, and maintain their profiles securely.

2. **Search Manga Books**: Users can search for manga books using the author, name, or genre using query strings.

3. **View Manga Details**: Users can select any manga book and get its details.

4. **Review Mangas**: Users can review and rate manga books.

5. **Cart Operations**:
   - Add manga to the cart.
   - View the cart.
   - Remove items from the cart.

6. **Checkout Option**: Users can place orders with selected books along with date and time.

7. **Admin Panel**:
   - Only admin can add, edit, and remove books from the store.
   - There can only be one admin.

## Routes

### User Routes

#### Authentication
- `POST /user/signup`: Create a new account.
  - JSON Format:
    ```json
    {
     "name":"shivam",
     "email":"devranishivam1121@gmail.com",
      "address":"jabalpur",
     "password":"qwerty1234",
     "role":"admin"
 
    }
    ```
- `POST /user/login`: Login to the website.
  - JSON Format:
    ```json
    {
      "email": "example@example.com",
      "password": "password123"
    }
    ```

#### Profile Operations
- `GET /user/get`: Get the user's profile.
- `PUT /user/profile/password`: Update the password.
  - JSON Format:
    ```json
    {
    "oldPassword":qwerty1121 ,
    "newPassword":"qwerty"
}
    ```

#### Manga Operations
- `GET /user/manga`: Get a list of manga according to genre, author, or other parameters.
  - Query Parameters:
    - `mangaName`
    - `mangaAuthor`
    - `genre`
- `GET /user/manga/:id`: Get details about a selected manga.
- `POST /user/manga/:id`: Write a review for the selected manga.
  - JSON Format:
    ```json
    {
      "rating": 4,
      "comment": "I liked this manga very much."
    }
    ```

### Cart Routes

- `GET /cart/user`: Get the list of manga stored in the cart.
- `POST /cart/user/:id`: Add selected manga (using id) to the cart.
- `DELETE /cart/user/:id`: Remove selected manga (using id) from the cart.

### Order Routes

- `GET /order/manga`: Get all the list of orders.
- `POST /order/manga/:id`: Order the selected manga.
  - JSON Format:
    ```json
    {
    "quantity":3,
    "payment":"UPI"  or  "COD"
   }
    ```

### Admin Routes

- `POST /admin/manga`: Add manga to the store.
  - JSON Format:
    ```json
    {
   
    "mangaName":"attack on titan",
    "mangaPrice":2000,
    "mangaGenre":["thriller","action"],
    "mangaAuthor":"Hajime Isayama"
    
}
    ```
- `DELETE /admin/manga/:id`: Delete manga from the store.
- `PUT /admin/manga/:id`: Update manga details.

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables as per `.env.example`.
4. Run the server using `npm start`.

## Contributors

- [Shivam Devrani](https://github.com/ShivamDevrani) - Developer

