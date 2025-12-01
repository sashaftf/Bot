// script.js
// Анимация появления при скролле
const elements = document.querySelectorAll('.fade-in');
function showElements() {
    const trigger = window.innerHeight * 0.85;
    elements.forEach(el => {
        if (el.getBoundingClientRect().top < trigger) el.classList.add('show');
    });
}
window.addEventListener('scroll', showElements);
window.addEventListener('load', showElements);

// Плавный скролл
function scrollToBlock(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Маска телефона
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", function(e) {
    let value = this.value.replace(/\D/g, "");
    if (value.startsWith("7") || value.startsWith("8")) value = value.substring(1);
    value = value.substring(0, 10);

    let formatted = "+7 ";
    if (value.length > 0) formatted += "(" + value.substring(0,3);
    if (value.length >= 3) formatted += ") " + value.substring(3,6);
    if (value.length >= 6) formatted += "-" + value.substring(6,8);
    if (value.length >= 8) formatted += "-" + value.substring(8,10);
    this.value = formatted;
});

// Отправка в Telegram
const BOT_TOKEN = "ТВОЙ_НОВЫЙ_ТОКЕН";        // ← ОБЯЗАТЕЛЬНО ЗАМЕНИ!
const CHAT_ID = "ТВОЙ_CHAT_ID";              // ← ОБЯЗАТЕЛЬНО ЗАМЕНИ!
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;

    const message = `
<b>Новая заявка с сайта CleanHome</b>
<b>Имя:</b> ${name}
<b>Телефон:</b> ${phone}
<b>Услуга:</b> ${service}
    `;

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                parse_mode: "HTML",
                text: message
            })
        });
        document.getElementById("status").innerHTML = "Заявка успешно отправлена!";
        document.getElementById("status").style.color = "green";
        document.getElementById("contactForm").reset();
    } catch(error) {
        document.getElementById("status").innerHTML = "Ошибка отправки!";
        document.getElementById("status").style.color = "red";
    }
});
