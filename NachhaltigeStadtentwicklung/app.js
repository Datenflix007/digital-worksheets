(() => {
  "use strict";

  const STORAGE_KEY = "jenacraft-klima-arbeitsblatt-v1";
  const root = document.querySelector("main");
  const saveButton = document.querySelector("#saveButton");
  const exportButton = document.querySelector("#exportButton");
  const saveState = document.querySelector("#saveState");
  const progressPercent = document.querySelector("#progressPercent");
  const progressBar = document.querySelector("#progressBar");
  const progressTrack = document.querySelector(".progress-track");
  const deleteDialog = document.querySelector("#deleteDialog");
  const openDeleteDialog = document.querySelector("#openDeleteDialog");
  const confirmDelete = document.querySelector("#confirmDelete");
  const deleteButton = document.querySelector("#deleteButton");
  const toast = document.querySelector("#toast");
  const solutionProblem = document.querySelector('[name="solution_problem"]');
  const courseCards = Array.from(document.querySelectorAll("[data-course-card]"));
  const courseGuideStatus = document.querySelector("#courseGuideStatus");
  const greenhouseGas = document.querySelector("#greenhouseGas");
  const greenhouseResult = document.querySelector("#greenhouseResult");
  const greenhouseTemperature = document.querySelector("#greenhouseTemperature");
  const budgetOutput = document.querySelector("#budgetOutput");
  const budgetFeedback = document.querySelector("#budgetFeedback");
  const finalSummary = document.querySelector("[data-final-summary]");
  const finalExportButton = document.querySelector("#finalExportButton");
  const finalResetButton = document.querySelector("#finalResetButton");
  const measureDialog = document.querySelector("#measureDialog");
  const measureDialogTitle = document.querySelector("#measureDialogTitle");
  const measureDialogImage = document.querySelector("#measureDialogImage");
  const measureDialogDescription = document.querySelector("#measureDialogDescription");
  const measureDialogStructure = document.querySelector("#measureDialogStructure");
  const measureDialogFunction = document.querySelector("#measureDialogFunction");
  const measureDialogMinecraft = document.querySelector("#measureDialogMinecraft");
  const courseState = { reached: 0, active: 0, finished: false, completionStep: 0, visited: [0] };
  const measureCatalog = {
    schwammstadt: {
      title: "Schwammstadt", image: "media/01_Schwammstadt.svg", alt: "Illustration einer Schwammstadt",
      description: "Eine Schwammstadt hält Regen dort fest, wo er fällt, statt ihn sofort in Rohre abzuleiten.",
      structure: "Mulden, Teiche, bepflanzte Flächen und wasserdurchlässige Wege geben dem Regen Platz.",
      function: "Bei Starkregen fließt weniger Wasser auf einmal ab. Gleichzeitig bleibt mehr Wasser im Boden für trockene Tage.",
      minecraft: "Baut Teiche, flache Mulden, Kanäle, Kieswege und viele Pflanzen statt einer komplett gepflasterten Fläche."
    },
    stadtpark: {
      title: "Stadtpark", image: "media/02_Stadtpark.svg", alt: "Illustration eines Stadtparks",
      description: "Ein Stadtpark ist mehr als eine Wiese: Er schafft einen kühleren Aufenthaltsort mitten in der Stadt.",
      structure: "Große Bäume, Sträucher, Wiesen, Wege, Sitzplätze und kleine Wasserflächen bilden verschiedene Bereiche.",
      function: "Bäume spenden Schatten und Pflanzen geben Wasser ab. So heizt sich der Ort weniger auf und Tiere finden Lebensraum.",
      minecraft: "Kombiniert große Bäume, Blumen, Gras, Sitzbänke, Wege und einen kleinen Teich mit einer klaren Nutzungsidee."
    },
    gruendach: {
      title: "Gründach", image: "media/03_Gruendach.svg", alt: "Illustration eines Gründachs",
      description: "Auf einem Gründach wachsen Pflanzen statt nur Kies oder Dachpappe zu liegen.",
      structure: "Über der Dachabdichtung liegen Speicherschichten, Erde und robuste Pflanzen; Wasser kann dort kurz gespeichert werden.",
      function: "Das Dach wird in der Sonne weniger heiß, hält einen Teil des Regens zurück und bietet Insekten zusätzlichen Lebensraum.",
      minecraft: "Gestaltet flache Dächer mit Erde, Moos, Blättern, kleinen Beeten und einer sinnvollen Regenrinne."
    },
    agroforst: {
      title: "Agroforst", image: "media/04_Agroforst.svg", alt: "Illustration von Agroforst mit Bäumen und Anbauflächen",
      description: "Agroforst verbindet Ackerbau oder Gärten mit Bäumen auf derselben Fläche.",
      structure: "Zwischen Beeten oder Feldern stehen Baumreihen, Hecken und Wege; darunter können Pflanzen wachsen oder Tiere weiden.",
      function: "Wurzeln halten den Boden fest, Bäume bremsen Wind und spenden Schatten. Das hilft Boden, Wasser und Artenvielfalt.",
      minecraft: "Legt Felder und Beete zwischen Baumreihen an und lasst Wege für Menschen, Tiere und die Pflege frei."
    },
    recycling: {
      title: "Recycling", image: "media/05_Recycling.svg", alt: "Illustration von Recycling",
      description: "Recycling bedeutet, Materialien nach ihrer Nutzung wieder als Rohstoff zu verwenden.",
      structure: "Sammelstellen, klar beschriftete Behälter und Wege zur Sortierung gehören zu einem funktionierenden Kreislauf.",
      function: "Wenn Papier, Glas, Metalle oder Baustoffe wiederverwendet werden, müssen weniger neue Rohstoffe abgebaut werden.",
      minecraft: "Plant eine gut beschilderte Sammelstelle und baut aus gebrauchten Materialien neue Möbel, Wege oder Dekoration."
    },
    radwege: {
      title: "Rad- und Fußwege", image: "media/06_Rad_und_Fusswege.svg", alt: "Illustration von Rad- und Fußwegen",
      description: "Sichere, kurze Wege machen es leichter, zu Fuß oder mit dem Fahrrad unterwegs zu sein.",
      structure: "Breite, getrennte Wege, sichere Kreuzungen, Beleuchtung, Bäume und Fahrradständer gehören zusammen.",
      function: "Wenn mehr Wege ohne Auto möglich sind, entstehen weniger Abgase und weniger Lärm. Bewegung tut außerdem Menschen gut.",
      minecraft: "Markiert klare Wege mit unterschiedlichen Blöcken, baut Übergänge, Fahrradständer und schattenspendende Bäume."
    },
    energie: {
      title: "Erneuerbare Energie", image: "media/07_Erneuerbare_Energie.svg", alt: "Illustration erneuerbarer Energie",
      description: "Sonne, Wind und Wasser können Energie liefern, ohne Kohle, Öl oder Gas zu verbrennen.",
      structure: "Solardächer, Windräder, Leitungen und Speicher müssen passend zum Ort geplant werden.",
      function: "So gelangen weniger zusätzliche Treibhausgase in die Atmosphäre. Energiesparen bleibt trotzdem wichtig.",
      minecraft: "Setzt Solarpaneele auf Dächer, plant einen kleinen Technikbereich und achtet darauf, dass Wege und Naturflächen erhalten bleiben."
    },
    marktplatz: {
      title: "Grüner Marktplatz", image: "media/08_Marktplatz.svg", alt: "Illustration eines grünen Marktplatzes",
      description: "Ein grüner Marktplatz verbindet einen Treffpunkt mit Schatten, kurzen Wegen und Platz für Veranstaltungen.",
      structure: "Bäume, Beete, Bänke, Trinkwasser, Marktstände und durchlässige Wege machen den Platz vielseitig nutzbar.",
      function: "Schatten und Pflanzen machen den Platz an heißen Tagen angenehmer; Menschen können dort zu Fuß einkaufen und sich treffen.",
      minecraft: "Baut einen Platz mit Bauminseln, Sitzgelegenheiten, Marktständen und Wegen, die nicht vollständig aus Stein bestehen."
    },
    flussufer: {
      title: "Naturnahes Flussufer", image: "media/09_Flussufer.svg", alt: "Illustration eines naturnahen Flussufers",
      description: "Ein naturnahes Flussufer gibt dem Wasser mehr Raum als eine vollständig befestigte Kante.",
      structure: "Flache Ufer, Wiesen, Bäume, Röhricht und Rückhalteräume wechseln sich mit sicheren Wegen und Sitzplätzen ab.",
      function: "Bei viel Regen kann sich Wasser besser ausbreiten. Pflanzen kühlen den Ort und bieten Tieren Schutz.",
      minecraft: "Modelliert flache Ufer mit Sand, Erde, Schilf und Bäumen; lasst neben dem Fluss bewusst Überschwemmungsfläche frei."
    },
    oepnv: {
      title: "ÖPNV", image: "media/10_OEPNV.svg", alt: "Illustration des öffentlichen Nahverkehrs",
      description: "Busse und Bahnen bringen viele Menschen gemeinsam ans Ziel.",
      structure: "Haltestellen, sichere Wege dorthin, barrierefreie Einstiege und gute Verbindungen machen den Nahverkehr nutzbar.",
      function: "Wenn mehr Menschen gemeinsam fahren, brauchen wir weniger Autos und Parkplätze. Das spart Platz, Lärm und Abgase.",
      minecraft: "Plant eine Bus- oder Straßenbahnlinie mit gut erreichbaren Haltestellen, Sitzplätzen und sicheren Übergängen."
    },
    wohngebaeude: {
      title: "Gute Wohngebäude", image: "media/11_Wohngebaeude.svg", alt: "Illustration eines energieeffizienten Wohngebäudes",
      description: "Ein gutes Wohngebäude schützt vor Kälte im Winter und vor Hitze im Sommer.",
      structure: "Dämmung, Fensterläden, Begrünung, Schatten und gut geplante Räume sorgen für ein angenehmes Klima im Haus.",
      function: "Weniger Heiz- und Kühlenergie wird gebraucht. Das spart Geld und verringert Treibhausgase.",
      minecraft: "Baut Dächer mit Überstand, schattige Fenster, begrünte Höfe und unterschiedliche Wohnungsgrößen statt nur gleichförmiger Häuser."
    },
    spielort: {
      title: "Spiel- und Lernort", image: "media/12_Spiel_und_Lernort.svg", alt: "Illustration eines Spiel- und Lernorts",
      description: "Ein guter Spiel- und Lernort lädt zum Bewegen, Entdecken und gemeinsamen Lernen ein – auch an warmen Tagen.",
      structure: "Bäume, Schattensegel, Sitzplätze, Wasser, Spielgeräte und ein kleiner Lernbereich gehören sinnvoll zusammen.",
      function: "Schatten und Wasser machen den Ort kühler. Gleichzeitig haben Kinder Raum zum Spielen, Treffen und Forschen.",
      minecraft: "Baut einen Spielplatz mit Bäumen, Bänken, Wasserstelle und einem kleinen Pavillon oder Klassenzimmer im Freien."
    }
  };
  const retiredCardTwoNames = new Set([
    "weather_climate_1", "weather_climate_2", "weather_climate_3", "weather_climate_4",
    "industry_changes", "industry_balance", "nature_quiz_forest", "nature_quiz_change",
    "industry_quiz_gas", "industry_quiz_warming", "weather_climate_today", "weather_climate_typical"
  ]);
  let retiredCardTwoValues = {};
  let reflectionSubmitted = false;
  let saveTimer;
  let toastTimer;

  const getFields = () => Array.from(root.querySelectorAll("input[name], select[name], textarea[name]"));

  function collectState() {
    const values = { ...retiredCardTwoValues };

    getFields().forEach((field) => {
      if (field.type === "checkbox") {
        if (!Array.isArray(values[field.name])) {
          values[field.name] = [];
        }
        if (field.checked) {
          values[field.name].push(field.value);
        }
      } else if (field.type === "radio") {
        if (field.checked) {
          values[field.name] = field.value;
        } else if (!(field.name in values)) {
          values[field.name] = "";
        }
      } else {
        values[field.name] = field.value;
      }
    });

    return {
      version: 1,
      savedAt: new Date().toISOString(),
      values,
      course: { ...courseState, visited: [...courseState.visited] },
      reflection: { submitted: reflectionSubmitted }
    };
  }

  function persist({ announce = false } = {}) {
    try {
      const state = collectState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      const time = new Intl.DateTimeFormat("de-DE", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(state.savedAt));
      saveState.textContent = `Gespeichert · ${time}`;
      if (announce) {
        showToast("Eure Antworten wurden auf diesem Gerät gespeichert.");
      }
      return true;
    } catch (error) {
      saveState.textContent = "Speichern nicht möglich";
      if (announce) {
        showToast("Der Browser konnte die Antworten leider nicht speichern.");
      }
      console.error("Lokales Speichern fehlgeschlagen:", error);
      return false;
    }
  }

  function normalizeVisitedCards(visited, lastCard, activeCard) {
    const savedVisited = Array.isArray(visited)
      ? visited
      : Array.from({ length: activeCard + 1 }, (_, index) => index);
    return [...new Set([...savedVisited, 0, activeCard]
      .map(Number)
      .filter((index) => Number.isInteger(index) && index >= 0 && index <= lastCard))]
      .sort((first, second) => first - second);
  }

  function markCourseCardVisited(index) {
    if (!courseState.visited.includes(index)) {
      courseState.visited.push(index);
      courseState.visited.sort((first, second) => first - second);
    }
  }

  function restore() {
    let raw;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      saveState.textContent = "Lokaler Speicher blockiert";
      console.error("Lokaler Speicher ist nicht verfügbar:", error);
      return false;
    }

    if (!raw) {
      return false;
    }

    try {
      const state = JSON.parse(raw);
      const values = state && state.values ? state.values : {};
      retiredCardTwoValues = Object.fromEntries(
        Object.entries(values).filter(([name]) => retiredCardTwoNames.has(name))
      );
      const savedCourse = state && state.course;
      reflectionSubmitted = Boolean(state && state.reflection && state.reflection.submitted);

      if (savedCourse && courseCards.length) {
        const lastCard = courseCards.length - 1;
        courseState.reached = Math.max(0, Math.min(Number(savedCourse.reached) || 0, lastCard));
        courseState.active = Math.max(0, Math.min(Number(savedCourse.active) || 0, courseState.reached));
        courseState.finished = Boolean(savedCourse.finished);
        courseState.completionStep = Math.max(0, Math.min(Number(savedCourse.completionStep) || 0, 2));
        courseState.visited = normalizeVisitedCards(savedCourse.visited, lastCard, courseState.active);
      }

      getFields().forEach((field) => {
        const stored = values[field.name];
        if (field.type === "checkbox") {
          field.checked = Array.isArray(stored) && stored.includes(field.value);
        } else if (field.type === "radio") {
          field.checked = stored === field.value;
        } else if (typeof stored === "string") {
          field.value = stored;
        }
      });

      if (state.savedAt) {
        const time = new Intl.DateTimeFormat("de-DE", {
          hour: "2-digit",
          minute: "2-digit"
        }).format(new Date(state.savedAt));
        saveState.textContent = `Wiederhergestellt · ${time}`;
      } else {
        saveState.textContent = "Antworten wiederhergestellt";
      }
      return true;
    } catch (error) {
      saveState.textContent = "Gespeicherte Daten unlesbar";
      console.error("Gespeicherte Antworten konnten nicht gelesen werden:", error);
      return false;
    }
  }

  function scheduleSave() {
    saveState.textContent = "Speichert …";
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => persist(), 450);
  }

  function hasAnswer(element) {
    if (element.matches("input[type='checkbox'], input[type='radio']")) {
      return element.checked;
    }
    return element.value.trim() !== "";
  }

  function groupHasAnswer(element) {
    return Boolean(element.querySelector("input:checked"));
  }

  function getProgressItems(container = root) {
    const individual = Array.from(container.querySelectorAll("[data-progress]"));
    const checkbox = Array.from(container.querySelectorAll("[data-progress-checkbox]"));
    const groups = Array.from(container.querySelectorAll("[data-progress-group]"));

    return [
      ...individual.map((element) => hasAnswer(element)),
      ...checkbox.map((element) => hasAnswer(element)),
      ...groups.map((element) => groupHasAnswer(element))
    ];
  }

  function updateProgress() {
    const items = getProgressItems();
    const completed = items.filter(Boolean).length;
    const total = items.length;
    const percent = total ? Math.round((completed / total) * 100) : 0;

    progressPercent.textContent = `${percent} %`;
    progressBar.style.width = `${percent}%`;
    progressTrack.setAttribute("aria-valuenow", String(percent));
    progressTrack.setAttribute("aria-valuetext", `${percent} % bearbeitet`);

    document.querySelectorAll("[data-station]").forEach((station) => {
      const stationItems = getProgressItems(station);
      const stationCompleted = stationItems.filter(Boolean).length;
      const complete = stationItems.length > 0 && stationCompleted === stationItems.length;
      const status = station.querySelector(".station-status");
      const link = document.querySelector(`[data-section-link="${station.id}"]`);

      station.classList.toggle("is-complete", complete);
      if (link) {
        link.classList.toggle("is-complete", complete);
      }
      if (status) {
        status.textContent = complete ? "fertig" : `${stationCompleted}/${stationItems.length}`;
      }
    });
  }

  let comicIndex = 0;

  function isQuizCorrect(group) {
    const selected = group?.querySelector("input:checked");
    return Boolean(selected && selected.value === group.dataset.correct);
  }

  function isComicPanelCorrect(panel) {
    return isQuizCorrect(panel?.querySelector("[data-quiz-group]"));
  }

  function updateComicProgression() {
    const comic = document.querySelector("[data-comic]");
    const connectionCard = document.querySelector("#connectionCard");
    if (!comic) {
      return false;
    }

    const panels = Array.from(comic.querySelectorAll("[data-comic-panel]"));
    const complete = panels.length > 0 && panels.every(isComicPanelCorrect);
    if (connectionCard) {
      connectionCard.hidden = !complete;
    }
    updateCourseProgression();
    return complete;
  }

  function showComicPanel(index) {
    const comic = document.querySelector("[data-comic]");
    if (!comic) {
      return;
    }

    const panels = Array.from(comic.querySelectorAll("[data-comic-panel]"));
    const dots = Array.from(comic.querySelectorAll(".comic-dots span"));
    const previous = comic.querySelector("[data-comic-prev]");
    const next = comic.querySelector("[data-comic-next]");
    const gateMessage = comic.querySelector("[data-comic-gate-message]");
    comicIndex = Math.max(0, Math.min(index, panels.length - 1));

    panels.forEach((panel, panelIndex) => {
      const active = panelIndex === comicIndex;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
    dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === comicIndex));
    previous.disabled = comicIndex === 0;
    const currentPanelCorrect = isComicPanelCorrect(panels[comicIndex]);
    const isLastPanel = comicIndex === panels.length - 1;
    next.disabled = !currentPanelCorrect;
    next.textContent = isLastPanel ? "Weiter zur Gegenwart" : "Nächstes Bild";
    if (gateMessage) {
      gateMessage.textContent = currentPanelCorrect
        ? isLastPanel
          ? "Alle Comic-Fragen sind richtig beantwortet. Ihr könnt jetzt zur Verbindung zur Gegenwart weitergehen."
          : "Richtig beantwortet. Ihr könnt jetzt zum nächsten Bild weitergehen."
        : "Wählt zuerst die richtige Antwort, um weiterzugehen.";
    }
  }

  function setupComic() {
    const comic = document.querySelector("[data-comic]");
    if (!comic) {
      return;
    }
    comic.querySelector("[data-comic-prev]").addEventListener("click", () => showComicPanel(comicIndex - 1));
    comic.querySelector("[data-comic-next]").addEventListener("click", () => {
      const panels = Array.from(comic.querySelectorAll("[data-comic-panel]"));
      if (!isComicPanelCorrect(panels[comicIndex])) {
        return;
      }
      if (comicIndex === panels.length - 1) {
        updateComicProgression();
        document.querySelector("#connectionCard")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      showComicPanel(comicIndex + 1);
    });
    showComicPanel(0);
  }

  function getCardQuizzes(card) {
    return Array.from(card.querySelectorAll("[data-quiz-group], [data-select-quiz]"));
  }

  function areCardQuizzesCorrect(card) {
    const quizzes = getCardQuizzes(card);
    return quizzes.every((quiz) => {
      if (quiz.matches("[data-quiz-group]")) {
        return isQuizCorrect(quiz);
      }
      const select = quiz.querySelector("select");
      return Boolean(select && select.value === quiz.dataset.correct);
    });
  }

  function isReflectionComplete(card) {
    const input = card.querySelector("[data-reflection-input]");
    // The reflection is complete as soon as it has been written. Requiring a
    // second click on "Antwort absenden" left the course-completion button
    // disabled even though the required answer was already present.
    return !input || input.value.trim() !== "";
  }

  function hasRequiredCardChoices(card) {
    return Array.from(card.querySelectorAll("[data-card-required-group]")).every((group) =>
      Boolean(group.querySelector("input:checked"))
    );
  }

  function canAdvanceCard(card) {
    return areCardQuizzesCorrect(card) && isReflectionComplete(card) && hasRequiredCardChoices(card);
  }

  function courseGateText(card) {
    const quizzes = getCardQuizzes(card);
    const incorrectQuizCount = quizzes.filter((quiz) => !(quiz.matches("[data-quiz-group]")
      ? isQuizCorrect(quiz)
      : quiz.querySelector("select")?.value === quiz.dataset.correct)).length;
    const missing = [];

    if (incorrectQuizCount) {
      missing.push(incorrectQuizCount === 1
        ? "Löst noch eine Quizfrage richtig."
        : `Löst noch ${incorrectQuizCount} Quizfragen richtig.`);
    }

    Array.from(card.querySelectorAll("[data-card-required-group]")).forEach((group) => {
      if (!group.querySelector("input:checked")) {
        missing.push(group.dataset.courseRequiredLabel || "Trefft noch eine Auswahl in der Aufgabe.");
      }
    });

    const reflectionInput = card.querySelector("[data-reflection-input]");
    if (reflectionInput && !reflectionInput.value.trim()) {
      missing.push(reflectionInput.dataset.reflectionLabel || "Schreibt noch eure Beobachtung auf.");
    }

    return missing.length
      ? missing.join(" ")
      : "Alles erledigt – ihr könnt mit der nächsten Lernkarte weitergehen.";
  }

  function updateCourseProgression() {
    if (!courseCards.length) {
      return;
    }

    const lastCard = courseCards.length - 1;
    courseState.reached = Math.max(0, Math.min(courseState.reached, lastCard));
    courseState.active = Math.max(0, Math.min(courseState.active, courseState.reached));
    courseState.visited = normalizeVisitedCards(courseState.visited, lastCard, courseState.active);

    courseCards.forEach((card, index) => {
      const visible = courseState.finished || index === courseState.active;
      card.hidden = !visible;
      card.classList.toggle("is-course-current", !courseState.finished && index === courseState.active);
      card.classList.toggle("is-course-visited", courseState.finished || courseState.visited.includes(index));

      const footerMessage = card.querySelector("[data-course-gate-message]");
      if (footerMessage) {
        footerMessage.textContent = courseGateText(card);
      }

      const nextButton = card.querySelector("[data-course-next]");
      if (nextButton) {
        nextButton.disabled = !canAdvanceCard(card);
      }
      const finishButton = card.querySelector("[data-course-finish]");
      if (finishButton) {
        finishButton.disabled = !canAdvanceCard(card);
      }
    });

    document.querySelectorAll("[data-course-finish-card]").forEach((card) => {
      const step = Number(card.dataset.courseFinishStep) || 0;
      card.hidden = !courseState.finished || step !== courseState.completionStep;
    });

    document.querySelectorAll("[data-section-link]").forEach((link, index) => {
      const available = courseState.finished || index <= courseState.reached;
      link.classList.toggle("is-locked", !available);
      link.classList.toggle("is-course-current", !courseState.finished && index === courseState.active);
      link.classList.toggle("is-course-complete", courseState.finished || index < courseState.reached);
      link.setAttribute("aria-disabled", String(!available));
      link.tabIndex = available ? 0 : -1;
    });

    document.querySelectorAll("[data-progress-card-index]").forEach((button) => {
      const index = Number(button.dataset.progressCardIndex);
      const available = courseState.finished || courseState.visited.includes(index);
      const current = !courseState.finished && index === courseState.active;
      button.disabled = !available;
      button.classList.toggle("is-reached", available);
      button.classList.toggle("is-current", current);
      if (current) {
        button.setAttribute("aria-current", "step");
      } else {
        button.removeAttribute("aria-current");
      }
      button.setAttribute("aria-label", `Lernkarte ${index + 1}${current ? ", aktuelle Lernkarte" : available ? " öffnen" : ", noch gesperrt"}`);
    });

    if (courseGuideStatus) {
      courseGuideStatus.textContent = courseState.finished
        ? "Lernkarten-Kurs abgeschlossen: Ihr könnt jetzt die gesamte Session frei durchscrollen."
        : `Lernkarte ${courseState.active + 1} von ${courseCards.length}: Lest, löst die Quizfragen und klickt am Ende weiter.`;
    }
    updateFinalSummary();
  }

  function showCourseCard(index, { scroll = true } = {}) {
    if (index < 0 || index > courseState.reached || courseState.finished) {
      return;
    }
    courseState.active = index;
    markCourseCardVisited(index);
    updateCourseProgression();
    persist();
    if (scroll) {
      courseCards[index].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function advanceCourse(nextIndex) {
    const currentCard = courseCards[courseState.active];
    if (!currentCard || !canAdvanceCard(currentCard)) {
      showToast("Löst zuerst alle Quizfragen und haltet eure Alltagsbeobachtung fest.");
      updateCourseProgression();
      return;
    }
    courseState.reached = Math.max(courseState.reached, Math.min(nextIndex, courseCards.length - 1));
    showCourseCard(nextIndex);
  }

  function goToPreviousCourseCard(previousIndex) {
    if (previousIndex < 0 || previousIndex > courseState.reached || !courseCards[previousIndex]) {
      return;
    }
    if (courseState.finished) {
      courseCards[previousIndex].scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    showCourseCard(previousIndex);
  }

  function goToProgressCourseCard(index) {
    if (index < 0 || !courseCards[index] || (!courseState.finished && !courseState.visited.includes(index))) {
      return;
    }
    if (courseState.finished) {
      courseCards[index].scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    showCourseCard(index);
  }

  function finishCourse() {
    const currentCard = courseCards[courseCards.length - 1];
    if (!currentCard || !canAdvanceCard(currentCard)) {
      showToast(currentCard ? courseGateText(currentCard) : "Öffnet zuerst die letzte Lernkarte.");
      updateCourseProgression();
      return;
    }
    courseState.reached = courseCards.length - 1;
    courseState.visited = courseCards.map((_, index) => index);
    courseState.finished = true;
    courseState.completionStep = 0;
    updateCourseProgression();
    persist();
    document.querySelector("#moderationskarten")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showCompletionStep(step) {
    if (!courseState.finished) {
      return;
    }
    courseState.completionStep = Math.max(0, Math.min(step, 2));
    updateCourseProgression();
    persist();
    document.querySelector(`[data-course-finish-step="${courseState.completionStep}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setupCourse() {
    document.querySelectorAll("[data-course-next]").forEach((button) => {
      button.addEventListener("click", () => advanceCourse(Number(button.dataset.courseNextIndex)));
    });
    document.querySelectorAll("[data-course-previous]").forEach((button) => {
      button.addEventListener("click", () => goToPreviousCourseCard(Number(button.dataset.coursePreviousIndex)));
    });
    document.querySelectorAll("[data-progress-card-index]").forEach((button) => {
      button.addEventListener("click", () => goToProgressCourseCard(Number(button.dataset.progressCardIndex)));
    });
    document.querySelectorAll("[data-completion-step]").forEach((button) => {
      button.addEventListener("click", () => showCompletionStep(Number(button.dataset.completionStep)));
    });
    document.querySelector("[data-course-finish]")?.addEventListener("click", finishCourse);
    document.querySelector(".station-nav")?.addEventListener("click", (event) => {
      const link = event.target.closest("[data-section-link]");
      if (!link || courseState.finished) {
        return;
      }
      event.preventDefault();
      const index = courseCards.findIndex((card) => card.id === link.dataset.sectionLink);
      if (index > courseState.reached) {
        showToast("Schließt zuerst die aktuelle Lernkarte ab.");
        return;
      }
      showCourseCard(index);
    });
    updateCourseProgression();
  }

  function openMeasureDialog(id) {
    const measure = measureCatalog[id];
    if (!measure || !measureDialog || !measureDialogTitle || !measureDialogImage
      || !measureDialogDescription || !measureDialogStructure || !measureDialogFunction || !measureDialogMinecraft) {
      return;
    }
    measureDialogTitle.textContent = measure.title;
    measureDialogImage.src = measure.image;
    measureDialogImage.alt = measure.alt;
    measureDialogDescription.textContent = measure.description;
    measureDialogStructure.textContent = measure.structure;
    measureDialogFunction.textContent = measure.function;
    measureDialogMinecraft.textContent = measure.minecraft;
    if (!measureDialog.open) {
      measureDialog.showModal();
    }
  }

  function setupMeasureCatalog() {
    document.querySelectorAll("[data-measure-card]").forEach((card) => {
      card.addEventListener("click", () => openMeasureDialog(card.dataset.measureId));
    });
    document.querySelector("[data-measure-dialog-close]")?.addEventListener("click", () => measureDialog?.close());
    measureDialog?.addEventListener("click", (event) => {
      if (event.target === measureDialog) {
        measureDialog.close();
      }
    });
  }

  function updateReflectionFeedback() {
    const input = document.querySelector("[data-reflection-input]");
    const submit = document.querySelector("[data-reflection-submit]");
    const feedback = document.querySelector("[data-reflection-feedback]");
    const inputFeedback = document.querySelector("[data-reflection-input-feedback]");
    if (!input || !submit || !feedback) {
      return;
    }
    feedback.hidden = !reflectionSubmitted;
    if (!inputFeedback) {
      return;
    }

    const text = input.value.trim().toLocaleLowerCase("de-DE");
    const prompts = [
      [/wasser|regen|bach|teich|dusche|wasserhahn/, "Du hast Wasser bemerkt. Überlege: Woher kommt es – und wohin fließt es nach der Nutzung oder bei Regen?"],
      [/baum|bäum|gras|pflanz|blume|beet|garten|hecke/, "Du hast etwas Grünes bemerkt. Überlege: Wem kann es außer Menschen noch helfen – etwa bei Hitze, Regen oder als Lebensraum?"],
      [/straße|strasse|ampel|bahn|bus|auto|rad|verkehr|weg/, "Du hast einen Weg oder Verkehr bemerkt. Überlege: Wer nutzt ihn und wie könnte er sicherer, kühler oder grüner werden?"],
      [/haus|gebäude|gebaeude|dach|fenster|heizung|klimaanlage/, "Du hast ein Gebäude bemerkt. Überlege: Welche Energie, welches Material oder welche Natur steckt darin oder fehlt dort?"],
      [/essen|lebensmittel|laden|strom|müll|muell|verpackung/, "Du hast eine Versorgungskette bemerkt. Überlege: Welche Natur, Energie oder welche Wege hinter dieser Sache stecken könnten?"]
    ];
    const matched = prompts.find(([pattern]) => pattern.test(text));
    inputFeedback.textContent = !text
      ? "Tipp: Nenne eine konkrete Sache und beschreibe kurz, was dir daran auffällt."
      : text.length < 12
        ? "Schreibe noch ein paar Wörter dazu: Was genau siehst oder benutzt du – und was fällt dir daran auf?"
        : matched
          ? `Gut beobachtet. ${matched[1]}`
          : "Das ist ein Anfang. Mache deine Beobachtung noch konkreter: Was genau siehst du und was könnte daran mit Natur, Technik oder Menschen zusammenhängen?";
  }

  function setupReflection() {
    const input = document.querySelector("[data-reflection-input]");
    const submit = document.querySelector("[data-reflection-submit]");
    if (!input || !submit) {
      return;
    }
    submit.addEventListener("click", () => {
      if (!input.value.trim()) {
        showToast("Schreibe zuerst eine Beobachtung aus deinem Alltag auf.");
        input.focus();
        return;
      }
      reflectionSubmitted = true;
      updateReflectionFeedback();
      updateCourseProgression();
      persist();
    });
    input.addEventListener("input", () => {
      updateReflectionFeedback();
      updateCourseProgression();
    });
    input.addEventListener("change", () => {
      updateReflectionFeedback();
      updateCourseProgression();
    });
    updateReflectionFeedback();
  }

  function updateRadioQuiz(group) {
    const selected = group.querySelector("input:checked");
    const feedback = group.querySelector("[data-quiz-feedback]");
    if (!feedback) {
      return;
    }
    feedback.classList.remove("is-correct", "is-wrong");
    if (!selected) {
      feedback.textContent = "";
      return;
    }
    const correct = selected.value === group.dataset.correct;
    feedback.classList.add(correct ? "is-correct" : "is-wrong");
    feedback.textContent = correct
      ? (selected.dataset.correctFeedback || group.dataset.correctFeedback || "Gut begründet: Diese Entscheidung beachtet die Lebensgrundlage auch für später.")
      : (selected.dataset.wrongFeedback || group.dataset.wrongFeedback || "Prüft noch einmal: Welche Entscheidung berücksichtigt mehrere Bedürfnisse und langfristige Folgen?");

    const comicPanel = group.closest("[data-comic-panel]");
    if (comicPanel) {
      updateComicProgression();
      if (comicPanel.classList.contains("is-active")) {
        showComicPanel(comicIndex);
      }
    }
  }

  function updateSelectQuiz(wrapper) {
    const select = wrapper.querySelector("select");
    const feedback = wrapper.querySelector("[data-select-feedback]");
    if (!select || !feedback) {
      return;
    }
    feedback.classList.remove("is-correct", "is-wrong");
    if (!select.value) {
      feedback.textContent = "";
      return;
    }
    const correct = select.value === wrapper.dataset.correct;
    feedback.classList.add(correct ? "is-correct" : "is-wrong");
    feedback.textContent = wrapper.hasAttribute("data-simple-feedback")
      ? (correct ? "Richtig!" : "Versuch es noch einmal.")
      : (correct ? "Richtig eingeordnet." : `Noch nicht – richtig wäre: ${wrapper.dataset.correct}.`);
  }

  function updateIdeaScores() {
    ["idea_1", "idea_2"].forEach((prefix) => {
      const fields = ["effect", "feasibility", "fairness"].map((suffix) => {
        const name = `${prefix}_${suffix}`;
        return document.querySelector(`[name="${name}"]:checked`) || document.querySelector(`[name="${name}"]`);
      });
      const score = fields.reduce((sum, field) => sum + Number(field?.value || 0), 0);
      const output = document.querySelector(`[data-score-output="${prefix}"]`);
      if (output) {
        output.textContent = `${score} von ${output.dataset.scoreMax || 9} Punkten`;
      }
    });
  }

  function updateGreenhouseVisual() {
    if (!greenhouseGas || !greenhouseResult) {
      return;
    }
    const level = Number(greenhouseGas.value);
    const visual = document.querySelector(".warmth-visual");
    visual?.style.setProperty("--gas-level", String(level));
    visual?.setAttribute("data-gas-level", String(level));
    greenhouseGas.setAttribute("aria-valuetext", `Stufe ${level} von 8: ${level <= 2 ? "weniger zusätzliche Treibhausgase" : level <= 4 ? "mehr zusätzliche Treibhausgase" : level <= 7 ? "viele zusätzliche Treibhausgase" : "extrem viele zusätzliche Treibhausgase"}`);
    if (greenhouseTemperature) {
      greenhouseTemperature.textContent = level <= 2
        ? "🌡️ normal"
        : level <= 4
          ? "🌡️ wärmer"
          : level <= 6
            ? "🌡️ deutlich wärmer"
          : level <= 7
            ? "🌡️ viel wärmer"
            : "⚠️ sehr viel wärmer?";
    }
    const explanation = level <= 1
      ? {
        observation: "Du siehst wenige rote Wärmepfeile zurück zur Erde. Viel Wärme kann im Modell weiter ins Weltall gelangen. Der natürliche Treibhauseffekt bleibt dabei wichtig: Er hält genug Wärme für Leben auf der Erde fest."
      }
      : level <= 2
        ? {
          observation: "Ein Teil der Wärmestrahlung wird von der Atmosphäre aufgenommen und in verschiedene Richtungen wieder abgegeben. Ein anderer Teil kann weiter ins Weltall gelangen. Die Sonne bleibt gleich stark: Der Regler verändert nur die zusätzlichen Treibhausgase."
        }
        : level <= 4
          ? {
            observation: "Mehr rote Wärmepfeile zeigen zurück zur Erde. Die Atmosphäre nimmt mehr Wärmestrahlung auf und gibt sie in verschiedene Richtungen wieder ab. Dadurch bleibt Wärme länger im Klimasystem – nicht weil die Sonne stärker scheint."
          }
          : level <= 6
            ? {
              observation: "Jetzt kehren deutlich mehr Wärmepfeile Richtung Erde zurück. Weniger Wärme kann sofort nach außen weiterziehen. Erde und untere Atmosphäre erwärmen sich, bis sie im Durchschnitt wieder genug Energie ins Weltall abgeben können."
            }
            : level <= 7
              ? {
                observation: "Die warm gefärbte Atmosphäre und viele zurückkehrende Wärmepfeile zeigen eine starke Wärmewirkung. Je mehr zusätzliche Treibhausgase in die Atmosphäre gelangen, desto stärker verändert sich der Wärmehaushalt."
              }
              : {
                observation: "Die Extremstufe zeigt sehr viele zusätzliche Treibhausgase. Das Fragezeichen lädt euch zum Nachdenken ein: Welche Probleme durch Hitze, Starkregen oder Trockenheit erleben wir schon heute? Wie könnten sie sich weiterentwickeln, wenn wir die Ursachen nicht angehen?"
              };
    greenhouseResult.textContent = explanation.observation;
  }

  function setupShootingStars() {
    const visual = document.querySelector(".warmth-visual");
    const starLayer = visual?.querySelector(".shooting-star-layer");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!starLayer || reduceMotion.matches) {
      return;
    }

    const routes = [
      { x: [22, 105], y: [42, 105], dx: [35, 62], dy: [16, 42] },
      { x: [282, 395], y: [28, 96], dx: [-62, -34], dy: [18, 43] },
      { x: [348, 405], y: [190, 272], dx: [-60, -32], dy: [-43, -17] },
      { x: [46, 125], y: [224, 286], dx: [34, 62], dy: [-42, -16] }
    ];
    const randomBetween = (min, max) => min + Math.random() * (max - min);

    function launchShootingStar() {
      if (reduceMotion.matches || document.hidden) {
        scheduleShootingStar();
        return;
      }
      const route = routes[Math.floor(Math.random() * routes.length)];
      const x = randomBetween(...route.x);
      const y = randomBetween(...route.y);
      const dx = randomBetween(...route.dx);
      const dy = randomBetween(...route.dy);
      const tail = randomBetween(18, 34);
      const bend = randomBetween(-9, 9);
      const distance = Math.hypot(dx, dy);
      const tailX = (dx / distance) * tail;
      const tailY = (dy / distance) * tail;
      const star = document.createElementNS("http://www.w3.org/2000/svg", "g");
      star.classList.add("shooting-star");
      const trail = document.createElementNS("http://www.w3.org/2000/svg", "path");
      trail.classList.add("shooting-star-tail");
      trail.setAttribute("stroke-width", String(randomBetween(1, 1.7)));
      trail.setAttribute("d", `M ${x} ${y} C ${x - tailX * .28 + bend} ${y - tailY * .28 - bend} ${x - tailX * .72 - bend * .3} ${y - tailY * .72 + bend * .3} ${x - tailX} ${y - tailY}`);
      const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      head.classList.add("shooting-star-head");
      head.setAttribute("cx", String(x));
      head.setAttribute("cy", String(y));
      head.setAttribute("r", String(randomBetween(.9, 1.4)));
      star.append(trail, head);
      starLayer.append(star);
      const animation = star.animate([
        { opacity: 0, transform: "translate(0px, 0px)" },
        { opacity: 1, offset: .16, transform: `translate(${dx * .16}px, ${dy * .16}px)` },
        { opacity: 0, transform: `translate(${dx}px, ${dy}px)` }
      ], { duration: randomBetween(950, 1450), easing: "cubic-bezier(.2, .65, .35, 1)" });
      animation.addEventListener("finish", () => star.remove(), { once: true });
      scheduleShootingStar();
    }

    function scheduleShootingStar() {
      window.setTimeout(launchShootingStar, randomBetween(10000, 20000));
    }

    scheduleShootingStar();
  }

  function setupPlaneFlights() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const flights = Array.from(document.querySelectorAll(".traffic-plane-flight"));
    if (!flights.length || reduceMotion.matches) {
      return;
    }

    function movePlanes(time) {
      flights.forEach((plane) => {
        const duration = Number(plane.dataset.planeDuration) || 9000;
        const progress = (time % duration) / duration;
        const curve = Math.sin(Math.PI * progress);
        const travelsWest = plane.dataset.planeRoute === "west";
        const xVelocity = travelsWest ? -140 : 140;
        const yVelocity = (travelsWest ? 9 : -12) * Math.PI * Math.cos(Math.PI * progress);
        const x = travelsWest ? 294 - 140 * progress : 154 + 140 * progress;
        const y = travelsWest ? 180 + 9 * curve : 149 - 12 * curve;
        const scale = .42 + .58 * curve;
        const heading = Math.atan2(yVelocity, xVelocity) * 180 / Math.PI + 180;
        plane.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${heading.toFixed(2)}) scale(${scale.toFixed(3)})`);
      });
      window.requestAnimationFrame(movePlanes);
    }

    window.requestAnimationFrame(movePlanes);
  }

  function getSortTarget(board, value) {
    return Array.from(board.querySelectorAll("[data-sort-target]")).find((target) => target.dataset.sortTarget === value);
  }

  function updateSortBoard(board) {
    const cards = Array.from(board.querySelectorAll("[data-sort-card]"));
    const feedback = document.querySelector(board.dataset.boardFeedback);
    let assigned = 0;
    let correctCount = 0;

    cards.forEach((card) => {
      const field = document.querySelector(`[name="${card.dataset.name}"]`);
      const itemFeedback = card.querySelector("[data-item-feedback]");
      const value = field?.value || "";
      const correct = Boolean(value) && value === card.dataset.correct;
      assigned += Number(Boolean(value));
      correctCount += Number(correct);
      card.classList.toggle("is-correct", correct);
      card.classList.toggle("is-wrong", Boolean(value) && !correct);
      if (itemFeedback) {
        itemFeedback.classList.toggle("is-correct", correct);
        itemFeedback.classList.toggle("is-wrong", Boolean(value) && !correct);
        itemFeedback.textContent = !value
          ? ""
          : correct
            ? card.dataset.correctFeedback || "Richtig eingeordnet."
            : card.dataset.wrongFeedback || "Noch nicht – prüfe die Formulierung noch einmal.";
      }
    });

    if (feedback) {
      const complete = cards.length > 0 && assigned === cards.length;
      const allCorrect = complete && correctCount === cards.length;
      feedback.classList.toggle("is-correct", allCorrect);
      feedback.classList.toggle("is-wrong", complete && !allCorrect);
      feedback.textContent = allCorrect
        ? "Alles richtig zugeordnet. Lest die Begründungen an den Karten noch einmal."
        : complete
          ? "Fast: Prüft die Karten mit rotem Hinweis noch einmal und zieht sie in eine andere Spalte."
          : "Zieht jede Karte in eine Kategorie. Die Rückmeldung erscheint direkt an der Karte.";
    }
  }

  function syncSortBoards() {
    document.querySelectorAll("[data-sort-board]").forEach((board) => {
      board.querySelectorAll("[data-sort-card]").forEach((card) => {
        const field = document.querySelector(`[name="${card.dataset.name}"]`);
        const target = getSortTarget(board, field?.value || "");
        const list = target?.querySelector("[data-sort-card-list]");
        if (list && card.parentElement !== list) {
          list.append(card);
        }
      });
      updateSortBoard(board);
    });
  }

  function setupSortBoards() {
    document.querySelectorAll("[data-sort-board]").forEach((board) => {
      let selectedCard = null;
      const cards = Array.from(board.querySelectorAll("[data-sort-card]"));

      const selectCard = (card) => {
        selectedCard = card;
        cards.forEach((item) => {
          const selected = item === card;
          item.classList.toggle("is-selected", selected);
          item.querySelector("[data-sort-card-select]")?.setAttribute("aria-pressed", String(selected));
        });
      };

      const moveCard = (card, target) => {
        const list = target?.querySelector("[data-sort-card-list]");
        const field = card && document.querySelector(`[name="${card.dataset.name}"]`);
        if (!card || !list || !field) {
          return;
        }
        list.append(card);
        field.value = target.dataset.sortTarget;
        selectCard(null);
        updateSortBoard(board);
        updateProgress();
        updateCourseProgression();
        scheduleSave();
      };

      cards.forEach((card) => {
        card.addEventListener("dragstart", (event) => {
          selectCard(card);
          event.dataTransfer?.setData("text/plain", card.dataset.name || "");
          event.dataTransfer.effectAllowed = "move";
        });
        card.addEventListener("dragend", () => card.classList.remove("is-dragging"));
        card.addEventListener("dragstart", () => card.classList.add("is-dragging"));
        card.querySelector("[data-sort-card-select]")?.addEventListener("click", () => selectCard(card));
      });

      board.querySelectorAll("[data-sort-target]").forEach((target) => {
        target.addEventListener("dragover", (event) => {
          event.preventDefault();
          target.classList.add("is-drop-ready");
          if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "move";
          }
        });
        target.addEventListener("dragleave", () => target.classList.remove("is-drop-ready"));
        target.addEventListener("drop", (event) => {
          event.preventDefault();
          target.classList.remove("is-drop-ready");
          const name = event.dataTransfer?.getData("text/plain");
          const card = cards.find((item) => item.dataset.name === name) || selectedCard;
          moveCard(card, target);
        });
        target.querySelector("[data-sort-target-button]")?.addEventListener("click", () => moveCard(selectedCard, target));
      });
    });
    syncSortBoards();
  }

  function updateBudget(changedInput) {
    const options = Array.from(document.querySelectorAll("[data-budget-options] input"));
    if (!options.length || !budgetOutput || !budgetFeedback) {
      return;
    }
    let total = options.filter((input) => input.checked).reduce((sum, input) => sum + Number(input.dataset.cost || 0), 0);
    if (total > 10 && changedInput?.checked) {
      changedInput.checked = false;
      total -= Number(changedInput.dataset.cost || 0);
      budgetFeedback.textContent = "Dafür reichen die 10 Punkte nicht mehr. Wähle etwas anderes ab oder plane eine andere Mischung.";
    } else if (total === 0) {
      budgetFeedback.textContent = "Wählt bis zu 10 Punkte. Denkt an Schatten, Wasser, Wege und Platz zum Wohnen.";
    } else {
      const hasShade = document.querySelector('[name="city_plan_trees"]')?.checked || document.querySelector('[name="city_plan_green"]')?.checked;
      const hasWater = document.querySelector('[name="city_plan_rain"]')?.checked;
      budgetFeedback.textContent = hasShade && hasWater
        ? "Eure Stadt bietet Schatten und kann Regenwasser aufnehmen. Überlegt: Was braucht sie außerdem zum guten Leben?"
        : "Eure Auswahl setzt einen Schwerpunkt. Überlegt, ob Schatten, Grün oder Platz für Regenwasser noch fehlen.";
    }
    budgetOutput.textContent = `${total} von 10 Punkten`;
  }

  function updateFeedbackGroup(group) {
    const selected = group.querySelector("input:checked");
    const feedback = group.querySelector("[data-choice-feedback]");
    if (!feedback) {
      return;
    }
    feedback.classList.remove("is-visible");
    feedback.textContent = selected?.dataset.feedback || group.dataset.emptyFeedback || "";
    if (selected) {
      feedback.classList.add("is-visible");
    }
  }

  function updateProblemMeasures() {
    const selected = document.querySelector('input[name="selected_problem"]:checked');
    document.querySelectorAll("[data-measure-panel]").forEach((panel) => {
      panel.hidden = !selected || panel.dataset.measurePanel !== selected.value;
    });
  }

  function refreshInteractiveFeedback() {
    document.querySelectorAll("[data-quiz-group]").forEach(updateRadioQuiz);
    document.querySelectorAll("[data-select-quiz]").forEach(updateSelectQuiz);
    document.querySelectorAll("[data-feedback-group]").forEach(updateFeedbackGroup);
    updateProblemMeasures();
    updateIdeaScores();
    updateGreenhouseVisual();
    updateBudget();
    syncSortBoards();
  }

  function syncSelectedProblem({ force = false } = {}) {
    const selected = document.querySelector('input[name="selected_problem"]:checked');
    if (!selected || !solutionProblem) {
      return;
    }

    if (force || !solutionProblem.value.trim() || solutionProblem.dataset.fromProblem === "true") {
      solutionProblem.value = selected.value;
      solutionProblem.dataset.fromProblem = "true";
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
  }

  function answersFor(name) {
    const fields = getFields().filter((field) => field.name === name);
    if (!fields.length) {
      const oldAnswer = retiredCardTwoValues[name];
      return Array.isArray(oldAnswer) ? oldAnswer.join(", ") : oldAnswer || "";
    }

    if (fields[0].type === "checkbox") {
      return fields.filter((field) => field.checked).map((field) => field.value).join(", ");
    }
    if (fields[0].type === "radio") {
      return fields.find((field) => field.checked)?.value || "";
    }
    return fields[0].value.trim();
  }

  function firstAnswer(...names) {
    return names.map((name) => answersFor(name)).find(Boolean) || "Noch nicht festgelegt";
  }

  function updateFinalSummary() {
    if (!finalSummary) {
      return;
    }
    const entries = [
      ["Unser Ausgangsproblem", firstAnswer("selected_problem", "build_problem")],
      ["Unser Blick auf den Ort", firstAnswer("research_focus", "research_observation")],
      ["Unsere wichtigste Lösung", firstAnswer("best_solution", "solution_1", "build_measures")],
      ["Unser Minecraft-Schwerpunkt", firstAnswer("build_focus", "build_priority", "presentation_sentence")]
    ];
    finalSummary.replaceChildren(...entries.map(([label, value]) => {
      const item = document.createElement("li");
      const heading = document.createElement("strong");
      const text = document.createElement("span");
      heading.textContent = label;
      text.textContent = value;
      item.append(heading, text);
      return item;
    }));
  }

  function safeAnswer(name) {
    return answersFor(name) || "(noch nicht beantwortet)";
  }

  function createExportText() {
    const retiredCardTwoEntries = [
      ["Wetter oder Klima – Aussage 1 (frühere Version)", "weather_climate_1"],
      ["Wetter oder Klima – Aussage 2 (frühere Version)", "weather_climate_2"],
      ["Wetter oder Klima – Aussage 3 (frühere Version)", "weather_climate_3"],
      ["Wetter oder Klima – Aussage 4 (frühere Version)", "weather_climate_4"],
      ["Markierte Veränderungen (frühere Version)", "industry_changes"],
      ["Vorteil und Umweltproblem (frühere Version)", "industry_balance"]
    ].filter(([, name]) => answersFor(name));
    const sections = [
      {
        title: "1. MENSCHEN UND NATUR FRÜHER",
        entries: [
          ["Comic – Entscheidung im Frühling", "comic_spring"],
          ["Comic – Entscheidung im Sommer", "comic_summer"],
          ["Comic – Entscheidung im Herbst", "comic_autumn"],
          ["Comic – Naturabhängigkeit heute", "comic_today"],
          ["Natur beeinflusst Menschen – Trockenheit", "history_sort_drought"],
          ["Natur beeinflusst Menschen – Wald", "history_sort_forest"],
          ["Natur beeinflusst Menschen – Ackerbau", "history_sort_farming"],
          ["Natur beeinflusst Menschen – Holzeinschlag", "history_sort_logging"],
          ["Alltagsbeobachtung", "history_everyday_observation"]
        ]
      },
      {
        title: "2. NATUR, MENSCHEN UND KLIMA",
        entries: [
          ["Was gibt uns der Wald?", "nature_quiz_forest"],
          ["Verantwortlicher Umgang mit der Umwelt", "nature_quiz_change"],
          ["Gas beim Verbrennen", "industry_quiz_gas"],
          ["Folge von zusätzlichem CO₂", "industry_quiz_warming"],
          ["Wetter oder Klima – heute", "weather_sort_today"],
          ["Wetter oder Klima – morgen", "weather_sort_tomorrow"],
          ["Wetter oder Klima – typische Sommer", "weather_sort_summer"],
          ["Wetter oder Klima – Jahrzehnte", "weather_sort_decades"],
          ["Heute: Wetter oder Klima", "weather_climate_today"],
          ["Typische Sommer: Wetter oder Klima", "weather_climate_typical"],
          ["Wärme-Decke eingestellt auf", "greenhouse_gases"],
          ["Beobachtung bei mehr Treibhausgasen", "greenhouse_observation"],
          ["Erklärung zum Wärmehaushalt", "greenhouse_explanation"],
          ...retiredCardTwoEntries
        ]
      },
      {
        title: "3. KLIMAFOLGEN UND ANPASSUNG",
        entries: [
          ["Klimaschutz oder Anpassung – Solarenergie", "action_type_1"],
          ["Klimaschutz oder Anpassung – Trinkbrunnen", "action_type_2"],
          ["Klimaschutz oder Anpassung – Regenmulde", "action_type_3"],
          ["Klimaschutz oder Anpassung – Radwege", "action_type_4"],
          ["Ausgewähltes Problem", "selected_problem"],
          ["Warum es wichtig ist", "problem_reason"]
        ]
      },
      {
        title: "4. WECHSELWIRKUNGEN VERSTEHEN",
        entries: [
          ["Schwammstadt-Entscheidung", "sponge_city_choice"],
          ["Gesuchte Hinweise", "research_signs"],
          ["Beobachtung oder Vermutung", "research_observation"],
          ["Besonders Betroffene", "research_affected"]
        ]
      },
      {
        title: "5. PLANUNG FÜR EINE KLIMAANGEPASSTE STADT",
        entries: [
          ["Heißer Platz: Entscheidung", "heat_place_choice"],
          ["Plan: Bäume", "city_plan_trees"],
          ["Plan: Grünfläche", "city_plan_green"],
          ["Plan: Solarenergie", "city_plan_solar"],
          ["Plan: Radweg", "city_plan_cycle"],
          ["Plan: Regenrückhaltefläche", "city_plan_rain"],
          ["Plan: Parkplatz", "city_plan_parking"],
          ["Plan: Gebäude", "city_plan_building"],
          ["Problem", "solution_problem"],
          ["Lösung 1", "solution_1"],
          ["Lösung 1 hilft", "solution_1_helps"],
          ["Begründung Lösung 1", "solution_1_reason"],
          ["Lösung 2", "solution_2"],
          ["Lösung 2 hilft", "solution_2_helps"],
          ["Begründung Lösung 2", "solution_2_reason"],
          ["Idee 1 – Wirkung", "idea_1_effect"],
          ["Idee 1 – Machbarkeit", "idea_1_feasibility"],
          ["Idee 1 – Fairness", "idea_1_fairness"],
          ["Idee 2 – Wirkung", "idea_2_effect"],
          ["Idee 2 – Machbarkeit", "idea_2_feasibility"],
          ["Idee 2 – Fairness", "idea_2_fairness"],
          ["Ausgewählte Idee", "best_solution"],
          ["Begründung der Auswahl", "best_solution_reason"],
          ["Kompromiss: Wohnen und Grünfläche", "conflict_housing"],
          ["Kompromiss: Parkplatz und Platz", "conflict_square"],
          ["Standortfrage", "location_choice"],
          ["Rollen-Kompromiss", "role_compromise"]
        ]
      },
      {
        title: "6. JENACRAFT-TRANSFER",
        entries: [
          ["Problem im Bau-Ort", "build_problem"],
          ["Bau-Priorität", "build_priority"],
          ["Drei wichtigste Maßnahmen", "build_measures"],
          ["Schwierige Bau-Entscheidung", "build_difficult_decision"],
          ["Name des Stadtblocks", "build_name"],
          ["Bauidee", "build_idea"],
          ["Bauelement 1", "build_element_1"],
          ["Bauelement 2", "build_element_2"],
          ["Bauelement 3", "build_element_3"],
          ["Maßnahme 1", "build_measure_1"],
          ["Maßnahme 1 – Ort", "build_measure_1_place"],
          ["Maßnahme 1 – Problem und Wirkung", "build_measure_1_effect"],
          ["Maßnahme 1 – Quelle oder Lernkarte", "build_measure_1_source"],
          ["Maßnahme 2", "build_measure_2"],
          ["Maßnahme 2 – Ort", "build_measure_2_place"],
          ["Maßnahme 2 – Problem und Wirkung", "build_measure_2_effect"],
          ["Maßnahme 2 – Quelle oder Lernkarte", "build_measure_2_source"],
          ["Maßnahme 3", "build_measure_3"],
          ["Maßnahme 3 – Ort", "build_measure_3_place"],
          ["Maßnahme 3 – Problem und Wirkung", "build_measure_3_effect"],
          ["Maßnahme 3 – Quelle oder Lernkarte", "build_measure_3_source"],
          ["Präsentationssatz", "presentation_sentence"],
          ["Team-Check", "team_finished"]
        ]
      },
      {
        title: "FAZIT: UNSERE UMSETZUNGSIDEEN",
        entries: [
          ["Unsere wichtigste Idee", "moderation_idea_main"],
          ["So hilft sie", "moderation_idea_effect"],
          ["Hier setzen wir sie um", "moderation_idea_place"],
          ["So bauen wir sie in Minecraft", "moderation_idea_minecraft"]
        ]
      }
    ];

    const lines = [
      "JENACRAFT · KLIMA-LABOR",
      "Digitales Arbeitsblatt – exportierte Antworten",
      `Exportiert: ${new Intl.DateTimeFormat("de-DE", { dateStyle: "long", timeStyle: "short" }).format(new Date())}`,
      "=".repeat(62),
      ""
    ];

    sections.forEach((section) => {
      lines.push(section.title, "-".repeat(section.title.length));
      section.entries.forEach(([label, name]) => {
        lines.push(`${label}:`, safeAnswer(name), "");
      });
    });

    lines.push(
      "WEITERFÜHRENDE QUELLEN",
      "----------------------",
      "Deutscher Wetterdienst: https://www.dwd.de/DE/klimaumwelt/klimawandel/klimawandel_node.html",
      "Umweltbundesamt: https://www.umweltbundesamt.de/themen/klima-energie/klimawandel/haeufige-fragen-klimawandel",
      "Umwelt im Unterricht: https://www.umwelt-im-unterricht.de/hintergrund/klimaveraenderungen-und-extreme-wetterereignisse/",
      "Planet Schule: https://www.planet-schule.de/schwerpunkt/klimawandel/index.html",
      "NASA Climate Kids: https://climatekids.nasa.gov/greenhouse-effect/",
      "Weltklimarat (IPCC): https://www.ipcc.ch/report/ar6/syr/",
      "Weltbiodiversitätsrat (IPBES): https://www.ipbes.net/global-assessment",
      "Wildbichler et al. (2025): https://doi.org/10.1080/03057267.2024.2395206",
      "Davis & Naumann (2017): https://doi.org/10.1007/978-3-319-56091-5_8",
      "Kabisch et al. (2017): https://doi.org/10.1007/978-3-319-56091-5",
      "Kumar et al. (2024): https://doi.org/10.1016/j.xinn.2024.100588",
      "Gesthuizen, Tan & Kidman (2025): https://doi.org/10.1080/10382046.2024.2348265",
      "Impedovo, Cederqvist & Gasparovic (2026): https://doi.org/10.1007/978-3-032-24408-6_10",
      "Vereinte Nationen – Nachhaltigkeitsziele: https://sdgs.un.org/goals",
      "Literaturhinweise: siehe ausführliches Verzeichnis im Arbeitsblatt.",
      ""
    );

    return lines.join("\r\n");
  }

  function exportAnswers() {
    persist();
    const filename = "jenacraft-klima-antworten.txt";
    const blob = new Blob(["\uFEFF", createExportText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Die Antworten wurden als Textdatei exportiert.");
  }

  function clearAll() {
    window.clearTimeout(saveTimer);
    getFields().forEach((field) => {
      if (field.type === "checkbox" || field.type === "radio") {
        field.checked = false;
      } else {
        field.value = "";
      }
    });
    if (solutionProblem) {
      delete solutionProblem.dataset.fromProblem;
    }
    courseState.reached = 0;
    courseState.active = 0;
    courseState.finished = false;
    courseState.completionStep = 0;
    courseState.visited = [0];
    retiredCardTwoValues = {};
    reflectionSubmitted = false;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Gespeicherte Antworten konnten nicht gelöscht werden:", error);
    }
    saveState.textContent = "Alle Eingaben gelöscht";
    updateProgress();
    refreshInteractiveFeedback();
    updateComicProgression();
    updateReflectionFeedback();
    updateCourseProgression();
    showComicPanel(0);
    showToast("Alle Eingaben auf diesem Gerät wurden gelöscht.");
  }

  root.addEventListener("input", (event) => {
    if (event.target === solutionProblem && !event.isTrusted) {
      return;
    }
    if (event.target === solutionProblem) {
      solutionProblem.dataset.fromProblem = "false";
    }
    updateProgress();
    if (event.target === greenhouseGas) {
      updateGreenhouseVisual();
    }
    updateReflectionFeedback();
    updateCourseProgression();
    scheduleSave();
  });

  root.addEventListener("change", (event) => {
    if (event.target.matches('input[name="selected_problem"]')) {
      syncSelectedProblem({ force: true });
      updateProblemMeasures();
    }
    const radioQuiz = event.target.closest("[data-quiz-group]");
    if (radioQuiz) {
      updateRadioQuiz(radioQuiz);
    }
    const feedbackGroup = event.target.closest("[data-feedback-group]");
    if (feedbackGroup) {
      updateFeedbackGroup(feedbackGroup);
    }
    const selectQuiz = event.target.closest("[data-select-quiz]");
    if (selectQuiz) {
      updateSelectQuiz(selectQuiz);
    }
    if (event.target.closest(".idea-score-grid")) {
      updateIdeaScores();
    }
    if (event.target.matches("#greenhouseGas")) {
      updateGreenhouseVisual();
    }
    if (event.target.matches("[data-budget-options] input")) {
      updateBudget(event.target);
    }
    updateProgress();
    updateReflectionFeedback();
    updateCourseProgression();
    scheduleSave();
  });

  saveButton?.addEventListener("click", () => persist({ announce: true }));
  exportButton?.addEventListener("click", exportAnswers);
  finalExportButton?.addEventListener("click", exportAnswers);
  finalResetButton?.addEventListener("click", () => {
    if (window.confirm("Alle Antworten auf diesem Gerät wirklich zurücksetzen?")) {
      clearAll();
      document.querySelector("#start")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  openDeleteDialog?.addEventListener("click", () => {
    confirmDelete.checked = false;
    deleteButton.disabled = true;
    deleteDialog.showModal();
  });

  confirmDelete?.addEventListener("change", () => {
    deleteButton.disabled = !confirmDelete.checked;
  });

  deleteButton?.addEventListener("click", (event) => {
    event.preventDefault();
    if (!confirmDelete.checked) {
      return;
    }
    deleteDialog.close("delete");
    clearAll();
  });

  deleteDialog?.addEventListener("close", () => {
    confirmDelete.checked = false;
    deleteButton.disabled = true;
  });

  deleteDialog?.addEventListener("click", (event) => {
    if (event.target === deleteDialog) {
      deleteDialog.close("cancel");
    }
  });

  window.addEventListener("beforeunload", () => persist());
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      persist();
    }
  });

  const restored = restore();
  setupSortBoards();
  setupComic();
  setupCourse();
  setupMeasureCatalog();
  setupReflection();
  syncSelectedProblem();
  refreshInteractiveFeedback();
  updateProgress();
  setupShootingStars();
  setupPlaneFlights();
})();
