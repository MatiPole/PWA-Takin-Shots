const wishlistList = document.querySelector("#wishlist-list");
const wishlistButton = document.getElementById("wishlist");
const clearWishlist = document.querySelector("#clearWishlist");
const wishlistStorage = localStorage.getItem("wishlist");
const wishlistArray = JSON.parse(wishlistStorage);
const wishlistPageButton = document.querySelector(".wishlistPageButton");

function showWishlist() {
  wishlistList.innerHTML = "";
  wishlistArray.forEach((url) => {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const cocktailElement = `
          <div class="cocktail">
            <img src="${data.drinks[0].strDrinkThumb}" alt="${data.drinks[0].strDrink}">
            <h2>${data.drinks[0].strDrink}</h2>
                        <button class="btn-ver-mas" data-id="${data.drinks[0].idDrink}">View More</button>
          </div>
        `;
        wishlistList.innerHTML += cocktailElement;

        const buttons = document.querySelectorAll("[data-id]");
        buttons.forEach(function (button) {
          button.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
            wishlistPageButton.style.display = "block";
            fetch(url)
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                const cocktail = data.drinks[0];
                const cocktailElement = `
                <div class="cocktail">
                  <img src="${cocktail.strDrinkThumb}" alt="${
                  cocktail.strDrink
                }">
                  <h2>${cocktail.strDrink}</h2>
                  <div class="ingredientes-instrucciones">
                  <div class="container-ingredientes">
                   <h3>Ingredients:</h3>
                  <ul>
                    ${
                      cocktail.strIngredient1
                        ? `<li>${cocktail.strIngredient1}</li>`
                        : ""
                    }
                    ${
                      cocktail.strIngredient2
                        ? `<li>${cocktail.strIngredient2}</li>`
                        : ""
                    }
                    ${
                      cocktail.strIngredient3
                        ? `<li>${cocktail.strIngredient3}</li>`
                        : ""
                    }
                    ${
                      cocktail.strIngredient4
                        ? `<li>${cocktail.strIngredient4}</li>`
                        : ""
                    }
                    ${
                      cocktail.strIngredient5
                        ? `<li>${cocktail.strIngredient5}</li>`
                        : ""
                    }
                    ${
                      cocktail.strIngredient6
                        ? `<li>${cocktail.strIngredient6}</li>`
                        : ""
                    }
                    ${
                      cocktail.strIngredient7
                        ? `<li>${cocktail.strIngredient7}</li>`
                        : ""
                    }
                    ${
                      cocktail.strIngredient8
                        ? `<li>${cocktail.strIngredient8}</li>`
                        : ""
                    }
                    ${
                      cocktail.strIngredient9
                        ? `<li>${cocktail.strIngredient9}</li>`
                        : ""
                    }
                    ${
                      cocktail.strIngredient10
                        ? `<li>${cocktail.strIngredient10}</li>`
                        : ""
                    }
                    ${
                      cocktail.strIngredient11
                        ? `<li>${cocktail.strIngredient11}</li>`
                        : ""
                    }
                    ${
                      cocktail.strIngredient12
                        ? `<li>${cocktail.strIngredient12}</li>`
                        : ""
                    }
                    ${
                      cocktail.strIngredient13
                        ? `<li>${cocktail.strIngredient13}</li>`
                        : ""
                    }
                    ${
                      cocktail.strIngredient14
                        ? `<li>${cocktail.strIngredient14}</li>`
                        : ""
                    }
                    ${
                      cocktail.strIngredient15
                        ? `<li>${cocktail.strIngredient15}</li>`
                        : ""
                    }
                  </ul> 
                  </div>
                  <div class="container-instrucciones">
                  <h3>Instructions:</h3>
                  <p>${cocktail.strInstructions}</p>
                  </div>
                  </div>
                </div> `;
                wishlistList.innerHTML = cocktailElement;
                if (wishlistList.classList.contains("cocktail-list")) {
                  // Si se estaba mostrando la lista de cócteles, cambia a la vista de cóctel individual
                  wishlistList.classList.remove("cocktail-list");
                  wishlistList.classList.add("cocktail-single");
                }
              });
          });
        });
        if (wishlistList.classList.contains("cocktail-single")) {
          // Si se estaba mostrando un cóctel individual, cambia a la vista de lista de cócteles
          wishlistList.classList.remove("cocktail-single");
          wishlistList.classList.add("cocktail-list");
        }
      });
  });
}

wishlistButton.addEventListener("click", function () {
  showWishlist(); // llama la función para mostrar la lista de deseos al hacer clic en el botón
  wishlistPageButton.style.display = "none";
});

clearWishlist.addEventListener("click", function () {
  //funcion para limpiar el localStorage
  localStorage.clear();
  window.location.href = "index.html"; //devuelve al usuario al home
});
document.addEventListener("DOMContentLoaded", function () {
  showWishlist(); // llama la función para mostrar la lista de deseos al cargar la página
  wishlistPageButton.style.display = "none";
});
