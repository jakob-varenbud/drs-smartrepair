"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/datePicker.ts
  var datePicker = () => {
    $(document).ready(function() {
      $.datepicker.regional["de"] = {
        closeText: "Schlie\xDFen",
        prevText: "&#x3C;Zur\xFCck",
        nextText: "Vor&#x3E;",
        currentText: "Heute",
        monthNames: [
          "Januar",
          "Februar",
          "M\xE4rz",
          "April",
          "Mai",
          "Juni",
          "Juli",
          "August",
          "September",
          "Oktober",
          "November",
          "Dezember"
        ],
        monthNamesShort: [
          "Jan",
          "Feb",
          "M\xE4r",
          "Apr",
          "Mai",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Okt",
          "Nov",
          "Dez"
        ],
        dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        weekHeader: "KW",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
      };
      $.datepicker.setDefaults($.datepicker.regional["de"]);
      const futureDate = /* @__PURE__ */ new Date();
      futureDate.setDate(futureDate.getDate() + 21);
      const futureDateString = $.datepicker.formatDate("dd.mm.yy", futureDate);
      $("#datePicker").val(futureDateString);
      $("#datePicker").datepicker({
        minDate: 14,
        // Benutzer können erst 14 Tage in der Zukunft wählen
        dateFormat: "dd.mm.yy",
        defaultDate: "+21d"
        // Standarddatum auf 21 Tage in der Zukunft setzen
      });
    });
  };

  // src/utils/formDuplicator.ts
  var formDuplicator = () => {
    let cloneCount = 0;
    document.addEventListener("DOMContentLoaded", () => {
      const verdoppelnBtn = document.getElementById("verdoppelnButton");
      verdoppelnBtn.addEventListener("click", verdoppeln);
    });
    function verdoppeln() {
      cloneCount++;
      const formContainer = document.getElementById("formContainer");
      formContainer.classList.add("form-clone");
      const clone = formContainer.cloneNode(true);
      const uniqueSuffix = Date.now() + "-" + cloneCount;
      clone.querySelectorAll("[id]").forEach((element) => {
        const originalId = element.id;
        element.id = `${originalId}-${uniqueSuffix}`;
        if (element.name) {
          element.name = `${element.name}-${uniqueSuffix}`;
        }
        if (element.tagName === "INPUT") {
          element.checked = false;
          element.value = "";
        }
        const label = clone.querySelector(`label[for="${originalId}"]`);
        if (label) {
          label.setAttribute("for", `${originalId}-${uniqueSuffix}`);
        }
      });
      const clonedUploadcareButton = clone.querySelector(".uploadcare--widget");
      if (clonedUploadcareButton) {
        clonedUploadcareButton.remove();
      }
      const lastClone = document.querySelectorAll(".form-clone").length ? document.querySelectorAll(".form-clone")[document.querySelectorAll(".form-clone").length - 1] : formContainer;
      lastClone.parentNode.insertBefore(clone, lastClone.nextSibling);
    }
  };

  // src/utils/webflowForm.ts
  var webflowForm = () => {
    const form = document.getElementById("b2bform");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const formData = new FormData(form);
        const formDataAsStr = new URLSearchParams(formData).toString();
        fetch("https://hooks.zapier.com/hooks/catch/13068713/3077isi/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formDataAsStr
          // Sende den URL-kodierten String
        }).then((response) => {
          if (response.ok) {
            window.location.href = "https://drs-smartrepair.de/danke-fur-ihren-auftrag";
          } else {
            throw new Error("Network response was not ok.");
          }
        }).catch((error) => {
          console.error("There has been a problem with your fetch operation:", error);
        });
      });
    }
  };

  // src/index.ts
  formDuplicator();
  datePicker();
  webflowForm();
})();
//# sourceMappingURL=index.js.map
