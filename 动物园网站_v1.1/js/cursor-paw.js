// 鼠标足迹特效：控制生成频率，避免页面卡顿。
document.addEventListener('DOMContentLoaded', function () {
    let lastTime = 0;

    document.addEventListener('mousemove', function (event) {
        const now = Date.now();
        if (now - lastTime < 90) return;
        lastTime = now;

        const paw = document.createElement('span');
        paw.className = 'paw-trail';
        paw.style.left = event.clientX + 'px';
        paw.style.top = event.clientY + 'px';
        document.body.appendChild(paw);

        window.setTimeout(function () {
            paw.remove();
        }, 900);
    }, { passive: true });
});
