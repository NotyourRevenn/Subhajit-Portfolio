/* ==========================================================================
   SUBHAJIT MONDAL — BUSINESS & DATA ANALYST
   Interactive 3D Engine, Decision Labs & UI Controller
   Framework: Three.js WebGL + 3D Perspective + Landing Page Design System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. Interactive 3D Supply Chain Data Core (Three.js WebGL)
  // ------------------------------------------------------------------------
  function initHero3D() {
    const canvas = document.getElementById('hero3dCanvas');
    const container = document.getElementById('hero3dWrapper');
    if (!canvas || !container || typeof THREE === 'undefined') return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 420;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 12;

    // Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch (e) {
      console.warn('WebGL init skipped:', e);
      return;
    }

    // Master 3D Group
    const dataCore = new THREE.Group();
    scene.add(dataCore);

    // 1A. Central Faceted Nucleus (Icosahedron Wireframe + Vertices)
    const nucleusGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const nucleusWire = new THREE.Mesh(nucleusGeo, wireframeMat);
    dataCore.add(nucleusWire);

    // Vertices as Glowing Data Points
    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.14,
      transparent: true,
      opacity: 0.9
    });
    const nucleusPoints = new THREE.Points(nucleusGeo, pointsMat);
    dataCore.add(nucleusPoints);

    // 1B. Inner Solid Core
    const innerGeo = new THREE.OctahedronGeometry(1.3, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0x10b981,
      emissiveIntensity: 0.25
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    dataCore.add(innerCore);

    // 1C. Concentric Orbital Rings (Supply Chain Corridors)
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 });
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.40 });
    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.30 });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.3, 0.02, 16, 120), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.1, 0.02, 16, 120), ringMat2);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(4.9, 0.02, 16, 120), ringMat3);

    ring1.rotation.x = Math.PI / 3.5;
    ring2.rotation.y = Math.PI / 2.8;
    ring3.rotation.z = Math.PI / 4.2;

    dataCore.add(ring1);
    dataCore.add(ring2);
    dataCore.add(ring3);

    // 1D. Orbiting Data Telemetry Satellites
    const satellites = [];
    const satGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const satColors = [0x38bdf8, 0x10b981, 0x60a5fa, 0x34d399, 0x38bdf8, 0x10b981];

    for (let i = 0; i < 6; i++) {
      const satMat = new THREE.MeshBasicMaterial({ color: satColors[i] });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      dataCore.add(satMesh);
      satellites.push({
        mesh: satMesh,
        radius: 3.3 + (i % 3) * 0.8,
        speed: 0.015 + (i * 0.005),
        angle: (i * Math.PI) / 3,
        plane: i % 3
      });
    }

    // 1E. Ambient Floating Data Particles (350 points)
    const particleCount = 350;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i + 2] = (Math.random() - 0.5) * 16;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x38bdf8, 2.5, 40);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x10b981, 1.8, 40);
    fillLight.position.set(-8, -10, -8);
    scene.add(fillLight);

    // Interactive Manipulation (Mouse Move + Drag / Touch)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotX = 0.2;
    let targetRotY = 0.4;
    let currentScale = 1.0;
    let targetScale = 1.0;

    // Smooth Cursor Tracking across the Hero Section
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (!isDragging) {
        targetRotY = x * 0.8;
        targetRotX = -y * 0.6;
      }
    });

    // Drag / Touch Controls
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    // Touch support for mobile phones
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.008;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Click Ripple Impulse
    container.addEventListener('click', () => {
      targetScale = 1.12;
      setTimeout(() => { targetScale = 1.0; }, 250);
    });

    // Dynamic Window Resize Handler
    function onResize() {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (!newWidth || !newHeight) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight, false);
    }
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth inertia rotation
      dataCore.rotation.y += (targetRotY - dataCore.rotation.y) * 0.05;
      dataCore.rotation.x += (targetRotX - dataCore.rotation.x) * 0.05;

      // Elastic scale pulse
      currentScale += (targetScale - currentScale) * 0.08;
      dataCore.scale.set(currentScale, currentScale, currentScale);

      // Internal harmonic movement
      nucleusWire.rotation.y += 0.003;
      nucleusWire.rotation.z += 0.002;
      innerCore.rotation.y -= 0.006;
      innerCore.rotation.x += 0.004;

      ring1.rotation.z += 0.007;
      ring2.rotation.x += 0.005;
      ring3.rotation.y += 0.003;

      // Update Satellites along orbital planes
      satellites.forEach(sat => {
        sat.angle += sat.speed;
        const x = Math.cos(sat.angle) * sat.radius;
        const z = Math.sin(sat.angle) * sat.radius;

        if (sat.plane === 0) {
          sat.mesh.position.set(x, z * 0.4, z * 0.8);
        } else if (sat.plane === 1) {
          sat.mesh.position.set(x * 0.7, z, x * 0.7);
        } else {
          sat.mesh.position.set(z * 0.5, x * 0.5, z);
        }
      });

      // Slowly drift background particles
      particleField.rotation.y += 0.0008;

      renderer.render(scene, camera);
    }

    animate();
  }

  initHero3D();

  // ------------------------------------------------------------------------
  // 2. Tactile 3D Card Tilt Interaction (CSS 3D Transforms)
  // ------------------------------------------------------------------------
  function init3DCardTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window && window.innerWidth < 768) return; // Skip on small touchscreens

    const cards = document.querySelectorAll('.card-3d');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const tiltX = -y * 8; // Max 8 deg
        const tiltY = x * 8;

        card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  init3DCardTilt();

  // ------------------------------------------------------------------------
  // 3. B11 Mandatory Tagline Reveal Section Engine (Word-by-Word Scroll Reveal)
  // ------------------------------------------------------------------------
  function initTaglineReveal() {
    const taglineBlock = document.getElementById('taglineBlock');
    if (!taglineBlock) return;

    // Get original raw text and split into words
    const rawText = taglineBlock.textContent.trim().replace(/\s+/g, ' ');
    const words = rawText.split(' ');

    taglineBlock.innerHTML = '';
    words.forEach(word => {
      const span = document.createElement('span');
      span.className = 'reveal-word';
      span.textContent = word + ' ';
      taglineBlock.appendChild(span);
    });

    const wordSpans = taglineBlock.querySelectorAll('.reveal-word');

    // If reduced motion is requested, reveal all words immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wordSpans.forEach(w => w.classList.add('revealed'));
      return;
    }

    // IntersectionObserver to trigger sequential word activation on base curve
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          wordSpans.forEach((span, idx) => {
            setTimeout(() => {
              span.classList.add('revealed');
            }, idx * 45); // 45ms step per word
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.25
    });

    observer.observe(taglineBlock);
  }

  initTaglineReveal();

  // ------------------------------------------------------------------------
  // 4. Interactive Simulator 1: Warehouse Zone Velocity Model
  // ------------------------------------------------------------------------
  const zoneData = {
    'zone-a': {
      cpu: '₹43.8',
      cpuDelta: '-3.7% vs baseline',
      throughput: '410 u/hr',
      throughputDelta: '-5% vs baseline',
      transit: '1.9 km',
      transitDelta: '+8% distance',
      status: 'Zone A (Bulk receiving): Slow-moving pallet reserves. Pallet travel remains high due to heavy forklift routing.'
    },
    'zone-b': {
      cpu: '₹37.2',
      cpuDelta: '-18.2% vs baseline',
      throughput: '580 u/hr',
      throughputDelta: '+24% vs baseline',
      transit: '1.2 km',
      transitDelta: '-34% distance',
      status: 'Zone B (Picking corridor): High-velocity SKUs relocated to waist-level eye bays. Picker transit reduced by 34%.'
    },
    'zone-c': {
      cpu: '₹39.5',
      cpuDelta: '-13.2% vs baseline',
      throughput: '510 u/hr',
      throughputDelta: '+12% vs baseline',
      transit: '1.5 km',
      transitDelta: '-18% distance',
      status: 'Zone C (Mezzanine bin-shelving): Medium-velocity items with gravity-fed chutes. Dispatch time stabilized.'
    },
    'zone-d': {
      cpu: '₹41.1',
      cpuDelta: '-9.7% vs baseline',
      throughput: '460 u/hr',
      throughputDelta: '+2% vs baseline',
      transit: '1.7 km',
      transitDelta: '-6% distance',
      status: 'Zone D (Value-added packaging): Bundling station. Transit overhead constrained by manual pack verification.'
    }
  };

  const zoneButtons = document.querySelectorAll('.btn-zone');
  const dashCpuMetric = document.getElementById('dashCpuMetric');
  const dashThroughput = document.getElementById('dashThroughput');
  const dashTravelMetric = document.getElementById('dashTravelMetric');
  const zoneStatusMonitor = document.getElementById('zoneStatusMonitor');

  zoneButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      zoneButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const zoneKey = btn.getAttribute('data-zone');
      const data = zoneData[zoneKey];
      if (data) {
        if (dashCpuMetric) dashCpuMetric.textContent = data.cpu;
        if (dashThroughput) dashThroughput.textContent = data.throughput;
        if (dashTravelMetric) dashTravelMetric.textContent = data.transit;
        if (zoneStatusMonitor) zoneStatusMonitor.textContent = data.status;
      }
    });
  });

  // ------------------------------------------------------------------------
  // 5. Interactive Simulator 2: Dark Store Inventory Holding (DIO Slider)
  // ------------------------------------------------------------------------
  const dioSlider = document.getElementById('dioRangeSlider');
  const dioDisplay = document.getElementById('dioValDisplay');
  const stockoutMetric = document.getElementById('stockoutMetric');
  const spoilageMetric = document.getElementById('spoilageMetric');
  const alertDynamicText = document.getElementById('alertDynamicText');

  if (dioSlider) {
    dioSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (dioDisplay) dioDisplay.textContent = `${val} days`;

      if (val <= 2) {
        if (stockoutMetric) stockoutMetric.textContent = '+38%';
        if (spoilageMetric) spoilageMetric.textContent = '-28%';
        if (alertDynamicText) {
          alertDynamicText.textContent = 'Critical stockout alert: Holding threshold too lean. Out-of-stock frequency elevated on daily essentials.';
        }
      } else if (val >= 3 && val <= 7) {
        if (stockoutMetric) stockoutMetric.textContent = '-22%';
        if (spoilageMetric) spoilageMetric.textContent = '-15%';
        if (alertDynamicText) {
          alertDynamicText.textContent = 'Optimal dark store velocity: Balanced inventory turnover. Spoilage reduced by 15%, stockouts minimized by 22%.';
        }
      } else if (val >= 8 && val <= 13) {
        if (stockoutMetric) stockoutMetric.textContent = '-28%';
        if (spoilageMetric) spoilageMetric.textContent = '+18%';
        if (alertDynamicText) {
          alertDynamicText.textContent = 'Holding cost accumulation: Stockouts zeroed, but perishable inventory spoilage starts exceeding benchmark.';
        }
      } else {
        if (stockoutMetric) stockoutMetric.textContent = '-32%';
        if (spoilageMetric) spoilageMetric.textContent = '+45%';
        if (alertDynamicText) {
          alertDynamicText.textContent = 'Dead stock warning: High shelf-life expiration risk on dairy/fresh categories. Working capital tied up.';
        }
      }
    });
  }

  // ------------------------------------------------------------------------
  // 6. Interactive Simulator 3: Star Schema & SQL CTE Runner
  // ------------------------------------------------------------------------
  const schemaNodes = {
    'dim1': 'Dim_Customer: Customer_SK, Customer_ID, Segment (B2B/B2C), Region_ID, Credit_Tier, Acquisition_Date.',
    'dim2': 'Dim_Product: Product_SK, SKU_Code, Category, Sub_Category, Unit_Cost, Standard_Price, Vendor_ID.',
    'fact': 'Fact_Sales_Returns: Central transactional fact table with 200,000+ rows. Measures: Revenue, Discount_Amt, Quantity, Net_Profit, Margin_Pct.',
    'dim3': 'Dim_Region: Region_SK, Territory (East/West/North/South), Zone_Manager, Fulfilment_Hub, Tax_Bracket.',
    'dim4': 'Dim_Date: Date_SK, Full_Date, Fiscal_Quarter, Fiscal_Year, Month_Name, Is_Peak_Seasonal_Flag.'
  };

  const schemaButtons = document.querySelectorAll('.schema-btn');
  const schemaDetails = document.getElementById('schemaDetails');
  const btnRunSql = document.getElementById('btnRunSql');
  const sqlTerminalOutput = document.getElementById('sqlTerminalOutput');

  schemaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      schemaButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const nodeKey = btn.getAttribute('data-node');
      if (schemaDetails && schemaNodes[nodeKey]) {
        schemaDetails.textContent = schemaNodes[nodeKey];
      }
    });
  });

  if (btnRunSql && sqlTerminalOutput) {
    btnRunSql.addEventListener('click', () => {
      sqlTerminalOutput.textContent = 'Executing query across 200,000+ relational rows...\n\n-- Results:\n+------------+----------------+------------+-------------------+\n| Territory  | Total_Revenue  | Leak_Rank  | Est_Margin_Leak   |\n+------------+----------------+------------+-------------------+\n| East       | ₹4,820,150.00  | 1          | ₹1,850,200.00 (⚠️)|\n| North      | ₹3,910,400.00  | 2          | ₹620,100.00       |\n| West       | ₹3,240,800.00  | 3          | ₹410,500.00       |\n| South      | ₹2,880,100.00  | 4          | ₹210,000.00       |\n+------------+----------------+------------+-------------------+\n-- 4 rows in set (0.042 sec). Root cause: Discretionary B2B pricing overrides in East.';
      btnRunSql.textContent = 'Query executed ✓';
      setTimeout(() => {
        btnRunSql.textContent = 'Execute query';
      }, 4000);
    });
  }

  // ------------------------------------------------------------------------
  // 7. Modal Dialogs (Recruiter Brief & Resume Dossier)
  // ------------------------------------------------------------------------
  const recruiterModal = document.getElementById('recruiterModal');
  const resumeModal = document.getElementById('resumeModal');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const openRecruiterBtns = document.querySelectorAll('.open-recruiter-modal');
  const openResumeBtns = document.querySelectorAll('.open-resume-modal');
  const closeBtns = document.querySelectorAll('.btn-close');

  function openModal(modal) {
    if (!modal) return;
    if (mobileDrawer) mobileDrawer.classList.remove('active', 'open');
    modal.classList.add('active', 'open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active', 'open');
    if (!document.querySelector('.modal-backdrop.active, .modal-backdrop.open')) {
      document.body.style.overflow = '';
    }
  }

  openRecruiterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(recruiterModal);
    });
  });

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(resumeModal);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-backdrop');
      if (parentModal) closeModal(parentModal);
    });
  });

  [recruiterModal, resumeModal, mobileDrawer].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [recruiterModal, resumeModal, mobileDrawer].forEach(m => closeModal(m));
    }
  });

  // ------------------------------------------------------------------------
  // 8. Mobile Drawer Menu
  // ------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      openModal(mobileDrawer);
    });
  }

  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener('click', () => {
      closeModal(mobileDrawer);
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeModal(mobileDrawer);
    });
  });

  // ------------------------------------------------------------------------
  // 9. Clipboard Copy Trigger with Toast Notice
  // ------------------------------------------------------------------------
  const copyTriggers = document.querySelectorAll('.copy-trigger');
  const toast = document.getElementById('nbToast');
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  copyTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const copyVal = btn.getAttribute('data-copy');
      if (copyVal) {
        navigator.clipboard.writeText(copyVal).then(() => {
          showToast(`Copied to clipboard: ${copyVal}`);
        }).catch(() => {
          showToast('Copied to clipboard');
        });
      }
    });
  });

  // ------------------------------------------------------------------------
  // 10. Print Resume Trigger
  // ------------------------------------------------------------------------
  const printResumeBtn = document.getElementById('btnPrintResume');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

});
