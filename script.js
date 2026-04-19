// Affiliate URL - Update with your actual affiliate link
const AFFILIATE_URL = "https://allcouponcodes.net/refer/cloudways2";

// Coupon Data
const coupons = [
  { code: "SAVE303", discount: "30% OFF", description: "Get 30% Off for 3 Months Limited Time Offer", type: "exclusive", initialDays: 3 },
  { code: "ALLCOUPON", discount: "30% OFF", description: "Get 30% Off for 3 Months Limited Time Offer", type: "exclusive", initialDays: 3 },
  { code: "HIGHSPEED", discount: "20% OFF", description: "20% off for 3 months", type: "exclusive", initialDays: 3 },
  { code: "ALLCOUPON", discount: "20% OFF", description: "20% off for 3 months", type: "normal", initialDays: 5 },
  { code: "CLOUDIE", discount: "10% OFF", description: "Get 10% Off Storewide at Cloudways", type: "normal", initialDays: 5 },
  { code: "ALLCOUPON", discount: "30% OFF", description: "Exclusive 30% discount on Digital Ocean", type: "unverified", initialDays: 5 },
  { code: "ALLCOUPON", discount: "40% OFF", description: "40% off on Google Cloud", type: "unverified", initialDays: 5 }
];

// FAQ Data
const faqs = [
  {
    question: "What is Cloudways and who should use it?",
    answer: "Cloudways is a managed cloud hosting platform that sits on top of major cloud providers including DigitalOcean, AWS, Google Cloud, Vultr, and Linode. It handles all server management, security, and updates so you can focus on your website. It's ideal for developers, agencies, freelancers, and growing businesses who want cloud-level performance without the complexity of managing infrastructure manually."
  },
  {
    question: "How do I use a Cloudways coupon code from this site?",
    answer: "Click the 'Show Coupon' button on any coupon above. This will open a new tab with your coupon code displayed, while automatically redirecting the current tab to the Cloudways website. Copy the code from the new tab, sign up for a Cloudways account, and paste the code in the 'Got a Promo Code?' field during registration to activate your discount."
  },
  {
    question: "Are these Cloudways coupon codes verified and legitimate?",
    answer: "Yes! All coupon codes on this page are manually tested and verified by our team of managed hosting professionals. We have a direct partnership with Cloudways as an authorized affiliate, which means our codes come straight from the source. Codes marked as 'Unverified' are community-shared and may or may not work always try the Exclusive and Verified codes first."
  },
  {
    question: "Can I combine multiple Cloudways coupon codes?",
    answer: "No, Cloudways only allows one promo code per account at signup. You cannot stack multiple codes. We recommend using the highest-value code that applies to your chosen plan currently ALLCOUPON gives you 30% off for 5 months, which is the best overall deal available in 2026."
  },
  {
    question: "Which Cloudways plan is best for beginners?",
    answer: "For most beginners, we recommend starting with the DigitalOcean 1GB plan at $14/month. It's sufficient for small to medium WordPress or WooCommerce sites, includes all Cloudways features (SSL, staging, backups, 24/7 support), and lets you scale up with one click as your traffic grows. Use a 30% coupon code to bring this down to around $9.80/month for your first few months."
  },
  {
    question: "Does Cloudways offer a free trial?",
    answer: "Yes! Cloudways offers a 3-day free trial with no credit card required. You get full access to all platform features including server deployment, staging environments, and expert support. This is a great way to test performance before committing. After the trial, upgrade to a paid plan and apply your coupon code to lock in the discount."
  },
  {
    question: "How does Cloudways compare to WP Engine and Kinsta?",
    answer: "Cloudways offers more flexibility at a lower starting price. While WP Engine starts at $35/month and Kinsta at $35/month, Cloudways starts at $14/month and unlike both competitors, lets you choose from 5 cloud providers, host unlimited apps per server, and use true autoscaling via Kubernetes (Autonomous). WP Engine and Kinsta are WordPress-only; Cloudways also supports Magento, Laravel, and PHP apps."
  }
];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  initHeader();
  initHeroCountdown();
  renderCoupons();
  renderFAQs();
  initPopup();
  initSmoothScroll();
  document.getElementById('current-year').textContent = new Date().getFullYear();
  document.querySelector('link[rel="canonical"]').href = window.location.origin;
});

// Header scroll effect
function initHeader() {
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
    mobileMenuBtn.querySelector('.icon-menu').classList.toggle('hidden');
    mobileMenuBtn.querySelector('.icon-close').classList.toggle('hidden');
  });
  
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
      mobileMenuBtn.querySelector('.icon-menu').classList.remove('hidden');
      mobileMenuBtn.querySelector('.icon-close').classList.add('hidden');
    });
  });
}

