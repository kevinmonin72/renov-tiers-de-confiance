/* ArchiSimple · Google Analytics 4 + consentement (CNIL / RGPD)
   Renseignez votre identifiant de mesure GA4 ci-dessous (format G-XXXXXXXXXX). */
(function () {
  var GA_ID = 'G-7425M000PN';
  var KEY = 'archisimple_consent_v1';

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  window.asTrack = function (name, params) { if (GA_ID) gtag('event', name, params || {}); };
  if (!/^G-[A-Z0-9]+$/.test(GA_ID)) return;

  function read() { try { return localStorage.getItem(KEY); } catch (_) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (_) {} }

  gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500
  });
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  function apply(v) { gtag('consent', 'update', { analytics_storage: v === 'yes' ? 'granted' : 'denied' }); }
  var choice = read();
  if (choice) { apply(choice); return; }

  var css = document.createElement('style');
  css.textContent =
    '#as-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin-left:auto;' +
    'background:#121212;color:#F3F1EC;border:1px solid #121212;padding:18px 20px;font:14px/1.5 Archivo,system-ui,sans-serif;' +
    'box-shadow:8px 8px 0 rgba(18,18,18,.15)}' +
    '#as-consent b{display:block;font:500 11px/1 "JetBrains Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:#E60023;margin-bottom:8px}' +
    '#as-consent p{margin:0 0 14px;color:rgba(243,241,236,.8)}' +
    '#as-consent div{display:flex;gap:8px;flex-wrap:wrap}' +
    '#as-consent button{flex:1;min-width:120px;padding:11px 14px;border:1px solid #F3F1EC;border-radius:0;cursor:pointer;' +
    'font:500 12px/1 "JetBrains Mono",monospace;letter-spacing:.08em;text-transform:uppercase}' +
    '#as-consent .y{background:#F3F1EC;color:#121212}#as-consent .n{background:transparent;color:#F3F1EC}';
  document.head.appendChild(css);

  function show() {
    var b = document.createElement('div');
    b.id = 'as-consent';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Cookies');
    b.innerHTML = '<b>Cookies · Mesure d\'audience</b><p>Nous utilisons Google Analytics pour comprendre la fréquentation du site et l\'améliorer. Aucune donnée n\'est utilisée à des fins publicitaires.</p>' +
      '<div><button class="n" type="button">Refuser</button><button class="y" type="button">Accepter</button></div>';
    b.querySelector('.y').onclick = function () { save('yes'); apply('yes'); b.remove(); };
    b.querySelector('.n').onclick = function () { save('no'); apply('no'); b.remove(); };
    document.body.appendChild(b);
  }
  if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
})();
