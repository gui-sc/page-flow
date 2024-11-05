const books = [
    { title: "Livro 1", cover: "images/capa1.jpg" },
    { title: "Livro 2", cover: "images/capa2.jpg" },
    { title: "Livro 3", cover: "images/capa3.jpg" },
    { title: "Livro 4", cover: "images/capa4.jpg" },
    { title: "Livro 5", cover: "images/capa5.jpg" }
];

function loadBooks() {
    const bookList = document.getElementById('book-list');

    books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');

        const coverImage = document.createElement('img');
        coverImage.src = book.cover;
        coverImage.alt = `${book.title} cover`;
        coverImage.classList.add('book-cover');

        bookItem.appendChild(coverImage);

        // Adiciona um evento de clique que redireciona para a página de leitura
        bookItem.addEventListener('click', () => {
            window.location.href = `book.html?title=${encodeURIComponent(book.title)}`;
        });

        bookList.appendChild(bookItem);
    });
}

document.addEventListener('DOMContentLoaded', loadBooks);
