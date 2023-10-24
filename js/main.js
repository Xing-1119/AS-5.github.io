$(document).ready(function() {
    const videoSection = document.querySelector('.video-section');
    let hasEntered = false;

    // 获取视频元素
    const videoElement = document.getElementById('video');

    if (!videoElement) {
        console.error("Video element not found");
        return;
    }

    // 检查滚动事件以控制视频播放
    function checkVideo() {
        const currentScrollPosition = window.scrollY;
        const videoSectionTop = videoSection.getBoundingClientRect().top;

        if (!hasEntered && videoSectionTop < window.innerHeight) {
            videoElement.play();
            hasEntered = true;
            // 将视频播放状态存储到sessionStorage
            sessionStorage.setItem('videoPlaying', 'true');
        } else if (hasEntered && videoSectionTop > window.innerHeight) {
            videoElement.pause();
            hasEntered = false;
            // 将视频播放状态存储到sessionStorage
            sessionStorage.setItem('videoPlaying', 'false');
        }
    }

    // 从sessionStorage检查视频播放状态
    const isVideoPlaying = sessionStorage.getItem('videoPlaying');
    if (isVideoPlaying === 'true') {
        videoElement.play();
        hasEntered = true;
    }

    // 初次检查视频状态
    checkVideo();

    // 添加滚动事件监听器
    window.addEventListener('scroll', checkVideo);
    
    // 添加窗口大小改变事件监听器（如果需要）
    window.addEventListener('resize', checkVideo);
});
