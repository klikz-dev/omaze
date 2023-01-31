window.SDG = window.SDG || {};

class SkeletonLoading {
    getOffset (element) {
        let left = 0;

        if (!element) {
            return 0;
        }

        do {
            if (!isNaN(element.offsetLeft)) {
                left = left + element.offsetLeft;
            }

            if (!element.offsetParent) {
                return left * -1;
            }

            element = element.offsetParent;
        } while (element);

        return left * -1;
    }

    init () {
        document.querySelectorAll('.ozc-skeleton-box').forEach((element) => {
            if (element.hasAttribute('data-skeleton')) {
                return;
            }

            const div = document.createElement('div');

            div.style.left = this.getOffset(element) + 'px';

            element.appendChild(div);

            element.setAttribute('data-skeleton', 'true');
        });
    }
}

window.SDG.SkeletonLoading = new SkeletonLoading();
