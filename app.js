// JavaScript Interactivity for Kiran Kumar Pradhan's Portfolio

document.addEventListener('DOMContentLoaded', () => {

  // 1. CINEMATIC 3D SUDARSHAN CHAKRA LOADER
  function init3DLoader() {
    const canvas = document.getElementById('sudarshan-canvas');
    const loader = document.getElementById('loader');
    const loaderName = document.getElementById('loader-name');
    const loaderTagline = document.getElementById('loader-tagline');
    if (!canvas || !loader) return;

    // â”€â”€ Scene Setup â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const W = window.innerWidth, H = window.innerHeight;

    // Explicitly set canvas pixel size (required for WebGL)
    canvas.width = W;
    canvas.height = H;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.set(0, 0, 12);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    } catch (e) {
      // WebGL not available â€” skip loader immediately
      loader.style.display = 'none';
      document.body.style.overflow = '';
      return;
    }
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x2B2724, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // â”€â”€ Materials â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.25, metalness: 0.9, emissive: 0xb8860b, emissiveIntensity: 0.3 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0x8b2612, roughness: 0.4, metalness: 0.5, emissive: 0x4a1008, emissiveIntensity: 0.2 });
    const parchMat = new THREE.MeshStandardMaterial({ color: 0xfaf6f0, roughness: 0.6, metalness: 0.1 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1a1512, roughness: 0.8, metalness: 0.1 });

    // â”€â”€ Build Sudarshan Chakra â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const chakra = new THREE.Group();

    // Outer thick rim
    const outerRim = new THREE.Mesh(
      new THREE.TorusGeometry(3.8, 0.18, 16, 80),
      goldMat
    );
    chakra.add(outerRim);

    // Second decorative rim (red)
    const midRim = new THREE.Mesh(
      new THREE.TorusGeometry(3.5, 0.07, 12, 72),
      redMat
    );
    chakra.add(midRim);

    // Inner dashed rim (thin gold ring)
    const innerRim = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.04, 8, 64),
      goldMat
    );
    chakra.add(innerRim);

    // Inner hub ring (gold)
    const hubRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.12, 12, 40),
      goldMat
    );
    chakra.add(hubRing);

    // Hub ring (red inner)
    const hubRingInner = new THREE.Mesh(
      new THREE.TorusGeometry(0.9, 0.07, 10, 32),
      redMat
    );
    chakra.add(hubRingInner);

    // Central hub disc
    const hubDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 0.22, 24),
      goldMat
    );
    hubDisc.rotation.x = Math.PI / 2;
    chakra.add(hubDisc);

    // Central jewel (dark center)
    const jewel = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      redMat
    );
    chakra.add(jewel);

    // 8 Major Spokes
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const spokeLen = 2.0;
      const spokeMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065, 0.04, spokeLen, 8),
        goldMat
      );
      spokeMesh.position.set(
        Math.sin(angle) * (1.2 + spokeLen / 2),
        Math.cos(angle) * (1.2 + spokeLen / 2),
        0
      );
      spokeMesh.rotation.z = -angle;
      chakra.add(spokeMesh);

      // Decorative bead at spoke tip (on outer rim)
      const bead = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 10, 10),
        goldMat
      );
      bead.position.set(Math.sin(angle) * 3.8, Math.cos(angle) * 3.8, 0);
      chakra.add(bead);

      // Petal / flame tip beyond outer rim
      const petalGeo = new THREE.ConeGeometry(0.1, 0.45, 6);
      const petal = new THREE.Mesh(petalGeo, redMat);
      petal.position.set(Math.sin(angle) * 4.35, Math.cos(angle) * 4.35, 0);
      petal.rotation.z = -angle;
      chakra.add(petal);
    }

    // 8 Minor spokes (thinner, dashed-look via shorter rods)
    for (let i = 0; i < 8; i++) {
      const angle = ((i + 0.5) / 8) * Math.PI * 2;
      const spokeLen = 1.85;
      const minor = new THREE.Mesh(
        new THREE.CylinderGeometry(0.028, 0.018, spokeLen, 6),
        parchMat
      );
      minor.position.set(
        Math.sin(angle) * (1.2 + spokeLen / 2),
        Math.cos(angle) * (1.2 + spokeLen / 2),
        0
      );
      minor.rotation.z = -angle;
      chakra.add(minor);
    }

    // Front face plate (very thin disc to give depth)
    const faceDisc = new THREE.Mesh(
      new THREE.RingGeometry(1.3, 3.15, 64),
      darkMat
    );
    faceDisc.position.z = -0.05;
    chakra.add(faceDisc);

    chakra.scale.set(0.01, 0.01, 0.01); // start tiny (grows in)
    scene.add(chakra);


    // â”€â”€ Spark Particles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const SPARK_COUNT = 220;
    const sparkPositions = new Float32Array(SPARK_COUNT * 3);
    const sparkVelocities = [];
    for (let i = 0; i < SPARK_COUNT; i++) {
      sparkPositions[i * 3] = 0;
      sparkPositions[i * 3 + 1] = 0;
      sparkPositions[i * 3 + 2] = 0;
      sparkVelocities.push({ x: 0, y: 0, z: 0, life: 0, maxLife: 0 });
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    const sparkMat = new THREE.PointsMaterial({ color: 0xd4af37, size: 0.09, transparent: true, opacity: 0, depthWrite: false });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparks);

    // ── Lights ────────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambient);

    // Main golden key light
    const keyLight = new THREE.DirectionalLight(0xd4af37, 1.0);
    keyLight.position.set(5, 8, 8);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Sacred glow point lights (placed around/through the chakra)
    const glow1 = new THREE.PointLight(0xd4af37, 3.0, 20);
    glow1.position.set(0, 0, 3);
    scene.add(glow1);

    const glow2 = new THREE.PointLight(0x8b2612, 2.0, 18);
    glow2.position.set(0, 0, -3);
    scene.add(glow2);

    const glow3 = new THREE.PointLight(0xffffff, 0.0, 25);
    glow3.position.set(3, 3, 6);
    scene.add(glow3);

    // Rim fill light
    const rimLight = new THREE.DirectionalLight(0x8b2612, 0.8);
    rimLight.position.set(-6, -4, 2);
    scene.add(rimLight);

    // ── Animation State ──────────────────────────────────────────────────
    const TOTAL_DURATION = 5000; // ms
    const startTime = performance.now();
    let animDone = false;
    let soundPlayed = false;
    const weaponAudio = new Audio('rescopicsound-sci-fi-weapon-projectile-flyby-plasma-03-233857.mp3');
    weaponAudio.volume = 1.0;

    // Pre-authorize weapon sound on user click/touch to bypass browser autoplay blocks
    const preAuthorizeAudio = () => {
      weaponAudio.play()
        .then(() => {
          weaponAudio.pause();
          weaponAudio.currentTime = 0;
          cleanupPreAuth();

          // Hide sound tip text once authorized
          const soundTip = document.getElementById('loader-sound-tip');
          if (soundTip) soundTip.style.opacity = '0';
        })
        .catch(err => console.log('Audio pre-auth waiting for click...', err));
    };

    const cleanupPreAuth = () => {
      document.removeEventListener('click', preAuthorizeAudio);
      document.removeEventListener('touchstart', preAuthorizeAudio);
    };

    document.addEventListener('click', preAuthorizeAudio);
    document.addEventListener('touchstart', preAuthorizeAudio, { passive: true });

    // Phases (ms):
    // 0 – 800    : Appear from nothing, slow sacred spin, text fades in
    // 800 – 2200 : Sacred rotation, chakra drifts in 3D, lights build
    // 2200 – 3800: Acceleration phase — flies around screen in wild arcs
    // 3800 – 4600: Blazing finale — blinding light + shrinks/exits
    // 4600+      : Hide loader

    // Flying path: pre-computed control points
    const flyPath = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, 3, -4),
      new THREE.Vector3(-6, -2, -6),
      new THREE.Vector3(4, -4, -3),
      new THREE.Vector3(-3, 5, -5),
      new THREE.Vector3(0, 0, 0),
    ];

    function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
    function easeIn(t) { return t * t * t; }
    function lerp(a, b, t) { return a + (b - a) * t; }
    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    // Spawn a spark from chakra rim
    function spawnSpark() {
      const i = Math.floor(Math.random() * SPARK_COUNT);
      const angle = Math.random() * Math.PI * 2;
      const r = 3.8 + (Math.random() - 0.5) * 0.4;
      const cx = chakra.position.x, cy = chakra.position.y, cz = chakra.position.z;
      sparkPositions[i * 3] = cx + Math.cos(angle) * r;
      sparkPositions[i * 3 + 1] = cy + Math.sin(angle) * r;
      sparkPositions[i * 3 + 2] = cz + (Math.random() - 0.5) * 0.3;
      const speed = 0.06 + Math.random() * 0.14;
      sparkVelocities[i] = {
        x: Math.cos(angle) * speed * 1.4,
        y: Math.sin(angle) * speed * 1.4,
        z: (Math.random() - 0.5) * speed,
        life: 1.0,
        maxLife: 0.6 + Math.random() * 0.8
      };
    }

    let frameId;

    function renderLoader() {
      if (animDone) return;
      frameId = requestAnimationFrame(renderLoader);

      const now = performance.now();
      const elapsed = now - startTime;

      if (elapsed >= 2200 && !soundPlayed) {
        soundPlayed = true;
        weaponAudio.play().catch(e => console.log("Weapon audio autoplay blocked:", e));
      }

      const t_total = clamp(elapsed / TOTAL_DURATION, 0, 1);

      // — Phase helpers —
      const t_appear = clamp(elapsed / 800, 0, 1);           // 0→800ms
      const t_sacred = clamp((elapsed - 800) / 1400, 0, 1);  // 800â†’2200ms
      const t_accel = clamp((elapsed - 2200) / 1600, 0, 1); // 2200â†’3800ms
      const t_finale = clamp((elapsed - 3800) / 800, 0, 1);  // 3800â†’4600ms

      // â”€ 1. Scale / appear â”€
      const appearScale = easeInOut(t_appear) * 1.0;
      const finaleScale = t_finale > 0 ? lerp(1.0, 0.05, easeIn(t_finale)) : 1.0;
      const scale = t_finale > 0 ? finaleScale : appearScale;
      chakra.scale.set(scale, scale, scale);

      // â”€ 2. Spin speed â”€
      // slow (0.5 rad/s) â†’ medium (3 rad/s) â†’ blazing (20 rad/s) â†’ 0 on exit
      let spinSpeed;
      if (t_finale > 0) {
        spinSpeed = lerp(18, 80, easeIn(t_finale));
      } else if (t_accel > 0) {
        spinSpeed = lerp(2.5, 18, easeIn(t_accel));
      } else {
        spinSpeed = lerp(0.3, 2.5, t_sacred);
      }
      chakra.rotation.z += spinSpeed * 0.016; // ~60fps step
      // 3D tilt during acceleration â€” chakra tilts and rolls in X/Y
      if (t_accel > 0) {
        chakra.rotation.x = Math.sin(elapsed * 0.002) * t_accel * 1.8;
        chakra.rotation.y = Math.cos(elapsed * 0.0015) * t_accel * 2.2;
      } else {
        chakra.rotation.x = Math.sin(elapsed * 0.001) * 0.15 * t_sacred;
        chakra.rotation.y = Math.cos(elapsed * 0.0008) * 0.1 * t_sacred;
      }

      // â”€ 3. Position â€” fly across screen â”€
      if (t_accel > 0 && t_finale === 0) {
        const pathT = t_accel;
        // Interpolate through fly path using piecewise lerp
        const segCount = flyPath.length - 1;
        const rawSeg = pathT * segCount;
        const seg = Math.floor(clamp(rawSeg, 0, segCount - 1));
        const segT = rawSeg - seg;
        const from = flyPath[seg], to = flyPath[seg + 1];
        chakra.position.x = lerp(from.x, to.x, easeInOut(segT));
        chakra.position.y = lerp(from.y, to.y, easeInOut(segT));
        chakra.position.z = lerp(from.z, to.z, easeInOut(segT));
      } else if (t_finale > 0) {
        // Return to center for finale
        chakra.position.x = lerp(chakra.position.x, 0, 0.08);
        chakra.position.y = lerp(chakra.position.y, 0, 0.08);
        chakra.position.z = lerp(chakra.position.z, 0, 0.08);
      } else {
        // Gentle drift during sacred phase
        chakra.position.x = Math.sin(elapsed * 0.0006) * 0.4 * t_sacred;
        chakra.position.y = Math.cos(elapsed * 0.0004) * 0.25 * t_sacred;
        chakra.position.z = 0;
      }

      // â”€ 4. Camera follows with lag â”€
      camera.position.x = lerp(camera.position.x, chakra.position.x * 0.3, 0.04);
      camera.position.y = lerp(camera.position.y, chakra.position.y * 0.3, 0.04);
      camera.lookAt(chakra.position);

      // â”€ 5. Lighting evolution â”€
      // gold â†’ orange â†’ white-hot as speed increases
      const accelPower = t_accel > 0 ? easeIn(t_accel) : 0;
      const finalePower = easeIn(t_finale);

      glow1.intensity = 3.0 + accelPower * 18 + finalePower * 60;
      glow2.intensity = 2.0 + accelPower * 12 + finalePower * 40;
      glow3.intensity = accelPower * 8 + finalePower * 35;

      // Shift glow color gold â†’ orange â†’ white
      const r1 = lerp(0xd4 / 255, 1.0, accelPower);
      const g1 = lerp(0xaf / 255, lerp(0.6, 1.0, finalePower), accelPower);
      const b1 = lerp(0x37 / 255, lerp(0.1, 1.0, finalePower), accelPower);
      glow1.color.setRGB(r1, g1, b1);

      // Emissive on gold material ramps up
      goldMat.emissiveIntensity = 0.3 + accelPower * 3.0 + finalePower * 8.0;
      redMat.emissiveIntensity = 0.2 + accelPower * 1.5 + finalePower * 4.0;

      // Glow lights orbit the chakra during acceleration
      if (t_accel > 0) {
        const orbitR = 2.5 + accelPower * 2;
        const orbitSpeed = elapsed * 0.004 * (1 + accelPower * 4);
        glow1.position.set(
          chakra.position.x + Math.cos(orbitSpeed) * orbitR,
          chakra.position.y + Math.sin(orbitSpeed * 1.3) * orbitR,
          chakra.position.z + 4
        );
        glow2.position.set(
          chakra.position.x + Math.cos(orbitSpeed + Math.PI) * orbitR,
          chakra.position.y + Math.sin(orbitSpeed * 1.3 + Math.PI) * orbitR,
          chakra.position.z - 2
        );
      }

      // â”€ 6. Sparks â”€
      const sparkActive = t_accel > 0 && t_finale < 0.8;
      const sparksPerFrame = Math.floor(accelPower * 12 + finalePower * 20);
      if (sparkActive) {
        for (let s = 0; s < sparksPerFrame; s++) spawnSpark();
      }
      sparkMat.opacity = clamp(accelPower * 1.2 + finalePower * 0.5, 0, 1);
      sparkMat.size = 0.06 + accelPower * 0.08 + finalePower * 0.14;

      // Animate existing sparks
      for (let i = 0; i < SPARK_COUNT; i++) {
        const sv = sparkVelocities[i];
        if (sv.life > 0) {
          sv.life -= 0.016 / sv.maxLife;
          sparkPositions[i * 3] += sv.x;
          sparkPositions[i * 3 + 1] += sv.y;
          sparkPositions[i * 3 + 2] += sv.z;
          sv.x *= 0.96; sv.y *= 0.96; sv.z *= 0.96;
        } else {
          // Reset dead spark to origin (invisible)
          sparkPositions[i * 3] = 9999;
          sparkPositions[i * 3 + 1] = 9999;
          sparkPositions[i * 3 + 2] = 9999;
        }
      }
      sparkGeo.attributes.position.needsUpdate = true;

      // â”€ 7. Background flash on finale â”€
      const bgR = lerp(0x2B / 255, 1.0, finalePower * 0.85);
      const bgG = lerp(0x27 / 255, lerp(0.7, 1.0, finalePower), finalePower * 0.6);
      const bgB = lerp(0x24 / 255, lerp(0.1, 0.8, finalePower), finalePower * 0.3);
      renderer.setClearColor(new THREE.Color(bgR, bgG, bgB), 1);

      // â”€ 8. Text fade in â”€
      if (t_sacred > 0.3 && t_finale === 0) {
        const textAlpha = clamp((t_sacred - 0.3) / 0.4, 0, 1);
        loaderName.style.opacity = textAlpha;
        loaderTagline.style.opacity = textAlpha;
      }
      if (t_finale > 0.2) {
        const textFade = clamp(1 - (t_finale - 0.2) / 0.4, 0, 1);
        loaderName.style.opacity = textFade;
        loaderTagline.style.opacity = textFade;
      }

      renderer.render(scene, camera);

      // â”€ 9. Exit â”€
      if (elapsed >= 4600 && !animDone) {
        animDone = true;
        cancelAnimationFrame(frameId);
        renderer.dispose();
        // Restore page scrolling
        document.body.style.overflow = '';
        // Fade out loader
        loader.style.transition = 'opacity 0.7s ease-out';
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(() => { loader.style.display = 'none'; }, 750);

        // Start background music loop after loader fades
        if (typeof window.startPortfolioBGM === 'function') {
          window.startPortfolioBGM();
        }
      }
    }

    renderLoader();

    // Resize handler
    window.addEventListener('resize', () => {
      const nW = window.innerWidth, nH = window.innerHeight;
      canvas.width = nW;
      canvas.height = nH;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    });
  }

  // Lock scrolling until loader finishes
  document.body.style.overflow = 'hidden';
  init3DLoader();

  // 2. MOBILE MENU: Toggle Navigation Drawer
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && e.target !== mobileToggle) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      }
    });

    // Close menu when clicking links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      });
    });
  }

  // 3. BACKGROUND CANVAS: Dynamic ML Neural Network Particle System
  const canvas = document.getElementById('bg-network-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let particleCount = 60;

    // Adjust density based on screen size
    if (window.innerWidth < 768) {
      particleCount = 30;
    }

    // Set canvas dimensions
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Constructor
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce walls
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Terracotta accent particles
        ctx.fillStyle = 'rgba(139, 38, 18, 0.4)';
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Connect particles with neural line networks
    function connect() {
      const maxDistance = 140;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Fade lines as they drift apart
            const opacity = 1 - (dist / maxDistance);
            ctx.strokeStyle = `rgba(212, 175, 55, ${opacity * 0.12})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation Loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw a subtle radial gradient in background to enhance depth
      const grad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 50, canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height));
      grad.addColorStop(0, '#2D2825');
      grad.addColorStop(1, '#1A1817');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      connect();
      requestAnimationFrame(animate);
    }
    animate();
  }

  // 4. THE JAGANNATH MOTIF SCROLL TRANSITION
  const jagannathOverlay = document.getElementById('jagannath-overlay');
  let currentSection = 'hero';
  let isTransitioning = false;
  let transitionCooldown = false;

  function triggerJagannathTransition() {
    if (isTransitioning || transitionCooldown) return;

    isTransitioning = true;
    transitionCooldown = true;

    // Fade in
    jagannathOverlay.classList.remove('pointer-events-none');
    jagannathOverlay.classList.remove('opacity-0');
    jagannathOverlay.classList.add('opacity-100');

    // Fade out after a short duration
    setTimeout(() => {
      jagannathOverlay.classList.remove('opacity-100');
      jagannathOverlay.classList.add('opacity-0');
      jagannathOverlay.classList.add('pointer-events-none');

      // Complete transition
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }, 1100);

    // Cooldown prevents spamming transitions when scrolling quickly
    setTimeout(() => {
      transitionCooldown = false;
    }, 5000); // 5 seconds cooldown before next transition can trigger
  }

  // Setup Section Observer to detect section shifts
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    threshold: 0.25 // Trigger when 25% of the section is visible
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');

        // If we moved to a new section, trigger the spiritual Jagannath transition
        if (sectionId !== currentSection) {
          // Do not transition on initial load
          if (document.readyState === 'complete' && window.scrollY > 100) {
            triggerJagannathTransition();
          }
          currentSection = sectionId;
          updateActiveNavLink(sectionId);
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Update navbar active link style
  function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('text-accentGold');
        link.classList.remove('text-parchment/80');
      } else {
        link.classList.remove('text-accentGold');
        link.classList.add('text-parchment/80');
      }
    });
  }

  // 5. SCROLL FADE-IN ANIMATIONS: Trigger standard scroll animations
  const fadeElements = document.querySelectorAll('.pattachitra-border, .pattachitra-border-thin, #timeline-container > div, #projects-grid > div');

  // Add animation classes dynamically
  fadeElements.forEach(el => {
    el.classList.add('fade-in-section');
  });

  const scrollFadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        scrollFadeObserver.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => {
    scrollFadeObserver.observe(el);
  });

  // 6. STICKY NAV BACKGROUND SHIFT
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('bg-stoneGray/90');
      nav.classList.add('shadow-xl');
      nav.classList.remove('bg-stoneGray/20');
    } else {
      nav.classList.remove('bg-stoneGray/90');
      nav.classList.remove('shadow-xl');
      nav.classList.add('bg-stoneGray/20');
    }
  });

  // 7. CERTIFICATION LIGHTBOX MODAL
  const certCards = document.querySelectorAll('.cert-card');
  const certModal = document.getElementById('cert-modal');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalClose = document.getElementById('cert-modal-close');

  if (certCards.length > 0 && certModal) {
    certCards.forEach(card => {
      card.addEventListener('click', () => {
        const imgSrc = card.getAttribute('data-image');
        const imgTitle = card.getAttribute('data-title');

        if (imgSrc) {
          certModalImg.src = imgSrc;
          certModalTitle.textContent = imgTitle || '';

          certModal.classList.remove('pointer-events-none');
          certModal.classList.remove('opacity-0');
          certModal.classList.add('opacity-100');
        }
      });
    });

    const hideCertModal = () => {
      certModal.classList.add('opacity-0');
      certModal.classList.remove('opacity-100');
      certModal.classList.add('pointer-events-none');
      setTimeout(() => {
        certModalImg.src = '';
      }, 300);
    };

    certModalClose.addEventListener('click', hideCertModal);

    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        hideCertModal();
      }
    });
  }

  // 8. LORD JAGANNATH IDOL — Eye-Tracking + Chatbot
  function initJagannathIdol() {
    const idol = document.getElementById('jagannath-idol-container');
    const leftPupil = document.getElementById('jag-left-pupil');
    const rightPupil = document.getElementById('jag-right-pupil');
    const chatToggle = document.getElementById('jagannath-chat-toggle');
    const chatPanel = document.getElementById('jagannath-chat-panel');
    const chatClose = document.getElementById('jagannath-chat-close');
    const chatInput = document.getElementById('jagannath-chat-input');
    const chatSend = document.getElementById('jagannath-chat-send');
    const chatMessages = document.getElementById('jagannath-chat-messages');

    if (!idol || !leftPupil || !rightPupil) return;

    // ── BACKGROUND MUSIC (BGM) WITH 3D EFFECT ──
    const bgmAudio = document.getElementById('bgm-audio');
    if (bgmAudio) {
      bgmAudio.playbackRate = 0.9;
      bgmAudio.defaultPlaybackRate = 0.9;
      bgmAudio.addEventListener('play', () => {
        bgmAudio.playbackRate = 0.9;
      });
    }
    const bgmToggle = document.getElementById('bgm-toggle-btn');

    let audioCtx = null;
    let sourceNode = null;
    let pannerNode = null;
    let gainNode = null;

    function initSpatialAudio() {
      if (audioCtx) return;
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
        sourceNode = audioCtx.createMediaElementSource(bgmAudio);

        // Volume control set to 0.25 (25% for 10% volume increase)
        gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.21;

        // Stereo panner for 3D sweep
        pannerNode = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;

        // Spacious delay for temple/cathedral 3D acoustics
        const delayNode = audioCtx.createDelay();
        delayNode.delayTime.value = 0.15; // 150ms delay
        const delayGain = audioCtx.createGain();
        delayGain.gain.value = 0.22; // dry/wet delay gain
        const feedbackGain = audioCtx.createGain();
        feedbackGain.gain.value = 0.25; // delay feedback loop gain

        // Connect nodes
        sourceNode.connect(gainNode);
        sourceNode.connect(delayNode);
        delayNode.connect(delayGain);
        delayGain.connect(gainNode);
        delayNode.connect(feedbackGain);
        feedbackGain.connect(delayNode);

        if (pannerNode) {
          gainNode.connect(pannerNode);
          pannerNode.connect(audioCtx.destination);

          // Slow 3D panning sweep (LFO-like panning simulation)
          let angle = 0;
          setInterval(() => {
            if (audioCtx && audioCtx.state === 'running') {
              angle += 0.015;
              pannerNode.pan.value = Math.sin(angle) * 0.5; // pan left/right
            }
          }, 100);
        } else {
          gainNode.connect(audioCtx.destination);
        }
      } catch (e) {
        console.warn('Web Audio 3D spatialization not supported or blocked:', e);
        bgmAudio.volume = 0.25;
      }
    }

    if (bgmAudio && bgmToggle) {
      function toggleBGM() {
        initSpatialAudio();
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        if (bgmAudio.paused) {
          if (bgmAudio.currentTime === 0) {
            bgmAudio.currentTime = 3.5; // Trim first 3.5 seconds
          }
          bgmAudio.play()
            .then(() => {
              bgmToggle.classList.remove('muted');
            })
            .catch(err => console.log('BGM play blocked:', err));
        } else {
          bgmAudio.pause();
          bgmToggle.classList.add('muted');
        }
      }

      bgmToggle.addEventListener('click', toggleBGM);

      // Expose function to start BGM after loader fades out
      window.startPortfolioBGM = () => {
        initSpatialAudio();
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        if (bgmAudio.currentTime === 0) {
          bgmAudio.currentTime = 3.5; // Trim first 3.5 seconds
        }
        bgmAudio.play()
          .then(() => {
            bgmToggle.classList.remove('muted');
          })
          .catch(err => {
            console.log('BGM play blocked (waiting for interaction):', err);
            // If blocked, add listeners to play on first user interaction on the page
            const playOnGesture = () => {
              initSpatialAudio();
              if (audioCtx && audioCtx.state === 'suspended') {
                audioCtx.resume();
              }
              if (bgmAudio.currentTime === 0) {
                bgmAudio.currentTime = 3.5;
              }
              bgmAudio.play().then(() => {
                bgmToggle.classList.remove('muted');
                document.removeEventListener('click', playOnGesture);
                document.removeEventListener('keydown', playOnGesture);
                document.removeEventListener('scroll', playOnGesture);
                document.removeEventListener('touchstart', playOnGesture);
              }).catch(e => console.log('BGM gesture playback failed:', e));
            };
            document.addEventListener('click', playOnGesture);
            document.addEventListener('keydown', playOnGesture);
            document.addEventListener('scroll', playOnGesture, { passive: true });
            document.addEventListener('touchstart', playOnGesture, { passive: true });
          });
      };

      // Keep BGM toggle button visually unmuted (on) by default on load
      bgmToggle.classList.remove('muted');
    }

    // ── EYE TRACKING ──
    const LEFT_EYE_CX = 95, LEFT_EYE_CY = 115;
    const RIGHT_EYE_CX = 205, RIGHT_EYE_CY = 115;
    const MAX_PUPIL_OFFSET = 6;

    function updateEyes(cursorX, cursorY) {
      const svgEl = document.getElementById('jagannath-face-svg');
      if (!svgEl) return;
      const rect = svgEl.getBoundingClientRect();

      const svgX = ((cursorX - rect.left) / rect.width) * 300;
      const svgY = ((cursorY - rect.top) / rect.height) * 280;

      const ldx = svgX - LEFT_EYE_CX;
      const ldy = svgY - LEFT_EYE_CY;
      const lDist = Math.sqrt(ldx * ldx + ldy * ldy);
      const lClamp = Math.min(lDist, MAX_PUPIL_OFFSET) / (lDist || 1);
      leftPupil.setAttribute('cx', LEFT_EYE_CX + ldx * lClamp);
      leftPupil.setAttribute('cy', LEFT_EYE_CY + ldy * lClamp);

      const rdx = svgX - RIGHT_EYE_CX;
      const rdy = svgY - RIGHT_EYE_CY;
      const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
      const rClamp = Math.min(rDist, MAX_PUPIL_OFFSET) / (rDist || 1);
      rightPupil.setAttribute('cx', RIGHT_EYE_CX + rdx * rClamp);
      rightPupil.setAttribute('cy', RIGHT_EYE_CY + rdy * rClamp);
    }

    document.addEventListener('mousemove', (e) => {
      requestAnimationFrame(() => updateEyes(e.clientX, e.clientY));
    });

    document.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      requestAnimationFrame(() => updateEyes(t.clientX, t.clientY));
    }, { passive: true });

    // ── Idle eye animation ──
    let lastMouseTime = Date.now();
    document.addEventListener('mousemove', () => { lastMouseTime = Date.now(); });

    setInterval(() => {
      if (Date.now() - lastMouseTime > 3000) {
        const svgEl = document.getElementById('jagannath-face-svg');
        if (svgEl) {
          const rect = svgEl.getBoundingClientRect();
          const randX = rect.left + Math.random() * rect.width;
          const randY = rect.top + (Math.random() * 0.6 - 0.3) * rect.height;
          updateEyes(randX, randY);
        }
      }
    }, 2500);

    // ── CHATBOT ──
    const knowledgeBase = {
      greeting: {
        keywords: ['hi', 'hello', 'hey', 'namaste', 'hola', 'greetings', 'good morning', 'good evening'],
        response: "🙏 Jagannātha! Namaste! I'm Lord Jagannath, watching over Kiran's portfolio. Ask me anything about him — his projects, skills, education, or how to connect!"
      },
      name: {
        keywords: ['who', 'name', 'kiran', 'about him', 'tell me about', 'introduce'],
        response: "Kiran Kumar Pradhan is a B.Tech undergraduate in Industrial Design at NIT Rourkela (2025–2029). Hailing from Brahmapur, Odisha, he's passionate about Machine Learning, Deep Learning, and GenAI. He believes in a hands-on engineering approach! 🛠️"
      },
      education: {
        keywords: ['education', 'college', 'university', 'nit', 'rourkela', 'degree', 'btech', 'cgpa', 'grade', 'study'],
        response: "🎓 Kiran is pursuing B.Tech in Industrial Design at NIT Rourkela, batch 2025–2029. His current CGPA is 8.53!"
      },
      skills: {
        keywords: ['skill', 'technology', 'tech stack', 'programming', 'language', 'tools', 'know', 'expertise', 'langchain', 'langgraph'],
        response: "💻 Kiran's core skills:\n• Python\n• Machine Learning & Deep Learning\n• GenAI (LLMs, RAG, LangChain, LangGraph)\n• LangChain & LangGraph (Agentic AI)\n• Backend Development (FastAPI)\n• Pandas, NumPy, Matplotlib\n• NLP: NLTK, Scikit-Learn\n• Streamlit, LlamaIndex"
      },
      projects: {
        keywords: ['project', 'work', 'built', 'portfolio', 'created', 'developed'],
        response: "🚀 Kiran has built 8 projects:\n1. Cosmopolitan Fest AI Chatbot (Live at cosmonitrkl.live)\n2. Book Recommendation System\n3. AI Career Path Recommendor\n4. Spam Classifier Website\n5. Indian Constituent AI\n6. LangChain Chatbot\n7. Movie Recommendor Analyzer\n8. WhatsApp Chat Analyzer\n\nAsk about any specific project!"
      },
      cosmopolitan: {
        keywords: ['cosmo', 'cosmopolitan', 'webwiz', 'fest', 'fest chatbot', 'cosmonitrkl'],
        response: "🎉 Cosmopolitan Fest AI Chatbot is an official project developed for Webwiz NITRKL for the Cosmopolitan Multi-Ethnic Fest! It is live on cosmonitrkl.live, assisting visitors with event queries, guest lineups, and fest schedules in real time. 🚀"
      },
      book_recommender: {
        keywords: ['book recommend', 'book system'],
        response: "📚 The Book Recommendation System uses Python, FastAPI, Pandas, and Jinja2. GitHub: github.com/pradhankiran400-dotcom/Book-Recommendation-System"
      },
      career_recommender: {
        keywords: ['career', 'ai career', 'career path'],
        response: "🎯 The AI Career Path Recommendor uses FastAPI, Groq API (Llama 3), Tavily API, and PyPDF. GitHub: github.com/pradhankiran400-dotcom/AI-Career-Path-Recommendor"
      },
      spam: {
        keywords: ['spam', 'classifier', 'email'],
        response: "📧 The Spam Classifier uses Scikit-Learn (TF-IDF + Naive Bayes), NLTK, and Streamlit."
      },
      constituent: {
        keywords: ['constituent', 'indian', 'constitution'],
        response: "🏛️ Indian Constituent AI uses FastAPI, LlamaIndex, Groq API (Llama-3.3-70b), and HuggingFace Embeddings for RAG."
      },
      langchain: {
        keywords: ['langchain', 'chatbot project'],
        response: "🤖 The LangChain Chatbot uses LangChain Core with Groq (llama-3.1-8b-instant) and Streamlit."
      },
      movie: {
        keywords: ['movie', 'film', 'recommend movie'],
        response: "🎬 The Movie Recommendor uses Cosine Similarity, NLTK, and Streamlit."
      },
      whatsapp: {
        keywords: ['whatsapp', 'chat analyz'],
        response: "💬 The WhatsApp Chat Analyzer uses Pandas, Matplotlib, and WordCloud with Streamlit."
      },
      experience: {
        keywords: ['experience', 'work', 'job', 'intern', 'ml4e', 'webwiz', 'club'],
        response: "💼 Kiran's roles:\n1. ML Developer at ML4E — ML/DL model engineering\n2. AI/ML Member at WEBWIZ.NITR — engineered the official Cosmopolitan Fest chatbot (cosmonitrkl.live) & data visualizations with Python"
      },
      certifications: {
        keywords: ['certif', 'badge', 'course', 'kaggle', 'simplilearn', 'integral', 'stemvibe', 'jane street'],
        response: "🏅 Certifications & Achievements:\n1. The Integral Cup 2026 (Season 2) — Jane Street & STEMvibe\n2. Kaggle Dataset Creator Badge\n3. A Primer to Deep Learning — NIT Rourkela\n4. Python For Data Science — Simplilearn\n5. Intro to Machine Learning — Kaggle"
      },
      integral_cup: {
        keywords: ['integral', 'integral cup', 'jane street', 'stemvibe', 'delhivery'],
        response: "🏆 The Integral Cup 2026 (Season 2) — Kiran competed in Round 1 across four distinct tracks in this national competition organized by STEMvibe Foundation and sponsored by Jane Street & Delhivery!"
      },
      contact: {
        keywords: ['contact', 'connect', 'reach', 'email', 'github', 'linkedin', 'social'],
        response: "📬 Connect with Kiran:\n• GitHub: github.com/pradhankiran400-dotcom\n• LinkedIn: linkedin.com/in/kiran-kumar-pradhan-b65198369"
      },
      location: {
        keywords: ['location', 'where', 'city', 'from', 'hometown', 'odisha', 'brahmapur'],
        response: "📍 Kiran hails from Brahmapur, Odisha, India. Currently studying at NIT Rourkela. 🕉️"
      },
      jagannath: {
        keywords: ['jagannath', 'lord', 'puri', 'rath yatra', 'who are you'],
        response: "🙏 I am Lord Jagannath — the Lord of the Universe! My eyes see everything, and right now, they're following your cursor! 👀✨"
      },
      ai_ml: {
        keywords: ['machine learning', 'deep learning', 'artificial intelligence', 'genai', 'llm', 'rag', 'langchain', 'langgraph'],
        response: "🧠 Kiran focuses on:\n• Machine Learning — Scikit-Learn\n• Deep Learning — Neural networks, NLP\n• GenAI & Agentic AI — LLMs, LangChain, LangGraph, RAG, LlamaIndex\n• Backend — FastAPI"
      },
      fallback: {
        response: "🤔 Hmm, I'm not sure about that! Try asking about Kiran's projects, skills, education, experience, or certifications. 🙏"
      }
    };

    function findResponse(query) {
      const q = query.toLowerCase().trim();
      if (!q) return knowledgeBase.fallback.response;

      let bestMatch = null;
      let bestScore = 0;

      for (const [key, data] of Object.entries(knowledgeBase)) {
        if (key === 'fallback' || !data.keywords) continue;
        let score = 0;
        for (const kw of data.keywords) {
          if (q.includes(kw)) {
            score += kw.length;
          }
        }
        if (score > bestScore) {
          bestScore = score;
          bestMatch = data;
        }
      }

      return bestMatch ? bestMatch.response : knowledgeBase.fallback.response;
    }

    function addMessage(text, isUser) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `jag-chat-message ${isUser ? 'jag-chat-user' : 'jag-chat-bot'}`;

      if (!isUser) {
        msgDiv.innerHTML = '<span class="jag-typing-dots"><span>.</span><span>.</span><span>.</span></span>';
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
          msgDiv.innerHTML = text.replace(/\n/g, '<br>');
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 600 + Math.random() * 400);
      } else {
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }

    function handleSend() {
      const text = chatInput.value.trim();
      if (!text) return;
      addMessage(text, true);
      chatInput.value = '';
      const response = findResponse(text);
      setTimeout(() => addMessage(response, false), 300);
    }

    let chatOpen = false;
    if (chatToggle) {
      chatToggle.addEventListener('click', () => {
        chatOpen = !chatOpen;
        chatPanel.classList.toggle('open', chatOpen);
        idol.classList.toggle('chat-active', chatOpen);
        if (chatOpen && chatMessages.children.length === 0) {
          setTimeout(() => addMessage(knowledgeBase.greeting.response, false), 400);
        }
      });
    }

    if (chatClose) {
      chatClose.addEventListener('click', () => {
        chatOpen = false;
        chatPanel.classList.remove('open');
        idol.classList.remove('chat-active');
      });
    }

    if (chatSend) chatSend.addEventListener('click', handleSend);
    if (chatInput) {
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
      });
    }

    document.querySelectorAll('.jag-quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-question');
        if (q) { chatInput.value = q; handleSend(); }
      });
    });
  }

  initJagannathIdol();

  // 9. VIDEO LIGHTBOX MODAL
  function initVideoLightbox() {
    const videoModal = document.getElementById('video-modal');
    const videoModalClose = document.getElementById('video-modal-close');
    const videoModalPlayer = document.getElementById('video-modal-player');
    const videoModalSource = document.getElementById('video-modal-source');
    const videoModalTitle = document.getElementById('video-modal-title');

    if (!videoModal || !videoModalPlayer) return;

    // Project name map from video filename
    const videoTitleMap = {
      'Book_Recommendor.mp4': 'Book Recommender System',
      'AI_Carrer_Path_Recommendor.mp4': 'AI Career Path Recommender',
      'spam_classifier.mp4': 'Spam Classifier Website',
      'Indian_Contituent_AI.mp4': 'Indian Constituent AI',
      'Langchain_chatbot.mp4': 'LangChain Chatbot',
      'movie_recommendor.mp4': 'Movie Recommender System',
      'whatsapp_chat_analyzer.mp4': 'WhatsApp Chat Analyzer',
    };

    const openVideoModal = (src, cardVideo) => {
      // Set the modal video source
      videoModalSource.src = src;
      videoModalPlayer.load();
      videoModalPlayer.play();

      // Set title from filename
      const filename = src.split('/').pop();
      videoModalTitle.textContent = videoTitleMap[filename] || 'Project Demo';

      // Pause the card preview video
      if (cardVideo) cardVideo.pause();

      // Show modal
      videoModal.classList.remove('pointer-events-none', 'opacity-0');
      videoModal.classList.add('opacity-100');
      document.body.style.overflow = 'hidden';
    };

    const closeVideoModal = () => {
      videoModal.classList.remove('opacity-100');
      videoModal.classList.add('opacity-0');
      setTimeout(() => {
        videoModal.classList.add('pointer-events-none');
        videoModalPlayer.pause();
        videoModalSource.src = '';
        document.body.style.overflow = '';
        // Resume all card videos
        document.querySelectorAll('.project-card-video').forEach(v => v.play());
      }, 350);
    };

    // Attach click to all video preview wrappers
    document.querySelectorAll('.project-video-wrapper').forEach(wrapper => {
      wrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        const src = wrapper.getAttribute('data-video-src');
        const cardVideo = wrapper.querySelector('.project-card-video');
        if (src) openVideoModal(src, cardVideo);
      });
    });

    // Close button
    videoModalClose.addEventListener('click', closeVideoModal);

    // Click backdrop to close
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !videoModal.classList.contains('pointer-events-none')) {
        closeVideoModal();
      }
    });
  }

  initVideoLightbox();

});
