document.addEventListener("DOMContentLoaded", function () {
  // Recupera i dati del quiz dal localStorage o da un'altra fonte
  const punteggioQuiz = localStorage.getItem("punteggioQuiz");
  const numeroDomande = localStorage.getItem("numeroDomande");
  const risposteUtente = localStorage.getItem("risposteUtente");

  // Calcola la percentuale di risposte corrette e sbagliate
  const risposteCorrette = parseInt(punteggioQuiz);
  const punteggioUtente = JSON.parse(risposteUtente); // Assume che risposteUtente sia una stringa JSON

  // Calcola le risposte sbagliate
  const risposteSbagliate = parseInt(numeroDomande) - risposteCorrette; // Assumendo che risposteCorrette sia un array di risposte

  // Imposta i dati per il grafico
  const dati = {
    datasets: [
      {
        data: [risposteCorrette, risposteSbagliate],
        backgroundColor: ["#00FFFF", "#D20094"],
        // Aggiungi le etichette direttamente alle fette del grafico
        labels: [
          `Correct: ${risposteCorrette}`,
          `Incorrect: ${risposteSbagliate}`,

          // "Correct: " + risposteCorrette,
          //"Incorrect: " + risposteSbagliate,
        ],
      },
    ],
  };

  const opzioni = {
    responsive: true,
    cutout: 95,
    elements: {
      arc: { borderWidth: 0 },
    },
    /////
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          return ctx.chart.data.labels[ctx.dataIndex];
        },
        color: "#fff", // Colore del testo dell'etichetta
      },
    },
    /////
  };

  const divGrafico = document.getElementById("grafico");
  const ctx = divGrafico.getContext("2d");

  const donutChart = new Chart(ctx, {
    type: "doughnut",
    data: dati,
    options: opzioni,
  });

  // Recupera gli elementi del DOM per visualizzare i risultati
  const percentualeBlu = document.getElementById("percentuale-blu");
  const percentualeFuxia = document.getElementById("percentuale-fuxia");
  const numeroRisposteCorretteElement = document.getElementById(
    "numero-risposte-corrette"
  );
  const numeroRisposteSbagliateElement = document.getElementById(
    "numero-risposte-sbagliate"
  );
  const messaggioCentrale = document.getElementById("testo-centrale");

  // Mostra i risultati nel DOM
  percentualeBlu.innerText = `${risposteCorrette}/${numeroDomande}`;
  percentualeFuxia.innerText = `${risposteSbagliate}/${numeroDomande}`;
  numeroRisposteCorretteElement.innerText = `${risposteCorrette}/${numeroDomande} questions`;
  numeroRisposteSbagliateElement.innerText = `${risposteSbagliate}/${numeroDomande} questions`;

  const percentualeRisposteCorrette = (risposteCorrette / numeroDomande) * 100;
  console.log("Percentuale di risposte corrette:", percentualeRisposteCorrette);
  if (percentualeRisposteCorrette > 60) {
    messaggioCentrale.style.display = "block";
    messaggioCentrale.innerText = "Congratulations! You passed the quiz!";
  } else {
    messaggioCentrale.style.display = "block";
    messaggioCentrale.innerText =
      "Oh no! You didn't pass the quiz... Try again!";
  }
});

