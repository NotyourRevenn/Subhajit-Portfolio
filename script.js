/* ==========================================================================
   SUBHAJIT MONDAL - GUMROAD NEO-BRUTALISM ENGINE
   Omnipresent Tactile Hover & Click Audio System, Parallax Sticker Engine,
   Interactive Operations Simulators & Recruiter Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. Neo-Brutalist Parallax Engine (Scroll & Mouse Tracking)
  // ------------------------------------------------------------------------
  const parallaxStickers = document.querySelectorAll('.parallax-sticker');
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    targetMouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
  });

  function renderParallax() {
    const scrollY = window.scrollY;

    currentMouseX += (targetMouseX - currentMouseX) * 0.08;
    currentMouseY += (targetMouseY - currentMouseY) * 0.08;

    parallaxStickers.forEach(sticker => {
      const speed = parseFloat(sticker.getAttribute('data-parallax-speed')) || 0.15;
      const transY = scrollY * speed + currentMouseY * (speed * 40);
      const transX = currentMouseX * (speed * 50);

      sticker.style.transform = `translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 0)`;
    });

    requestAnimationFrame(renderParallax);
  }

  renderParallax();

  // ------------------------------------------------------------------------
  // 2. Omnipresent Tactile Web Audio Synthesizer (Zero External Dependencies)
  // ------------------------------------------------------------------------
  let soundEnabled = true;
  let audioCtx = null;
  let lastSoundTime = 0;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Auto-unlock audio on any initial interaction so hover sounds work immediately
  ['pointerdown', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, () => initAudio(), { once: true, passive: true });
  });

  // Master Synth Generator with anti-clipping rate limiter
  function playSynth(freq, type = 'sine', duration = 0.03, vol = 0.04) {
    if (!soundEnabled) return;
    const now = performance.now();
    if (now - lastSoundTime < 10) return; // Prevent audio distortion
    lastSoundTime = now;

    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(vol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  // Sound Profile 1: Bouncy bubble pop for buttons
  function playButtonPop(freq = 620) {
    playSynth(freq, 'sine', 0.035, 0.045);
  }

  // Sound Profile 2: Ultra-crisp tactile tick for tags, chips, pills & badges
  function playPillTick(freq = 980) {
    playSynth(freq, 'triangle', 0.02, 0.035);
  }

  // Sound Profile 3: Resonant wooden block thud for big cards & bento boxes
  function playCardThud(freq = 400) {
    playSynth(freq, 'sine', 0.04, 0.04);
  }

  // Sound Profile 4: Crisp acoustic tick for navigation links & brand
  function playNavClack(freq = 820) {
    playSynth(freq, 'triangle', 0.025, 0.04);
  }

  // Sound Profile 5: Tactile mechanical snap on click
  function playClickSnap(freq = 880) {
    playSynth(freq, 'square', 0.035, 0.05);
  }

  // Sound Profile 6: Ascending 4-tone C-Major chord for modals & copy confirmations
  function playSuccessChime() {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!soundEnabled) return;
          playSynth(freq, 'triangle', 0.12, 0.045);
        }, idx * 55);
      });
    } catch (e) {}
  }

  // Sound Profile 7: Dynamic frequency sweep on slider drag
  function playSliderTick(val) {
    const freq = 340 + (val * 45);
    playSynth(freq, 'sine', 0.025, 0.04);
  }

  // Sound Toggle Button
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.innerHTML = soundEnabled ? '🔊 SFX: ON' : '🔇 SFX: OFF';
      if (soundEnabled) {
        playSuccessChime();
        showToast('🔊 Hover & Click Audio Active');
      } else {
        showToast('🔇 Audio Muted');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3. ATTACH HOVER & CLICK SOUNDS TO EVERY ELEMENT ACROSS THE ENTIRE UI
  // ------------------------------------------------------------------------

  // A. Buttons & Interactive Controls (Bubble Pop on Hover, Snap on Click)
  document.querySelectorAll('button, .nb-btn, .btn-zone, .schema-btn, .nb-close-btn, .mobile-menu-btn').forEach(el => {
    el.addEventListener('mouseenter', () => playButtonPop(640));
    el.addEventListener('click', () => playClickSnap(920));
  });

  // B. Navigation Links, Brand & Social Links (Crisp Clack on Hover)
  document.querySelectorAll('.nb-nav-links a, .drawer-link, .nb-brand, .footer-socials a, a').forEach(el => {
    el.addEventListener('mouseenter', () => playNavClack(800));
    el.addEventListener('click', () => playClickSnap(860));
  });

  // C. Cards, Bento Blocks, Experience & Project Tiles (Resonant Thud on Hover)
  document.querySelectorAll('.nb-card, .stat-card, .project-card, .skill-block, .exp-card, .profile-card, .quick-box, .footer-card, .project-interactive').forEach(el => {
    el.addEventListener('mouseenter', () => playCardThud(400));
  });

  // D. Badges, Chips, Pills, Tags & Small Elements (Micro Tactile Tick on Hover)
  document.querySelectorAll('.nb-tag, .chip, .pill, .takeaway-item, .takeaway-tag, .badge-mini, .profile-sticker, .brand-badge, .dio-tag, .kpi-box, .date-pill').forEach(el => {
    el.addEventListener('mouseenter', () => {
      // Tiny random pitch variation for playful tactile keyboard/sticker feel
      const pitch = 950 + (Math.random() * 120);
      playPillTick(pitch);
    });
  });

  // E. Floating Parallax Stickers (Playful High Chime on Hover)
  document.querySelectorAll('.parallax-sticker').forEach(el => {
    el.addEventListener('mouseenter', () => playPillTick(1200));
    el.addEventListener('click', () => playButtonPop(800));
  });

  // F. Profile Photo Portal
  document.querySelectorAll('.profile-photo-wrapper, .profile-photo').forEach(el => {
    el.addEventListener('mouseenter', () => playButtonPop(520));
  });

  // G. Marquee Ticker Strip
  document.querySelectorAll('.nb-marquee-strip').forEach(el => {
    el.addEventListener('mouseenter', () => playNavClack(700));
  });

  // H. Range Slider Track
  document.querySelectorAll('.nb-range').forEach(el => {
    el.addEventListener('mouseenter', () => playButtonPop(680));
  });

  // ------------------------------------------------------------------------
  // 4. Project 1: Warehouse Zone Simulator
  // ------------------------------------------------------------------------
  const zoneBtns = document.querySelectorAll('.btn-zone');
  const zoneStatusText = document.getElementById('zoneStatusMonitor');
  const dashThroughput = document.getElementById('dashThroughput');
  const dashCpuMetric = document.getElementById('dashCpuMetric');
  const dashTravelMetric = document.getElementById('dashTravelMetric');

  const zoneData = {
    'zone-a': {
      status: 'ZONE A (INBOUND AIRLOCK): Pallet unload turnaround: 4.1 mins. Barcode scanner sync rate: 99.8%. Velocity nominal.',
      throughput: '410 u/hr',
      cpu: '₹37.2',
      travel: '1.2 km'
    },
    'zone-b': {
      status: 'ZONE B (PICKING CORRIDOR): High-velocity SKUs relocated to waist-level eye bays. Picker transit reduced by 34%.',
      throughput: '580 u/hr',
      cpu: '₹35.8',
      travel: '1.9 km'
    },
    'zone-c': {
      status: 'ZONE C (AUTOMATED PACK & QC): Automated weigh-and-seal verification online. Packing queue latency down 28%.',
      throughput: '520 u/hr',
      cpu: '₹36.5',
      travel: '0.8 km'
    },
    'zone-d': {
      status: 'ZONE D (DISPATCH PORT): On-Time-In-Full (OTIF) dispatch velocity at 98.6%. Multi-zone vehicle routing optimized.',
      throughput: '640 u/hr',
      cpu: '₹34.1',
      travel: '1.0 km'
    }
  };

  zoneBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      zoneBtns.forEach(b => {
        b.classList.remove('active', 'btn-yellow');
        b.classList.add('btn-white');
      });
      btn.classList.add('active', 'btn-yellow');
      btn.classList.remove('btn-white');

      const zoneKey = btn.getAttribute('data-zone');
      const data = zoneData[zoneKey];
      if (data) {
        if (zoneStatusText) zoneStatusText.textContent = data.status;
        if (dashThroughput) dashThroughput.textContent = data.throughput;
        if (dashCpuMetric) dashCpuMetric.textContent = data.cpu;
        if (dashTravelMetric) dashTravelMetric.textContent = data.travel;
        playButtonPop(780);
        showToast(`✓ ${btn.textContent.trim()} Selected!`);
      }
    });
  });

  // ------------------------------------------------------------------------
  // 5. Project 2: Dark Store Inventory Slider
  // ------------------------------------------------------------------------
  const dioSlider = document.getElementById('dioRangeSlider');
  const dioValueDisplay = document.getElementById('dioValDisplay');
  const alertText = document.getElementById('alertDynamicText');
  const spoilageMetric = document.getElementById('spoilageMetric');
  const stockoutMetric = document.getElementById('stockoutMetric');

  if (dioSlider) {
    dioSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (dioValueDisplay) dioValueDisplay.textContent = `${val} DAYS`;
      playSliderTick(val);

      if (val <= 2) {
        if (alertText) {
          alertText.innerHTML = '🚨 <strong>CRITICAL STOCKOUT RISK:</strong> Automated PO Triggered! SKU velocity exceeds safety buffer.';
        }
        if (stockoutMetric) stockoutMetric.textContent = 'HIGH (PO SENT)';
        if (spoilageMetric) spoilageMetric.textContent = '0% SPOILAGE';
      } else if (val >= 12) {
        if (alertText) {
          alertText.innerHTML = '⚠️ <strong>DEADSTOCK ACCUMULATION:</strong> Holding costs climbing. Spoilage discount protocol triggered.';
        }
        if (stockoutMetric) stockoutMetric.textContent = '0% RISK';
        if (spoilageMetric) spoilageMetric.textContent = '+18% SPOILAGE';
      } else {
        if (alertText) {
          alertText.innerHTML = '🟢 <strong>OPTIMAL DARK STORE VELOCITY:</strong> Healthy turnover. Spoilage down 15%, stockouts cut 22%.';
        }
        if (stockoutMetric) stockoutMetric.textContent = '-22%';
        if (spoilageMetric) spoilageMetric.textContent = '-15%';
      }
    });
  }

  // ------------------------------------------------------------------------
  // 6. Project 3: Star Schema & SQL Runner
  // ------------------------------------------------------------------------
  const schemaNodes = document.querySelectorAll('.schema-btn');
  const schemaDetails = document.getElementById('schemaDetails');

  const nodeInfo = {
    'fact': 'FACT_SALES_RETURNS: Central fact table with 200,000+ transactional rows. Measures: Revenue, Discount_Amt, Quantity, Profit.',
    'dim1': 'DIM_CUSTOMER: 12,500+ Unique Accounts. Attributes: Customer_Key, Segment (Enterprise, SMB), Region_ID, Credit_Tier.',
    'dim2': 'DIM_PRODUCT: 4,800 SKUs. Attributes: Product_Key, Category, Base_Margin_Pct, Unit_Cost, Manufacturer.',
    'dim3': 'DIM_REGION: 8 Zones & 45 Territories. Attributes: Territory_Key, Regional_Director, Logistics_Hub_ID, Sales_Quota.',
    'dim4': 'DIM_DATE: Complete Fiscal Temporal Matrix. Attributes: Date_Key, Day_Of_Week, Fiscal_Quarter, Holiday_Flag, YoY_Period.'
  };

  schemaNodes.forEach(node => {
    node.addEventListener('click', () => {
      schemaNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const key = node.getAttribute('data-node');
      if (nodeInfo[key] && schemaDetails) {
        schemaDetails.textContent = nodeInfo[key];
        playButtonPop(740);
      }
    });
  });

  const sqlRunBtn = document.getElementById('btnRunSql');
  const sqlOutput = document.getElementById('sqlTerminalOutput');
  if (sqlRunBtn && sqlOutput) {
    sqlRunBtn.addEventListener('click', () => {
      sqlRunBtn.textContent = '⏳ RUNNING...';
      sqlOutput.innerHTML = '<span style="color:#38bdf8;">Executing Window Function (DENSE_RANK) across 200,000 rows...</span>';
      playButtonPop(620);

      setTimeout(() => {
        sqlOutput.innerHTML = `
<span style="color:#00f5a0;">✓ QUERY SUCCESS (0.038s) | 200,000 ROWS SCANNED</span>
--------------------------------------------------------------
Territory       Revenue (₹)   Margin Leakage  DENSE_RANK
--------------------------------------------------------------
East_Enterprise ₹4.2 Cr       ₹8.4 Lakhs      1 (High Leak)
South_Metro     ₹3.8 Cr       ₹5.6 Lakhs      2
North_Retail    ₹2.9 Cr       ₹4.5 Lakhs      3
--------------------------------------------------------------
Finding: Discretionary discounts in East Enterprise drove 45% of leakage.
`;
        sqlRunBtn.textContent = '▶ RUN SQL CTE';
        playSuccessChime();
        showToast('✓ SQL Query Execution Simulation Complete!');
      }, 550);
    });
  }

  // ------------------------------------------------------------------------
  // 7. Modals (Recruiter Fast Track & Resume Dossier)
  // ------------------------------------------------------------------------
  const recruiterModal = document.getElementById('recruiterModal');
  const resumeModal = document.getElementById('resumeModal');
  const openRecruiterBtns = document.querySelectorAll('.open-recruiter-modal');
  const openResumeBtns = document.querySelectorAll('.open-resume-modal');
  const closeModalBtns = document.querySelectorAll('.nb-close-btn');

  openRecruiterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (recruiterModal) {
        recruiterModal.classList.add('active');
        playSuccessChime();
      }
    });
  });

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) {
        resumeModal.classList.add('active');
        playSuccessChime();
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (recruiterModal) recruiterModal.classList.remove('active');
      if (resumeModal) resumeModal.classList.remove('active');
      playButtonPop(420);
    });
  });

  [recruiterModal, resumeModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  // ------------------------------------------------------------------------
  // 8. 1-Click Clipboard Copies
  // ------------------------------------------------------------------------
  document.querySelectorAll('.copy-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const textToCopy = trigger.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          playSuccessChime();
          showToast(`✓ Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast(`Copied: ${textToCopy}`);
        });
      }
    });
  });

  // ------------------------------------------------------------------------
  // 9. Toast Helper
  // ------------------------------------------------------------------------
  const toast = document.getElementById('nbToast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // ------------------------------------------------------------------------
  // 10. Mobile Navigation Drawer
  // ------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open', 'active');
      playButtonPop(520);
    });
  }

  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('open', 'active');
      playButtonPop(400);
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) mobileDrawer.classList.remove('open', 'active');
    });
  });

  // ------------------------------------------------------------------------
  // 11. Print Resume
  // ------------------------------------------------------------------------
  const printResumeBtn = document.getElementById('btnPrintResume');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }
});
