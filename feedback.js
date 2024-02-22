// 1) Aggiungo evento per far illuminare le stelle al click dell'utente su di esse in base al suo feedback !

const stars = document.querySelectorAll(".fas.fa-star"); // orso polare dead
//seleziona tutti gli elementi HTML che hanno le classi "fas" e "fa-star"
// quindi le stelle
stars.forEach((star, index) => {
  // itera tutte le stelle
  star.addEventListener("click", function () {
    // Rimuovi la classe "clicked" da tutte le stelle
    stars.forEach((star, i) => {
      if (i <= index) {
        // se i è minore o uguale a index
        // parte l'evento "clicked"
        star.classList.add("clicked");
      } else {
        star.classList.remove("clicked");
      }
    });
  });
});

const getTheLink = function () {
  const myButton = document.getElementById("button");
  myButton.addEventListener("mouseover", function () {
    myButton.setAttribute("title", "Visita http://epicode.com"); // mi fa comparire un piccolo titoletto al mouseover sul button!
  });
  myButton.addEventListener("click", function () {
    window.open("http://epicode.com", "_blank"); // il metodo open, con il parametro _blank, apre una NUOVA pagina al click!
    // myButton.setAttribute("href", "https://epicode.com");
  });
};
getTheLink();
