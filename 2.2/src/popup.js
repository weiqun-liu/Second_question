document.getElementById('setSpeedButton').addEventListener('click', () => {
    const speedInput = document.getElementById('speedInput').value;
    const speed = parseFloat(speedInput);

    // 向 content.js 发送消息以设置视频倍速
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "setPlaybackRate", speed: speed }, (response) => {
            alert(response.result);
        });
    });
});
document.getElementById('dark').addEventListener('click', () => {
    // 向 content.js 发送消息开启夜间模式
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "dark" }, (response) => {
            alert(response.result);
    });
});
});
document.getElementById('nodark').addEventListener('click', () => {
    // 向 content.js 发送消息关闭夜间模式
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "nodark" }, (response) => {
            alert(response.result);
    });
});
});

