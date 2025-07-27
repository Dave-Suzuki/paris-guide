document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const regionFilter = document.getElementById('regionFilter');
  const resultsContainer = document.getElementById('results');

  const categoryLabels = {
    gourmet: 'グルメ',
    kitchen: 'キッチン用品',
    zakka: '雑貨'
  };

  function renderItems(items) {
    resultsContainer.innerHTML = '';
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'card';
      el.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>カテゴリ:</strong> ${categoryLabels[item.category] || item.category}</p>
        <p><strong>地区:</strong> ${item.arrondissement}区</p>
        <p>${item.description}</p>
        ${item.url ? `<a href="${item.url}" target="_blank">公式サイトへ</a>` : ''}
      `;
      resultsContainer.appendChild(el);
    });
  }

  function filterAndRender() {
    const query = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const region = regionFilter.value;

    const filtered = window.data.filter(item => {
      const matchQuery = !query || item.name.toLowerCase().includes(query) || (item.description && item.description.toLowerCase().includes(query));
      const matchCategory = !category || item.category === category;
      const matchRegion = !region || item.arrondissement === parseInt(region);
      return matchQuery && matchCategory && matchRegion;
    });

    renderItems(filtered);
  }

  searchInput.addEventListener('input', filterAndRender);
  categoryFilter.addEventListener('change', filterAndRender);
  regionFilter.addEventListener('change', filterAndRender);

  renderItems(window.data);
});
