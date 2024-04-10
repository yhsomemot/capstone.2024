const { client } = require('../client.js')
const { createUser } = require("./users.js")
const { createBook } = require("./books.js");
const { createCart } = require('./orders.js');
const { createGenre } = require('./books.js');

//add a cart table? to keep track of status? no if delete cart is a thing.
const createTables = async () => {
  const SQL = `
        DROP TABLE IF EXISTS cart_product;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS books;
        DROP TABLE IF EXISTS genre;
        DROP TYPE IF EXISTS status;
        
        CREATE TABLE users(
          id UUID DEFAULT gen_random_uuid(),
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(100),
          address TEXT,
          payment_info VARCHAR(16),
          is_admin BOOLEAN DEFAULT FALSE,
          PRIMARY KEY (id)
        );
        CREATE TABLE genre(
          id SERIAL,
          name VARCHAR(100) UNIQUE, 
          PRIMARY KEY (id)
        );
        CREATE TABLE books(
          id UUID DEFAULT gen_random_uuid(),
          name VARCHAR(100) UNIQUE NOT NULL,
          author VARCHAR(255) NOT NULL,
          price INTEGER DEFAULT 0,
          description TEXT,
          inventory INTEGER DEFAULT 1,
          coverimage TEXT NOT NULL,
          genre_id INTEGER REFERENCES genre(id) NOT NULL,
          PRIMARY KEY (id)
        );
        CREATE TYPE status AS ENUM ('pending', 'complete');
        CREATE TABLE orders(
          id UUID DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES users(id) NOT NULL,
          current_status status, 
          PRIMARY KEY (id)
        );
        CREATE TABLE cart_product(
          id UUID DEFAULT gen_random_uuid(),
          order_id UUID REFERENCES orders(id) NOT NULL,
          book_id UUID REFERENCES books(id) NOT NULL,
          qty INTEGER DEFAULT 1,
          CONSTRAINT unique_order_and_book_id UNIQUE (book_id, order_id),
          PRIMARY KEY (id)
          );
    
      `;
  await client.query(SQL);
};
// const seedTable = async () => {
//   const [moe, lucy, ethyl, curly] = await Promise.all([
//     createUser({ email: 'moe@email.com', password: 'm_pw', address: 'Texas', is_admin: false }),
//     createUser({ email: 'lucy@email.com', password: 'l_pw', address: 'Canada', is_admin: true }),
//     createUser({ email: 'ethyl@email.com', password: 'e_pw', address: 'Norway', is_admin: false }),
//     createUser({ email: 'curly@email.com', password: 'c_pw', address: 'Miami', is_admin: false })
//   ]);
//   const [foo, bar, bazz, quq, fip] = await Promise.all([
//     createBook({ name: 'foo', price: 9, description: 'fee fi foo fum', inventory: 20, coverimage: 'https://picsum.photos/200/300' }),
//     createBook({ name: 'bar', price: 14, coverimage: 'https://picsum.photos/200/300' }),
//     createBook({ name: 'bazz', coverimage: 'https://picsum.photos/200/300' }),
//     createBook({ name: 'quq', coverimage: 'https://picsum.photos/200/300' }),
//     createBook({ name: 'fip', coverimage: 'https://picsum.photos/200/300' })
//   ]);
//   await Promise.all([
//     createCart({ user_id: moe.id, book_id: foo.id, qty: 1 }),
//     createCart({ user_id: curly.id, book_id: bazz.id, qty: 6 }),
//     createCart({ user_id: curly.id, book_id: foo.id, qty: 4 })
//   ]);
// }

