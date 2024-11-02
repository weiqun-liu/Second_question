const videotext = document.querySelector('.header-line'),
  videoBox = document.querySelector('.video-box'),
  videoContent = videoBox.querySelector('.video-content'),
  pauseIcon = videoBox.querySelector('.pause-icon'),
  videoMain = videoBox.querySelector('.video-main'),
  playBtn = videoBox.querySelector('.play-btn'),
  fullScreenBtn = videoBox.querySelector('.full-screen-btn'),
  progressBarBox = videoBox.querySelector('.progress-bar-box'),
  progressBarMain = videoBox.querySelector('.progress-bar-main'),
  progressBarLoad = videoBox.querySelector('.progress-bar-load'),
  videoSpeed = document.querySelector('.video-speed'),
  speed05 = document.getElementById('s05'),
  speed10 = document.getElementById('s10'),
  speed15 = document.getElementById('s15'),
  speed20 = document.getElementById('s20'),
  downloadBtn = document.getElementsByClassName('download')[0];

// 总的视频时长（整数）
let totalT = 0;
// 格式化时间为 min:s
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
// 获取视频标题
const videoText = localStorage.getItem('videoText');
console.log(videoText);
videotext.innerHTML = videoText;

// 获取保存的视频路径值
const videoPath = localStorage.getItem('videoPath');
console.log(videoPath);
videoMain.src = videoPath;

// 可以播放
videoMain.addEventListener('canplay', () => {
  videoBox.style.display = 'block';
  totalT = Math.floor(videoMain.duration) || 0;
  videoMain.play();
});

// 视频错误
videoMain.addEventListener('error', () => {
  alert('获取视频源出错！！！');
});

// 视频进度条
videoMain.addEventListener('timeupdate', () => {
  const currentTime = formatTime(videoMain.currentTime);
  const duration = formatTime(totalT);
  document.querySelector('.video-time').textContent = `${currentTime} / ${duration}`;
  
  progressBarMain.style.width = `${Math.floor(videoMain.currentTime) / totalT * 100}%`;
  progressBarLoad.style.width = `${Math.floor(videoMain.buffered.end(0)) / totalT * 100}%`;
});

// 点击进度条控制视频进度
progressBarBox.addEventListener('click', (event) => {
  const x = event.offsetX;
  const totalW = progressBarBox.offsetWidth;
  videoMain.currentTime = x / totalW * totalT;
  progressBarMain.style.width = `${Math.floor(videoMain.currentTime) / totalT * 100}%`;
});

// 视频开始后将暂停图标转换为播放图标
videoMain.addEventListener('play', () => {
  playBtn.textContent = 'pause_circle_outline';
  pauseIcon.style.display = 'none';
});

// 视频暂停后将播放图标转换为暂停图标
videoMain.addEventListener('pause', () => {
  playBtn.textContent = 'play_circle_outline';
  pauseIcon.style.display = 'block';
});

// 点击视频页开始或暂停视频
videoMain.addEventListener('click', () => {
  if (videoMain.paused) {
    videoMain.play();
  } else {
    videoMain.pause();
  }
});

// 点击按钮时开始或暂停视频
playBtn.addEventListener('click', () => {
  if (videoMain.paused) {
    videoMain.play();
  } else {
    videoMain.pause();
  }
});

// 视频倍速
videoSpeed.addEventListener('click',() =>{
  const speedElements = videoSpeed.querySelectorAll('.speed');
  speedElements.forEach(function (element) {
    if(element.style.visibility == 'visible'){
      element.style.visibility = 'hidden';
    }
    else {
      element.style.visibility = 'visible';
    }
  });
});
speed05.addEventListener('click',() =>{
  const video = document.querySelector('video');
  video.playbackRate = '0.5';
  speed05.style.color='red';
  speed10.style.color='white';
  speed15.style.color='white';
  speed20.style.color='white';
});
speed10.addEventListener('click',() =>{
  const video = document.querySelector('video');
  video.playbackRate = '1.0';
  speed05.style.color='white';
  speed10.style.color='red';
  speed15.style.color='white';
  speed20.style.color='white';
});
speed15.addEventListener('click',() =>{
  const video = document.querySelector('video');
  video.playbackRate = '1.5';
  speed05.style.color='white';
  speed10.style.color='white';
  speed15.style.color='red';
  speed20.style.color='white';
});
speed20.addEventListener('click',() =>{
  const video = document.querySelector('video');
  video.playbackRate = '2.0';
  speed05.style.color='white';
  speed10.style.color='white';
  speed15.style.color='white';
  speed20.style.color='red';
});

// 全屏的图标
document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    fullScreenBtn.textContent = 'fullscreen_exit';
  } else {
    fullScreenBtn.textContent = 'fullscreen';
  }
});

// 全屏操作
fullScreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    videoContent.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
downloadBtn.addEventListener('click',() =>{
  // 视频链接
  const videoUrl = videoMain.src;
  // 下载视频
  if(videoUrl){
  const downloadLink = document.createElement('a');
  downloadLink.href = videoUrl;
  downloadLink.download = `${videoText}.mp4`;
  downloadLink.click();
  } else {
  alert('无视频源')
  }
});