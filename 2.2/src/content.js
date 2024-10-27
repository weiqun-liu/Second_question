
function todarkIndex(){
    document.getElementById("app").removeAttribute('style');
    document.getElementById('page-index').removeAttribute('style');
    document.getElementsByClassName('s-space')[0].removeAttribute('style');
    document.getElementsByClassName('col-1')[0].removeAttribute('style');
    document.getElementsByClassName('col-2')[0].removeAttribute('style');
    document.getElementsByClassName('section elec')[0].removeAttribute('style');
    document.getElementsByClassName('section i-live')[0].removeAttribute('style');
    document.getElementsByClassName('section user-info')[0].removeAttribute('style');
    document.getElementsByClassName('wrapper')[0].removeAttribute('style');
    document.getElementsByClassName('n-inner clearfix')[0].removeAttribute('style');
}

function todark(){
    document.documentElement.style.setProperty('--Wh0', '#000000');
    document.documentElement.style.setProperty('--text1', '#ffffff');
    document.documentElement.style.setProperty('--graph_bg_thin', '#000000');
    document.documentElement.style.setProperty('--line_light', '#000000');
    document.documentElement.style.setProperty('--graph_bg_regular', '#000000');
    document.documentElement.style.setProperty('--bg2', '#000000');
    document.documentElement.style.setProperty('--line_regular', '#000000');
    document.documentElement.style.setProperty('--graph_bg_thick', '#3c3a3a');
    document.documentElement.style.setProperty('--bg1_float', '#393838');
    document.documentElement.style.setProperty('--bg3', '#000000');
    document.documentElement.style.setProperty('--Ga1', '#3a3a3a');
    document.documentElement.style.setProperty('--bg2_floa','#000000');
    console.log("夜间模式开启成功");

    document.getElementById("app").setAttribute('style','background-color:#000000;');
    document.getElementById('page-index').setAttribute('style','color:#ffffff;');
    document.getElementsByClassName('s-space')[0].setAttribute('style','background-color:#000000;');
    document.getElementsByClassName('col-1')[0].setAttribute('style','background-color:#000000;');
    document.getElementsByClassName('col-2')[0].setAttribute('style','background-color:#000000;');
    document.getElementsByClassName('section elec')[0].setAttribute('style','background-color:#000000;');
    document.getElementsByClassName('section i-live')[0].setAttribute('style','background-color:#000000;');
    document.getElementsByClassName('section user-info')[0].setAttribute('style','background-color:#000000;');
    document.getElementsByClassName('wrapper')[0].setAttribute('style','background-color:#000000;');
    document.getElementsByClassName('n-inner clearfix')[0].setAttribute('style','background-color:#000000;');
}

function nodark(){
    document.documentElement.style.setProperty('--Wh0', '#FFFFFF');
    document.documentElement.style.setProperty('--text1', '#000000');
    document.documentElement.style.setProperty('--graph_bg_thin', '#FFFFFF');
    document.documentElement.style.setProperty('--line_light', '#FFFFFF');
    document.documentElement.style.setProperty('--graph_bg_regular', '#FFFFFF');
    document.documentElement.style.setProperty('--bg2', '#FFFFFF');
    document.documentElement.style.setProperty('--line_regular', '#FFFFFF');
    document.documentElement.style.setProperty('--graph_bg_thick', '#F1F2F3');
    document.documentElement.style.setProperty('--bg1_float', '#FFFFFF');
    document.documentElement.style.setProperty('--bg3', '#FFFFFF');
    document.documentElement.style.setProperty('--Ga1', '#F1F2F3');
    document.documentElement.style.setProperty('--bg2_floa','#F1F2F3');
    document.getElementById("app").removeAttribute('style');
    document.getElementById('page-index').removeAttribute('style');
    document.getElementsByClassName('s-space')[0].removeAttribute('style');
    document.getElementsByClassName('col-1')[0].removeAttribute('style');
    document.getElementsByClassName('col-2')[0].removeAttribute('style');
    document.getElementsByClassName('section elec')[0].removeAttribute('style');
    document.getElementsByClassName('section i-live')[0].removeAttribute('style');
    document.getElementsByClassName('section user-info')[0].removeAttribute('style');
    document.getElementsByClassName('wrapper')[0].removeAttribute('style');
    document.getElementsByClassName('n-inner clearfix')[0].removeAttribute('style');
    console.log("已关闭夜间模式");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setPlaybackRate") {
        const videospeed = parseFloat(request.speed);
        const video = document.querySelector('video');

        if (video && !isNaN(videospeed) && videospeed > 0) {
            let x=document.querySelector('.bpx-player-ctrl-playbackrate-menu')
            x.innerHTML += "<li class='bpx-player-ctrl-playbackrate-menu-item' data-value='"+ videospeed +"'>" + videospeed +"x</li>"
            video.playbackRate = videospeed; // 设置倍速
            sendResponse({ result: `倍速已设置为: ${videospeed}` });
        } else {
            sendResponse({ result: '未找到视频元素或倍速无效。' });
        }
    } else if (request.action === "dark") {
        console.log("开启夜间模式");
        localStorage.setItem('isDark', '1');
        todark();
        sendResponse({ result: "夜间模式开启成功" });
    } else if (request.action === "nodark") {
        console.log("关闭夜间模式");
        localStorage.setItem('isDark', '0');
        nodark();
        sendResponse({ result: "夜间模式已关闭" });
    }
});
// 在页面加载完成时检查夜间模式的状态
window.onload = function () {
    const isDark = localStorage.getItem('isDark');
    if (isDark === '1') {
        todark();
        todarkIndex();
    } else {
        nodark();
    }
};