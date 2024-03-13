// Exportiert eine Funktion als ES6-Modul, die für die Verdopplung von Formularelementen verantwortlich ist
export const formDuplicator = () => {
  let cloneCount = 0; // Zählvariable für die Anzahl der durchgeführten Klonvorgänge

  // Fügt einen Event-Listener hinzu, der auf das vollständige Laden des DOM wartet
  document.addEventListener('DOMContentLoaded', () => {
    // Sucht den Button durch seine ID
    const verdoppelnBtn = document.getElementById('verdoppelnButton');
    // Fügt dem Button einen Click-Event-Listener hinzu, der die Funktion 'verdoppeln' ausführt
    verdoppelnBtn.addEventListener('click', verdoppeln);
  });

  // Die Funktion 'verdoppeln' wird aufgerufen, wenn der Benutzer auf den Button klickt
  function verdoppeln() {
    cloneCount++; // Erhöht die Klonzählvariable um eins

    // Referenziert das Original-Formularcontainer-Element durch seine ID
    const formContainer = document.getElementById('formContainer');
    // Fügt das Originalformular zur Klasse 'form-clone' hinzu, falls noch nicht geschehen
    formContainer.classList.add('form-clone');

    // Erstellt eine Kopie (Klon) des Formularcontainers
    const clone = formContainer.cloneNode(true);

    // Eindeutiges Suffix generieren, das auf den aktuellen Zeitpunkt und den Klonzähler basiert
    const uniqueSuffix = Date.now() + '-' + cloneCount;
    // Durchläuft alle geklonten Elemente mit einer ID
    clone.querySelectorAll('[id]').forEach((element) => {
      const originalId = element.id;
      // Setzt neue eindeutige IDs und Namen für die geklonten Elemente
      element.id = `${originalId}-${uniqueSuffix}`;
      if (element.name) {
        element.name = `${element.name}-${uniqueSuffix}`;
      }
      // Setzt den Zustand von Input-Elementen zurück
      if (element.tagName === 'INPUT') {
        element.checked = false; // Setzt Radio-Buttons und Checkboxen zurück
        element.value = ''; // Setzt den Wert von Textfeldern zurück
      }
      // Aktualisiert das 'for'-Attribut im Label, um es auf das neue Input-Element zu beziehen
      const label = clone.querySelector(`label[for="${originalId}"]`);
      if (label) {
        label.setAttribute('for', `${originalId}-${uniqueSuffix}`);
      }
    });

    // Entfernt den Uploadcare-Button im Klon, sodass er nicht dupliziert erscheint
    const clonedUploadcareButton = clone.querySelector('.uploadcare--widget');
    if (clonedUploadcareButton) {
      clonedUploadcareButton.remove(); // Entfernt den Button
    }

    // Bestimmt das zuletzt hinzugefügte geklonte Element und fügt den neuen Klon direkt danach ein
    const lastClone = document.querySelectorAll('.form-clone').length
      ? document.querySelectorAll('.form-clone')[
          document.querySelectorAll('.form-clone').length - 1
        ]
      : formContainer;
    lastClone.parentNode.insertBefore(clone, lastClone.nextSibling);
  }
};
