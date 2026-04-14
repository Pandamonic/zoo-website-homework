// 导航栏滚动特效：滚动后压缩顶部栏，并根据当前区块自动高亮菜单。
document.addEventListener('DOMContentLoaded', function () {
    const topbar = document.querySelector('.topbar');
    const navLinks = Array.from(document.querySelectorAll('.nav-list a[href^="#"]'));
    const sections = navLinks
        .map(function (link) {
            const target = document.querySelector(link.getAttribute('href'));
            return target ? { link: link, target: target } : null;
        })
        .filter(Boolean);

    function updateNav() {
        if (topbar) {
            topbar.classList.toggle('is-scrolled', window.scrollY > 24);
        }

        let currentItem = sections[0];
        sections.forEach(function (item) {
            const rect = item.target.getBoundingClientRect();
            if (rect.top <= 140) {
                currentItem = item;
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
        });
        if (currentItem) {
            currentItem.link.classList.add('active');
        }
    }

    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
});
