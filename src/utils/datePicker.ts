export const datePicker = () => {
  $(document).ready(function () {
    // Definiere die regionalen Einstellungen
    $.datepicker.regional['de'] = {
      closeText: 'Schließen',
      prevText: '&#x3C;Zurück',
      nextText: 'Vor&#x3E;',
      currentText: 'Heute',
      monthNames: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
      ],
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mär',
        'Apr',
        'Mai',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Dez',
      ],
      dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      weekHeader: 'KW',
      dateFormat: 'dd.mm.yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: '',
    };
    $.datepicker.setDefaults($.datepicker.regional['de']);

    // Berechne das Datum 21 Tage in der Zukunft
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 21);
    const futureDateString = $.datepicker.formatDate('dd.mm.yy', futureDate);

    // Initialisiere das Input-Feld mit diesem Datum
    $('#datePicker').val(futureDateString);

    // Initialisiere den DatePicker
    $('#datePicker').datepicker({
      minDate: 14, // Benutzer können erst 14 Tage in der Zukunft wählen
      dateFormat: 'dd.mm.yy',
      defaultDate: '+21d', // Standarddatum auf 21 Tage in der Zukunft setzen
    });
  });
};
