const resolutionScale = 20;
let xScale, yScale;
let terra = [];
let f = 0;
let sound, amplitude;

function preload() {
  sound = loadSound("./ninja.mp3");
}

function setup() {
  let cnv = createCanvas(600, 780, WEBGL);
  xScale = 1700 / resolutionScale;
  yScale = 1800 / resolutionScale;

  cnv.mouseClicked(togglePlay);

  amplitude = new p5.Amplitude();
  amplitude.setInput(sound);
}

function draw() {
  f -= 0.01;
  let yNoise = f;
  for (let i = 0; i < yScale; i++) {
    terra[i] = [];
    let xNoise = 0;
    for (let j = 0; j < xScale; j++) {
      let vol = amplitude.getLevel();
      terra[i][j] = map(noise(xNoise, yNoise, vol), 0, 1, -100, 100);
      xNoise += 0.1;
    }
    yNoise += 0.1;
  }

  background(0);
  translate(width / 2, height / 2);
  rotateX(PI / 3);
  noFill();
  stroke(255);
  translate(-width * 2, -height * 2);
  for (let i = 0; i < yScale; i++) {
    beginShape();
    for (let j = 0; j < xScale; j++) {
      let x = i * resolutionScale;
      let y = j * resolutionScale;
      let z = terra[i][j];
      vertex(y, x, z);
    }
    endShape();
  }
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
    amplitude = new p5.Amplitude();
    amplitude.setInput(sound);
  }
}
