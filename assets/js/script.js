document.addEventListener('DOMContentLoaded', function() {
  const videoOverlay = document.createElement('div');
  videoOverlay.id = 'video-overlay';
  document.getElementById('video-background').appendChild(videoOverlay);
  var terminalContainer = document.getElementById('terminal');
  var terminalText = document.getElementById('terminal-text');
  var videoBackground = document.getElementById('myVideo');
  var closeButton = document.getElementById('close-button');

  var terminalTextContent = [
      "User: SHUT UP NIGGA",
      "IP: Loading...",
      "System: Loading...",
      "Bio Loaded",
      "Press Enter To Continue",
  ];
  var currentIndex = 0;

  videoBackground.pause();

  function typeWriter() {
      var line = currentIndex === 0 ? getAsciiArt() : terminalTextContent[currentIndex - 1];
      var i = 0;

      function typeChar() {
          if (i < line.length) {
              terminalText.textContent += line.charAt(i);
              i++;
              setTimeout(typeChar, currentIndex === 0 ? 10 : 50);
          } else {
              terminalText.textContent += "\n";
              currentIndex++;
              if (currentIndex < terminalTextContent.length + 1) {
                  typeWriter();
              } else {
                  addEventListeners();
              }
          }
      }

      if (currentIndex === 0) {
          terminalText.style.transform = 'scale(5)';
          terminalText.style.opacity = '0';
          terminalText.style.transition = 'transform 1.5s ease-out, opacity 1.5s ease-out';
          void terminalText.offsetWidth;
          
          terminalText.style.transform = 'scale(1)';
          terminalText.style.opacity = '1';
      }

      typeChar();
  }

  function handleInput() {
      enterFullscreen(); 

      terminalContainer.style.display = 'none';
      document.getElementById('myVideo').play();
      document.getElementById('blurred-box').style.display = 'block';
      document.getElementById('music-controls').style.display = 'flex';
      removeEventListeners();
      document.body.classList.add('video-normal');
      window.MusicPlayer.start()
  }

  function addEventListeners() {
      document.addEventListener('keydown', handleKeyPress);
      terminalContainer.addEventListener('click', handleInput);
  }

  function removeEventListeners() {
      document.removeEventListener('keydown', handleKeyPress);
      terminalContainer.removeEventListener('click', handleInput);
  }

  function enterFullscreen() {
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement) {

      const element = document.documentElement; 

      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  }

  function handleKeyPress(event) {
      if (event.key === 'Enter') {
          handleInput();
      }
  }

  closeButton.addEventListener('click', function() {
      handleInput();
  });

  var userAgent = navigator.userAgent;

  function getWindowsVersion() {
      var version = userAgent.match(/Windows NT ([\d.]+)/);
      if (version) {
          version = version[1];
          switch (version) {
              case "5.1": return "Windows XP";
              case "6.0": return "Windows Vista";
              case "6.1": return "Windows 7";
              case "6.2": return "Windows 8";
              case "6.3": return "Windows 8.1";
              case "10.0": return "Windows 10";
              default: return "Windows";
          }
      } else {
          return "Windows";
      }
  }
  
  function getMacOSVersion() {
      var version = userAgent.match(/Mac OS X ([\d_]+)/);
      return version ? "macOS " + version[1].replace(/_/g, '.') : "macOS";
  }
  
  function getAndroidVersion() {
      var version = userAgent.match(/Android ([\d.]+)/);
      return version ? "Android " + version[1] : "Android";
  }
  
  function getiOSVersion() {
      var version = userAgent.match(/OS ([\d_]+)/);
      return version ? "iOS " + version[1].replace(/_/g, '.') : "iOS";
  }

  function getFallbackOperatingSystem() {
      if (userAgent.match(/Windows/)) {
          return getWindowsVersion();
      } else if (userAgent.match(/Macintosh/)) {
          return getMacOSVersion();
      } else if (userAgent.match(/Android/)) {
          return getAndroidVersion();
      } else if (userAgent.match(/Linux/)) {
          return "Linux";
      } else if (userAgent.match(/iPhone|iPad|iPod/)) {
          return getiOSVersion();
      } else {
          return "Unknown";
      }
  }

  async function getModernOperatingSystem() {
      const fallbackOs = getFallbackOperatingSystem();

      if (!navigator.userAgentData) {
          return fallbackOs;
      }

      if (navigator.userAgentData.platform !== "Windows") {
          return fallbackOs;
      }

      try {
          const hints = await navigator.userAgentData.getHighEntropyValues(['platformVersion']);
          
          if (!hints.platformVersion) {
              return fallbackOs;
          }

          const majorVersion = parseInt(hints.platformVersion.split('.')[0], 10);

          if (majorVersion >= 13) {
              return "Windows 11";
          } else {
              return "Windows 10";
          }

      } catch (error) {
          console.error("Error getting platformVersion:", error);
          return fallbackOs;
      }
  }

  const ipPromise = fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => data.ip)
      .catch(error => {
          console.error('Error fetching IP address:', error);
          return "Unable to fetch IP address";
      });

  const osPromise = getModernOperatingSystem();

  Promise.all([ipPromise, osPromise])
      .then(([ipAddress, operatingSystem]) => {
          terminalTextContent[1] = "IP: " + ipAddress;
          terminalTextContent[2] = "System: " + operatingSystem;
          
          typeWriter();
      });


  function centerTerminal() {
      var terminalWidth = terminalContainer.offsetWidth;
      var terminalHeight = terminalContainer.offsetHeight;
      var centerX = (window.innerWidth - terminalWidth) / 2;
      var centerY = (window.innerHeight - terminalHeight) / 2;

      terminalContainer.style.position = 'absolute';
      terminalContainer.style.left = centerX + 'px';
      terminalContainer.style.top = centerY + 'px';
  }

  centerTerminal();
  window.addEventListener('resize', centerTerminal);

  terminalText.style.textAlign = 'center';

  function getAsciiArt() {
      return `
    ⡟⠛⠻⠛⠻⣿⣿⡿⠛⠉⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⡇⠐_⠂⢁⠟⢁⣠⣶⣿⡄⢹⣿⣿⣿⣿⣿⠿⠿⠛⣉⣉⡄⢹
    ⣿⣦⣄⡕⠁⣴⣿⣿⣿⡿⢋⣀⣤⡤⢀⠄⣤⣶⣾⣿⣿⣿⡇⠀
    ⣿⣿⡟⢠⣾⣿⣿⣿⣿⠁⢆⣾⣿⡁⢎⣾⣿⣿⣿⣿⣿⣿⡇⢠
    ⡿⠟⢠⣿⠟⠻⣿⣿⣿⣿⣾⣿⣿⣶⣾⣿⣿⣿⣿⣿⣿⣿⠃⣸
    ⡆⢻⣿⡿⠖⠀⠈⢻⣿⢻⣿⣿⣿⣷⣟⠿⠟⠛⠙⢿⣿⣿⠀⣿
    ⢁⣾⣿⣇⣤⣴⣾⣿⣿⣮⣭⣬⣭⣾⣧⢄⠀⠒⢶⣿⣿⣿⠧⠘
    ⠀⣿⠛⠡⠂⠀_⠈⠙⠟⠉⠉⠀⠀⢍⠺⣷⣦⣾⣿⣿⣿⣦⡉
    ⣧⠘⣈⣤⡀⠁⠄⡈⠄_⠂⠌⢐⣀⣀⠱⠘⣟⡿⣿⣿⣶⠉⣴
    ⡟⢰⣿⣿⣿⠀⠚⠄⠠⠐⢀⠂⣿⣿⣿⣿⣶⣬⡺⣹⢲⡞⠆⢹
    ⡇⢸⣿⣿⣟⠀⠀⠂⠁⠀⣂⠀⠹⣿⢿⣿⣿⣿⣿⣷⣭⡀⢴⣿
    ⣷⡌⠻⡿⠋⠄⠀⠀⠀⠐⠀⠃⠀⠙⢷⣿⣿⣿⣿⣾⣿⣿⣦⡙ 
  `;
  }

  document.body.classList.remove('video-normal');
  videoOverlay.style.display = 'block'; 
});