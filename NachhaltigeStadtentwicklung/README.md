# JenaCraft – Klima-Labor

Kleine statische Web-App als digitales Arbeitsblatt für den JenaCraft-Ferienworkshop. Die Lernreise führt von Umweltgeschichte und Industrialisierung über heutige Stadt- und Klimaprobleme bis zu zwei begründeten Lösungen und einem Minecraft-Bauplan.

## Enthaltene Dateien

- `index.html` – Inhalte und zugängliche Seitenstruktur
- `styles.css` – responsive Gestaltung für Tablets, Laptops und Smartphones
- `app.js` – automatische Speicherung, Fortschritt und Interaktionslogik
- `README.md` – diese Anleitung

Es gibt keine Abhängigkeiten, kein Framework und keinen Build-Schritt.

## Didaktischer Aufbau und Interaktionen

- ausführliche Einführung in Umweltgeschichte und unterschiedliche Mensch-Natur-Verhältnisse
- vierteiliger Klick-Comic „Ein Jahr im Saaletal – um 1750“ mit gespeicherten Entscheidungen und direkter Rückmeldung
- sechs aufeinander aufbauende Lernkarten: Die nächste Karte wird erst nach dem Abschluss der aktuellen Karte und allen richtigen Quizantworten freigeschaltet
- abschließende Kleingruppenrunde mit Moderationskarten-Fragen; danach ist die gesamte Session zum freien Durchscrollen geöffnet
- Karten-Zuordnungsaufgaben zu Mensch-Natur-Wechselwirkungen sowie Wetter und Klima: per Drag-and-drop oder per Klick-/Tastatur-Alternative; jede Karte gibt direkt fachlich begründetes Feedback
- Verständnisfrage zum Treibhauseffekt: Zusätzliche Treibhausgase verändern den Wärmehaushalt, nicht die Stärke der Sonne
- Lernkarte zur zusätzlichen Erderwärmung mit verständlichen Beispielen zu Hitze, Trockenheit und Starkregen, optionaler Vertiefung und zwei Verständnisfragen; das bestehende Animationsmodell bleibt erhalten
- sechs ausklappbare Erklärungen zu gegenwärtigen Stadt- und Umweltproblemen
- Zuordnung von Klimaschutz und Klimaanpassung mit direkter Rückmeldung
- Stadtforschungs-Check, zwei begründete Lösungsvorschläge und Punktevergleich nach Wirkung, Machbarkeit und Fairness
- Standort- und Rollenaufgabe: Maßnahmen werden als begründete Abwägung statt als eine einzig richtige Lösung behandelt
- Minecraft-Bauplan mit drei sichtbaren Elementen, Ort, Problem, Wirkung und Quellen-/Lernkartenbezug
- sechsteiliges Literaturverzeichnis: verständliche Einstiege, Klimawissenschaft, Klimabildung, Schwammstadt/Stadtklima, Nature-based Solutions sowie Minecraft-Lernwelten
- fachliche Kerninformationen sind im Lerntext mit knappen „Vgl.“-Nachweisen versehen; nach Kursabschluss erscheinen ein persönliches Fazit, Download, Zurücksetzen und das Literaturverzeichnis

## Lokal testen

1. Ein Terminal in diesem Ordner öffnen.
2. Den lokalen Webserver starten:

   ```bash
   python -m http.server 8000
   ```

   Unter Windows funktioniert alternativ oft:

   ```powershell
   py -m http.server 8000
   ```
3. Im Browser `http://localhost:8000/` öffnen.
4. Den Server anschließend im Terminal mit `Strg+C` beenden.

Ein lokaler Webserver ist sinnvoller als ein Doppelklick auf `index.html`, weil die Seite so unter denselben Bedingungen wie auf GitHub Pages läuft.

## In eine bestehende GitHub-Pages-Seite hochladen

Wenn die GitHub-Pages-Seite bereits eingerichtet ist:

1. Den gesamten Ordner in das Repository kopieren, zum Beispiel nach:

   ```text
   src/modules/DAB_klima/
   ```
2. Darauf achten, dass alle vier Dateien gemeinsam in diesem Ordner liegen.
3. Änderungen committen und zu GitHub pushen.
4. Danach lautet die Adresse normalerweise:

   ```text
   https://DEIN-NAME.github.io/REPOSITORY/src/modules/DAB_klima/
   ```

   Bei einem Repository namens `DEIN-NAME.github.io` entfällt der Repository-Teil:

   ```text
   https://DEIN-NAME.github.io/src/modules/DAB_klima/
   ```

Wenn GitHub Pages noch nicht aktiviert ist, im Repository unter **Settings → Pages** die gewünschte Branch-Quelle auswählen. Für ein klassisches Pages-Repository ist das meistens der Branch `main` und der Ordner `/ (root)`.

## Speicherung und Datenschutz

- Alle Antworten werden ausschließlich im `localStorage` des verwendeten Browsers gespeichert.
- Es werden keine Antworten an einen Server gesendet.
- Die automatische Speicherung reagiert auf jede Änderung. Der Kopfbereich zeigt rechts den aktuellen Speicherstand; nach Kursabschluss können die Antworten als Textdatei heruntergeladen oder nach einer Bestätigung zurückgesetzt werden.
- Browserdaten, privater Modus oder ein anderer Browser beziehungsweise Hostname können dazu führen, dass frühere Antworten nicht verfügbar sind.

## Kurzer Funktionstest

Nach dem Start sollten folgende Punkte geprüft werden:

1. Ein Feld ausfüllen und die Seite neu laden: Der Eintrag erscheint wieder.
2. Mehrere Aufgaben bearbeiten: Fortschrittsbalken und Stationsstatus ändern sich.
3. Durch die sechs Lernkarten navigieren: Gesperrte Karten lassen sich nicht öffnen, Quizkarten erst nach allen richtigen Antworten abschließen.
4. Nach Lernkarte 6 den Kurs abschließen: Die Moderationskarten-Runde und das freie Durchscrollen der gesamten Session werden sichtbar.
5. Die zwei Fragen zu CO₂ und Erwärmung sowie Klimaschutz/Klimaanpassung zuordnen.
6. Die sechs Bewertungsfelder für die beiden Lösungsideen ausfüllen: Beide Punktsummen aktualisieren sich.
7. Ein Problem in Station 3 wählen: Es wird in Station 5 übernommen.
8. Eine neue Sortieraufgabe lösen, die Seite neu laden und die Auswahl kontrollieren; alle neuen Eingaben werden wie die vorhandenen Felder im Browser gespeichert.
9. Das Browserfenster schmal ziehen: Markenname, Fortschritt und Speicherstand bleiben ohne horizontales Scrollen lesbar.

JavaScript-Syntax kann zusätzlich mit Node.js geprüft werden:

```bash
node --check app.js
```

## Weiterführende Quellen

Die Inhalte sind altersgerecht zusammengefasst. Das Arbeitsblatt enthält drei gegliederte Literaturbereiche: zugängliche Einstiege für die Gruppe, fachliche Berichte und Datengrundlagen sowie Literatur zu Umweltgeschichte und Geschichtsdidaktik. Verlinkt sind unter anderem DWD, Umweltbundesamt, Umwelt im Unterricht, IPCC, IPBES, Vereinte Nationen und sechs umwelthistorische Veröffentlichungen.
#� �D�i�g�i�A�B�_�K�l�i�m�a�s�c�h�u�t�z�
�
�
