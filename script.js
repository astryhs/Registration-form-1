const registeredUsers = [
  { username: "user1", password: "Password1!", email: "user1@example.com" },
  { username: "user2", password: "Password2!", email: "user2@example.com" },
  { username: "user3", password: "Password3!", email: "user3@example.com" },
];

const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const emailError = document.getElementById("email-error");
const successMessage = document.getElementById("success-message");
const nextMessage = document.getElementById("next");

function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
  return usernameRegex.test(username);
}

function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

document.getElementById("register-button").addEventListener("click", () => {
  usernameError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
  emailError.textContent = "";

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const email = document.getElementById("email").value;

  try {
    if (!validateUsername(username)) {
      throw new Error(
        "Логин должен содержать от 3 до 20 символов и состоять только из букв и цифр."
      );
    }

    if (!validatePassword(password)) {
      throw new Error(
        "Пароль должен содержать не менее 8 символов, включая буквы в разных регистрах, цифры и специальные символы."
      );
    }

    if (password !== confirmPassword) {
      throw new Error(
        'Пароли не совпадают, проверьте правильность повторного ввода пароля.'
      );
    }

    if (email && !validateEmail(email)) {
      throw new Error("Введите корректный адрес электронной почты.");
    }

    let userExists = false;
    let emailExists = false;

    for (let i = 0; i < registeredUsers.length; i++) {
      if (registeredUsers[i].username === username) {
        userExists = true;
      }
      if (registeredUsers[i].email === email) {
        emailExists = true;
      }
    }

    if (userExists) {
      throw new Error("Пользователь с данным именем уже существует.");
    }
    if (emailExists) {
      throw new Error("Пользователь с данным email уже существует.");
    }

    successMessage.style.display = "block";
    nextMessage.style.display = "flex";
  } catch (error) {
    if (error.message.includes("Логин") || error.message.includes("именем")) {
      usernameError.textContent = error.message;
    } else if (
      error.message.includes("Пароль") ||
      error.message.includes("совпадают")
    ) {
      passwordError.textContent = error.message;
    } else if (error.message.includes("совпадают")) {
      confirmPasswordError.textContent = error.message;
    } else if (
      error.message.includes("email") ||
      error.message.includes("корректный адрес")
    ) {
      emailError.textContent = error.message;
    }
  }
});
