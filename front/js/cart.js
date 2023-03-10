let productLocalStorage = localStorage.getItem("panier");
let objJson = JSON.parse(productLocalStorage);

function affichagePanier(url, quantity, color) {
    fetch(url)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (articles) {
        createPanierArticle(
          articles._id,
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
    if(objJson != null) {
    for (let article of objJson) {
      var url = "http://localhost:3000/api/products/" + article.id;
      affichagePanier(url, article.quantity, article.colors);
    }
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
    let input = document.createElement("input");
    input.type = "number";
    input.classList.add("itemQuantity");
    input.name = "itemQuantity";
    input.min = 1;
    input.max = 100;
    input.value = quantity;
    cart__item__content__settings__quantity.append(input);

    // ajout de la suppression
    let cart__item__content__settings__delete = document.createElement("div");
    cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");
    cart__item__content__settings.append(cart__item__content__settings__delete);

    // ajout du boutton supprimer
    let delete_btn = document.createElement("p");
    delete_btn.textContent = "Supprimer";
    delete_btn.classList.add("deleteItem");
    cart__item__content__settings__delete.append(delete_btn);

    supprimerArticle ()
    modifyQuantity()
    getTotalPanier()
}  

function getTotalPanier() {
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


function supprimerArticle () {
   let deleteBoutons = document.getElementsByClassName("cart__item__content__settings__delete");
    for (let deleteBouton of deleteBoutons) {
      deleteBouton.addEventListener("click", function(event){

        let closestId = event.target.closest('article').getAttribute("data-id")
        let closestColor = event.target.closest('article').getAttribute("data-color")
        console.log(closestId)
        console.log(closestColor)
        
        objJson = objJson.filter(
        (element) => element.id != closestId || element.colors != closestColor
        )

          localStorage.setItem("panier", JSON.stringify(objJson));  
          deleteBouton.closest("article").remove();
          location.reload();

          getTotalPanier()
    });
  }
}

function modifyQuantity() {
  const modifQuantity = document.querySelectorAll(".itemQuantity");
  for (let i = 0; i < modifQuantity.length; i++) {
    modifQuantity[i].addEventListener("change", function (event) {
      event.preventDefault();

      objJson[i].quantity = event.target.value;
      console.log(objJson[i].quantity)

      if (objJson[i].quantity > 100 || objJson[i].quantity <= 0
        ) {
          alert('Merci de sélectionner une quantité comprise entre 1 et 100');
          location.reload();

        } else {
          localStorage.setItem("panier", JSON.stringify(objJson));
          getTotalPanier();        
        }
      });
    }
  }

var firstNameValid = false;
var lastNameValid = false;
var addressValid = false;
var cityValid = false;
var emailValid = false;

function fillingForm () {
  let form = document.querySelector(".cart__order__form");
  let RegExpText = /^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$/;
  let RegExpAdress = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
  let RegExpEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

  form.firstName.addEventListener("change", function () {
    if (form.firstName.value.match(RegExpText)) {
      document.getElementById("firstNameErrorMsg").textContent = "";
      firstNameValid = true;
    } else {
      document.getElementById("firstNameErrorMsg").textContent =
        "Type de saisie incorrecte";
      firstNameValid = false;
    }
  });

  form.lastName.addEventListener("change", function () {
    if (form.lastName.value.match(RegExpText)) {
      document.getElementById("lastNameErrorMsg").textContent = "";
      lastNameValid = true;
    } else {
      document.getElementById("lastNameErrorMsg").textContent =
        "Type de saisie incorrecte";
      lastNameValid = false;
    }
  });

  form.address.addEventListener("change", function () {
    if (form.address.value.match(RegExpAdress)) {
      document.getElementById("addressErrorMsg").textContent = "";
      addressValid = true;
    } else {
      document.getElementById("addressErrorMsg").textContent =
        "Type de saisie incorrecte";
      addressValid = false;
    }
  });

  form.city.addEventListener("change", function () {
    if (form.city.value.match(RegExpText)) {
      document.getElementById("cityErrorMsg").textContent = "";
      cityValid = true;
    } else {
      document.getElementById("cityErrorMsg").textContent =
        "Type de saisie incorrecte";
      cityValid = false;
    }
  });

  form.email.addEventListener("change", function () {
    if (form.email.value.match(RegExpEmail)) {
      document.getElementById("emailErrorMsg").textContent = "";
      emailValid = true;
    } else {
      document.getElementById("emailErrorMsg").textContent =
        "Type de saisie incorrecte";
      emailValid = false;
    }
  });
}
fillingForm();

function actionCommander (){
        const inputFirstName = document.getElementById("firstName");
        const inputLastName = document.getElementById("lastName");
        const inputAdress = document.getElementById("address");
        const inputCity = document.getElementById("city");
        const inputMail = document.getElementById("email");

        let idProducts = [];
        for (j = 0; j < objJson.length; j++) {
          idProducts.push(objJson[j].id)};
        console.log((idProducts));

        const order = {
          contact : {
              firstName: inputFirstName.value,
              lastName: inputLastName.value,
              address: inputAdress.value,
              city: inputCity.value,
              email: inputMail.value,
          },
          products: idProducts,
      } 

        const options = {
          method: 'POST',
          body: JSON.stringify(order),
          headers: {
            'Accept': 'application/json', 
            "Content-Type": "application/json" 
          },
      };

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html?id=" + data.orderId;
        })
        .catch(function (erreur) {
          console.log(erreur);
        });
}

function commander () {
    const boutonCommander = document.getElementById("order");

    boutonCommander.addEventListener("click", (e) => {
        e.preventDefault();

          if (
            firstNameValid == true &&
            lastNameValid == true &&
            addressValid == true &&
            cityValid == true &&
            emailValid == true &&
            objJson != null
          ) {
            console.log("formulaire complet");
            actionCommander()
          } else {
            alert("Votre formulaire est incomplet ou votre panier est vide");
          }        
        })
  }
commander();