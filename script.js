/**
 * ============================================================================
 * BASSAM NAZER — 3D AI/ML COMPUTATIONAL ENVIRONMENT
 * Interactive 3D WebGL Neural Landscape & Spatial Depth Engine
 * ============================================================================
 */

(function () {
  'use strict';

  // --- Reduced Motion Check ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================================================
  // 1. THREE.JS 3D NEURAL & EMBEDDING SPACE
  // ==========================================================================
  const container = document.getElementById('webgl-container');
  let scene, camera, renderer;
  let embeddingPoints, neuralNodesGroup, neuralLines, signalPackets = [];
  let quantumManifold;
  let isRenderingPaused = false;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let scrollProgress = 0;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  // Initialize WebGL Scene
  function init3DScene() {
    if (!container || typeof THREE === 'undefined') {
      console.warn('Three.js not loaded or container missing; using CSS fallback.');
      return;
    }

    try {
      // Scene
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x06080d, 0.0018);

      // Camera
      camera = new THREE.PerspectiveCamera(55, windowWidth / windowHeight, 0.1, 1000);
      camera.position.set(0, 0, 75);

      // Renderer
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(windowWidth, windowHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Ambient & Directional Lighting
      const ambientLight = new THREE.AmbientLight(0x0f172a, 1.5);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x38bdf8, 2, 200);
      pointLight1.position.set(50, 40, 50);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x818cf8, 1.8, 200);
      pointLight2.position.set(-50, -30, 40);
      scene.add(pointLight2);

      // Build 3D Layers
      createEmbeddingPointCloud();
      createNeuralNetwork();
      createQuantumManifold();

      // Start Animation Loop
      animate();

    } catch (e) {
      console.error('Error initializing WebGL:', e);
    }
  }

  // --- Layer 1: High-Dimensional Embedding Point Cloud ---
  function createEmbeddingPointCloud() {
    const count = windowWidth < 768 ? 600 : 1300;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const color1 = new THREE.Color(0x38bdf8); // Cyan
    const color2 = new THREE.Color(0x818cf8); // Violet
    const color3 = new THREE.Color(0x0284c7); // Deep Blue
    const color4 = new THREE.Color(0x10b981); // Emerald

    // Cluster Centers representing semantic vector clusters (Vision, LLM, Quantum, Security)
    const clusterCenters = [
      new THREE.Vector3(-25, 15, -10),
      new THREE.Vector3(25, -10, -20),
      new THREE.Vector3(0, -25, -5),
      new THREE.Vector3(20, 20, -15),
      new THREE.Vector3(-20, -20, 10)
    ];

    for (let i = 0; i < count; i++) {
      const cluster = clusterCenters[i % clusterCenters.length];
      const spread = 22;

      // Gaussian-like cluster distribution
      const u = Math.random() + Math.random() + Math.random() - 1.5;
      const v = Math.random() + Math.random() + Math.random() - 1.5;
      const w = Math.random() + Math.random() + Math.random() - 1.5;

      const x = cluster.x + u * spread;
      const y = cluster.y + v * spread;
      const z = cluster.z + w * spread;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color selection based on position
      const mixedColor = new THREE.Color();
      if (x < 0 && y > 0) mixedColor.copy(color1);
      else if (x >= 0 && y >= 0) mixedColor.copy(color2);
      else if (x < 0 && y < 0) mixedColor.copy(color4);
      else mixedColor.copy(color3);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      scales[i] = Math.random() * 2.0 + 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const pMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    embeddingPoints = new THREE.Points(geometry, pMaterial);
    scene.add(embeddingPoints);
  }

  // --- Layer 2: Neural Graph & Synaptic Pathways ---
  function createNeuralNetwork() {
    neuralNodesGroup = new THREE.Group();
    const nodeCount = windowWidth < 768 ? 32 : 65;
    const nodes = [];
    const maxConnectionDistance = 24;

    const nodeGeo = new THREE.SphereGeometry(0.55, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85
    });

    // Generate Graph Nodes in 3D Space
    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat.clone());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 15 + Math.random() * 30;

      mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
      mesh.position.y = (radius * Math.sin(phi) * Math.sin(theta)) * 0.7;
      mesh.position.z = (radius * Math.cos(phi)) - 10;

      // Base oscillation properties
      mesh.userData = {
        baseX: mesh.position.x,
        baseY: mesh.position.y,
        baseZ: mesh.position.z,
        freq: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2
      };

      neuralNodesGroup.add(mesh);
      nodes.push(mesh);
    }

    // Connect Neighboring Nodes with Lines
    const linePositions = [];
    const lineColors = [];
    const connections = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < maxConnectionDistance) {
          linePositions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );

          const alpha = 1.0 - (dist / maxConnectionDistance);
          lineColors.push(
            0.22, 0.74, 0.97, alpha * 0.4,
            0.5, 0.55, 0.97, alpha * 0.4
          );

          connections.push({ from: nodes[i], to: nodes[j] });
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });

    neuralLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    neuralNodesGroup.add(neuralLines);
    scene.add(neuralNodesGroup);

    // Create Signal Packets (Traveling Light Pulses along Synapses)
    const packetCount = Math.min(connections.length, 25);
    const packetGeo = new THREE.SphereGeometry(0.35, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.95
    });

    for (let p = 0; p < packetCount; p++) {
      const conn = connections[Math.floor(Math.random() * connections.length)];
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      scene.add(packetMesh);
      signalPackets.push({
        mesh: packetMesh,
        from: conn.from,
        to: conn.to,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.006
      });
    }
  }

  // --- Layer 3: Abstract Quantum / Computational Manifold Wireframe ---
  function createQuantumManifold() {
    const geo = new THREE.IcosahedronGeometry(18, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
      blending: THREE.AdditiveBlending
    });

    quantumManifold = new THREE.Mesh(geo, wireframeMat);
    quantumManifold.position.set(25, -15, -25);
    scene.add(quantumManifold);
  }

  // --- Animation Loop ---
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    if (isRenderingPaused) return;

    const elapsedTime = clock.getElapsedTime();

    // Smooth Camera Interpolation (Mouse Parallax & Scroll Depth)
    if (!prefersReducedMotion) {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const targetCamX = mouse.x * 12;
      const targetCamY = mouse.y * 10 - (scrollProgress * 45);
      const targetCamZ = 75 - (scrollProgress * 25);

      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      camera.lookAt(0, - (scrollProgress * 30), 0);
    }

    // Subtle Continuous Rotations
    if (embeddingPoints) {
      embeddingPoints.rotation.y = elapsedTime * 0.02;
      embeddingPoints.rotation.x = elapsedTime * 0.01;
    }

    if (neuralNodesGroup) {
      neuralNodesGroup.rotation.y = -elapsedTime * 0.015;
      
      // Node subtle natural breathing
      neuralNodesGroup.children.forEach(child => {
        if (child.isMesh && child.userData.freq) {
          const ud = child.userData;
          child.position.y = ud.baseY + Math.sin(elapsedTime * ud.freq + ud.phase) * 0.8;
          child.position.x = ud.baseX + Math.cos(elapsedTime * ud.freq * 0.7 + ud.phase) * 0.6;
        }
      });
    }

    if (quantumManifold) {
      quantumManifold.rotation.x = elapsedTime * 0.03;
      quantumManifold.rotation.y = elapsedTime * 0.04;
    }

    // Animate Signal Packets along Synaptic Paths
    signalPackets.forEach(pkt => {
      pkt.progress += pkt.speed;
      if (pkt.progress > 1.0) pkt.progress = 0.0;

      const posA = pkt.from.position;
      const posB = pkt.to.position;
      pkt.mesh.position.lerpVectors(posA, posB, pkt.progress);
    });

    renderer.render(scene, camera);
  }

  // --- Window Resize & Event Listeners ---
  function onWindowResize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if (camera && renderer) {
      camera.aspect = windowWidth / windowHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(windowWidth, windowHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }
  }

  function onMouseMove(e) {
    // Normalized Mouse Coordinates: [-1, 1]
    mouse.targetX = (e.clientX / windowWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / windowHeight) * 2 + 1;
  }

  function onScroll() {
    const maxScroll = document.documentElement.scrollHeight - windowHeight;
    scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

    // Header Background Scroll State
    const header = document.getElementById('site-header');
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  // Lifecycle & Performance Pause
  document.addEventListener('visibilitychange', () => {
    isRenderingPaused = document.hidden;
  });

  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  // ==========================================================================
  // 2. INTERACTIVE 3D CARD TILT & SPECULAR GLARE
  // ==========================================================================
  function init3DTiltCards() {
    if (prefersReducedMotion || (window.matchMedia('(hover: none)').matches)) return;

    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
      const inner = card.querySelector('.tilt-inner') || card;
      const glare = card.querySelector('.tilt-glare');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6.5; // Max 6.5deg pitch
        const rotateY = ((x - centerX) / centerX) * 6.5;  // Max 6.5deg roll

        inner.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;

        if (glare) {
          card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
          card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        }
      });

      card.addEventListener('mouseleave', () => {
        inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        inner.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      });

      card.addEventListener('mouseenter', () => {
        inner.style.transition = 'transform 0.1s ease-out';
      });
    });
  }

  // ==========================================================================
  // 3. CUSTOM AMBIENT CURSOR
  // ==========================================================================
  function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    if (!dot || !ring || (window.matchMedia('(hover: none)').matches)) return;

    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;

    window.addEventListener('mousemove', (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    }, { passive: true });

    function renderCursorRing() {
      ringX += (dotX - ringX) * 0.2;
      ringY += (dotY - ringY) * 0.2;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(renderCursorRing);
    }
    renderCursorRing();

    // Hover state over interactive elements
    const interactives = document.querySelectorAll('a, button, .tilt-card, .pillar-item, .skill-tag, .contact-channel-item');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('active');
        ring.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('active');
        ring.classList.remove('active');
      });
    });
  }

  // ==========================================================================
  // 4. DYNAMIC TERMINAL ROLE ROTATOR (TYPEWRITER)
  // ==========================================================================
  function initTypewriter() {
    const roleEl = document.getElementById('typed-role');
    if (!roleEl) return;

    const roles = [
      'AI/ML Engineer & Systems Architect',
      'Clinical Computer Vision (XrayCAD)',
      'Production RAG & Knowledge Systems',
      'Agentic LLM Pipelines & Self-Correction',
      'Multi-GPU Scalable Model Serving'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        roleEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 25;
      } else {
        roleEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 60;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2200; // Pause at full text
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing new text
      }

      setTimeout(type, typingSpeed);
    }

    // Start with pre-filled first text after 1s
    setTimeout(type, 1500);
  }

  // ==========================================================================
  // 5. SCROLL REVEAL & NAVIGATION ACTIVE STATE
  // ==========================================================================
  function initScrollRevealAndNav() {
    // Intersection Observer for Smooth Reveal Animations
    const revealElements = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && revealElements.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('revealed'));
    }

    // Mobile Navigation Drawer Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');

    if (navToggle && navList) {
      navToggle.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
      });

      // Close nav on click outside or link click
      document.querySelectorAll('#nav-list a').forEach(link => {
        link.addEventListener('click', () => {
          navList.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Active Navigation Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav-list a');

    function highlightActiveSection() {
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', highlightActiveSection, { passive: true });
  }

  // ==========================================================================
  // 6. INITIALIZATION DISPATCHER
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    init3DScene();
    init3DTiltCards();
    initCustomCursor();
    initTypewriter();
    initScrollRevealAndNav();
  });

})();
