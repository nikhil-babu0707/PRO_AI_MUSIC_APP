song = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotposes);
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("right wrist score = " + scoreRightWrist);
        console.log("left wrist score = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist X = " + leftWristX + "left wrist Y = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist X = " + rightWristX + "right wrist Y = " + rightWristY);
    }
}

function modelloaded() {
    console.log('I am started');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#0017AF");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "speed = 0.5×";
            song.rate(0.5);
        }
        if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "speed = 1×";
            song.rate(1);
        }
        if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "speed = 1.5×";
            song.rate(1.5);
        }
        if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "speed = 2×";
            song.rate(2);
        }
        if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "speed = 2.5×";
            song.rate(2.5);
        }

    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        inNumLeftWrstY = Number(leftWristY);
        remove = floor(inNumLeftWrstY);
        volume = remove / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function Stop() {
    song.stop();
}