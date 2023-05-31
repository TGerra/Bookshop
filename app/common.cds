using { bookshop as bookshop } from '../db/index';

annotate bookshop.Books with {
  author @title : 'Автор';
  genre  @title : 'Жанр';
  price @title : 'Цена';
  
 
  
}