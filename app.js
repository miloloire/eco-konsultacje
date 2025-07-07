const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener ('click', () => {
    hamburger.classList.toggle("active");
    mobile_menu.classList.toggle("active");
});

document.addEventListener('scroll', () => {
    var scroll_position = window.scrollY;
    if (scroll_position > 250) {
     header.style.backgroundColor = '#29323c';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});

menu_item.forEach(item => {
    item.addEventListener ('click', () => {
        hamburger.classList.toggle("active");
        mobile_menu.classList.toggle("active");
    });  
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    const fields = ["name", "email", "message"];
    fields.forEach((fieldName) => {
      const field = form.elements[fieldName];
      const group = field.closest(".form-group");
      const error = group.querySelector(".error-message");
      const icon = group.querySelector(".feedback-icon");

      group.classList.remove("valid", "invalid");
      error.style.display = "none";
      icon.style.display = "none";

      if (field.value.trim() === "") {
        group.classList.add("invalid");
        error.textContent = "To pole jest wymagane.";
        error.style.display = "block";
        icon.style.display = "inline";
        valid = false;
      } else if (
        fieldName === "email" &&
        !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field.value)
      ) {
        group.classList.add("invalid");
        error.textContent = "Nieprawidłowy adres email.";
        error.style.display = "block";
        icon.style.display = "inline";
        valid = false;
      } else {
        group.classList.add("valid");
        icon.style.display = "inline";
      }
    });

    const checkbox = form.querySelector('input[type="checkbox"]');
    const checkboxError = form.querySelector(".checkbox-error");
    if (!checkbox.checked) {
      checkboxError.textContent = "Zgoda jest wymagana.";
      checkboxError.style.display = "block";
      valid = false;
    } else {
      checkboxError.style.display = "none";
    }

    if (valid) {
      // Wyślij formularz przez Formspree
      const formData = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            successMessage.style.display = "block";
            form.reset();
            form.querySelectorAll(".form-group").forEach((g) =>
              g.classList.remove("valid")
            );
          } else {
            alert("Wystąpił błąd. Spróbuj ponownie.");
          }
        })
        .catch(() => {
          alert("Wystąpił błąd sieci. Spróbuj ponownie.");
        });
    }
  });
});
