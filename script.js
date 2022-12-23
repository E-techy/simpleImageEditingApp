
    var selectImageButton=document.getElementById("selectImageButton")
    var selectImage=document.getElementById("selectImage");
    var canvas=document.getElementById("canvas");
    var downloadImageButton=document.getElementById("downloadImageButton");
    var grayscaleButton=document.getElementById("grayscaleButton");
    var transparencyLevel=document.getElementById('transparencyLevel');
    var invertedButton=document.getElementById("invertedButton");
    var randomButton=document.getElementById('randomButton');
    var addHeartButton=document.getElementById('addHeartButton');


    var date=new Date();
    var ctx=canvas.getContext('2d');

    grayscaleButton.addEventListener('click',()=>{
        var bounding=canvas.getBoundingClientRect();
        var imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
        console.log(imageData);
        var data=imageData.data;
        for (let i = 0; i < data.length; i+=4) {
           const average=(data[i]+data[i+1]+data[i+2])/3;
           data[i]=average;
           data[i+1]=average;
           data[i+2]=average;
            
        }
        ctx.putImageData(imageData,0,0);
    })

    transparencyLevel.addEventListener('change',function(){
        var transparencyValue=this.value;
        var imageData=ctx.getImageData(0,0,canvas.width,canvas.height)
        var data=imageData.data;
        for (let i = 3; i < data.length; i+=4) {
            data[i]=(255/10)*transparencyValue;
            
        }
        ctx.putImageData(imageData,0,0)
    })

    invertedButton.addEventListener('click',()=>{
        var imageData=ctx.getImageData(0,0,canvas.width,canvas.height)
        var data=imageData.data;
        for (let i = 0; i < data.length; i+=4) {
            data[i]=255-data[i];
            data[i+1]=255-data[i+1]
            data[i+2]=255-data[i+2];
        }

        ctx.putImageData(imageData,0,0);
    })

    randomButton.addEventListener('click',()=>{
        var imageData=ctx.getImageData(0,0,canvas.width,canvas.height)
        var data=imageData.data;
        var max=255;
        var min=0;
        for (let i = 0; i < data.length; i+=128) {
            var random=Math.random();
            for (let j = 1; j < 20; j+=4) {
                data[i]=Math.floor(random*(max-min));
                data[i+1]=Math.floor(random*(max-min)); 
                data[i+2]=Math.floor(random*(max-min)); 
                
            }
        }
        ctx.putImageData(imageData,0,0);
    })





    addHeartButton.addEventListener("click",function(){

        if(this.checked==true){
            var image=new Image;
            image.src=document.getElementById("heartImage").src;
            canvas.addEventListener("click",function(event){
                const bounding = canvas.getBoundingClientRect();
                const mouseX = event.clientX - bounding.left;
                const mouseY = event.clientY - bounding.top;
                ctx.drawImage(image,mouseX,mouseY);
            })
        }
        else{
           return;

        }
    })








    selectImageButton.addEventListener("click",()=>{
        selectImage.click();
    })

    selectImage.addEventListener("change",()=>{
        var image=new Image;
        image.src=URL.createObjectURL(selectImage.files[0]);
        image.onload=()=>{
            canvas.height=image.height;
            canvas.width=image.width
            ctx.drawImage(image,0,0)
        }
    })

    downloadImageButton.addEventListener('click',()=>{
        var url=canvas.toDataURL('image/png');
        console.log("downloading image");
        var link=document.createElement("a")
        link.href=url;
        link.download=`${date.getTime()}`;
        link.click();
    })
