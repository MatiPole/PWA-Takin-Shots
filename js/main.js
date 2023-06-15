window.addEventListener("DOMContentLoaded", function () {
  //SERVICE WORKER
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js")
      .then((res) => console.log("SW. Se registro correctamente"))
      .catch((err) => console.log("SW. No se pudo registrar"));
  }
  //INSTALAR APP
  let eventInstall;
  let btnInstall = document.querySelector(".btnInstall");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    eventInstall = e;
    ShowInstallButton();
  });

  let ShowInstallButton = () => {
    if (btnInstall != undefined) {
      btnInstall.style.display = "inline-block";
      btnInstall.addEventListener("click", InstallApp);
    }
  };

  let InstallApp = () => {
    if (eventInstall) {
      eventInstall.prompt();
      eventInstall.userChoice.then((res) => {
        if (res.outcome == "accepted") {
          console.log("El usuario acepto instalar la app");
          btnInstall.style.display = "none";
        } else {
          console.log("El usuario no acepto instalar la app");
        }
      });
    }
  };

  // COMPARTIR APP
  let btnShare = document.querySelector(".btnShare");
  if (btnShare != undefined) {
    console.log("test");
    if (navigator.share) {
      btnShare.addEventListener("click", (e) => {
        let dataShare = {
          title: "Takin' Shots",
          text: "Cocktail Searcher Takin Shots",
          url: "http://localhost/pwa-parcial-1-dwn3ap-poletto-matias/index.html",
        };
        navigator.share(dataShare).then((res) => {
          console.log("compartir la app");
        });
      });
    } else {
      console.log("no es compatible");
      btnShare.style.display = "none";
    }
  }

  // TRAER API
  const form = document.querySelector("#search-form");
  const buttonSearch = document.querySelector("#search");
  const cocktailList = document.querySelector("#cocktail-list");
  const welcome = document.querySelector("#welcome");
  const wishlist =
    JSON.parse(localStorage.getItem("wishlist")) ||
    []; /*array para guardar los favoritos en localStorage */

  buttonSearch.addEventListener("click", function (event) {
    /* EVENTO PARA QUE EL BOTÓN SEARCH LLAME LA API */
    event.preventDefault();
    const ingredient =
      form.elements.ingredient.value; /* TRAE EL VALUE DE LA OPCIÓN ELEGIDA */
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`; /* ESE VALUE CONTIENE EL ID EL CUAL PONE EN LA URL PARA TRAER DE LA API LOS QUE COINCIDAN */
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        welcome.style.display = "none"; /* oculta el texto del home */
        cocktailList.innerHTML = "";
        const drinks = data.drinks.slice(0, 10); // LIMITA A LOS PRIMEROS 10 RESULTADOS PARA QUE NO SEA TAN EXTENSO
        drinks.forEach(function (drink) {
          /* recorre el array trayendo todos los tragos que se preparan con ese ingrediente*/ const cocktailElement = `
          <div class="cocktail">
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <h2>${drink.strDrink}</h2>
            <button class="btn-ver-mas" data-id="${drink.idDrink}">View More</button>
          </div>
        `;
          cocktailList.innerHTML += cocktailElement;
        });

        const buttons =
          document.querySelectorAll(
            "[data-id]"
          ); /* trae el id del trago seleccionado*/
        buttons.forEach(function (button) {
          button.addEventListener("click", function () {
            welcome.style.display = "none";
            const id = this.getAttribute("data-id");
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`; /* trae la info del trago elegido*/

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
                <button id="button-favorito">Add Wishlist</button>
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
                if (cocktailList.classList.contains("cocktail-list")) {
                  // Si se estaba mostrando la lista de cócteles, cambia a la vista de cóctel individual
                  cocktailList.classList.remove("cocktail-list");
                  cocktailList.classList.add("cocktail-single");
                }
                cocktailList.innerHTML = cocktailElement;
                let favorito = document.getElementById("button-favorito");
                favorito.addEventListener("click", function () {
                  /*funcion para guardar los favoritos en localStorage */ wishlist.push(
                    url
                  );
                  localStorage.setItem("wishlist", JSON.stringify(wishlist));
                  console.log(wishlist);
                });
              });
          });
        });
        if (cocktailList.classList.contains("cocktail-single")) {
          // Si se estaba mostrando un cóctel individual, cambia a la vista de lista de cócteles
          cocktailList.classList.remove("cocktail-single");
          cocktailList.classList.add("cocktail-list");
          welcome.style.display = "none";
        }
      });
  });
});
