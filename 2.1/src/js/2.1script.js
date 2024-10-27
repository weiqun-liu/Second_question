const fileinput=document.getElementById('fileinput');
const videos=document.getElementById('videos');
function playvideo(){
    const videopath=fileinput.files[0];
    if(videopath){
        const videoURL=URL.createObjectURL(videopath);
        videos.src=videoURL;
        videos.play();
    }
}

function changevideo1(){
    const videopath1=fileinput.files[0];
    if (videopath1){
        fileinput.addEventListener('change',playvideo());
    }
}