import mic from 'mic';
import Speaker from 'speaker';

const micInstance = mic({
  rate: '44100',
  channels: '1',
  debug: true,
  bitWidth: 24
});

// Create the Speaker instance
const speaker = new Speaker({
  channels: 1,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100,     // 44,100 Hz sample rate
  bitWidth: 24
});

const micInputStream = micInstance.getAudioStream();
micInputStream.pipe(speaker);

micInputStream.on('data', function (data) {
  console.log("Recieved Input Stream: " + data.length);
});

micInputStream.on('error', function (err) {
  console.log("Error in Input Stream: " + err);
});

micInputStream.on('startComplete', function () {
  console.log("Got SIGNAL startComplete");
});

micInputStream.on('stopComplete', function () {
  console.log("Got SIGNAL stopComplete");
});

micInputStream.on('pauseComplete', function () {
  console.log("Got SIGNAL pauseComplete");
});

micInputStream.on('resumeComplete', function () {
  console.log("Got SIGNAL resumeComplete");
});

micInputStream.on('silence', function () {
  console.log("Got SIGNAL silence");
});

micInputStream.on('processExitComplete', function () {
  console.log("Got SIGNAL processExitComplete");
});

micInstance.start(); 