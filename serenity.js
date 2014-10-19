(function() {
  var queryMailHeadline = function queryMailHeadline() {
    var request = new XMLHttpRequest(),
        query = 'http://query.yahooapis.com/v1/public/yql?q=' +
                'select title from rss ' +
                'where url="http://www.dailymail.co.uk/home/index.rss" ' +
                'limit 1' + 
                '&format=json';
    request.open('GET', query, true);

    request.onload = function() {
      var headline;

      if (request.status >= 200 && request.status < 400){
        headline = JSON.parse(request.responseText)
          .query.results.item.title.trim();

        document.querySelector('body').innerHTML = headline;


      } else {
        document.querySelector('body')
          .innerHTML = 'The YQL server returned an error';
      }
    };

    request.onerror = function() {
      document.querySelector('body')
        .innerHTML = 'There was an error performing the YQL request';
    };

    request.send();
  };

  queryMailHeadline();
}());
