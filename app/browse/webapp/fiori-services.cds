using CatalogService from '../../../srv/cat-service';

annotate CatalogService.Books with @(UI : {
  HeaderInfo  : {
      TypeName : 'Книга',
      TypeNamePlural : 'Книги',
  },
  LineItem  : [
    {
        Value: title,
        Label: 'Название'
    },
    {
        Value: descr,
        ![@UI.Hidden]
    },
    {Value: genre},
    {Value: author},

    {
      $Type  : 'UI.DataFieldForAnnotation',
      Target : '@UI.DataPoint#rating',
      Label  : '{i18n>Rating}'
    },
  
  ],
  SelectionFields       : [
    author,
    genre
  ],
  PresentationVariant  : 
  {
      Text : 'Default',
      SortOrder: [{Property : title}],
      Visualizations : ['@UI.LineItem']
      
  },
  DataPoint #rating   : {
    Value         : rating,
    Visualization : #Rating,
    TargetValue   : 5
  },
  
  
})
{
    @UI.HiddenFilter
    descr;
    currency;
    @Measures.ISOCurrency : currency.code
    price
};

annotate CatalogService.Books actions {
  addReview(rating @title : 'Оценка', title @title : 'Рецензия', text @title : 'Текст')
}