const seedGenre = async () => {
  const [Fantasy, NonFiction, Romance, Fiction, History] = await Promise.all([
    createGenre({ name: 'Fantasy' }),
    createGenre({ name: 'NonFiction' }),
    createGenre({ name: 'Romance' }),
    createGenre({ name: 'Fiction' }),
    createGenre({ name: 'History' })
  ])
};
const seedUsers = async () => {
  const [moe, lucy, ethyl, curly,] = await Promise.all([
    createUser({ email: 'moe@email.com', password: 'm_pw', address: 'Texas', is_admin: false }),
    createUser({ email: 'lucy@email.com', password: 'l_pw', address: 'Canada', is_admin: true }),
    createUser({ email: 'ethyl@email.com', password: 'e_pw', address: 'Norway', is_admin: false }),
    createUser({ email: 'curly@email.com', password: 'c_pw', address: 'Miami', is_admin: false })
  ]);
};
const seedBooks = async () => {
  const [] = await Promise.all([
    createBook({
      name: 'Dracula', author: 'Bram Stoker', price: 9,
      description: 'Dracula is a Gothic horror novel by Irish writer Bram Stoker published in 1897. The novel tells the story of Count Dracula, a Transylvanian vampire who preys on the blood of the living. The story follows the efforts of Dracula\'s pursuers, who seek to destroy him before he can spread his evil throughout England.',
      inventory: 20, coverimage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Dracula_1st_ed_cover_reproduction.jpg/440px-Dracula_1st_ed_cover_reproduction.jpg',
      genre_id: 'Fantasy'
    }),
    createBook({
      name: 'The Two Towers', author: 'J.R.R. Tolkien', price: 14,
      description: 'The company of the Ring is torn asunder. Frodo and Sam continue their journey alone down the great River Anduin - alone, that is, save for the mysterious creeping figure that follows wherever they go. This continues the classic tale begun in The Fellowship of the Ring, which reaches its awesome climax in The Return of the King.',
      inventory: 20, coverimage: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Two_Tower_Tolkien%27s_original_cover.jpg',
      genre_id: 'Fantasy'
    }),
    createBook({
      name: 'The Hobbit', author: 'J.R.R. Tolkien', price: 20,
      description: 'Set in the fictional world of Middle-earth, \"The Hobbit\" is a prequel to \"The Lord of the Rings\" that follows the hobbit Bilbo Baggins as he embarks on a quest to steal treasure from the dragon Smaug. The story explores themes of adventure, friendship, and the importance of home.',
      inventory: 1, coverimage: 'https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg',
      genre_id: 'Fantasy'
    }),
    createBook({
      name: 'Women on the Margins: Three Seventeenth-Century Lives', author: 'Natalie Zemon Davis', price: 20,
      description: 'As she did with Martin Guerre, Natalie Zemon Davis here retrieves individual lives from historical obscurity to give us a window onto the early modern world. As women living in the 17th century, Glikl bas Judah Leib, Marie de l\'Incarnation, and Maria Sibylla Merian, equally remarkable though very different, were not queens or noblewomen, their every move publicly noted. Rather, they were living on the margins in 17th-century Europe, North America and South America. Yet these women - one Jewish, one Catholic, one Protestant - left behind memoirs and writings that make for a spellbinding tale and that, in Davis\' deft narrative, tell us more about the life of early modern Europe than many an official history.',
      inventory: 14, coverimage: 'https://i.thriftbooks.com/api/imagehandler/m/7FE67EDB23BDE78C870624256633020891BB59E4.jpeg',
      genre_id: 'History'
    }),
    createBook({
      name: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien', price: 9,
      description: 'The Fellowship of the Ring, the first volume in the trilogy, tells of the fateful power of the One Ring. It begins a magnificent tale of adventure that will plunge the members of the Fellowship of the Ring into a perilous quest and set the stage for the ultimate clash between the powers of good and evil.',
      inventory: 20, coverimage: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/The_Fellowship_of_the_Ring_Tolkien%27s_original_cover.jpg',
      genre_id: 'Fantasy'
    }),
    createBook({
      name: 'Romeo and Juliet', author: 'William Shakespeare', price: 20,
      description: 'A tragedy written early in the career of playwright William Shakespeare about two young \"star-crossed lovers\" whose deaths ultimately unite their feuding families. It was among Shakespeare\'s most popular plays during his lifetime and is one of his most frequently performed plays.',
      inventory: 20, coverimage: 'https://images.booksense.com/images/142/097/9798644097142.jpg',
      genre_id: 'Romance'
    }),
    createBook({
      name: 'Dorthea Lange: A Life Beyond Limits', author: 'Linda Gordon', price: 10,
      description: 'Winner of the 2010 Bancroft Prize and the 2009 Los Angeles Times Book Prize in Biography: Dorothea Lange\'s photographs define how we remember the Depression generation; now an evocative biography defines her creative struggles and enduring legacy.',
      inventory: 20, coverimage: 'https://i.ebayimg.com/images/g/rzQAAOSwx5Nl1t1U/s-l1600.jpg',
      genre_id: 'NonFiction'
    }),
    createBook({
      name: 'Pride And Prejudice ', author: 'Jane Austin', price: 10,
      description: 'Jane Austen’s \"Pride and Prejudice\" is a timeless tale of love, class, and societal expectations in early 19th-century England. It revolves around the headstrong Elizabeth Bennet and the enigmatic Mr. Darcy, whose initial pride and prejudice lead to misunderstandings and complications. This classic novel explores themes of manners, marriage, and the complexities of human relationships.',
      inventory: 5, coverimage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/PrideAndPrejudiceTitlePage.jpg/440px-PrideAndPrejudiceTitlePage.jpg',
      genre_id: 'Romance'
    }),
    createBook({
      name: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 20,
      description: 'J.D. Salinger’s iconic novel, \"The Catcher in the Rye,\" introduces readers to the unforgettable Holden Caulfield, a disenchanted teenager navigating the complexities of adulthood and society. Holden’s journey takes him through New York City as he grapples with themes of alienation, innocence, and the search for authenticity in a world that often seems phony.',
      coverimage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/440px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg',
      genre_id: 'Fiction'
    }),
    createBook({
      name: 'To Kill a Mockingbird', author: 'Harper Lee', price: 10,
      description: 'Harper Lee\'s masterpiece, \"To Kill a Mockingbird,\" is a poignant exploration of racial prejudice and moral growth in the American South during the 1930s. The novel follows Scout Finch, her brother Jem, and their father Atticus as they navigate the complexities of a racially divided society. Through the lens of a child’s innocence, it addresses themes of injustice, empathy, and the power of compassion.',
      inventory: 20, coverimage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/440px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg',
      genre_id: 'Fiction'
    }),
  ]);
};

module.exports = {
  createTables,
  seedUsers,
  seedBooks,
  seedGenre
  // seedTable
}