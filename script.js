const file_input=document.querySelector("input");
const img=document.querySelector("img");
const video=document.querySelector("video");
const qr_code_view=document.querySelector(".qr-code-view");
const icons=document.querySelector(".icons");
const qr_text=document.querySelector(".qr-text");
const message=document.querySelector("p");
const textarea=document.querySelector("textarea");

file_input.addEventListener("change", (e)=>{
    let file=e.target.files[0];
    if(!file) return;
    fetchQRCodeResponse(file);


})
function fetchQRCodeResponse(file){
    let formData = new FormData();
    // let formData;
    // FormData=new formData;
    formData.append("file",file);
    fetch("https://api.qrserver.com/v1/read-qr-code/",{
    method:"POST",
    body: formData,
    }).then((response)=>response.json())
    .then((data) => {
        textarea.innerText=" ";
        let result=data[0].symbol[0].data;

        if(!result) return(message.innerText="Couldn't scan QR");
    
        qr_text.style.display="block";
        textarea.innerText=result;
        img.style.display="block";
        img.src=URL.createObjectURL(file);
        icons.style.display="none";
        
});
}
function copyQRtext(){
    let text=textarea.textContent;
    navigator.clipboard.writeText(text);
}
function closeQRscanner(){
    message.innerText="Upload or Scan QR Code to Read";
    icons.style.display="block";
    img.style.display="none";
    video.style.display="none";
    qr_text.style.display="none";
    textarea.innerText=" ";
    file_input.value=" ";
}
function scanQRcode(){
    let scanner= new Instascan.Scanner({video:video,captureImage: true});
    if(scanner){
        message.innerText="Loading Camera....." 
    }
}

// console.log(file_input);