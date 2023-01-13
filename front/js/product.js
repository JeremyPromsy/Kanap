let url = window.location.href;
let urlObject = new URL(url);
let id = urlObject.searchParams.get("id");
//console.log(id);

url = "http://localhost:3000/api/products/" + id;

function produit(url) {
    fetch(url)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (article) {
        produitPage(
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
produit(url);

  
function produitPage(imageUrl, imageAlt, name, price, description, colors) {

    document.title = name;

    document.getElementsByClassName("item__img");
    document.createElement("img");

    document.getElementById("title").textContent = name;

    document.getElementById("price").textContent = price;

    document.getElementById("description").textContent = description;

    document.getElementById("colors").textContent = colors;
  
}






