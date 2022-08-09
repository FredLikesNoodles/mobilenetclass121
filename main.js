function setup() {
  canvas = createCanvas(400, 400);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}
function draw() {
  image(video, 0, 0, 400, 400);
  classifier.classify(video, gotResult);
}
function modelLoaded() {
  console.log("Model has been loaded");
}
previous_result = "";
function gotResult(error, results) {
  if (error) {
    console.error();
  } else {
    if (results[0].confidence > 0.5 && previous_result != results[0].label) {
      console.log(results);
      previous_result = results[0].label;
      document.getElementById("object_name").innerHTML = results[0].label;
      accuracy = Math.floor(results[0].confidence * 100);
      document.getElementById("confidence").innerHTML =
        accuracy.toFixed(2) + " %";
      synth = window.speechSynthesis;
      speak_data = "The Object is " + results[0].label;
      utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);
    }
  }
}
