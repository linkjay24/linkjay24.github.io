document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            if (isVisible) {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(7, 11, 20, 0.95)';
                navLinks.style.backdropFilter = 'blur(15px)';
                navLinks.style.padding = '2rem';
            }
        });
    }

    // Hide mobile menu on link click
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }
    
    // Reset nav links on resize
    window.addEventListener('resize', () => {
        if (navLinks) {
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
                navLinks.style.position = 'static';
                navLinks.style.background = 'transparent';
                navLinks.style.padding = '0';
            } else {
                navLinks.style.display = 'none';
            }
        }
    });

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    // Form submission prevent default (simulation)
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Message Sent <i class="fas fa-check"></i>';
            btn.style.background = '#10B981'; // Green for success
            btn.style.color = '#fff';
            btn.style.borderColor = '#10B981';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
                btn.style.borderColor = '';
                form.reset();
            }, 3000);
        });
    }

    // Interactive Floating Badges Physics (Subtle repulse effect)
    const skillsSection = document.getElementById('skills');
    const badges = document.querySelectorAll('.skill-badge');

    if (skillsSection && badges.length > 0 && window.innerWidth > 768) {
        skillsSection.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            badges.forEach(badge => {
                const rect = badge.getBoundingClientRect();
                const badgeX = rect.left + rect.width / 2;
                const badgeY = rect.top + rect.height / 2;

                const distX = mouseX - badgeX;
                const distY = mouseY - badgeY;
                const distance = Math.sqrt(distX * distX + distY * distY);

                if (distance < 150) {
                    const repelX = (distX / distance) * -15;
                    const repelY = (distY / distance) * -15;
                    badge.style.transform = `translate(${repelX}px, ${repelY}px)`;
                } else {
                    badge.style.transform = '';
                }
            });
        });

        skillsSection.addEventListener('mouseleave', () => {
            badges.forEach(badge => {
                badge.style.transform = '';
            });
        });
    }
});

// Resume Modal Functions
function openResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeResumeModal(event) {
    const modal = document.getElementById('resumeModal');
    if (!modal) return;
    // If called from backdrop click, only close if clicking outside the modal box
    if (event && event.target !== modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('resumeModal');
        if (modal && modal.classList.contains('open')) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    }
});
