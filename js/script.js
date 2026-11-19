(function() {
    var root = document.documentElement,
        btn = document.getElementById('theme');

    // ================= Theme =================
    function dark() {
        var t = root.getAttribute('data-theme');
        return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function label() {
        btn.textContent = dark() ? 'Light mode' : 'Dark mode';
    }
    try {
        var s = localStorage.getItem('theme');
        if (s) root.setAttribute('data-theme', s);
    } catch (e) {}
    label();
    btn.addEventListener('click', function() {
        var n = dark() ? 'light' : 'dark';
        root.setAttribute('data-theme', n);
        try { localStorage.setItem('theme', n); } catch (e) {}
        label();
    });

    // ================= Accent color swatches =================
    var cols = ['#e0359b', '#3a3af0', '#0f9d7a', '#f08a1c', '#8a3ffc'],
        sw = document.getElementById('swatches');
    if (sw) {
        cols.forEach(function(c, i) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'sw';
            b.style.background = c;
            b.setAttribute('aria-label', 'Accent color ' + (i + 1));
            b.onclick = function() {
                root.style.setProperty('--accent', c);
            };
            sw.appendChild(b);
        });
    }

    // ================= Mobile menu (Bootstrap-style dropdown) =================
    var menuBtn = document.getElementById('menuBtn');
    var navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        function openMenu() {
            navLinks.classList.add('open');
            menuBtn.setAttribute('aria-expanded', 'true');
            menuBtn.setAttribute('aria-label', 'Close menu');
        }

        function closeMenu() {
            navLinks.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Open menu');
        }

        // زرار الفتح/القفل
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (navLinks.classList.contains('open')) closeMenu();
            else openMenu();
        });

        // يقفل عند اختيار أي رابط
        navLinks.querySelectorAll('a').forEach(function(a) {
            a.addEventListener('click', closeMenu);
        });

        // يقفل عند الضغط بره
        document.addEventListener('click', function(e) {
            if (
                navLinks.classList.contains('open') &&
                !navLinks.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {
                closeMenu();
            }
        });

        // Esc يقفلها
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                closeMenu();
                menuBtn.focus();
            }
        });

        // لو الشاشة كبرت، اقفل القائمة
        var mq = window.matchMedia('(min-width: 641px)');
        mq.addEventListener('change', function(ev) {
            if (ev.matches) closeMenu();
        });
    }

    // ================= Filters =================
    var fs = document.querySelectorAll('.f'),
        cards = document.querySelectorAll('.card');
    fs.forEach(function(f) {
        f.addEventListener('click', function() {
            fs.forEach(function(x) {
                x.setAttribute('aria-pressed', x === f);
            });
            cards.forEach(function(c) {
                var v = c.querySelector('video');
                if (v) v.pause();
                c.hidden = !(
                    f.dataset.f === 'all' ||
                    c.dataset.c.split(' ').indexOf(f.dataset.f) > -1
                );
            });
        });
    });

    // ================= Only one video plays =================
    document.addEventListener(
        'play',
        function(e) {
            document.querySelectorAll('video').forEach(function(v) {
                if (v !== e.target) v.pause();
            });
        },
        true
    );

    // ================= Lightbox =================
    var lb = document.getElementById('lb'),
        lbi = document.getElementById('lbi');

    function closeLb() {
        lb.hidden = true;
    }
    document.querySelectorAll('.art').forEach(function(a) {
        a.addEventListener('click', function() {
            var i = a.querySelector('img');
            lbi.src = i.src;
            lbi.alt = i.alt;
            lb.hidden = false;
            document.getElementById('lbx').focus();
        });
    });
    var lbx = document.getElementById('lbx');
    if (lbx) lbx.addEventListener('click', closeLb);
    lb.addEventListener('click', function(e) {
        if (e.target === lb) closeLb();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLb();
    });

    // ================= Footer year =================
    var yr = document.getElementById('yr');
    if (yr) yr.textContent = new Date().getFullYear();
})();