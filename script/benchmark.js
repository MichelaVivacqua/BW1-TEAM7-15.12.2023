document.addEventListener("DOMContentLoaded", function () {
  /////////////////
  let domandaIndex = 0; // Inizializzazione di domandaIndex
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
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
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
  const BottoneRisposte = Array.from(
    document.getElementsByClassName("bottone")
  ); // converto htmlcollection con array(GOOGLE) per poter usare forEach
  //const BottoneRisposte = document.getElementsByClassName("bottone");
  const nextButton = document.getElementById("Prossimo");
  BottoneRisposte.forEach((bottone) => {
    bottone.addEventListener("mouseenter", () => {
      bottone.style.backgroundColor = "#D20094"; // Modifica colore
      bottone.style.color = "white"; // modifica il colore quando ci passi sopra con il cursore
    });

    bottone.addEventListener("mouseleave", () => {
      bottone.style.backgroundColor = ""; // rimette il bottone com'era
      bottone.style.color = "";
    });
  });

  let indexDomande = 0;
  const risultatoDomanda = document.getElementById("risultatoDomanda"); //NOOO

  const showQuestion = function (index) {
    risultatoDomanda.innerText = "";
    TestoDomanda.innerText = questions[index].question; // Imposta il testo della nuova domanda

    const risposteCorrenti = questions[index].answers; // const creato per le risposte
    // .answers aggiunge le risposte all'indice preso come parametro nelle domande
    const bottoniVisibili = Math.min(
      risposteCorrenti.length, // questi due array con .length mi mostrano la loro lunghezza per le loro risposte e bottoni
      BottoneRisposte.length // mostra in base alla singola domanda quanti bottoni
    );
    startTimer();
    for (let i = 0; i < bottoniVisibili; i++) {
      BottoneRisposte[i].style.visibility = "visible"; // aggiungo style al mio array per rendere bottone visibile
      BottoneRisposte[i].innerText = risposteCorrenti[i]; // trova le risposte
      BottoneRisposte[i].addEventListener("click", () => {
        clickAnswer(risposteCorrenti[i], index); // invoco la funzione
        //console.log(clickAnswer, index);
      });
    }
    // questo sotto è un nuovo ciclo per rendere i due bottoni nelle boolean questions :
    for (let i = bottoniVisibili; i < BottoneRisposte.length; i++) {
      BottoneRisposte[i].style.visibility = "hidden";
    }
  };
  const clickAnswer = function (selezionaRisposta, domandaIndex) {
    console.log("Risposta selezionata:", selezionaRisposta);
    console.log("Indice della domanda:", domandaIndex);
    console.log(
      `Risposta selezionata: ${selezionaRisposta}, Domanda: ${domandaIndex}`
    );
    const correctAnswer = questions[domandaIndex].correctAnswer; // la metto sopra currentIndex
    const currentIndex = domandaIndex;
    risposteUtente[currentIndex] = selezionaRisposta;

    if (selezionaRisposta === correctAnswer) {
      risultatoDomanda.innerText = "RISPOSTA CORRETTA!";
    } else {
      risultatoDomanda.innerText =
        "RISPOSTA ERRATA! La risposta corretta è: " + correctAnswer;
    }
    if (domandaIndex === questions.length - 1) {
      bottoneVaiPagina.style.display = "block"; /////////////////////////
    }
    startTimer();

    setTimeout(() => {
      if (domandaIndex === questions.length - 1) {
        /////////////////////////////////////////////////////////////////////////////
        // Nascondi la sezione delle domande e delle risposte
        document.getElementById("contenitore").style.display = "none";

        bottoneVaiPagina.style.display = "block";
        const punteggio = calcolaRisultato(risposteUtente);
        salvaRisultato(punteggio);
        bottoneVaiPagina.addEventListener("click", () => {
          console.log(bottoneVaiPagina);
          const urlPaginaCorrente = window.location.href;
          console.log(urlPaginaCorrente);

          window.location.href = "./page3.html";
          alert(`Il tuo punteggio è ${punteggio} su ${questions.length}`);
          //alert(`Il tuo punteggio è ${punteggio} su ${questions.length}`);
        });
      } else {
        showQuestion(domandaIndex + 1); // Passa alla domanda successiva
      }
    }, 1000);
  };

  const bottoneVaiPagina = document.getElementById("vaiAllaPaginaResults");
  ////////
  BottoneRisposte.forEach((bottone, index) => {
    bottone.addEventListener("click", () => {
      const selectedAnswer = questions[index].answers[index]; // indexDomande diventa index
      clickAnswer(selectedAnswer, index);
    });
  });

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

  const mostraEsitoQuiz = (punteggio) => {
    const esitoDisplay = document.createElement("p");
    esitoDisplay.textContent = `Il tuo punteggio è ${punteggio} su ${questions.length}.`;
    const container = document.getElementById("esitoQuiz"); // Sostituisci con l'ID appropriato
    container.appendChild(esitoDisplay);
  };
  if (domandaIndex === questions.length - 1) {
    document.getElementById("contenitore").style.display = "none";
    const punteggio = calcolaRisultato(risposteUtente);
    salvaRisultato(punteggio);
    mostraEsitoQuiz(punteggio); // Mostra l'esito
    console.log(mostraEsitoQuiz());
  }
  bottoneVaiPagina.addEventListener("click", () => {
    console.log("bottone cliccato");
    const punteggio = calcolaRisultato(risposteUtente); // Calcola il punteggio
    salvaRisultato(punteggio);
    //localStorage.setItem("punteggioQuiz", punteggio);
    localStorage.setItem("numeroDomande", questions.length);

    window.location.href = `./results.html?domandeCorrette=${punteggio}`;
  });
});
// localStorage setItems
// da script localStorage ---> getItems
