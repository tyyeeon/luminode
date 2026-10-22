(() => {
  'use strict';
  const root = document.getElementById('luminode-page');
  const toast = document.getElementById('toast');
  if (!root) return;
  let timer;
  const announce = text => {
    if (!toast) return;
    toast.textContent = text;
    clearTimeout(timer);
    timer = setTimeout(() => { toast.textContent = ''; }, 2200);
  };
  async function copy(value) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:absolute;left:-10000px;top:0;opacity:0';
    document.body.appendChild(field);
    field.select();
    try {
      if (!document.execCommand('copy')) throw new Error('Copy unavailable');
    } finally { field.remove(); }
  }
  root.querySelectorAll('button.copy[data-v]').forEach(button => {
    button.addEventListener('click', async () => {
      try { await copy(button.dataset.v); announce('복사했습니다.'); }
      catch (_) { announce('직접 선택해서 복사해 주세요.'); }
      button.focus({ preventScroll: true });
    });
  });
})();
