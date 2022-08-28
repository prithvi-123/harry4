song1 ="";
song2 ="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;
song1status="";
song2status="";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){

    canvas= createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , gotPoses);

}




function modelLoaded(){
    console.log("PoseNet Is Initialized");
}


function play(){

    song.play();
    song.setVolume(1);
    song.rate(1);
}


function gotPoses(results)
{
    if(results.length > 0)
    {


        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreleftWrist = " + scoreleftWrist +" scoreleftWrist = "+ scoreleftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

    }
}

function draw()
{
    image(video,0,0,600,500);
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    fill(255,0,0);
    stroke(255,0,0);

    if(scoreleftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2status == false)
        {
            song2.play();
            document.getElementById("song_name").innerHTML="playing peterpan song";
        }
    }

    if(scorerightWrist >0.2 ){
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1status == false)
        {
            song1.play();
            document.getElementById("song_name").innerHTML="playing harrypotter themsong";
        }
    }
}


