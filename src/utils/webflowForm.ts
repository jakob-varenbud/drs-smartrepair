export const webflowForm = () => {
  const form = document.getElementById('b2bform'); // ID ohne #
  if (form) {
    //  sicherstellen, dass das Formular existiert
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const formData = new FormData(form);
      const formDataAsStr = new URLSearchParams(formData).toString(); // Konvertieren der FormData in einen URL-kodierten String

      fetch('https://hooks.zapier.com/hooks/catch/13068713/3077isi/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataAsStr, // Sende den URL-kodierten String
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = 'https://drs-smartrepair.de/danke-fur-ihren-auftrag'; // Erfolgreiche Weiterleitung
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    });
  }
};
