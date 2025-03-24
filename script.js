// chatgpt helped me figure out the volume slider and the crossfade function, the images on the website are placeholders
const audio1 = document.getElementById('audio1');
const audio2 = document.getElementById('audio2');
const volumeSlider = document.getElementById('volumeSlider');

let masterVolume = parseFloat(volumeSlider.value);
audio1.volume = 0;
audio2.volume = 0;

function crossFade(fromAudio, toAudio, duration = 1000) {
  const steps = 20;
  const stepTime = duration / steps;
  let currentStep = 0;
  const fromInitialVolume = fromAudio.volume;
  const targetVolume = masterVolume;
  
  const fadeInterval = setInterval(() => {
    currentStep++;
    fromAudio.volume = Math.max(fromInitialVolume * (1 - currentStep / steps), 0);
    toAudio.volume = Math.min(targetVolume * (currentStep / steps), targetVolume);
    if (currentStep >= steps) {
      clearInterval(fadeInterval);
    }
  }, stepTime);
}

const sections = document.querySelectorAll('.section');
const options = {
  root: null,
  threshold: 0.5
};

let currentSection = 1;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.id === 'section1' && currentSection !== 1) {
        crossFade(audio2, audio1);
        currentSection = 1;
      } else if (entry.target.id === 'section2' && currentSection !== 2) {
        crossFade(audio1, audio2);
        currentSection = 2;
      } else if (entry.target.id === 'section3' && currentSection !== 3) {
        crossFade(audio2, audio1);
        currentSection = 3;
      }
    }
  });
}, options);

sections.forEach(section => observer.observe(section));

volumeSlider.addEventListener('input', function() {
  masterVolume = parseFloat(this.value);
  if (audio1.paused && audio2.paused) {
    audio1.play();
    audio2.play();
  }
  if (currentSection === 2) {
    audio2.volume = masterVolume;
    audio1.volume = 0;
  } else {
    audio1.volume = masterVolume;
    audio2.volume = 0;
  }
});
