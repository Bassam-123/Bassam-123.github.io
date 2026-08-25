/**
 * ============================================================================
 * BASSAM NAZER — 3D AI/ML COMPUTATIONAL ENVIRONMENT
 * Refined 3D Spatial Depth System, Camera Journey & Physics Engine
 * ============================================================================
 */

(function () {
  'use strict';

  // --- Reduced Motion Check ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================================================
  // 1. THREE.JS 3D SPATIAL DEPTH ENVIRONMENT
  // ==========================================================================
  const container = document.getElementById('webgl-container');
  let scene, camera, renderer;
  let ambientParticleField, thematicClustersGroup, signalPackets = [];
  let quantumBlochSphere, visionDiagnosticGrid, ragRetrievalGraph, securityDefenseNode;
  let isRenderingPaused = false;
  
  // Mouse and Camera Tracking State
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let currentCamPos = new THREE.Vector3(0, 0, 80);
  let targetCamPos = new THREE.Vector3(0, 0, 80);
  let currentLookAt = new THREE.Vector3(0, 0, 0);
  let targetLookAt = new THREE.Vector3(0, 0, 0);
  
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  // Section Waypoints for Cinematic Camera Journey
  // Maps normalized vertical progression to intentional spatial coordinates
  const waypoints = [
    { progress: 0.00, pos: new THREE.Vector3(0, 0, 80), lookAt: new THREE.Vector3(0, 0, 0) },         // Hero: Neural Space
    { progress: 0.14, pos: new THREE.Vector3(-10, -22, 68), lookAt: new THREE.Vector3(-2, -22, 0) },   // About: Foundation Architecture
    { progress: 0.32, pos: new THREE.Vector3(12, -54, 58), lookAt: new THREE.Vector3(4, -54, 0) },    // Experience: Vision & Multi-GPU
    { progress: 0.50, pos: new THREE.Vector3(-14, -90, 52), lookAt: new THREE.Vector3(-4, -90, 0) },   // Projects: RAG & Agentic Loops
    { progress: 0.68, pos: new THREE.Vector3(10, -124, 56), lookAt: new THREE.Vector3(2, -124, 0) },   // Research: Quantum & Adversarial ML
    { progress: 0.82, pos: new THREE.Vector3(-8, -156, 66), lookAt: new THREE.Vector3(0, -156, 0) },   // Awards & Education
    { progress: 1.00, pos: new THREE.Vector3(0, -188, 62), lookAt: new THREE.Vector3(0, -188, 0) }     // Contact: System Hub
  ];

  function init3DScene() {
    if (!container || typeof THREE === 'undefined') {
      console.warn('Three.js not available; using CSS grid fallback.');
      return;
    }

    try {
      // Scene & Atmospheric Fog
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x06080d, 0.0015);

      // Camera
      camera = new THREE.PerspectiveCamera(52, windowWidth / windowHeight, 0.1, 1000);
      camera.position.copy(currentCamPos);

      // WebGL Renderer
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(windowWidth, windowHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Lighting Setup
      const ambientLight = new THREE.AmbientLight(0x0f172a, 1.4);
      scene.add(ambientLight);

      const lightCyan = new THREE.PointLight(0x38bdf8, 2.2, 220);
      lightCyan.position.set(45, 30, 40);
      scene.add(lightCyan);

      const lightViolet = new THREE.PointLight(0x818cf8, 1.8, 220);
      lightViolet.position.set(-45, -30, 30);
      scene.add(lightViolet);

      // Build 3-Tier Layered Space
      createFarAmbientField();
      createThematicAIGraph();

      // Start Render Loop
      animate();

    } catch (e) {
      console.error('WebGL Initialization Error:', e);
    }
  }

  // --- Layer 1: FAR Ambient Particle Field with Center Readability Corridor ---
  function createFarAmbientField() {
    const count = windowWidth < 768 ? 400 : 850;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cCyan = new THREE.Color(0x38bdf8);
    const cViolet = new THREE.Color(0x818cf8);
    const cBlue = new THREE.Color(0x0284c7);
    const cEmerald = new THREE.Color(0x10b981);

    for (let i = 0; i < count; i++) {
      // Cylindrical distribution with central exclusion zone for clear text reading
      const radius = 18 + Math.random() * 65; // Keeps particles away from center corridor
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 280;

      const x = Math.cos(angle) * radius;
      const y = height;
      const z = Math.sin(angle) * radius * 0.7 - 20;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color selection based on depth & height
      const mixedColor = new THREE.Color();
      if (y > 0 && x < 0) mixedColor.copy(cCyan);
      else if (y > 0 && x >= 0) mixedColor.copy(cViolet);
      else if (y <= 0 && x >= 0) mixedColor.copy(cEmerald);
      else mixedColor.copy(cBlue);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    ambientParticleField = new THREE.Points(geometry, material);
    scene.add(ambientParticleField);
  }

  // --- Layer 2: Thematic AI Domain Clusters & Synaptic Pathways ---
  function createThematicAIGraph() {
    thematicClustersGroup = new THREE.Group();
    const connections = [];

    // --- Cluster 1: XrayCAD Medical Vision Plane (Experience Zone) ---
    visionDiagnosticGrid = new THREE.Group();
    visionDiagnosticGrid.position.set(22, -54, -12);

    const gridPoints = [];
    const gridRows = 4, gridCols = 4;
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const nodeGeo = new THREE.SphereGeometry(0.5, 8, 8);
        const isHeatNode = (r === 1 && c === 2) || (r === 2 && c === 2);
        const nodeMat = new THREE.MeshBasicMaterial({
          color: isHeatNode ? 0xf43f5e : 0x38bdf8,
          transparent: true,
          opacity: isHeatNode ? 0.95 : 0.65
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeMesh.position.set((c - 1.5) * 5, (r - 1.5) * 5, 0);
        visionDiagnosticGrid.add(nodeMesh);
        gridPoints.push(nodeMesh);
      }
    }

    // Connect vision grid lines
    const visionLinePos = [];
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const idx = r * gridCols + c;
        if (c + 1 < gridCols) {
          const nextC = idx + 1;
          visionLinePos.push(
            gridPoints[idx].position.x, gridPoints[idx].position.y, gridPoints[idx].position.z,
            gridPoints[nextC].position.x, gridPoints[nextC].position.y, gridPoints[nextC].position.z
          );
          connections.push({ from: gridPoints[idx], to: gridPoints[nextC], parent: visionDiagnosticGrid });
        }
        if (r + 1 < gridRows) {
          const nextR = (r + 1) * gridCols + c;
          visionLinePos.push(
            gridPoints[idx].position.x, gridPoints[idx].position.y, gridPoints[idx].position.z,
            gridPoints[nextR].position.x, gridPoints[nextR].position.y, gridPoints[nextR].position.z
          );
          connections.push({ from: gridPoints[idx], to: gridPoints[nextR], parent: visionDiagnosticGrid });
        }
      }
    }
    const visionLineGeo = new THREE.BufferGeometry();
    visionLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(visionLinePos, 3));
    const visionLineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.22 });
    visionDiagnosticGrid.add(new THREE.LineSegments(visionLineGeo, visionLineMat));
    thematicClustersGroup.add(visionDiagnosticGrid);

    // --- Cluster 2: APACS RAG & Knowledge Retrieval Pathway (Projects Zone) ---
    ragRetrievalGraph = new THREE.Group();
    ragRetrievalGraph.position.set(-24, -90, -10);

    const docNodes = [];
    for (let d = 0; d < 6; d++) {
      const dGeo = new THREE.BoxGeometry(0.7, 0.9, 0.1);
      const dMat = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.75 });
      const dMesh = new THREE.Mesh(dGeo, dMat);
      dMesh.position.set(-8 + Math.random() * 4, -6 + d * 2.5, (Math.random() - 0.5) * 4);
      ragRetrievalGraph.add(dMesh);
      docNodes.push(dMesh);
    }

    // Central Reranker & Generator Nodes
    const rerankerGeo = new THREE.SphereGeometry(0.9, 10, 10);
    const rerankerMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.9 });
    const rerankerMesh = new THREE.Mesh(rerankerGeo, rerankerMat);
    rerankerMesh.position.set(2, 0, 0);
    ragRetrievalGraph.add(rerankerMesh);

    const genGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const genMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.85 });
    const genMesh = new THREE.Mesh(genGeo, genMat);
    genMesh.position.set(8, 0, 0);
    ragRetrievalGraph.add(genMesh);

    // Retrieval Lines from Docs to Reranker to Gen
    const ragLinePos = [];
    docNodes.forEach(doc => {
      ragLinePos.push(
        doc.position.x, doc.position.y, doc.position.z,
        rerankerMesh.position.x, rerankerMesh.position.y, rerankerMesh.position.z
      );
      connections.push({ from: doc, to: rerankerMesh, parent: ragRetrievalGraph });
    });
    ragLinePos.push(
      rerankerMesh.position.x, rerankerMesh.position.y, rerankerMesh.position.z,
      genMesh.position.x, genMesh.position.y, genMesh.position.z
    );
    connections.push({ from: rerankerMesh, to: genMesh, parent: ragRetrievalGraph });

    const ragLineGeo = new THREE.BufferGeometry();
    ragLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(ragLinePos, 3));
    const ragLineMat = new THREE.LineBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.3 });
    ragRetrievalGraph.add(new THREE.LineSegments(ragLineGeo, ragLineMat));
    thematicClustersGroup.add(ragRetrievalGraph);

    // --- Cluster 3: Q3D-MRI-Net Quantum Manifold (Research Zone) ---
    quantumBlochSphere = new THREE.Group();
    quantumBlochSphere.position.set(24, -124, -15);

    const outerRingGeo = new THREE.TorusGeometry(8, 0.08, 12, 48);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.35 });
    const ring1 = new THREE.Mesh(outerRingGeo, ringMat1);
    quantumBlochSphere.add(ring1);

    const ring2 = new THREE.Mesh(outerRingGeo, ringMat1.clone());
    ring2.rotation.x = Math.PI / 2;
    quantumBlochSphere.add(ring2);

    const coreIcosaGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const coreIcosaMat = new THREE.MeshBasicMaterial({ color: 0xc084fc, wireframe: true, transparent: true, opacity: 0.25 });
    const coreIcosa = new THREE.Mesh(coreIcosaGeo, coreIcosaMat);
    quantumBlochSphere.add(coreIcosa);
    thematicClustersGroup.add(quantumBlochSphere);

    // --- Cluster 4: Security Trigger & Anomaly Filtering Node ---
    securityDefenseNode = new THREE.Group();
    securityDefenseNode.position.set(-20, -156, -12);

    const trigGeo = new THREE.OctahedronGeometry(2.5, 0);
    const trigMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.4 });
    const trigMesh = new THREE.Mesh(trigGeo, trigMat);
    securityDefenseNode.add(trigMesh);
    thematicClustersGroup.add(securityDefenseNode);

    scene.add(thematicClustersGroup);

    // Create Signal Packets (Traveling Inference Pulses)
    const packetCount = Math.min(connections.length, 18);
    const packetGeo = new THREE.SphereGeometry(0.3, 6, 6);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.95 });

    for (let p = 0; p < packetCount; p++) {
      const conn = connections[p % connections.length];
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      conn.parent.add(packetMesh);
      signalPackets.push({
        mesh: packetMesh,
        from: conn.from,
        to: conn.to,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.007
      });
    }
  }

  // --- Waypoint Interpolation Engine ---
  function updateCameraWaypoints(progress) {
    if (prefersReducedMotion) return;

    // Find current waypoint segment
    let p = Math.max(0, Math.min(1, progress));
    let segIdx = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      if (p >= waypoints[i].progress && p <= waypoints[i + 1].progress) {
        segIdx = i;
        break;
      }
    }

    const w1 = waypoints[segIdx];
    const w2 = waypoints[segIdx + 1] || waypoints[segIdx];
    const segT = (p - w1.progress) / ((w2.progress - w1.progress) || 1);

    // Smooth cubic easing between waypoints
    const easeT = segT * segT * (3 - 2 * segT);

    targetCamPos.lerpVectors(w1.pos, w2.pos, easeT);
    targetLookAt.lerpVectors(w1.lookAt, w2.lookAt, easeT);
  }

  // --- Main Animation Loop ---
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    if (isRenderingPaused) return;

    const elapsedTime = clock.getElapsedTime();

    // Mouse Parallax Damping
    if (!prefersReducedMotion) {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Combine Waypoint target with mouse parallax offset
      const finalTargetX = targetCamPos.x + mouse.x * 6;
      const finalTargetY = targetCamPos.y + mouse.y * 5;
      const finalTargetZ = targetCamPos.z;

      currentCamPos.x += (finalTargetX - currentCamPos.x) * 0.04;
      currentCamPos.y += (finalTargetY - currentCamPos.y) * 0.04;
      currentCamPos.z += (finalTargetZ - currentCamPos.z) * 0.04;

      currentLookAt.x += (targetLookAt.x - currentLookAt.x) * 0.04;
      currentLookAt.y += (targetLookAt.y - currentLookAt.y) * 0.04;
      currentLookAt.z += (targetLookAt.z - currentLookAt.z) * 0.04;

      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookAt);
    }

    // Subtle Continuous Drifting of Layers
    if (ambientParticleField) {
      ambientParticleField.rotation.y = elapsedTime * 0.012;
    }

    if (quantumBlochSphere) {
      quantumBlochSphere.rotation.x = elapsedTime * 0.04;
      quantumBlochSphere.rotation.y = elapsedTime * 0.06;
    }

    if (visionDiagnosticGrid) {
      visionDiagnosticGrid.rotation.z = Math.sin(elapsedTime * 0.5) * 0.04;
    }

    if (securityDefenseNode) {
      securityDefenseNode.rotation.y = elapsedTime * 0.05;
      securityDefenseNode.rotation.z = elapsedTime * 0.03;
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
    mouse.targetX = (e.clientX / windowWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / windowHeight) * 2 + 1;
  }

  function onScroll() {
    const maxScroll = document.documentElement.scrollHeight - windowHeight;
    const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

    // Update 3D Camera Waypoint based on scroll
    updateCameraWaypoints(scrollProgress);

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

  // Lifecycle Visibility Pause
  document.addEventListener('visibilitychange', () => {
    isRenderingPaused = document.hidden;
  });

  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  // ==========================================================================
  // 2. SPRING-INTERPOLATED 3D CARD TILT & SPECULAR GLARE
  // ==========================================================================
  function init3DTiltCards() {
    if (prefersReducedMotion || (window.matchMedia('(hover: none)').matches)) return;

    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
      const inner = card.querySelector('.tilt-inner') || card;
      const glare = card.querySelector('.tilt-glare');

      let targetRotX = 0, targetRotY = 0;
      let currentRotX = 0, currentRotY = 0;
      let isHovered = false;
      let animFrameId = null;

      function updateTilt() {
        currentRotX += (targetRotX - currentRotX) * 0.12;
        currentRotY += (targetRotY - currentRotY) * 0.12;

        const elevation = isHovered ? 10 : 0;
        inner.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateZ(${elevation}px)`;

        if (isHovered || Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
          animFrameId = requestAnimationFrame(updateTilt);
        } else {
          animFrameId = null;
        }
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Controlled rotation angles (max ±5.0 deg for clean readability)
        targetRotX = ((y - centerY) / centerY) * -5.0;
        targetRotY = ((x - centerX) / centerX) * 5.0;

        if (glare) {
          card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
          card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        }

        if (!animFrameId) {
          animFrameId = requestAnimationFrame(updateTilt);
        }
      });

      card.addEventListener('mouseenter', () => {
        isHovered = true;
        if (!animFrameId) animFrameId = requestAnimationFrame(updateTilt);
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        targetRotX = 0;
        targetRotY = 0;
      });
    });
  }

  // ==========================================================================
  // 3. LIVE COMPUTATIONAL TELEMETRY COUNTERS
  // ==========================================================================
  function initTelemetryCounters() {
    const counters = document.querySelectorAll('.counter-num');
    if (!counters.length) return;

    let hasAnimated = false;

    function animateCounters() {
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-counter-target') || '0');
        const decimals = parseInt(counter.getAttribute('data-counter-decimals') || '0', 10);
        const duration = 1600; // ms
        const startTime = performance.now();

        function step(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1.0);
          
          // Cubic ease-out
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = easeProgress * target;

          counter.textContent = currentVal.toFixed(decimals);

          if (progress < 1.0) {
            requestAnimationFrame(step);
          } else {
            counter.textContent = target.toFixed(decimals);
          }
        }

        requestAnimationFrame(step);
      });
    }

    const heroSection = document.querySelector('.hero-telemetry-grid');
    if (heroSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      observer.observe(heroSection);
    } else {
      animateCounters();
    }
  }

  // ==========================================================================
  // 4. CUSTOM AMBIENT CURSOR
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
  // 5. DYNAMIC TERMINAL ROLE ROTATOR (TYPEWRITER)
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

    setTimeout(type, 1200);
  }

  // ==========================================================================
  // 6. SCROLL REVEAL & NAVIGATION ACTIVE STATE
  // ==========================================================================
  function initScrollRevealAndNav() {
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
  // 7. INITIALIZATION DISPATCHER
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    init3DScene();
    init3DTiltCards();
    initTelemetryCounters();
    initCustomCursor();
    initTypewriter();
    initScrollRevealAndNav();
  });

})();
