// Mobile Menu Logic
const hamburger = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');
const closeBtn = document.getElementById('closeBtn');
const drawerOverlay = document.getElementById('drawerOverlay'); 
const drawerLinks = document.querySelectorAll('.drawer-links li a');

// Function to Open Drawer
const openDrawer = () => {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
};

// Function to Close Drawer
const closeDrawer = () => {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; 
};

hamburger.addEventListener('click', openDrawer);
closeBtn.addEventListener('click', closeDrawer);


drawerOverlay.addEventListener('click', closeDrawer);


drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
});

document.querySelectorAll(".nav-links li a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
}));

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Trigger reveal on load for hero section
window.onload = reveal;


const phoneInput = document.querySelector("#phone");
const iti = window.intlTelInput(phoneInput, {
    initialCountry: "in",
    separateDialCode: true,
    autoPlaceholder: "off", 
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});


phoneInput.placeholder = "Enter phone number";

phoneInput.addEventListener('input', function() {
    
    this.value = this.value.replace(/\D/g, '');

    
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
});


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const phoneNumber = phoneInput.value.trim();
    const userName = document.querySelector('input[name="name"]').value.trim();

    // 1. Validation check
    if (phoneNumber.length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        phoneInput.focus();
        return; 
    }

    // 2. Google Sheet Connection
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz8bPFfokxuZnrZX_4QMfp_57cKKzAiXa9fH28Tx3i9yXZYqDBRmdNjpo5jpifR6OVC/exec'; 
    fetch(scriptURL, { method: 'POST', body: new FormData(this) })
    .then(response => {
        const fullNumber = iti.getNumber();
        alert(`Thank you ${userName}! Your message has been sent. We will call you soon on ${fullNumber}.`);
        this.reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('Something went wrong. Please try again.');
    });
});
