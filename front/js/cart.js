function affichagePanier(url, quantity, color) {
    fetch(url)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (articles) {
        createPanierArticle(
          articles.id,
          articles.imageUrl,
          articles.altTxt,
          articles.name,
          color,
          articles.price,
          quantity
        );
      })
      .catch(function (erreur) {
        console.log(erreur);
      });
  }

  function analysePanier() {
    let productLocalStorage = localStorage.getItem("panier");
    let objJson = JSON.parse(productLocalStorage);

    for (let article of objJson) {
      var url = "http://localhost:3000/api/products/" + article.id;
      affichagePanier(url, article.quantity, article.colors);
    }
  }
  analysePanier();


  function createPanierArticle(id, imgSrc, imgAlt, name, color, price, quantity) {
    let cart__items = document.getElementById("cart__items");
  
    // création de l'article
    let articlePanier = document.createElement("article");
    articlePanier.classList.add("cart__item");
    articlePanier.dataset.id = id;
    articlePanier.dataset.color = color;
    cart__items.append(articlePanier);
  
    // création de la div img
    let cart__item__img = document.createElement("div");
    cart__item__img.classList.add("cart__item__img");
    articlePanier.append(cart__item__img);
  
    let img_cart__item__img = document.createElement("img");
    img_cart__item__img.src = imgSrc;
    img_cart__item__img.alt = imgAlt;
    cart__item__img.append(img_cart__item__img);
  
    // création de la div description 
    let cart__item__content = document.createElement("div");
    cart__item__content.classList.add("cart__item__content");
    articlePanier.append(cart__item__content);

    let cart__item__content__description = document.createElement("div");
    cart__item__content__description.classList.add("cart__item__content__description");
    cart__item__content.append(cart__item__content__description);

    let content__description_titre = document.createElement("h2");
    content__description_titre.textContent = name;
    cart__item__content__description.append(content__description_titre);
  
    // couleur du produit
    let content__description_color = document.createElement("p");
    content__description_color.textContent = color;
    cart__item__content__description.append(content__description_color);
  
    // prix du produit
    let content__description_price = document.createElement("p");
    content__description_price.textContent = price + " €";
    cart__item__content__description.append(content__description_price);
  
    // création de la content settings
    let cart__item__content__settings = document.createElement("div");
    cart__item__content__settings.classList.add("cart__item__content__settings");
    cart__item__content.append(cart__item__content__settings);
  
    // création de la quantity
    let cart__item__content__settings__quantity = document.createElement("div");
    cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity");
    cart__item__content__settings.append(cart__item__content__settings__quantity);
  
    // ajout du paragraphe la quantité
    let content__description_quantity = document.createElement("p");
    content__description_quantity.textContent = "Qté :";
    cart__item__content__settings__quantity.append(content__description_quantity);
  
    // ajout de la quantité
    let content__description_quantity_input = document.createElement("input");
    content__description_quantity_input.type = "number";
    content__description_quantity_input.classList.add("itemQuantity");
    content__description_quantity_input.name = "itemQuantity";
    content__description_quantity_input.min = 1;
    content__description_quantity_input.max = 100;
    content__description_quantity_input.value = quantity;
    cart__item__content__settings__quantity.append(content__description_quantity_input);

    // ajout de la suppression
    let cart__item__content__settings__delete = document.createElement("div");
    cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");
    cart__item__content__settings.append(cart__item__content__settings__delete);

    // ajout du boutton supprimer
    let delete_btn = document.createElement("p");
    delete_btn.textContent = "Supprimer";
    delete_btn.classList.add("deleteItem");
    cart__item__content__settings__delete.append(delete_btn);
}  


  
function getTotalPanier() {
    let productLocalStorage = localStorage.getItem("panier");
    let objJson = JSON.parse(productLocalStorage);
    let totalPrice = 0;
    let quantity = 0;

    for (let article of objJson) {
      quantity = parseInt(quantity) + parseInt(article.quantity);
  
      let urlPanier = "http://localhost:3000/api/products/" + article.id;
  
      fetch(urlPanier)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
        })
        .then(function (data) {
          totalPrice = totalPrice + article.quantity * data.price;
          document.getElementById("totalPrice").innerText = totalPrice;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    document.getElementById("totalQuantity").innerText = quantity;
  }
  getTotalPanier();


function modifyQuantity() {
    var boutonsQuantity = document.getElementsByClassName("itemQuantity");
    boutonsQuantity.forEach((quantity) => {
        quantity.addEventListener("change", (event) => {
          event.preventDefault();

        let productLocalStorage = localStorage.getItem("panier");
        let objJson = JSON.parse(productLocalStorage);

        let closestId = event.target.closest('article').getAttribute("data-id");
        let closestColor = event.target.closest('article').getAttribute("data-color");
        
        let Product = objJson.findIndex(
          element => element.id == closestId && element.color == closestColor
          );

        objJson[Product].quantity = event.target.value;

        localStorage.setItem("panier", JSON.stringify(objJson));

        getTotalPanier();
      });
    })
  }

function supprimerArticle () {
    var deleteBoutons = document.getElementsByClassName("cart__item__content__settings__delete");
    deleteBoutons.forEach((deleteBouton) => {
      deleteBouton.addEventListener("click", (event) => {
        event.preventDefault();

        let productLocalStorage = localStorage.getItem("panier");
        let objJson = JSON.parse(productLocalStorage);

        let closestId = event.target.closest('article').getAttribute("data-id");
        let closestColor = event.target.closest('article').getAttribute("data-color");
  
        objJson = objJson.filter(
          (element) => element.id != closestId.id || element.color != closestColor.color
          );
  
          deleteBouton.closest("article").remove();

          localStorage.setItem("panier", JSON.stringify(objJson));

          getTotalPanier()
      });
    }); 
  }


