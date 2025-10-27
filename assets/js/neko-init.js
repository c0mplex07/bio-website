// assets/js/neko-init.js

function initNekoCats() {
  const nekoImageUrls = [
    "neko.png"
  ];

  const mainNeko = new Neko({ 
    nekoName: "main-neko", 
    nekoImageUrl: "./assets/cursor/neko.png",
    initialPosX: window.innerWidth / 2,
    initialPosY: window.innerHeight / 2
  });
  mainNeko.init();
  mainNeko.isFollowing = true;

  nekoImageUrls.forEach((url, index) => {
    const neko = new Neko({
      nekoName: "neko-" + index,
      nekoImageUrl: `./neko/images/${url}`,
      initialPosX: 50 + (index % 5) * 80,
      initialPosY: 50 + Math.floor(index / 5) * 80
    });
    neko.init();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNekoCats);
} else {
  initNekoCats();
}

if (typeof Neko === 'undefined') {
  console.error('Neko class not found. Load neko.js first');
} else {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNekoCats);
  } else {
    initNekoCats();
  } 
}                                     