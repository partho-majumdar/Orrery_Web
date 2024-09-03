import * as tf from "@tensorflow/tfjs";
import * as mp from "@mediapipe/camera_utils";
import * as handpose from "@mediapipe/handpose";

const camera = new mp.Camera(videoElement, {
  onFrame: async () => {
    const image = await camera.getImage();
    const results = await handEstimator.estimate(image);

    if (results.multiHandLandmarks) {
      const landmarks = results.multiHandLandmarks[0];
      const gesture = recognizeGesture(landmarks);

      if (gesture === "thumbsUp") {
        // Send a signal to your 3D scene to perform an action
        console.log("Thumbs up!");
        scene.onGestureRecognized("thumbsUp");
      }
    }
  },
});

const handSolution = new handpose.HandPose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/handpose@${handpose.VERSION}/${file}`;
  },
});

const handEstimator = handSolution.createEstimator();

const THUMBS_UP_GESTURE = {
  thumbTip: { x: 0, y: 0.5, z: 0 }, // thumb tip is up
  thumbIp: { x: 0, y: 0.4, z: 0 },
  thumbMcp: { x: 0, y: 0.3, z: 0 },
  thumbDip: { x: 0, y: 0.2, z: 0 },
  thumbPip: { x: 0, y: 0.1, z: 0 },
  indexFingerTip: { x: 0, y: 0, z: 0 }, // index finger is down
  indexFingerDip: { x: 0, y: -0.1, z: 0 },
  indexFingerPip: { x: 0, y: -0.2, z: 0 },
  indexFingerMcp: { x: 0, y: -0.3, z: 0 },
  middleFingerTip: { x: 0, y: 0, z: 0 }, // middle finger is down
  middleFingerDip: { x: 0, y: -0.1, z: 0 },
  middleFingerPip: { x: 0, y: -0.2, z: 0 },
  middleFingerMcp: { x: 0, y: -0.3, z: 0 },
  ringFingerTip: { x: 0, y: 0, z: 0 }, // ring finger is down
  ringFingerDip: { x: 0, y: -0.1, z: 0 },
  ringFingerPip: { x: 0, y: -0.2, z: 0 },
  ringFingerMcp: { x: 0, y: -0.3, z: 0 },
  pinkyTip: { x: 0, y: 0, z: 0 }, // pinky is down
  pinkyDip: { x: 0, y: -0.1, z: 0 },
  pinkyPip: { x: 0, y: -0.2, z: 0 },
  pinkyMcp: { x: 0, y: -0.3, z: 0 },
};

camera.onFrame = async () => {
  const image = await camera.getImage();
  const results = await handEstimator.estimate(image);

  if (results.multiHandLandmarks) {
    const landmarks = results.multiHandLandmarks[0];
    const gesture = recognizeGesture(landmarks);
    if (gesture === "thumbsUp") {
      // Send a signal to your 3D scene to perform an action
      console.log("Thumbs up!");
    }
  }
};

function recognizeGesture(landmarks) {
  const thumbTip = landmarks[4];
  const thumbIp = landmarks[3];
  const thumbMcp = landmarks[2];
  const thumbDip = landmarks[1];
  const thumbPip = landmarks[0];

  if (
    thumbTip.y > thumbIp.y &&
    thumbTip.y > thumbMcp.y &&
    thumbTip.y > thumbDip.y &&
    thumbTip.y > thumbPip.y
  ) {
    return "thumbsUp";
  }
  return null;
}

if (gesture === "thumbsUp") {
  // Send a signal to your 3D scene to perform an action
  scene.onGestureRecognized("thumbsUp");
}
