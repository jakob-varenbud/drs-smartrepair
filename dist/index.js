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
      $("#datePicker").datepicker({
        minDate: 14,
        dateFormat: "dd-mm-yy"
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

  // src/utils/zapier.ts
  var zapier = () => {
    document.addEventListener("submit", function(event) {
      if (event.target.matches("#b2bform")) {
        event.preventDefault();
        const datenArray = [];
        document.querySelectorAll(".Select-Field, .is-table, .Text-Field-4").forEach(function(element) {
          const elementData = {};
          if (element.classList.contains("Select-Field")) {
            elementData["select"] = element.value;
          } else if (element.classList.contains("is-table")) {
            elementData["isTable"] = element.value;
          } else if (element.classList.contains("Text-Field-4")) {
            elementData["textField4"] = element.value;
          }
          datenArray.push(elementData);
        });
        const datenString = JSON.stringify(datenArray);
        document.getElementById("verborgenesFeldId").value = datenString;
        event.target.submit();
      }
    });
  };

  // src/index.ts
  formDuplicator();
  datePicker();
  zapier();
})();
//# sourceMappingURL=index.js.map
