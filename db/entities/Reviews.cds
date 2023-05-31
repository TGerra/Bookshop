namespace bookshop;
using { bookshop as bookshop } from '../index';

using {cuid, managed} from '@sap/cds/common';

entity Reviews: cuid, managed {
    book    : Association to bookshop.Books;
    rating  : bookshop.Rating       @mandatory;
    title   : bookshop.Name         @mandatory;
    text    : bookshop.Text         @mandatory;

}
