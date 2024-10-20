function launchConfetti() {
    const duration = 5000; // Duration of the confetti effect
    const animationEnd = Date.now() + duration;
    const colors = ['#FFC700', '#FF3F20', '#2ECC40', '#00A8FF', '#8E44AD', '#FF6B6B', '#4ECDC4', '#F9D56D'];

    // Function to create confetti burst
    function createBurst(x, y) {
        for (let i = 0; i < 300; i++) { // Increased number of confetti particles
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.position = 'absolute';
            confetti.style.width = '12px'; // Larger size
            confetti.style.height = '12px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.opacity = Math.random();
            confetti.style.transform = `translate(${Math.random() * 800 - 400}px, ${Math.random() * 800 - 400}px)`;
            confetti.style.transition = 'transform 1s ease, opacity 1s ease'; // Smooth animation
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), duration);
        }
    }

    // Trigger bursts at random positions
    function burst() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createBurst(x, y);
    }

    // Burst confetti in intervals
    const burstInterval = setInterval(() => {
        if (Date.now() < animationEnd) {
            burst();
        } else {
            clearInterval(burstInterval);
        }
    }, 200); // More frequent bursts
}
