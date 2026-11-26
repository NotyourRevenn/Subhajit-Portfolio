/* ==========================================================================
   SUBHAJIT MONDAL — BUSINESS & DATA ANALYST
   Interactive Decision Labs, Data Telemetry & Modal Management
   Designed for clarity, performance, and institutional precision
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. Interactive Simulator 1: Warehouse Zone Velocity Model
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
  // 2. Interactive Simulator 2: Dark Store Inventory Holding (DIO Slider)
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
          alertDynamicText.textContent = 'Optimal dark store velocity: Balanced inventory turnover. Spoilage down 15%, stockouts minimized by 22%.';
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
  // 3. Interactive Simulator 3: Star Schema & SQL CTE Runner
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
  // 4. Modal Dialogs (Recruiter Brief & Resume Dossier)
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
  // 5. Mobile Drawer Menu
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
  // 6. Clipboard Copy Trigger with Toast Notice
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
  // 7. Print Resume Trigger
  // ------------------------------------------------------------------------
  const printResumeBtn = document.getElementById('btnPrintResume');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

});
