export function letswriteTooltips(optionsCustom) {

  // 設定 options
  const custom = optionsCustom || {};
  const optionDefault = {

    // 哪一個 class name 要執行 Tooltips
    el: '.letswrite-tooltips',

    // Tooltips 的內文抓 el 的哪一個 data-*
    dataContent: 'content',

    // 客製的 class name，沒有給值就是預設
    customClass: 'letswrite-tooltips-default',

    // 點擊 Tooltips 的 callback
    callback: function() {}
  
  };
  let option = {};
  for(let key of Object.keys(optionDefault)) {
    option[key] = custom[key] || optionDefault[key];
  }

  const tooltipId = option.el.replace('.', ''); // Tooltips 的 ID
  const tooltips = document.querySelectorAll(option.el);

  // 塞入 Tooltips
  if(!document.getElementById(tooltipId)) {
    const tooltipBox = `
      <div
        id="${tooltipId}"
        class="${tooltipId} ${option.customClass}"></div>
    `;

    // 預設樣式
    const tooltipStyle = `
      <style>
        #${tooltipId} {
          position: absolute;
          z-index: 99999;
          display: none;
        }
        .letswrite-tooltips-default {
          padding: 4px 8px;
          background-color: #212121;
          border: 1px solid rgba(0, 0, 0, .1);
          border-radius: 4px;
          font-size: 16px;
          color: rgba(255, 255, 255, .8)
        }
        .letswrite-tooltips-default::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -5px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 5px 6px 5px 0;
          border-color: transparent #212121 transparent transparent;
          transform: translateY(-50%);
        }
      </style>`;
    document.body.insertAdjacentHTML('beforeend', tooltipBox);
    document.head.insertAdjacentHTML('beforeend', tooltipStyle);
  }
  const tooltip = document.getElementById(tooltipId);

  // 處理每一個 Tooltips
  Array.prototype.forEach.call(tooltips, box => {

    // 定位 Tooltips
    box.onmouseenter = (e) => {
      const t = e.target.getBoundingClientRect();
      const y = t.top + document.documentElement.scrollTop;
      const x = t.right + 8;
      tooltip.textContent = e.target.dataset[option.dataContent];
      tooltip.setAttribute('style', `top: 0; left: 0; display: block; transform: translate3d(${x}px, ${y}px, 0px)`)
    };

    box.onmouseleave = () => tooltip.removeAttribute('style');

    // click callback
    box.onclick = e => option.callback(e);

  });
}