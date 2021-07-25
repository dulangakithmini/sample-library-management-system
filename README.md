# **API Documentation**

### 1. Create a user.

- HTTP method - POST
- URL - /user/signup

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
email | String | Body parameter | required
password | String | Body parameter | required
role | String | Body parameter

### 2. User login.

- HTTP method - POST
- URL - /user/login

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
email | String | Body parameter | required
password | String | Body parameter | required

### 3. Delete a user.

- HTTP method - DELETE
- URL - /user/:id

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
id | Object ID | URL parameter | required

### 4. Activate a user.

- HTTP method - PUT
- URL - /user/activate

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
id | Object ID | Body parameter | required

### 5. Get all the books. Used by the admin.

- HTTP method - GET
- URL - /allBooks

### 6. Get book by ID.

- HTTP method - GET
- URL - /book/:id

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
id | Object ID | URL parameter | required

### 7. Add a book.

- HTTP method - POST
- URL - /book

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
title | String | Body parameter | required
author | Object ID | Body parameter | required
category | String | Body parameter | required
summary | String | Body parameter | required

### 8. Update a book.

- HTTP method - PUT
- URL - /book/:id

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
book id | Object ID | URL parameter | required
title | String | Body parameter |
author | Object ID | Body parameter |
category | String | Body parameter |
summary | String | Body parameter |

### 9. Delete a book.

- HTTP method - DELETE
- URL - /book/:id

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
id | Object ID | URL parameter | required

### 10. Get books by title.

- HTTP method - GET
- URL - /booksByTitle/:title

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
title | String | URL parameter | required

### 11. Get books by author.

- HTTP method - GET
- URL - /booksByAuthor/:author

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
author | String | URL parameter | required

### 12. Book a book.

- HTTP method - PUT
- URL - /books/book/:id

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
book id | Object ID | URL parameter | required

### 13. Borrow a book.

- HTTP method - PUT
- URL - /books/borrow/:id

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
book id | Object ID | URL parameter | required
user id | Object ID | Body parameter | required

### 14. Get available books - Not booked/borrowed.

- HTTP method - GET
- URL - /books

### 15. Get booked books - Used by the user to get the books that they booked.

- HTTP method - GET
- URL - /bookedBooks

### 16. Get borrowed books - Used by the user to get the books that they borrowed.

- HTTP method - GET
- URL - /borrowedBooks

### 17. Get booked/borrowed books - Used by the admin to get all the booked/borrowed books

- HTTP method - GET
- URL - /bookedOrBorrowed

### 18. Upload a file of books.

- HTTP method - POST
- URL - /upload

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
file of books | JSON file | Form data | required

### 19. Add book list.

- HTTP method - POST
- URL - /bookList

### 20. Get all authors.

- HTTP method - GET
- URL - /authors

### 21. Get author by ID

- HTTP method - GET
- URL - /author/:id

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
id | Object ID | URL parameter | required

### 22. Delete an author.

- HTTP method - DELETE
- URL - /author/:id

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
id | Object ID | URL parameter | required

### 23. Update an author.

- HTTP method - PUT
- URL - /author/:id

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
id | Object ID | URL parameter | required
name | String | Body parameter |

### 24. Add an author.

- HTTP method - POST
- URL - /author

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
name | String | Body parameter |

### 25. Get author by name.

- HTTP method - GET
- URL - /authorByName/:name

Parameters | Data Type | Parameter Type | Comments
-----------|-----------|----------------|---------
name | String | URL parameter | required