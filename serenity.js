(function() {
  var bpm = 80,
      beatMs = 60000 / bpm,
      headline,
      articleUrl;

  //
  // Get the Daily Mail front page headline + description from RSS
  //
  var queryMailHeadline = function queryMailHeadline() {
    var request = new XMLHttpRequest(),
        query = 'http://query.yahooapis.com/v1/public/yql?q=' +
                'select * from rss ' +
                'where url="http://www.dailymail.co.uk/news/index.rss" ' +
                'limit 1' + 
                '&format=json';
    request.open('GET', query, true);

    request.onload = function() {
      var article, hEl, aEl, body;

      if (request.status >= 200 && request.status < 400){
        article = JSON.parse(request.responseText)
          .query.results.item;
          
        headline = article.title.trim();
        articleUrl = article.link.trim();

        hEl = document.createElement('h1');
        hEl.innerHTML =
          '<span>'+ headline.split('').join('</span><span>') + '</span>';
        aEl = document.createElement('a');
        aEl.innerHTML = 'Find more misery here...';
        aEl.href = articleUrl;

        body = document.querySelector('article');
        body.innerHTML = '';
        body.appendChild(hEl);
        body.appendChild(aEl);

        dancingLights();
      } else {
        document.querySelector('article')
          .innerHTML = 'The YQL server returned an error';
      }
    };
    request.onerror = function() {
      document.querySelector('article')
        .innerHTML = 'There was an error performing the YQL request';
    };

    request.send();
  };


  //
  // One by one, momentarily highlight a char in the headline
  //
  var dancingLights = function dancingLights() {
    var i = 0,
        ele = document.querySelector('h1');

    setInterval(function() {
      ele.children[i].className = 'highlight';

      var x = i;
      setTimeout(function() { ele.children[x].className = ''; }, beatMs * 2);

      i = ++i % headline.length;
    }, beatMs);
  };

  queryMailHeadline();
}());
