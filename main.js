song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
function preload()
{
song = loadSound("music.mp3");
}
function setup()
{
canvas = createCanvas(600,500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video, modelloaded);
poseNet.on('pose', gotPoses);
}
function modelloaded() {
    console.log("posenet is initalized");
}
function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

    }
}
function draw()
{
image(video, 0, 0, 600, 500);
fill("#00bfff");
stroke("#00bfff");
if(scoreLeftWrist > 0.2)
{


circle(leftWristX, leftWristY, 20);
inNumberLeftWristY = Number(leftWristY);
remove_decimal = floor(inNumberLeftWristY);
volume = remove_decimal / 500;
document.getElementById("volume").innerHTML = "volume = " + volume;
song.setVolume(volume);
}
if(scoreRightWrist > 0.2)
{
    circle(rightWristX, RightWristY, 20);
    if(rightwristY > 0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightwristY > 100  && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1);
    }
    else if(rightwristY > 200  && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightwristY > 300  && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }
    else if(rightwristY > 400  && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }
}
}
function play()
{
    song.play();
song.setVolume(1);
song.rate(1);

}