/*document.addEventListener("DOMContentLoaded", function () {
  // Recupera i dati del quiz dal localStorage o da un'altra fonte
  const punteggioQuiz = localStorage.getItem("punteggioQuiz");
  const numeroDomande = localStorage.getItem("numeroDomande");
  const risposteUtente = localStorage.getItem("risposteUtente");

  // Calcola la percentuale di risposte corrette e sbagliate
  const risposteCorrette = parseInt(punteggioQuiz);
  const punteggioUtente = JSON.parse(risposteUtente); // Assume che risposteUtente sia una stringa JSON

  // Calcola le risposte sbagliate
  const risposteSbagliate = parseInt(numeroDomande) - risposteCorrette; // Assumendo che risposteCorrette sia un array di risposte

  // Imposta i dati per il grafico
  const dati = {
    datasets: [
      {
        data: [risposteCorrette, risposteSbagliate],
        backgroundColor: ["#00FFFF", "#D20094"],
      },
    ],
  };

  const opzioni = {
    responsive: true,
    cutout: 95,
    elements: {
      arc: { borderWidth: 0 },
    },
  };

  const divGrafico = document.getElementById("grafico");
  const ctx = divGrafico.getContext("2d");

  const donutChart = new Chart(ctx, {
    type: "doughnut",
    data: dati,
    options: opzioni,
  });
 ///////////////////// const impostaTestoCiambella = (testo) => {
    // Aggiorniamo il dataset per la ciambella con un valore fisso
    donutChart.data.datasets[0].data = [1]; // Valorizza con un numero fisso
    donutChart.data.labels = [testo]; // Imposta il testo nella ciambella
    donutChart.update(); // Aggiorna il grafico
  };/////////////////////
  // Recupera gli elementi del DOM per visualizzare i risultati
  const percentualeBlu = document.getElementById("percentuale-blu");
  const percentualeFuxia = document.getElementById("percentuale-fuxia");
  const numeroRisposteCorretteElement = document.getElementById(
    "numero-risposte-corrette"
  );
  const numeroRisposteSbagliateElement = document.getElementById(
    "numero-risposte-sbagliate"
  );
  const messaggioCentrale = document.getElementById("testo-centrale");

  // Mostra i risultati nel DOM
  percentualeBlu.innerText = `${risposteCorrette}/${numeroDomande}`;
  percentualeFuxia.innerText = `${risposteSbagliate}/${numeroDomande}`;
  numeroRisposteCorretteElement.innerText = `${risposteCorrette}/${numeroDomande} questions`;
  numeroRisposteSbagliateElement.innerText = `${risposteSbagliate}/${numeroDomande} questions`;

  const percentualeRisposteCorrette = (risposteCorrette / numeroDomande) * 100;
  if (percentualeRisposteCorrette > 60) {
    messaggioCentrale.innerText = "Congratulations! You passed the quiz!";
    impostaTestoCiambella("Congratulations!"); // Imposta il testo "Congratulations!" nella ciambella
  } else {
    messaggioCentrale.innerText = "Oh no! You didn't pass the quiz... Try again!";
    impostaTestoCiambella("Try again!"); // Imposta il testo "Try again!" nella ciambella
  }
*/
// Mostra un messaggio basato sulla percentuale di risposte corrette
/*const percentualeRisposteCorrette = (risposteCorrette / numeroDomande) * 100;
  if (percentualeRisposteCorrette > 60) {
    messaggioCentrale.innerText = "Congratulations! You passed the quiz!";
  } else {
    messaggioCentrale.innerText =
      "Oh no! You didn't pass the quiz... Try again!";
  }
});*/
//});
//let correctAnswers = 0; // Dichiarazione e inizializzazione di correctAnswers

//let incorrectAnswers = 0;
/*document.addEventListener("DOMContentLoaded", function () {
  const dati = {
    datasets: [
      {
        data: [25, 75], // Valori di esempio
        backgroundColor: ["#00FFFF", "#D20094"],
      },
    ],
  };

  const opzioni = {
    responsive: true,
    cutout: 95,
    elements: {
      arc: { borderWidth: 0 },
    },
  };

  const divGrafico = document.getElementById("grafico");
  const ctx = divGrafico.getContext("2d");

  const donutChart = new Chart(ctx, {
    type: "doughnut",
    data: dati,
    options: opzioni,
  });

  const percentualeBlu = document.getElementById("percentuale-blu");
  const percentualeFuxia = document.getElementById("percentuale-fuxia");

  // Supponiamo che tu abbia ottenuto il punteggio corretto e sbagliato dal quiz
  const risposteCorrette = 22; // Sostituisci con il punteggio corretto ottenuto
  const risposteSbagliate = 8; // Sostituisci con il punteggio sbagliato ottenuto

  const totaleDomande = risposteCorrette + risposteSbagliate;
  const percentualeRisposteCorrette = (risposteCorrette / totaleDomande) * 100;
  const percentualeRisposteSbagliate =
    (risposteSbagliate / totaleDomande) * 100;

  dati.datasets[0].data = [
    percentualeRisposteCorrette,
    percentualeRisposteSbagliate,
  ];
  donutChart.update();

  percentualeBlu.innerText = percentualeRisposteCorrette.toFixed(2) + "%";
  percentualeFuxia.innerText = percentualeRisposteSbagliate.toFixed(2) + "%";

  const messaggioCentrale = document.getElementById("testo-centrale");
  if (percentualeRisposteCorrette > 60) {
    messaggioCentrale.style.display = "block";
    messaggioCentrale.innerHTML = `
      <p>Congratulations!</p>
      <span id="grassetto">You passed the exam.</span>
      <p id="description">
        We'll send you the certificate in few minutes. Check your email (including promotions/spam folder).
      </p>`;
  } else {
    messaggioCentrale.style.display = "block";
    messaggioCentrale.innerHTML = `
      <p>Oh no! You didn't pass the exam...</p>
      <p>You'll have to work harder and retake it!</p>`;
  }
  const urlPaginaCorrente = window.location.href;
  console.log(urlPaginaCorrente);
*/
// vado da WENDY:
const rateUsButton = document.getElementById("button");
rateUsButton.addEventListener("click", function () {
  window.location.href = "./feedback.html";
});
//});