// Hero Countdown Timer
function initHeroCountdown() {
  const storageKey = 'hero_countdown_end';
  let endTime = getOrCreateEndTime(storageKey, 5);
  
  function update() {
    const diff = endTime - Date.now();
    if (diff <= 0) {
      endTime = Date.now() + 5 * 24 * 60 * 60 * 1000;
      localStorage.setItem(storageKey, endTime.toString());
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    document.getElementById('hero-days').textContent = pad(d);
    document.getElementById('hero-hours').textContent = pad(h);
    document.getElementById('hero-mins').textContent = pad(m);
    document.getElementById('hero-secs').textContent = pad(s);
  }
  update();
  setInterval(update, 1000);
}

function getOrCreateEndTime(key, days) {
  const stored = localStorage.getItem(key);
  if (stored && parseInt(stored) > Date.now()) return parseInt(stored);
  const endTime = Date.now() + days * 24 * 60 * 60 * 1000;
  localStorage.setItem(key, endTime.toString());
  return endTime;
}

function pad(n) { return n.toString().padStart(2, '0'); }

// Render Coupons
function renderCoupons() {
  const exclusiveContainer = document.getElementById('exclusive-coupons');
  const normalContainer = document.getElementById('normal-coupons');
  const unverifiedContainer = document.getElementById('unverified-coupons');
  
  coupons.forEach((coupon, index) => {
    const card = createCouponCard(coupon, index);
    if (coupon.type === 'exclusive') exclusiveContainer.appendChild(card);
    else if (coupon.type === 'normal') normalContainer.appendChild(card);
    else unverifiedContainer.appendChild(card);
  });
}

function createCouponCard(coupon, index) {
  const maskedCode = '••••••' + coupon.code.slice(-2);
  const isExclusive = coupon.type === 'exclusive';
  const isUnverified = coupon.type === 'unverified';
  
  const iconClass = isExclusive ? 'coupon-icon-orange' : (isUnverified ? 'coupon-icon-gray' : 'coupon-icon-green');
  const typeLabel = isExclusive ? 'Exclusive Code' : (isUnverified ? 'Unverified Code' : 'Verified Code');
  const iconSvg = isExclusive ? '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' : 
    (isUnverified ? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' : 
    '<path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>');
  
  const card = document.createElement('article');
  card.className = 'coupon-card';
  card.innerHTML = `
    <div class="coupon-card-inner ${isExclusive ? 'has-badge' : ''}">
      <div class="coupon-orb-1"></div>
      <div class="coupon-orb-2"></div>
      ${isExclusive ? '<div class="hot-deal-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Hot Deal</div>' : ''}
      <div class="coupon-content">
        <div class="coupon-left">
          <div class="coupon-info">
            <div class="coupon-icon ${iconClass}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${iconSvg}</svg></div>
            <div>
              <div class="coupon-discount">${coupon.discount}</div>
              <div class="coupon-type ${isUnverified ? 'coupon-type-yellow' : ''}">${typeLabel}</div>
            </div>
          </div>
          <p class="coupon-desc">${coupon.description}</p>
          <div class="coupon-timer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span id="timer-${index}">00:00:00</span></div>
        </div>
        <div class="coupon-right">
          <div class="coupon-code-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg><code class="coupon-code">${maskedCode}</code></div>
          <button class="btn-show-coupon" data-code="${coupon.code}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> Show Coupon <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>
        </div>
      </div>
    </div>
  `;
  
  // Timer for this coupon
  const timerKey = `coupon_timer_${coupon.code}`;
  let endTime = getOrCreateEndTime(timerKey, coupon.initialDays);
  const timerEl = card.querySelector(`#timer-${index}`);
  
  function updateTimer() {
    let diff = endTime - Date.now();
    if (diff <= 0) {
      endTime = Date.now() + coupon.initialDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(timerKey, endTime.toString());
      diff = endTime - Date.now();
    }
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    timerEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  updateTimer();
  setInterval(updateTimer, 1000);
  
  // Show coupon button
  card.querySelector('.btn-show-coupon').addEventListener('click', function() {
    const code = this.dataset.code;
    localStorage.setItem('pendingCoupon', code);
    window.open(window.location.origin + window.location.pathname + '?popup=true', '_blank');
    setTimeout(() => { window.location.href = AFFILIATE_URL; }, 200);
  });
  
  return card;
}

// Render FAQs
function renderFAQs() {
  const container = document.getElementById('faq-list');
  faqs.forEach((faq, i) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <button class="faq-question">${faq.question}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></button>
      <div class="faq-answer"><div class="faq-answer-inner">${faq.answer}</div></div>
    `;
    item.querySelector('.faq-question').addEventListener('click', () => {
      item.classList.toggle('active');
    });
    container.appendChild(item);
  });
}

// Popup functionality
function initPopup() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('popup') === 'true') {
    const code = localStorage.getItem('pendingCoupon');
    if (code) {
      document.getElementById('popup-code-text').textContent = code;
      document.getElementById('coupon-popup').classList.remove('hidden');
      localStorage.removeItem('pendingCoupon');
      history.replaceState({}, '', window.location.pathname);
    }
  }
  
  document.getElementById('popup-close').addEventListener('click', closePopup);
  document.getElementById('popup-continue').addEventListener('click', closePopup);
  document.getElementById('popup-copy-btn').addEventListener('click', function() {
    const code = document.getElementById('popup-code-text').textContent;
    navigator.clipboard.writeText(code).then(() => {
      this.classList.add('btn-copied');
      this.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Code Copied!</span>';
      setTimeout(() => {
        this.classList.remove('btn-copied');
        this.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><span>Copy Coupon Code</span>';
      }, 3000);
    });
  });
}

function closePopup() {
  document.getElementById('coupon-popup').classList.add('hidden');
}

// Smooth scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
