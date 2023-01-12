var newUrl = window.location.href;
var newUrl = new URL(actualUrl);
var id = newUrl.searchParams.get("id");
//console.log(id);

url = "http://localhost:3000/api/products/" + id;

function ajax(url) {
    fetch(url)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (article) {
        createArticlePage(
          article.imageUrl,
          article.altTxt,
          article.name,
          article.price,
          article.description,
          article.colors
        );
      })
      .catch((error) => {
        console.error('Error:', error);
    })
  }
  ajax(url);

  