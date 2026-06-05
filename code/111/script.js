document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    initBackToTop();
    initSearch();
    initAllPageSearch();
});

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');

    let currentIndex = 0;
    let autoPlayInterval = null;
    const autoPlayDelay = 4000;

    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.carousel-indicator');

    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');

        currentIndex = index;
        if (currentIndex >= slides.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = slides.length - 1;

        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoPlay();
    });

    const carouselWrapper = document.querySelector('.carousel-wrapper');
    carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
    carouselWrapper.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
}

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 初始化搜索功能
 * 为搜索输入框绑定回车键事件，按下回车后跳转到搜索结果页面
 */
function initSearch() {
    // 获取搜索输入框元素
    const searchInput = document.querySelector('.search-input');
    
    // 检查搜索框是否存在，避免空指针错误
    if (searchInput) {
        // 绑定键盘按下事件
        searchInput.addEventListener('keydown', function(e) {
            // 判断是否按下回车键
            if (e.key === 'Enter') {
                // 获取输入的关键词并去除首尾空格
                const keyword = this.value.trim();
                // 如果关键词不为空，则跳转到搜索结果页面
                if (keyword) {
                    // 使用encodeURIComponent对关键词进行URL编码，处理特殊字符
                    window.location.href = `all.html?search=${encodeURIComponent(keyword)}`;
                }
            }
        });
    }
}

/**
 * 初始化全部应用页面的搜索功能
 * 支持根据关键词过滤应用卡片
 */
function initAllPageSearch() {
    const searchInput = document.getElementById('searchInput');
    const toolCards = document.querySelectorAll('.tool-card');
    const noResults = document.getElementById('noResults');
    const toolsGrid = document.querySelector('.tools-grid');

    // 检查是否在全部应用页面，避免在其他页面执行此函数
    if (!searchInput || toolCards.length === 0) {
        return;
    }

    function getUrlParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    function filterCards(keyword) {
        let foundCount = 0;
        keyword = keyword.toLowerCase().trim();
        
        toolCards.forEach(card => {
            const toolName = card.querySelector('.tool-name').textContent.toLowerCase();
            const toolDesc = card.querySelector('.tool-desc').textContent.toLowerCase();
            
            if (toolName.includes(keyword) || toolDesc.includes(keyword)) {
                card.style.display = 'block';
                foundCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (foundCount === 0 && keyword) {
            noResults.style.display = 'block';
            toolsGrid.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            toolsGrid.style.display = 'grid';
        }
    }

    // 从URL读取初始关键词并自动搜索
    const initialKeyword = getUrlParam('search');
    if (initialKeyword) {
        searchInput.value = decodeURIComponent(initialKeyword);
        filterCards(initialKeyword);
    }

    // 实时搜索
    searchInput.addEventListener('input', function() {
        filterCards(this.value);
    });

    // 回车搜索
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            filterCards(this.value);
        }
    });
}