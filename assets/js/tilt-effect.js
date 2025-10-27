document.addEventListener('DOMContentLoaded', function() {
  const blurredBox = document.getElementById('blurred-box');
  if (!blurredBox) return;

  const config = {
    sensitivity: 25,
    hoverEasing: 0.15,
    returnEasing: 0.02,
    returnDuration: 2000,
    maxAngle: 12,
    precision: 0.001,
    delayBeforeReturn: 300
  };

  let target = { x: 0, y: 0 };
  let current = { x: 0, y: 0 };
  let isHovering = false;
  let animationId = null;
  let returnTimeout = null;

  const applyTransform = () => {
    blurredBox.style.setProperty('--rotate-x', `${current.x}deg`);
    blurredBox.style.setProperty('--rotate-y', `${current.y}deg`);
  };

  const updateTilt = (e) => {
    const rect = blurredBox.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    
    target = {
      x: Math.max(-config.maxAngle, Math.min(config.maxAngle, y * config.maxAngle)),
      y: Math.max(-config.maxAngle, Math.min(config.maxAngle, -x * config.maxAngle))
    };
  };

  const animate = () => {
    const ease = isHovering ? config.hoverEasing : config.returnEasing;
    
    current.x += (target.x - current.x) * ease;
    current.y += (target.y - current.y) * ease;
    
    applyTransform();
    
    if (isHovering || 
        Math.abs(current.x) > config.precision || 
        Math.abs(current.y) > config.precision) {
      animationId = requestAnimationFrame(animate);
    } else {
      animationId = null;
      current.x = current.y = 0;
      applyTransform();
    }
  };

  const startAnimation = () => {
    if (!animationId) {
      animationId = requestAnimationFrame(animate);
    }
  };

  blurredBox.addEventListener('mouseenter', (e) => {
    isHovering = true;
    clearTimeout(returnTimeout);
    updateTilt(e);
    startAnimation();
  });

  blurredBox.addEventListener('mousemove', (e) => {
    if (isHovering) {
      updateTilt(e);
    }
  });

  blurredBox.addEventListener('mouseleave', () => {
    isHovering = false;
    target = { x: 0, y: 0 };
    
    returnTimeout = setTimeout(() => {
      startAnimation();
    }, config.delayBeforeReturn);
  });

  applyTransform();
});