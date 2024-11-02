
function saveVideoPath1() {
  window.localStorage.removeItem('videoPath');
  window.localStorage.removeItem('videoText');
  localStorage.setItem('videoPath','../res/video/video1.mp4');
    var linkElement = document.querySelector('#first-link');
    var linkText = linkElement.textContent;
  localStorage.setItem('videoText', linkText);
}
function saveVideoPath2() {
  window.localStorage.removeItem('videoPath');
  window.localStorage.removeItem('videoText');
  localStorage.setItem('videoPath', '../res/video/video2.mp4');
  var linkElement = document.querySelector('#second-link');
  var linkText = linkElement.textContent;
  localStorage.setItem('videoText',linkText);
}
const searchInput = document.getElementsByClassName('searchText')[0];
const items = document.getElementsByClassName('video-text'); // 获取所有 video-text 元素
const cards = document.getElementsByClassName('video-card'); // 获取所有 video-card 元素
const issearch = document.getElementsByClassName('searchBtn')[0]; // 只取第一个按钮

issearch.addEventListener('click', function() {
    const query = searchInput.value.trim(); // 获取输入值
    for (let i = 0; i < items.length; i++) {
        const itemText = items[i].textContent; // 获取项的文本内容
        const itemTitle = items[i].getAttribute('title'); // 获取项的 title 属性

        // 检查文本内容和 title 属性是否包含输入内容
        if (itemText.includes(query) || (itemTitle && itemTitle.includes(query))) {
            cards[i].style.display = 'inline-block';; // 显示匹配项
        } else {
            cards[i].style.display = 'none'; // 隐藏不匹配项
        }
    }
});