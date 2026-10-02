/**
 * NKM INDUSTRIES | Executive Interactive Logic
 * Soaring Towards Industrial Revolution
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileDrawer) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close drawer when any link inside is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Navbar Elevation on Scroll ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }, { passive: true });
    }

    // --- Active Link Tracker (ScrollSpy) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 140;
                const sectionId = current.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { passive: true });
    }

    // --- Contact Form Submission Handling ---
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalMessage = document.getElementById('modalMessage');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract input values safely
            const fullNameEl = document.getElementById('fullName');
            const emailEl = document.getElementById('email');
            const phoneEl = document.getElementById('phone');
            const divisionEl = document.getElementById('divisionSelect');
            const messageEl = document.getElementById('message');

            const fullName = fullNameEl ? fullNameEl.value.trim() : 'Valued Client';
            const email = emailEl ? emailEl.value.trim() : '';
            const phone = phoneEl && phoneEl.value.trim() ? phoneEl.value.trim() : 'Not specified';
            const division = divisionEl ? divisionEl.value : 'General Inquiry';
            const message = messageEl ? messageEl.value.trim() : '';

            // Button loading feedback
            if (submitBtn) {
                const originalBtnContent = submitBtn.innerHTML;
                submitBtn.innerHTML = `
                    <span>Transmitting Data...</span>
                    <span class="pulse-dot"></span>
                `;
                submitBtn.disabled = true;

                setTimeout(() => {
                    // Restore button
                    submitBtn.innerHTML = originalBtnContent;
                    submitBtn.disabled = false;

                    // Update modal with personalized details
                    if (modalMessage) {
                        modalMessage.innerHTML = `
                            Thank you, <strong>${fullName}</strong>.<br><br>
                            Your inquiry regarding <strong>${division}</strong> has been transmitted directly to the NKM executive desk in Durban. 
                            A divisional specialist will respond to <strong>${email}</strong>${phone !== 'Not specified' ? ` and via WhatsApp (${phone})` : ''} shortly.
                        `;
                    }

                    // Show modal
                    if (successModal) {
                        successModal.classList.add('active');
                    }

                    // Reset form
                    contactForm.reset();
                }, 800);
            }
        });
    }

    // Modal Close logic
    if (successModal) {
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                successModal.classList.remove('active');
            });
        }

        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && successModal.classList.contains('active')) {
                successModal.classList.remove('active');
            }
        });
    }
});

/**
 * Division Pre-Selection Helper
 * Triggers when clicking any division card's action button
 */
function selectDivision(divisionName) {
    const select = document.getElementById('divisionSelect');
    const message = document.getElementById('message');

    if (select) {
        select.value = divisionName;
        select.classList.add('highlight-select');
        setTimeout(() => {
            select.classList.remove('highlight-select');
        }, 2000);
    }

    if (message) {
        if (divisionName.includes('Web Development')) {
            message.placeholder = 'e.g. We are looking for a business website and monthly digital marketing...';
        } else if (divisionName.includes('Tech Solutions')) {
            message.placeholder = 'e.g. We need custom software, cloud architecture, or managed IT support...';
        } else if (divisionName.includes('Training Academy')) {
            message.placeholder = 'e.g. We are interested in B-BBEE learnerships or corporate workforce upskilling...';
        }
    }
}
