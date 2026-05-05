document.addEventListener('DOMContentLoaded', function() {
  const audioElement = window.MusicPlayer ? window.MusicPlayer.getAudio() : null; 
  const blurredBox = document.getElementById('blurred-box');

  if (!audioElement) {
    console.error('Audio element not found');
    return;
  }
  
  if (!window.AudioContext && !window.webkitAudioContext) {
    console.log('Web Audio API is not supported in this browser');
    return;
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0.6;

  const source = audioContext.createMediaElementSource(audioElement);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  let bassIntensity = 0;
  let prevBassIntensity = 0;
  const bassDecay = 0.85;

  function updateVisuals() {
    requestAnimationFrame(updateVisuals);
    analyser.getByteFrequencyData(dataArray);
    
    const bassRangeStart = 0;
    const bassRangeEnd = Math.floor(bufferLength * 0.1);
    
    let bassSum = 0;
    for (let i = bassRangeStart; i < bassRangeEnd; i++) {
      const weight = 1.0 - (i / bassRangeEnd);
      bassSum += dataArray[i] * weight;
    }
    
    const rawBassIntensity = bassSum / (bassRangeEnd * 128);
    bassIntensity = Math.max(rawBassIntensity, prevBassIntensity * bassDecay);
    prevBassIntensity = bassIntensity;
    
    const shadowBlur = 10 + bassIntensity * 30;
    const shadowSpread = bassIntensity * 10;
    const shadowColor = `rgba(255, 255, 255, ${0.7 + bassIntensity * 0.8})`;
    blurredBox.style.boxShadow = `0 0 ${shadowBlur}px ${shadowSpread}px ${shadowColor}`;
    if (bassIntensity > 0.3) {
      blurredBox.classList.add('active-border');
      const borderElement = blurredBox.querySelector('.animated-border') || document.createElement('div');
      borderElement.className = 'animated-border';
      borderElement.style.opacity = bassIntensity;
      borderElement.style.transform = `scale(${1 + bassIntensity * 0.2})`;
      
      if (!blurredBox.contains(borderElement)) {
        blurredBox.appendChild(borderElement);
      }
    } else {
      blurredBox.classList.remove('active-border');
    }
  }

  audioElement.addEventListener('play', function() {
    audioContext.resume().then(() => {
      updateVisuals();
    });
  });
});