let risposteUtente = [];

// TIMER

let timer;
let seconds = 60; // secondi timer

const timerDisplay = document.getElementById("timer");

const countdown = () => {
  console.log("IL TEMPO è DENARO...", seconds);
  //clearInterval(timer);
  timerDisplay.innerText = seconds;
  seconds--;

  if (seconds < 0) {
    clearInterval(timer);
    timerDisplay.innerText = "Tempo scaduto!";
    passaAllaProssimaDomanda();
  }
};

const resetTimer = () => {
  seconds = 60;
  clearInterval(timer);
  countdown();
};

const startTimer = () => {
  resetTimer();
  timer = setInterval(countdown, 1000);
};

// QUIZ:

const questions = [
  {
    question: "What does CPU stand for?",
    answers: [
      "Central Processing Unit",
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
    correctAnswer: "Central Processing Unit",
  },
  {
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    answers: ["Static", "Private", "Final", "Public"],
    correctAnswer: "Final",
  },
  {
    question: "The logo for Snapchat is a Bell.",
    answers: ["True", "False"],
    correctAnswer: "True",
  },
  {
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    answers: ["True", "False"],
    correctAnswer: "False",
  },
  {
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    answers: [".png", ".gif", ".svg", ".jpeg"],
    correctAnswer: ".svg",
  },
  {
    question: "In web design, what does CSS stand for?",
    answers: [
      "Counter Strike: Source",
      "Cascading Style Sheet",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
    correctAnswer: "Cascading Style Sheet",
  },
  {
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    answers: ["Nougat", "Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
    correctAnswer: "Nougat",
  },
  {
    question: "On Twitter, what is the character limit for a Tweet?",
    answers: ["100", "140", "120", "160"],
    correctAnswer: "140",
  },
  {
    question: "Linux was first created as an alternative to Windows XP.",
    answers: ["True", "False"],
    correctAnswer: "False",
  },
  {
    question:
      "Which programming language shares its name with an island in Indonesia?",
    answers: ["Python", "Jakarta", "C", "Java"],
    correctAnswer: "Java",
  },
];

const TestoDomanda = document.getElementById("domande"); // Testo domanda
const BottoneRisposte = Array.from(document.getElementsByClassName("bottone")); // converto htmlcollection con array(GOOGLE) per poter usare forEach
//const BottoneRisposte = document.getElementsByClassName("bottone");
const nextButton = document.getElementById("Prossimo");

BottoneRisposte.forEach((bottone) => {
  // uso forEach per dare a ciascun bottone i due eventi "mouseenter" e "mouseleave"
  // BottoneRisposte è l'array degli elementi html con classe "bottone"
  // bottone parametro, è appunto un parametro che raffigura ogni elemento all'interno dell'array BottoneRisposte
  bottone.addEventListener("mouseenter", () => {
    bottone.style.backgroundColor = "#D20094"; // Modifica colore
    bottone.style.color = "white"; // modifica il colore quando ci passi sopra con il cursore
  });

  bottone.addEventListener("mouseleave", () => {
    bottone.style.backgroundColor = ""; // rimette il bottone com'era
    bottone.style.color = "";
  });
});

let indexDomande = 0; // indice da cui parto con le domande

//showQuestion(indexDomande); // invoco questa funzione altrimenti non mi darà la prima domanda

const risultatoDomanda = document.getElementById("risultatoDomanda"); //NOOO

const showQuestion = function (index) {
  // parametro index funge da indice per la domanda dell'array che vogliamo
  // [0] [1] [2] etc...

  risultatoDomanda.innerText = ""; // Rimuove il testo del risultato

  // risultatoDomanda.style.display = "none"; // Nascondi il paragrafo del risultato QUIIIII
  TestoDomanda.innerText = questions[index].question; // Imposta il testo della nuova domanda

  TestoDomanda.innerText = questions[index].question; // testo domanda

  const risposteCorrenti = questions[index].answers; // const creato per le risposte
  // .answers aggiunge le risposte all'indice preso come parametro nelle domande
  const bottoniVisibili = Math.min(
    // numero dei bottoni visibili
    // Math.min l'ho googlato, per riuscire a far uscire i bottoni che bastavano
    // in base a quante risposte avevo
    risposteCorrenti.length, // questi due array con .length mi mostrano la loro lunghezza per le loro risposte e bottoni
    BottoneRisposte.length // mostra in base alla singola domanda quanti bottoni
  );

  startTimer();
  // clearInterval(timer); // Resetta il timer
  // seconds = 60;
  // countdown(); // Avvia il timer per la nuova domanda

  for (let i = 0; i < bottoniVisibili; i++) {
    BottoneRisposte[i].style.visibility = "visible"; // aggiungo style al mio array per rendere bottone visibile
    BottoneRisposte[i].innerText = risposteCorrenti[i]; // trova le risposte
    BottoneRisposte[i].addEventListener("click", () => {
      // aggiungo evento a una funzione, in questo caso "click"
      // per fare uscire l'alert quando pigio sul bottone
      // funzione con metodo arrow  () =>
      clickAnswer(risposteCorrenti[i], index); // invoco la funzione
      //console.log(clickAnswer, index);
    });
  }
  // questo sotto è un nuovo ciclo per rendere i due bottoni nelle boolean questions :
  for (let i = bottoniVisibili; i < BottoneRisposte.length; i++) {
    BottoneRisposte[i].style.visibility = "hidden";
    // aggiungo uno style con visibilty hidden in caso le risposte siano meno di 4(BottoneRisposte)
    // cosi facendo la mia variabile ciclerà le domande con meno di 4 risposte come ad esempio true/false
    // facendo uscire s
  }
};

//showQuestion(0); // <--- per mostrare la prima domanda
//const risultatoDomanda = document.getElementById("risultatoDomanda"); // ?
// funzione per gestire click delle answeers:
const clickAnswer = function (selezionaRisposta, domandaIndex) {
  console.log("Risposta selezionata:", selezionaRisposta);
  console.log("Indice della domanda:", domandaIndex);
  console.log(
    `Risposta selezionata: ${selezionaRisposta}, Domanda: ${domandaIndex}`
  );
  const correctAnswer = questions[domandaIndex].correctAnswer; // la metto sopra currentIndex
  const currentIndex = domandaIndex; //indexDomande; // Memorizza l'indice corrente della domanda CORRETTO!!

  // Memorizzazione della risposta dell'utente
  //risposteUtente[domandaIndex] = selezionaRisposta;
  risposteUtente[currentIndex] = selezionaRisposta;

  if (selezionaRisposta === correctAnswer) {
    risultatoDomanda.innerText = "RISPOSTA CORRETTA!";
  } else {
    risultatoDomanda.innerText =
      "RISPOSTA ERRATA! La risposta corretta è: " + correctAnswer;
  }

  //indexDomande++; // incremento l'indice dopo che l'utente fa il comportamento della risposta

  // Controlla se è l'ultima domanda///////////////////
  if (domandaIndex === questions.length - 1) {
    ////////////////////
    // Mostra il bottone alla fine del quiz/////////////////////
    bottoneVaiPagina.style.display = "block"; /////////////////////////
  } // con questo if sto facendo in modo che esca il bottone a fine quiz

  //
  // Avvio il timer per la prossima domanda dopo la gestione della risposta
  startTimer();
  //

  setTimeout(() => {
    // GOOGLE, serve per andare alla domanda successiva un secondo dopo che clicco il pulsante
    // questo if/else funge come la soluzione dopo il funzionamento del bottone premuto
    // per la risposta
    if (domandaIndex === questions.length - 1) {
      /////////////////////////////////////////////////////////////////////////////
      // Nascondi la sezione delle domande e delle risposte
      document.getElementById("contenitore").style.display = "none";

      bottoneVaiPagina.style.display = "block"; // Mostra il bottone
      ////////////////////////////////////////////////////////////////////////////////7
      // Quando tutte le domande sono state risposte
      // Calcola il punteggio usando le risposte dell'utente
      const punteggio = calcolaRisultato(risposteUtente);
      salvaRisultato(punteggio);

      // Aggiungo click per mandarlo alla pagina di Michela:
      bottoneVaiPagina.addEventListener("click", () => {
        // INSERIRE QUI URL
        window.location.href =
          "./page3.html?domandeCorrette=" + calcolaRisultato(); // "http://"

        // Mostra l'alert con il punteggio
        alert(`Il tuo punteggio è ${punteggio} su ${questions.length}`);
      });
    } else {
      showQuestion(domandaIndex + 1); // Passa alla domanda successiva
    }
  }, 1000);
};

const bottoneVaiPagina = document.getElementById("vaiAllaPaginaResults");
bottoneVaiPagina.addEventListener("click", () => {
  window.location.href = "./page3.html?domandeCorrette=" + calcolaRisultato(); // "http://"
});

/*
    if (domandaIndex === questions.length - 1) {
      // domandaIndex
      // se la domanda è l'ultima
      // condizione per verificare l'ultima domanda del test
      risultatoDomanda.innerText = "Hai completato il test!";
      // rendo visibile il tasto per andare alla pagina di Michela

      // salvo il risultato quiz: PRIMO LINK STEFANO
      //salvaRisultato();

      const bottoneVaiPagina = document.getElementById("vaiAllaPaginaResults");
      bottoneVaiPagina.style.display = "block";

      // provo:
      // tolgo la scritta dell'ultima domanda quando ho finito il quiz
      const containerDomanda = document.getElementById("contenitore");
      containerDomanda.style.display = "none";

      // Aggiungo click per mandarlo alla pagina di Michela:
      bottoneVaiPagina.addEventListener("click", () => {
        // INSERIRE QUI URL
        window.location.href =
          "./page3.html?domandeCorrette=" + calcolaRisultato(); // "http://"
      });
    } else {
      showQuestion(domandaIndex + 1); // domanda successiva
    }
  }, 1000); */

// const containerDomanda = document.getElementById("");
// containerDomanda.style.display = "none";
//};QUAAAA

BottoneRisposte.forEach((bottone, index) => {
  bottone.addEventListener("click", () => {
    const selectedAnswer = questions[index].answers[index]; // indexDomande diventa index
    clickAnswer(selectedAnswer, index);
  });
});

// SALVATAGGIO DEL QUIZ: PRIMO LINK STEFANO
//////////////////////////////////////////
/*const calcolaRisultato = (risposteUtente) => {
  let punteggio = 0;

  // Verifica ogni risposta dell'utente e incrementa il punteggio se è corretta
  risposteUtente.forEach((risposta, index) => {
    if (risposta === questions[index].correctAnswer) {
      punteggio++;
    }
  });

  return punteggio;
};*/

/*const punteggio = calcolaRisultato(risposteUtente); // Calcola il punteggio dell'utente
localStorage.setItem("punteggioQuiz", punteggio); // Memorizza il punteggio nel localStorage
// salvaRisultato(punteggio); // Salva il punteggio nel localStorage */

const salvaRisultato = (punteggio) => {
  localStorage.setItem("punteggioQuiz", punteggio);
};

const passaAllaProssimaDomanda = () => {
  indexDomande++;
  if (indexDomande < questions.length) {
    resetTimer();
    showQuestion(indexDomande);
  } else {
    console.log("Tutte le domande sono state risposte");
    //alert("TEST COMPLETATO!");
    /**/
    const punteggio = calcolaRisultato();
    salvaRisultato(punteggio);

    // Creazione di un elemento <p> per mostrare il punteggio
    const punteggioDisplay = document.createElement("p");
    punteggioDisplay.textContent = `Hai risposto correttamente a ${punteggio} domande su ${questions.length}.`;

    // Sostituzione dell'alert con il nuovo paragrafo creato
    const container = document.getElementById("container"); // Sostituisci "container" con l'id del tuo elemento HTML
    container.appendChild(punteggioDisplay);
  }
};
//salvaRisultato(punteggio); // Salva il punteggio nel localStorage
// alert(`Il tuo punteggio è ${punteggio} su ${questions.length}`);
// }

//// dentro:
//const punteggio = calcolaRisultato(risposteUtente);
//alert(`Il tuo punteggio è ${punteggio} su ${questions.length}`);
// salvaRisultato(punteggio); // Memorizza il punteggio nel localStorage

const calcolaRisultato = (risposteUtente) => {
  let punteggio = 0;

  // Verifica ogni risposta dell'utente e incrementa il punteggio se è corretta
  risposteUtente.forEach((risposta, index) => {
    if (risposta === questions[index].correctAnswer) {
      punteggio++;
    }
  });

  return punteggio;
};
// chiamo prima domanda dal TIMEER:
showQuestion(0);
