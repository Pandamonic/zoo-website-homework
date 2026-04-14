// 图片放大镜功能：鼠标移入图鉴和主视觉图片时，显示局部放大效果。
// 修正版：按图片实际显示比例计算放大位置，避免放大区域被横向或纵向挤扁。
document.addEventListener('DOMContentLoaded', function () {
    const zoomTargets = document.querySelectorAll('.card img, .status-card img');
    if (!zoomTargets.length) return;

    const zoom = 2.4;
    const lens = document.createElement('div');
    lens.className = 'zoom-lens';
    document.body.appendChild(lens);

    function getCoverImageBox(image, rect) {
        const naturalRatio = image.naturalWidth / image.naturalHeight;
        const boxRatio = rect.width / rect.height;
        let shownWidth;
        let shownHeight;
        let cropX = 0;
        let cropY = 0;

        // 页面里的图片使用 object-fit: cover；这里还原 cover 后真实显示的图片尺寸。
        if (naturalRatio > boxRatio) {
            shownHeight = rect.height;
            shownWidth = rect.height * naturalRatio;
            cropX = (shownWidth - rect.width) / 2;
        } else {
            shownWidth = rect.width;
            shownHeight = rect.width / naturalRatio;
            cropY = (shownHeight - rect.height) / 2;
        }

        return { shownWidth, shownHeight, cropX, cropY };
    }

    function moveLens(event, image) {
        const rect = image.getBoundingClientRect();
        const imageBox = getCoverImageBox(image, rect);
        const lensSize = lens.offsetWidth || 160;

        const xInBox = event.clientX - rect.left + imageBox.cropX;
        const yInBox = event.clientY - rect.top + imageBox.cropY;

        lens.style.left = event.clientX + 'px';
        lens.style.top = event.clientY + 'px';
        lens.style.backgroundImage = 'url("' + image.currentSrc + '")';
        lens.style.backgroundSize = (imageBox.shownWidth * zoom) + 'px ' + (imageBox.shownHeight * zoom) + 'px';
        lens.style.backgroundPosition =
            '-' + (xInBox * zoom - lensSize / 2) + 'px ' +
            '-' + (yInBox * zoom - lensSize / 2) + 'px';
    }

    zoomTargets.forEach(function (image) {
        image.addEventListener('mouseenter', function (event) {
            lens.classList.add('show');
            moveLens(event, image);
        });

        image.addEventListener('mousemove', function (event) {
            moveLens(event, image);
        });

        image.addEventListener('mouseleave', function () {
            lens.classList.remove('show');
        });
    });
});
