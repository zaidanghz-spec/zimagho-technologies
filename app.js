/* ==========================================================================
   ZIMAGHO TECHNOLOGIES - CORE JAVASCRIPT MODULE & SPA ENGINE
   Accenture, Deloitte & Palantir Level Interaction Engineering
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. ROUTING SYSTEM (SPA)
       ========================================================================== */
    const views = {
        '': 'view-home',
        '/': 'view-home',
        '/about': 'view-about',
        '/healthcare': 'view-healthcare',
        '/government': 'view-government',
        '/technology': 'view-technology',
        '/portfolio': 'view-portfolio',
        '/insights': 'view-insights',
        '/contact': 'view-contact'
    };

    function router() {
        const hash = window.location.hash.slice(1) || '/';
        const targetViewId = views[hash] || 'view-home';

        // Hide all views and remove active state
        document.querySelectorAll('.view-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        // Show active view with smooth animation
        const activePanel = document.getElementById(targetViewId);
        if (activePanel) {
            activePanel.classList.add('active');
        }

        // Update Nav Menu Links (Desktop)
        document.querySelectorAll('.desktop-nav .nav-link, .desktop-nav .nav-btn-outline').forEach(link => {
            const linkView = link.getAttribute('data-view');
            const targetCleaned = targetViewId.replace('view-', '');
            
            if (linkView === targetCleaned) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update Mobile Drawer Links
        document.querySelectorAll('.mobile-nav-links .mobile-nav-link').forEach(link => {
            const linkView = link.getAttribute('data-view');
            const targetCleaned = targetViewId.replace('view-', '');
            
            if (linkView === targetCleaned) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Reset scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Close mobile drawer if it was open
        closeMobileDrawer();

        // Control high-CPU processes depending on active view
        if (targetViewId === 'view-home') {
            startCanvasParticles();
        } else {
            stopCanvasParticles();
        }
    }

    window.addEventListener('hashchange', router);
    // Trigger initial route load
    router();

    /* ==========================================================================
       9. LIVE TELEMETRY SIMULATOR (COMMAND CENTER MOCKUP)
       ========================================================================== */
    const telemetryContainer = document.querySelector('.telemetry-log');
    const logs = [
        "SatuSehat HL7 FHIR sync verified.",
        "Zero-trust audit: secure.",
        "SPBE provincial portal replica active.",
        "Database replica lag: 12ms nominal.",
        "ISO 27001 continuous check: passed.",
        "TFLOPS load optimization threshold: 42%.",
        "National clinical node 44: active.",
        "Cyber NOC: no intrusion anomalies detected.",
        "BPJS claims automation queue: reconciled."
    ];

    function startLiveTelemetry() {
        if (!telemetryContainer) return;
        
        setInterval(() => {
            const timeString = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const randomMsg = logs[Math.floor(Math.random() * logs.length)];
            
            // Create log entry element
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            
            // Add styled time and message
            const timeSpan = document.createElement('span');
            timeSpan.className = 'time';
            timeSpan.innerText = `[${timeString}] `;
            
            const msgSpan = document.createElement('span');
            msgSpan.className = 'msg';
            if (randomMsg.includes("secure") || randomMsg.includes("passed") || randomMsg.includes("verified")) {
                msgSpan.className = 'msg text-success';
            }
            msgSpan.innerText = randomMsg;
            
            entry.appendChild(timeSpan);
            entry.appendChild(msgSpan);
            
            // Append and maintain exactly 4 lines maximum to prevent overflow
            telemetryContainer.appendChild(entry);
            
            const entries = telemetryContainer.querySelectorAll('.log-entry');
            if (entries.length > 4) {
                entries[0].remove();
            }
        }, 3200);
    }
    
    // Start the live simulation if we are on the homepage
    startLiveTelemetry();


    /* ==========================================================================
       2. MOBILE DRAWER SYSTEM
       ========================================================================== */
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('drawer-close-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');

    if (menuBtn && mobileDrawer && drawerOverlay) {
        menuBtn.addEventListener('click', openMobileDrawer);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMobileDrawer);
    }
    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeMobileDrawer);
    }

    function openMobileDrawer() {
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }

    function closeMobileDrawer() {
        if (mobileDrawer) mobileDrawer.classList.remove('open');
        if (drawerOverlay) drawerOverlay.classList.remove('open');
        document.body.style.overflow = ''; // Resume scrolling
    }


    /* ==========================================================================
       3. SHRINKING FIXED HEADER ON SCROLL
       ========================================================================== */
    const header = document.getElementById('site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });


    /* ==========================================================================
       4. INTERACTIVE DIGITAL CANOPY (HERO CANVAS PARTICLES)
       ========================================================================== */
    const canvas = document.getElementById('hero-canvas');
    let ctx = null;
    let animationFrameId = null;
    let particles = [];
    const maxParticles = 65;
    const connectionDist = 110;
    
    const mouse = {
        x: null,
        y: null,
        radius: 130
    };

    function startCanvasParticles() {
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        resizeCanvas();
        initParticles();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        animateParticles();
    }

    function stopCanvasParticles() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
    }

    function resizeCanvas() {
        if (canvas) {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
    }

    function handleMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }

    function handleMouseLeave() {
        mouse.x = null;
        mouse.y = null;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce on boundaries
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            // Mouse interaction physics (mild repulsion)
            if (mouse.x !== null && mouse.y !== null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let force = (mouse.radius - dist) / mouse.radius;
                    let angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 1.5;
                    this.y += Math.sin(angle) * force * 1.5;
                }
            }
        }

        draw() {
            if (!ctx) return;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#0052CC';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw and update particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        // Draw network line connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDist) {
                    let alpha = (1 - dist / connectionDist) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 200, 150, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        animationFrameId = requestAnimationFrame(animateParticles);
    }


    /* ==========================================================================
       5. IMPACT STATS ANIMATED COUNTER (INTERSECTION OBSERVER)
       ========================================================================== */
    const counterSection = document.getElementById('counter-section');
    let hasCounted = false;

    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                animateCounters();
                hasCounted = true;
            }
        }, { threshold: 0.15 });

        observer.observe(counterSection);
    }

    function animateCounters() {
        const counters = document.querySelectorAll('.counter-number');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            let current = 0;
            const duration = 1800; // ms
            const stepTime = 20; // ms
            const steps = duration / stepTime;
            const increment = target / steps;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Formatter logic for decimals vs clean counts
                if (target === 99.9) {
                    counter.innerText = current.toFixed(1) + '%';
                } else if (target === 24) {
                    counter.innerText = Math.round(current) + '/7';
                } else if (target === 100) {
                    counter.innerText = Math.round(current) + '%';
                } else {
                    counter.innerText = Math.round(current) + '+';
                }
            }, stepTime);
        });
    }


    /* ==========================================================================
       6. INSIGHTS SEARCH & INTERACTIVE BADGES ENGINE
       ========================================================================== */
    const searchInput = document.getElementById('insights-search');
    const filterContainer = document.getElementById('category-filter-container');
    const articleCards = document.querySelectorAll('.article-card');

    let activeCategory = 'all';
    let searchQuery = '';

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterArticles();
        });
    }

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-badge')) {
                // Update active class on badges
                document.querySelectorAll('.filter-badge').forEach(badge => {
                    badge.classList.remove('active');
                });
                e.target.classList.add('active');
                
                activeCategory = e.target.getAttribute('data-category');
                filterArticles();
            }
        });
    }

    function filterArticles() {
        articleCards.forEach(card => {
            const categoryData = card.getAttribute('data-category');
            const title = card.querySelector('h3').innerText.toLowerCase();
            const desc = card.querySelector('p').innerText.toLowerCase();
            
            const matchesCategory = activeCategory === 'all' || categoryData.includes(activeCategory);
            const matchesSearch = title.includes(searchQuery) || desc.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                // Trigger smooth fade-in
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    }


    /* ==========================================================================
       7. CORPORATE SUBSIDIARIES ORG CHART INTERACTION
       ========================================================================== */
    const subsidiaries = {
        'healthtech': {
            title: 'Zimagho HealthTech',
            tag: 'HEALTHCARE SECTOR SPECIALIST',
            desc: 'Empowering healthcare networks and regional hospitals through clinical intelligence, patient management, and SatuSehat interoperability modules. Zimagho HealthTech acts as the primary developer for modern electronic medical records systems across the archipelago.',
            focus: [
                'Hospital Information Management Systems (HIMS)',
                'Clinical Decision Support Systems (CDSS)',
                'National Health Data Integration (SatuSehat HL7 FHIR)'
            ]
        },
        'govtech': {
            title: 'Zimagho GovTech',
            tag: 'PUBLIC TRANSFORMATION PARTNER',
            desc: 'Modernizing government digital architectures. Zimagho GovTech supports ministries and local administrations in implementing unified civil services, SPBE auditing portals, and high-security metropolitan databases.',
            focus: [
                'Sistem Pemerintahan Berbasis Elektronik (SPBE) Architectures',
                'Integrated Public Services Portal Suite',
                'Smart City Central Command platforms'
            ]
        },
        'ailabs': {
            title: 'Zimagho AI Labs',
            tag: 'SPECIALIZED RESEARCH INSTITUTE',
            desc: 'The deep computational engine of the holding group. Zimagho AI Labs conducts core research into localized Large Language Models, custom computer vision telemetry, and predictive public resource forecasting models.',
            focus: [
                'Localized LLM Finetuning & Quantization pipelines',
                'Computer Vision & Object Detection for Traffic Control',
                'Predictive Public Resource Telemetry Models'
            ]
        },
        'infra': {
            title: 'Zimagho Digital Infrastructure',
            tag: 'HIGH-AVAILABILITY CLOUD PROVIDER',
            desc: 'Securing state data pipelines and municipal channels. We engineer high-availability hybrid clouds, containerized failover ecosystems, zero-trust network identity guards, and sovereign database nodes.',
            focus: [
                'SOVCLOUD Sovereign Hybrid Cloud Environments',
                'Zero-Trust Identity & Access Management (IAM)',
                'SOCOPS 24/7 Security Operations Center monitoring'
            ]
        }
    };

    document.querySelectorAll('.tree-node.child.clickable').forEach(node => {
        node.addEventListener('click', (e) => {
            const branch = node.closest('.tree-branch');
            const subKey = branch.getAttribute('data-sub');
            const subData = subsidiaries[subKey];

            if (!subData) return;

            // Toggle active visual state in org tree
            document.querySelectorAll('.tree-node.child.clickable').forEach(n => {
                n.classList.remove('active');
            });
            node.classList.add('active');

            // Animate details transition inside details box
            const drawer = document.getElementById('subsidiary-drawer');
            if (drawer) {
                drawer.style.opacity = '0';
                drawer.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    document.getElementById('sub-drawer-title').innerText = subData.title;
                    
                    const tagEl = document.getElementById('sub-drawer-tag');
                    tagEl.innerText = subData.tag;
                    
                    // Style tag colors dynamically based on segment
                    if (subKey === 'healthtech') {
                        tagEl.style.color = 'var(--accent)';
                        tagEl.style.backgroundColor = 'rgba(0, 200, 150, 0.08)';
                        tagEl.style.borderColor = 'rgba(0, 200, 150, 0.15)';
                    } else {
                        tagEl.style.color = 'var(--secondary)';
                        tagEl.style.backgroundColor = 'rgba(0, 153, 255, 0.08)';
                        tagEl.style.borderColor = 'rgba(0, 153, 255, 0.15)';
                    }

                    document.getElementById('sub-drawer-desc').innerText = subData.desc;
                    
                    const focusList = document.getElementById('sub-drawer-focus');
                    focusList.innerHTML = '';
                    subData.focus.forEach(item => {
                        const li = document.createElement('li');
                        li.innerText = item;
                        focusList.appendChild(li);
                    });

                    drawer.style.opacity = '1';
                    drawer.style.transform = 'translateY(0)';
                }, 200);
            }
        });
    });


    /* ==========================================================================
       8. CONSULTATION FORM HANDLER & VALIDATION
       ========================================================================== */
    const form = document.getElementById('consultation-form');
    const formContainer = document.getElementById('form-container');
    const successCard = document.getElementById('form-success-card');
    const resetFormBtn = document.getElementById('btn-reset-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Execute validation checks
            if (validateForm()) {
                // If validation succeeds, process submission
                const name = document.getElementById('contact-name').value;
                const org = document.getElementById('contact-org').value;
                const email = document.getElementById('contact-email').value;
                const sector = document.getElementById('contact-industry').value;
                
                // Hide input container, show success ticket
                formContainer.style.display = 'none';
                
                // Setup receipt items dynamically
                document.getElementById('ref-id').innerText = 'ZIM-' + Math.floor(100000 + Math.random() * 900000);
                document.getElementById('rec-org').innerText = org;
                document.getElementById('rec-sector').innerText = sector;
                
                const timeString = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                document.getElementById('rec-time').innerText = timeString + ' (WIB)';

                successCard.style.display = 'block';
            }
        });
    }

    if (resetFormBtn && form) {
        resetFormBtn.addEventListener('click', () => {
            form.reset();
            
            // Clean active classes
            document.querySelectorAll('.form-group').forEach(grp => {
                grp.classList.remove('invalid');
            });
            
            successCard.style.display = 'none';
            formContainer.style.display = 'block';
        });
    }

    function validateForm() {
        let isValid = true;
        
        const inputs = [
            { id: 'contact-name', errId: 'err-name' },
            { id: 'contact-org', errId: 'err-org' },
            { id: 'contact-email', errId: 'err-email', validator: validateEmail },
            { id: 'contact-phone', errId: 'err-phone', validator: validatePhone },
            { id: 'contact-industry', errId: 'err-industry' },
            { id: 'contact-message', errId: 'err-message' }
        ];

        inputs.forEach(item => {
            const inputEl = document.getElementById(item.id);
            const parent = inputEl.closest('.form-group');
            
            // Empty check
            if (!inputEl.value || inputEl.value.trim() === '') {
                parent.classList.add('invalid');
                isValid = false;
            } else if (item.validator && !item.validator(inputEl.value)) {
                // Secondary validation (email/phone)
                parent.classList.add('invalid');
                isValid = false;
            } else {
                parent.classList.remove('invalid');
            }
        });

        return isValid;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    function validatePhone(phone) {
        // Standard Indonesian phone filter (+62 or 08 followed by 8-12 digits)
        const re = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
        return re.test(phone.replace(/[\s-]/g, ''));
    }

});
