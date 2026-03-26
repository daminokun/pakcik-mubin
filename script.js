/**
 * Shared JavaScript for all pages.
 * Keeps behavior minimal and beginner-friendly.
 */
document.addEventListener("DOMContentLoaded", () => {
    setupActiveNav();
    setupMobileMenu();
    setFooterYear();
    setupRevealAnimation();
    setupContactForm();
});

/**
 * Highlight the active page in the navigation.
 */
function setupActiveNav() {
    const page = document.body.dataset.page;
    const link = document.querySelector(`[data-nav="${page}"]`);
    if (link) {
        link.classList.add("is-active");
    }
}

/**
 * Handle mobile menu open/close behavior.
 */
function setupMobileMenu() {
    const button = document.getElementById("menuBtn");
    const nav = document.getElementById("siteNav");
    if (!button || !nav) return;

    button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        nav.classList.toggle("open");
    });

    // Close menu after selecting any link on mobile.
    nav.querySelectorAll("a").forEach((anchor) => {
        anchor.addEventListener("click", () => {
            nav.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
        });
    });
}

/**
 * Insert current year in footer.
 */
function setFooterYear() {
    const year = document.getElementById("currentYear");
    if (year) year.textContent = String(new Date().getFullYear());
}

/**
 * Small reveal animation for cards when entering viewport.
 */
function setupRevealAnimation() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length || !("IntersectionObserver" in window)) {
        items.forEach((item) => item.classList.add("show"));
        return;
    }
/**
 *scroll baru keluar element
 */
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    items.forEach((item) => observer.observe(item));
}

/**
 * Handle contact form submission for static hosting.
 * Prevents 405 errors by avoiding direct POST requests.
 */
function setupContactForm() {
    const form = document.getElementById("contactForm");
    const feedback = document.getElementById("formFeedback");
    if (!form || !feedback) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            feedback.textContent = "Please complete all required fields correctly.";
            feedback.classList.add("is-error");
            return;
        }

        feedback.textContent = "Thanks! Your message has been recorded locally (demo mode).";
        feedback.classList.remove("is-error");
        form.reset();
    });
}
