const fetch = require('isomorphic-fetch');
const { expect } = require('chai');

(async () => {
  /**
   * 1. Sum non-negative numbers.
   * ============================
   *
   * Example input: [-6, 10, 20, 0, -5, 1]
   * Example logic: [-6, 10, 20, 0, -5, 1] -> [10, 20, 0, 1] -> 10 + 20 + 0 + 1 -> 31
   * Expected output: 31
   */
  const sum = (...array) => array.filter(x => x > 0).reduce((prev, cur) => prev+cur);
    

  /**
   * Start test cases
   * DO NOT EDIT
   */
  expect(
    sum(400, 20, -10, 30),
  ).to.equal(450);
  expect(
    sum(-5, 120, 0, 61, -5, 100),
  ).to.equal(281);
  /**
   * End test cases
   */

  /**
   * 2. Fetch last 5 facts about cats.
   * ================================
   *
   * We will use public cat facts API to load data: https://alexwohlbruck.github.io/cat-facts/docs/
   * URL returning list of facts: https://cat-fact.herokuapp.com/facts
   *
   * Example logic: fetch facts, get last 5 facts by 'updatedAt' field and map data.
   * Expected output: [
   *   { text: 'Fact 1', updatedAt: 2020-09-03T16:39:39.578Z },
   *   { text: 'Fact 2', updatedAt: 2020-08-26T20:20:02.359Z },
   *   { text: 'Fact 3', updatedAt: 2020-08-23T20:20:01.611Z },
   *   { text: 'Fact 4', updatedAt: 2020-11-25T21:20:03.895Z },
   *   { text: 'Fact 5', updatedAt: 2020-08-23T20:20:01.611Z },
   * ]
   */
  const fetchLastFiveCatFacts = async () => {
    const response = await fetch("https://cat-fact.herokuapp.com/facts");
    const data = await response.json()
    
    return data
            .map(el => ({ text: el.text, updatedAt: el.updatedAt}))
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .slice(0,5)

  };

  /**
   * Start test cases
   * DO NOT EDIT
  */
   const lastFiveCatFacts = await fetchLastFiveCatFacts();
   expect(lastFiveCatFacts).to.be.an('array');
   expect(lastFiveCatFacts).to.have.lengthOf(5);
   lastFiveCatFacts.map(x => expect(x).to.have.all.keys('text', 'updatedAt'));
  /**
   * End test cases
   */

  /**
   * 3. Books store reducer.
   * =======================
   *
   * We want to implement reducer for books store.
   * Our initial store state is:
   * Necessary to support next 3 action types: ADD_BOOK, UPDATE_BOOK, REMOVE_BOOK
   * Sample of actions data are listed in test cases.
   */
  const booksStoreReducer = (store, action) => {
    switch (action.type) {

      case 'ADD_BOOK':
        return {...store,books: [...store.books, action.payload]};

      case 'UPDATE_BOOK':
        return {...store,books: store.books.map(el => el.id === action.payload.id ? action.payload : el)};
        
      case 'REMOVE_BOOK':
        return {...store,books: store.books.filter(el => el.id !== action.payload.id)};
      default: {
        return store;
      }
    }
  };

  /**
   * Start test cases
   * DO NOT EDIT
   */
  const initialState = {
    books: [
      { id: 1, title: 'Gachi', author: 'Susan Salguero' },
      { id: 2, title: 'The Green Elephant', author: 'Svetlana Baskova' },
    ],
  };
  const GirlNextDoorBook = { id: 3, title: 'The girl next door', author: 'Jack Ketchum' };
  const BoyNextDoorBook = { id: 3, title: 'The boy next door', author: 'Jack Ketchum' };

  const getBooksQuantity = store => store.books.length;
  const getBookById = (store, id) => store.books.find(x => x.id === id);

  let nextStore = booksStoreReducer(initialState, {
    type: 'ADD_BOOK',
    payload: GirlNextDoorBook,
  });
  expect(getBooksQuantity(nextStore)).to.equal(3);
  expect(getBookById(nextStore, 3)).to.deep.equal(GirlNextDoorBook);
  nextStore = booksStoreReducer(nextStore, {
    type: 'UPDATE_BOOK',
    payload: BoyNextDoorBook,
  });
  expect(getBookById(nextStore, 3).title).to.equal(BoyNextDoorBook.title);
  nextStore = booksStoreReducer(nextStore, {
    type: 'REMOVE_BOOK',
    payload: { id: 2 }
  });
  expect(getBooksQuantity(nextStore)).to.equal(2);
  /**
   * End test cases
   */

  /**
   * 4. Most popular word in text.
   * =============================
   *
   * Most popular word is word which meets more often than others in text.
   *
   * Example input: 'Sam owns boat. His boat quite big, but he is looking for a new boat.'
   * Example logic: Sam = 1, owns = 1, boat = 3, His = 1, quite = 1, big = 1, but = 1, he = 1, is = 1, looking = 1, for = 1, a = 1, new = 1 -> 'boat' meets most often
   * Expected output: 'boat'
   */
  const mostPopularWord = (text) => {
    const res = text.split(/\W+/)
    
    const result = []
    let words = []
    let word = ''
    let count = 0;
    for (let j = 0; j < res.length; j++) {
        for(let i = 0; i < res.length; i++) {
            if(count === 0 && !words.includes(res[i])) {
                words.push(res[i])
                word = res[i]
                count++;
            }
            else if (count > 0 && word.includes(res[i])) count++
        }
        if(count !== 0) result.push({word: word, countWord: count})
        count = 0;
    }

    return result.sort((a, b) => b.countWord - a.countWord)[0].word
  };
    
 

  /**
   * Start test cases
   * DO NOT EDIT
   */
  expect(
    mostPopularWord('dog, cat, lizard, cat, dog, dog, cat, cat, cat'),
  ).to.equal('cat');
  expect(
    mostPopularWord('John and Marry work together for last few years. John as designer and Marry as his manager. On Friday John is going to be promoted.'),
  ).to.equal('John');
  /**
   * End test cases
   */
})();
