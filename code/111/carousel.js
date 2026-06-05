/**
 * 轮播图组件 JavaScript
 * 实现图片轮播功能，支持手动切换和自动播放
 */
document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素
    const slides = document.querySelectorAll('.carousel-slide');           // 所有幻灯片元素
    const indicatorsContainer = document.querySelector('.carousel-indicators'); // 指示器容器
    const prevBtn = document.querySelector('.carousel-btn-prev');         // 上一张按钮
    const nextBtn = document.querySelector('.carousel-btn-next');         // 下一张按钮

    // 状态变量
    let currentIndex = 0;           // 当前显示的幻灯片索引
    let autoPlayInterval = null;    // 自动播放定时器ID
    const autoPlayDelay = 4000;     // 自动播放间隔时间（毫秒）

    /**
     * 动态创建指示器
     * 为每张幻灯片创建一个对应的指示点
     */
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');      // 创建指示器元素
        indicator.classList.add('carousel-indicator');        // 添加基础样式类
        if (index === 0) indicator.classList.add('active');   // 默认激活第一个指示器
        indicator.addEventListener('click', () => goToSlide(index));  // 绑定点击切换事件
        indicatorsContainer.appendChild(indicator);           // 将指示器添加到容器
    });

    const indicators = document.querySelectorAll('.carousel-indicator'); // 获取所有指示器元素

    /**
     * 切换到指定索引的幻灯片
     * @param {number} index - 目标幻灯片索引
     */
    function goToSlide(index) {
        // 移除当前幻灯片和指示器的激活状态
        slides[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');

        // 更新当前索引，处理边界情况（循环切换）
        currentIndex = index;
        if (currentIndex >= slides.length) currentIndex = 0;      // 超过最后一张，回到第一张
        if (currentIndex < 0) currentIndex = slides.length - 1;   // 小于第一张，回到最后一张

        // 激活新的幻灯片和指示器
        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }

    /**
     * 切换到下一张幻灯片
     */
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    /**
     * 切换到上一张幻灯片
     */
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    /**
     * 开始自动播放
     * 先停止之前的定时器，避免重复创建
     */
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    /**
     * 停止自动播放
     * 清除定时器并重置定时器ID
     */
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // ========== 事件绑定 ==========

    /**
     * 上一张按钮点击事件
     * 切换到上一张并重新开始自动播放
     */
    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoPlay();  // 手动切换后重置自动播放
    });

    /**
     * 下一张按钮点击事件
     * 切换到下一张并重新开始自动播放
     */
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoPlay();  // 手动切换后重置自动播放
    });

    /**
     * 鼠标悬停交互
     * 鼠标进入轮播区域时暂停自动播放，离开时恢复
     */
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    carouselWrapper.addEventListener('mouseenter', stopAutoPlay);  // 鼠标进入暂停
    carouselWrapper.addEventListener('mouseleave', startAutoPlay); // 鼠标离开恢复

    // 页面加载完成后启动自动播放
    startAutoPlay();
});