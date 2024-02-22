/*document.addEventListener("DOMContentLoaded", function () {
  const dati = {
    datasets: [
      {
        data: [25, 75],
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

  // Recupera le percentuali e aggiornale nel DOM
  const percentualeBlu = document.getElementById("percentuale-blu");
  const percentualeFuxia = document.getElementById("percentuale-fuxia");

  const numeroRisposteCorrette = document.getElementById(
    "numero-risposte-corrette"
  );
  const numeroRisposteSbagliate = document.getElementById(
    "numero-risposte-sbagliate"
  );
  const messaggioCentrale = document.getElementById("testo-centrale");

  percentualeBlu.innerText = dati.datasets[0].data[0];
  percentualeFuxia.innerText = dati.datasets[0].data[1];

  const risposteCorrette = 25;
  const risposteSbagliate = 5;
  numeroRisposteCorrette.innerText = `${risposteCorrette}/30 questions`;
  numeroRisposteSbagliate.innerText = `${risposteSbagliate}/30 questions`;

  const percentualeRisposteCorrette = dati.datasets[0].data[0];
  if (percentualeRisposteCorrette > 60) {
    messaggioCentrale.style.display = "block";
  } else {
    messaggioCentrale.style.display = "block";
    messaggioCentrale.innerText =
      "Oh no! You didn't pass the exam... you'll have to work harder and retake it!";
  }
});*/

document.addEventListener("DOMContentLoaded", function () {
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

  // vado da WENDY:
  const rateUsButton = document.getElementById("button");
  rateUsButton.addEventListener("click", function () {
    window.location.href = "./feedback.html";
  });
});
