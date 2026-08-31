function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      const btn = document.getElementById('toggleBtn');
      sidebar.classList.toggle('zoomleft');
      btn.textContent = sidebar.classList.contains('zoomleft') ? '▶' : '◀';
    }
	
	
function setDrinkLevel(percentage) {
  // percentage 傳入 0 ~ 100
  const drinkWrapper = document.querySelector('.drink_wrapper');
  drinkWrapper.style.height = percentage + '%';
}

// 範例：飲料剩下 40%（被喝掉 60%）
setDrinkLevel(70);

function toggleDrinkbar() {
  const drinkContainer = document.querySelector('.drink_bar');
  const wrapper = document.querySelector('.status_drink_wrapper');

  if (!drinkContainer) return;

  const isActive = drinkContainer.classList.toggle('active');

  if (isActive) {
    // 彈出時：移至 body 避免被 overflow 裁切
    document.body.appendChild(drinkContainer);
  } else {
    // 關閉時：直接放回 wrapper 內部最後面
    if (wrapper) {
      wrapper.appendChild(drinkContainer);
    }
  }
}

// 點擊空白處關閉並歸位
document.addEventListener('click', (e) => {
  const drinkIcon = document.getElementById('drinkMinIcon');
  const drinkContainer = document.querySelector('.drink_bar');
  const wrapper = document.querySelector('.status_drink_wrapper');

  if (drinkContainer && drinkIcon && drinkContainer.classList.contains('active')) {
    if (!drinkContainer.contains(e.target) && !drinkIcon.contains(e.target)) {
      drinkContainer.classList.remove('active');
      // 放回 wrapper 內部
      if (wrapper) {
        wrapper.appendChild(drinkContainer);
      }
    }
  }
});







/*棋盤表格*/
// 1. 建構子（Constructor）：當你執行 new InventoryGrid(...) 時，這個函式會第一個自動執行
class InventoryGrid {  
  constructor(containerId, cols, rows, cellSize = 40) {

    this.container = document.getElementById(containerId);
    this.cols = cols;
    this.rows = rows;
    this.cellSize = cellSize;    // 將傳進來的參數存入這一個實例專屬的「內部屬性 (this)」中

    if (!this.container) {
      console.error(`找不到容器: #${containerId}`);
      return;
    }    // 檢查容器是否存在

    this.initGrid();
    }     // 初始化建立網格

  // 2. 負責生成 HTML 與 CSS 排版的內部方法
  initGrid() {
    this.container.innerHTML = '';    // 清空該容器（避免重複繪製）

    this.container.style.display = 'grid';
    this.container.style.gridTemplateColumns = `repeat(${this.cols}, ${this.cellSize}px)`;
    this.container.style.gridTemplateRows = `repeat(${this.rows}, ${this.cellSize}px)`;
    this.container.style.gap = '0px';    // 動態修改該容器的 CSS，讓 grid 欄數與列數由 JS 控制

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';    // 雙層迴圈渲染格子
        
        cell.dataset.col = c;
        cell.dataset.row = r;        // 綁定座標資料

        this.addCellEvents(cell, c, r);        // 綁定這一個格子獨立的拖放事件
        this.container.appendChild(cell);        // 放入該容器中
      }
    }
  }

  // 3. 綁定事件的方法
  addCellEvents(cell, col, row) {
    cell.addEventListener('dragover', (e) => {
      e.preventDefault();
      cell.classList.add('drag-over');
    });

    cell.addEventListener('dragleave', () => {
      cell.classList.remove('drag-over');
    });

    cell.addEventListener('drop', (e) => {
      e.preventDefault();
      cell.classList.remove('drag-over');
      
      // 可以呼叫此實例內部的方法
      this.onDropItem(col, row);
    });
  }

  // 4. 當放開道具時觸發的邏輯
  onDropItem(col, row) {
    console.log(`[${this.container.id}] 在位置 (${col}, ${row}) 放下了道具！`);
  }
}

const mainBag = new InventoryGrid('mainBag', 7, 5);

function toggleHandbag() {
  const handbagContainer = document.getElementById('mainBag');
  const scrollContent = document.querySelector('.sidebar_scroll_content');
  const btnGroup = document.getElementById('btnGroup'); // 取得按鈕群元素

  if (!handbagContainer) return;

  const isActive = handbagContainer.classList.toggle('active');

  if (isActive) {
    // 彈出時：移至 body 避免被 overflow 裁切
    document.body.appendChild(handbagContainer);
  } else {
    // 關閉時：精準插在按鈕群 (btnGroup) 的前面
    if (scrollContent && btnGroup) {
      scrollContent.insertBefore(handbagContainer, btnGroup);
    }
  }
}

// 點擊空白處關閉並歸位
document.addEventListener('click', (e) => {
  const handbagIcon = document.getElementById('handbagMinIcon');
  const handbagContainer = document.getElementById('mainBag');
  const scrollContent = document.querySelector('.sidebar_scroll_content');
  const btnGroup = document.getElementById('btnGroup');

  if (handbagContainer && handbagIcon && handbagContainer.classList.contains('active')) {
    if (!handbagContainer.contains(e.target) && !handbagIcon.contains(e.target)) {
      handbagContainer.classList.remove('active');
      // 精準歸位到按鈕群前方
      if (scrollContent && btnGroup) {
        scrollContent.insertBefore(handbagContainer, btnGroup);
      }
    }
  }
});
























