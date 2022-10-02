import { letswriteTooltips } from './letswrite-tooltip.mjs';

document.addEventListener('DOMContentLoaded', () => {
  
  // Demo 1：基本使用，都吃預設值
  const demo1 = new letswriteTooltips();

  // Demo 2：加入客製 class name
  const demo2 = new letswriteTooltips({
    el: '.letswrite-tooltips-demo2',
    customClass: 'letswrite-tooltips-custom'
  });

  // Demo 3：點擊後執行 function
  const demo3 = new letswriteTooltips({
    el: '.letswrite-tooltips-demo3',
    callback: (e) => {
      e.preventDefault();
      alert('callback')
    }
  });

  hljs.highlightAll();

})