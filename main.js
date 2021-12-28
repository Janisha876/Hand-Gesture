Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="CaptureImage" src="'+data_uri+'"/>';
    });
}
console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1earRznUd/model.json',modelLoaded);
function modelLoaded(){
    console.log("model loaded");
}
function check(){
    img=document.getElementById("CaptureImage");
    classifier.classify(img,gotResult); 
}
function speak(){
    var synth=window.speechSynthesis;
    speakdata1="the prediction is"+prediction;
    speakdata2="with an accuracy of"+accuracy;
    var utterThis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterThis);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("accuracy").innerHTML=(results[0].confidence*100).toFixed(2);
        prediction=results[0].label;
        accuracy=results[0].confidence;
        speak();
        if(results[0].label=='Amazing'){
            document.getElementById("update_emoji").innerHTML="&#128076";
        }
        if(results[0].label=='Best'){
            document.getElementById("update_emoji").innerHTML="&#128077";
        }
        if(results[0].label=='Victory'){
            document.getElementById("update_emoji").innerHTML="&#128406";
        }
    }
}