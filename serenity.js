(function() {
  var headline,
      description,
      articleUrl;

  var queryMailHeadline = function queryMailHeadline() {
    var request = new XMLHttpRequest(),
        query = 'http://query.yahooapis.com/v1/public/yql?q=' +
                'select * from rss ' +
                'where url="http://www.dailymail.co.uk/home/index.rss" ' +
                'limit 1' + 
                '&format=json';
    request.open('GET', query, true);

    request.onload = function() {
      var article, hEl, pEl, aEl, body;

      if (request.status >= 200 && request.status < 400){
        article = JSON.parse(request.responseText)
          .query.results.item;
          
        headline = article.title.trim();
        description = article.description.join('').trim();
        articleUrl = article.link.trim();

        hEl = document.createElement('h1');
        hEl.innerHTML = headline;
        pEl = document.createElement('p');
        pEl.innerHTML = description;
        aEl = document.createElement('a');
        aEl.innerHTML = 'Go here to get more depressed';
        aEl.href = articleUrl;

        body = document.querySelector('body');
        body.innerHTML = '';
        body.appendChild(hEl);
        body.appendChild(pEl);
        body.appendChild(aEl);

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
