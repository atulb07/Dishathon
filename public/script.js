const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('https://hiteshsubnani0128.github.io/Live-school/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('https://hiteshsubnani0128.github.io/Live-school/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('https://hiteshsubnani0128.github.io/Live-school/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('https://hiteshsubnani0128.github.io/Live-school/models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        var exp = resizedDetections[0].expressions
        if (exp.angry >= exp.happy && exp.angry >= exp.neutral && exp.angry >= exp.fearful && exp.angry >= exp.disgusted && exp.angry >= exp.sad && exp.angry >= exp.surprised) changeIt("Angry")
        else if (exp.happy >= exp.neutral && exp.happy >= exp.fearful && exp.happy >= exp.disgusted && exp.happy >= exp.sad && exp.happy >= exp.surprised) changeIt("Happy")
        else if (exp.neutral >= exp.fearful && exp.neutral >= exp.disgusted && exp.neutral >= exp.sad && exp.neutral >= exp.surprised) changeIt("Neutral")
        else if (exp.fearful >= exp.disgusted && exp.fearful >= exp.sad && exp.fearful >= exp.surprised) changeIt("Fearful")
        else if (exp.disgusted >= exp.sad && exp.disgusted >= exp.surprised) changeIt("Disgusted")
        else if (exp.sad >= exp.surprised) changeIt("Sad")
        else changeIt("Surprised")

        // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        // faceapi.draw.drawDetections(canvas, resizedDetections)
        // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 1000)
})

function changeIt(abc) {
    document.getElementById("emotion").innerHTML = abc;
}

console.log("hello")