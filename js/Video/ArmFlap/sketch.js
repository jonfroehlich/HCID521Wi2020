// TODO
//
// By Jon Froehlich
// http://makeabilitylab.io/
//
// This Sketch uses ml5js, a Machine Learning JavaScript library that
// is easy to use with p5js. It provides lots of interesting methods
// including pitch detection, human pose detection, sound classification, etc.
// Read more here: https://ml5js.org/
//
// This particular Sketch uses ml5js's PoseNet implementation for human pose tracking.
//
// Reference for the ml5js PoseNet implementation:
//  - https://ml5js.org/reference/api-PoseNet/
//
// Primary PoseNet library, which ml5js is using under the hood:
//  - Read this article: "Real-time Human Pose Estimation in the Browser with TensorFlow.js"
//    here: https://link.medium.com/7EBfMICUh2
//  - https://github.com/tensorflow/tfjs-models/tree/master/posenet
//
// Other ML JavaScript APIs:
//  - Face Rec: https://github.com/justadudewhohacks/face-api.js/
// 

let video;
let poseNet;
let human = null;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  //video.hide();
  
  // setup PoseNet. This can take a while, so we load it 
  // asychronously (when it's done, it will call modelReady)
  poseNet = ml5.poseNet(video, onModelReady); //call onModelReady when setup
  poseNet.on('pose', onPoseDetected); // call onPoseDetected when pose detected
}

function onModelReady(){
  print("The PoseNet model is ready...");
}

function onPoseDetected(poses){
  // poses can contain an array of bodies (because PoseNet supports
  // recognition for *multiple* human bodies at the same time
  // however, for this demo, we are interested in only one human body
  // which is at poses[0]
  human = poses[0]; 
}

function draw() {
  image(video, 0, 0); // draw the video to screen
  
  noStroke(); // turn off drawing outlines of shapes

  // TODO:
  // - First gather initial calibration of where left wrist and right wrist locations are
  // - Then use these locations to infer flaps 
  // - Use either speed or distance of arm movement to control 
  // - warn user when wrist go off screen (and not detected)

  //if a human has been detected, draw overlay shapes!
  if (human != null){ 

    // For this sample, we work with three body parts but
    // PoseNet supports 17 body parts in total, see:
    // https://github.com/tensorflow/tfjs-models/tree/master/posenet#keypoints
    // drawNose(human.pose.nose.x, human.pose.nose.y)
    // drawEye(human.pose.leftEye.x, human.pose.leftEye.y);
    // drawEye(human.pose.rightEye.x, human.pose.rightEye.y);
    
    for(let keypoint of human.pose.keypoints){
      fill(255);
      ellipse(keypoint.position.x, keypoint.position.y, 10);
      textSize(30);
      text(keypoint.part, keypoint.position.x, keypoint.position.y);
    }
    
  }

  function drawNose(x, y){
    fill(255, 0, 0);
    let noseWidth = 30;
    ellipse(x, y, noseWidth);
  }

  function drawEye(x, y){
    fill(255);
    let eyeWidth = 40;
    let pupilWidth = 15;
    ellipse(x, y, eyeWidth);

    fill(0);
    ellipse(x, y, pupilWidth);
  }
}