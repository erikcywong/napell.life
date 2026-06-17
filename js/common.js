/* ===== NAPELL LIFE — Shared JavaScript ===== */
(function() {
    'use strict';

    // ===== Mobile hamburger toggle =====
    var hamburger = document.querySelector('.nav-hamburger');
    var mobNav = document.getElementById('mobNav');
    if (hamburger && mobNav) {
        hamburger.addEventListener('click', function() {
            var show = mobNav.style.display === 'flex';
            mobNav.style.display = show ? 'none' : 'flex';
        });
    }

    // ===== Active nav link on scroll =====
    var navLinks = document.querySelectorAll('.nav-links .nav-link');
    var sections = document.querySelectorAll('.section, .hero, .section-sm, .pg-header');
    function updateActiveLink() {
        var currentId = 'home';
        var scrollPos = window.scrollY + 120;
        sections.forEach(function(section) {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                var id = section.getAttribute('id');
                if (id) currentId = id;
            }
        });
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            var href = link.getAttribute('href');
            if (href === '#' + currentId) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // ===== Smooth scroll for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            var targetId = href.substring(1);
            var target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                var navHeight = document.querySelector('.nav').offsetHeight;
                window.scrollTo({ top: target.offsetTop - navHeight, behavior: 'smooth' });
                if (mobNav) mobNav.style.display = 'none';
            }
        });
    });

    // ===== Fade-in on scroll =====
    var fadeEls = document.querySelectorAll('.fade-in');
    var fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    fadeEls.forEach(function(el) { fadeObserver.observe(el); });

    // ===== Animate bar charts on scroll =====
    var barFills = document.querySelectorAll('.bar-fill');
    var barObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var bar = entry.target;
                var width = bar.style.width;
                bar.style.width = '0%';
                requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                        bar.style.width = width;
                    });
                });
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    barFills.forEach(function(bar) { barObserver.observe(bar); });

    // ===== Close mobile nav on link click =====
    if (mobNav) {
        mobNav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() { mobNav.style.display = 'none'; });
        });
    }

    // ===== MODAL SYSTEM =====
    window.openModal = function(planId) {
        var overlay = document.getElementById('modal-overlay');
        if (!overlay) return;
        var modal = overlay.querySelector('.modal');
        if (!modal) return;

        // Update modal content based on plan
        var plans = {
            starter: {
                name: 'Starter Plan',
                price: '$29',
                period: '/month',
                features: [
                    'Up to 2 acoustic zones',
                    'Basic soundscapes library',
                    'Mobile app access',
                    'Email support (48h response)',
                    'Monthly growth reports',
                    'Community forum access'
                ],
                desc: 'Perfect for small farms and individual growers just starting with acoustic frequency therapy.'
            },
            pro: {
                name: 'Pro Plan',
                price: '$99',
                period: '/month',
                features: [
                    '10 acoustic zones',
                    'Full soundscape library (50+ protocols)',
                    'Device Gateway integration',
                    'Real-time analytics dashboard',
                    'Priority support (4h response)',
                    'Custom frequency scheduling',
                    'Weekly growth reports',
                    'Creator Program access'
                ],
                desc: 'Our most popular plan for growing operations that need full control over their acoustic environment.'
            },
            business: {
                name: 'Business Plan',
                price: '$299',
                period: '/month',
                features: [
                    'Unlimited acoustic zones',
                    'Custom frequency protocols',
                    'Full REST & WebSocket API access',
                    'ML-powered optimization engine',
                    'Dedicated account manager',
                    'White-label branding',
                    'SLA guarantee (99.9% uptime)',
                    'Co-development opportunities',
                    'Advanced analytics & export'
                ],
                desc: 'For commercial operations and agricultural enterprises managing multiple farms or large-scale deployments.'
            },
            enterprise: {
                name: 'Enterprise Plan',
                price: 'Custom',
                period: 'contact us for pricing',
                features: [
                    'Unlimited everything',
                    'On-premise deployment option',
                    'Custom ML model training',
                    'Dedicated engineering team',
                    '24/7 premium support',
                    'Custom SLA & compliance',
                    'Multi-region deployment',
                    'Regulatory documentation',
                    'IP licensing options',
                    'Strategic partnership program'
                ],
                desc: 'For governments, multinational agricultural corporations, and research institutions needing fully customized solutions.'
            }
        };

        var plan = plans[planId] || plans.starter;
        var header = modal.querySelector('.modal-header h3');
        var body = modal.querySelector('.modal-body');

        if (header) header.textContent = plan.name;
        if (body) {
            var html = '';
            html += '<div class="modal-price">' + plan.price + '</div>';
            html += '<div class="modal-period">' + plan.period + '</div>';
            html += '<p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:20px;">' + plan.desc + '</p>';
            html += '<ul class="modal-features">';
            plan.features.forEach(function(f) {
                html += '<li><span class="feat-check">&#10003;</span> ' + f + '</li>';
            });
            html += '</ul>';
            html += '<div style="border-top:1px solid var(--border);padding-top:20px;">';
            html += '<p style="font-size:0.85rem;font-weight:700;color:var(--white);margin-bottom:16px;">Get started with ' + plan.name + '</p>';
            html += '<div class="modal-form">';
            html += '<div><label>Full Name</label><input type="text" placeholder="John Smith" /></div>';
            html += '<div><label>Email</label><input type="email" placeholder="john@farm.com" /></div>';
            html += '<div><label>Farm / Organization</label><input type="text" placeholder="Your farm name" /></div>';
            html += '<div><label>Message (optional)</label><textarea placeholder="Tell us about your farm..."></textarea></div>';
            html += '<button class="btn btn-pri" style="width:100%;justify-content:center;" onclick="window.closeModal();">Submit Request</button>';
            html += '</div></div>';
            body.innerHTML = html;
        }

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        var overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Close modal on overlay click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay') && e.target.id === 'modal-overlay') {
            window.closeModal();
        }
        if (e.target.classList.contains('icon-popup-overlay')) {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.closeModal();
            document.querySelectorAll('.icon-popup-overlay.active').forEach(function(el) {
                el.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });

    // ===== ICON POPUP SYSTEM =====
    window.openIconPopup = function(icon, title, description, linkText, linkHref) {
        var overlay = document.querySelector('.icon-popup-overlay');
        if (!overlay) {
            // Create overlay dynamically
            overlay = document.createElement('div');
            overlay.className = 'icon-popup-overlay';
            overlay.innerHTML = '<div class="icon-popup"><div class="popup-icon"></div><h3></h3><p></p><a class="btn btn-pri btn-sm" href="#"></a></div>';
            document.body.appendChild(overlay);
        }
        var popup = overlay.querySelector('.icon-popup');
        popup.querySelector('.popup-icon').textContent = icon;
        popup.querySelector('h3').textContent = title;
        popup.querySelector('p').textContent = description;
        var link = popup.querySelector('a');
        link.textContent = linkText || 'Learn More';
        link.href = linkHref || '#';
        if (linkHref) link.setAttribute('target', linkHref.indexOf('http') === 0 ? '_blank' : '_self');

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

})();
