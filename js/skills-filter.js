/**
 * Skills Archive - Client-Side Filtering
 * - Multi-checkbox filter by selected skills (IDs)
 * - Search input filters by title/excerpt
 * - Updates URL params via History API without reload
 * - Progressive enhancement: if JS disabled, server-side still works
 */
(function(){
  'use strict';

  const CONFIG = {
    checkboxSelector: '.skills-filter__checkbox',
    searchInputSelector: '.skills-filter__search-input',
    itemsSelector: '.skills-grid__list .icon-card',
    itemIdAttr: 'data-skill-id',
    fadeInDuration: 300,
    fadeOutDuration: 250,
    urlSkillParam: 'skills[]',
    urlSearchParam: 'skill_search'
  };

  let checkboxes = [];
  let searchInput = null;
  let items = [];

  function init(){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup);
    } else {
      setup();
    }
  }

  function setup(){
    checkboxes = Array.from(document.querySelectorAll(CONFIG.checkboxSelector));
    searchInput = document.querySelector(CONFIG.searchInputSelector);
    items = Array.from(document.querySelectorAll(CONFIG.itemsSelector));

    if (!items.length) return;

    // Initial filter from URL
    const initial = getStateFromURL();
    applyFilter(initial.selectedIds, initial.searchTerm, false);

    // Intercept form submits
    const filterForm = document.getElementById('skillsFilterForm');
    const searchForm = document.getElementById('skillsSearchForm');
    if (filterForm) {
      filterForm.addEventListener('submit', function(e){ e.preventDefault(); });
    }
    if (searchForm) {
      searchForm.addEventListener('submit', function(e){ e.preventDefault(); });
    }

    // Checkbox change -> filter
    checkboxes.forEach(cb => {
      cb.addEventListener('change', onControlsChange);
    });

    // Search input -> debounce filter
    if (searchInput) {
      let debounceTimer = null;
      searchInput.addEventListener('input', function(){
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(onControlsChange, 200);
      });
    }

    // Back/forward
    window.addEventListener('popstate', function(){
      const state = getStateFromURL();
      setControlsFromState(state);
      applyFilter(state.selectedIds, state.searchTerm, false);
    });
  }

  function onControlsChange(){
    const selectedIds = getSelectedIdsFromControls();
    const searchTerm = getSearchTermFromControls();
    applyFilter(selectedIds, searchTerm, true);
  }

  function getSelectedIdsFromControls(){
    return checkboxes.filter(cb => cb.checked).map(cb => parseInt(cb.value, 10)).filter(n => !Number.isNaN(n));
  }

  function getSearchTermFromControls(){
    return (searchInput && searchInput.value ? searchInput.value.trim() : '');
  }

  function setControlsFromState(state){
    // Update checkboxes
    const idSet = new Set(state.selectedIds);
    checkboxes.forEach(cb => { cb.checked = idSet.has(parseInt(cb.value,10)); });
    // Update search
    if (searchInput) searchInput.value = state.searchTerm || '';
  }

  function getStateFromURL(){
    const url = new URL(window.location.href);
    const params = url.searchParams;
    // skill[] can be multiple entries
    // Read primary (skills[]) and legacy (skill[]) for robustness
    let rawSkills = params.getAll(CONFIG.urlSkillParam);
    if (!rawSkills.length) {
      rawSkills = params.getAll('skill[]');
    }
    const selectedIds = rawSkills.map(v => parseInt(v,10)).filter(n => !Number.isNaN(n));
    const searchTerm = params.get(CONFIG.urlSearchParam) || '';
    return { selectedIds, searchTerm };
  }

  function updateURL(selectedIds, searchTerm){
    const url = new URL(window.location.href);
    const params = url.searchParams;

    // Clear existing skill[] params
    // URLSearchParams doesn't expose deleteAll for same key; rebuild
    params.forEach((value, key) => {
      if (key === CONFIG.urlSkillParam || key === 'skill[]') {
        params.delete(key);
      }
    });

    // Append selected ids as skill[]
    selectedIds.forEach(id => params.append(CONFIG.urlSkillParam, String(id)));

    // Search term
    if (searchTerm && searchTerm.length) {
      params.set(CONFIG.urlSearchParam, searchTerm);
    } else {
      params.delete(CONFIG.urlSearchParam);
    }

    window.history.pushState({ skills: selectedIds, search: searchTerm }, '', url.toString());
  }

  function applyFilter(selectedIds, searchTerm, updateHistory){
    if (updateHistory) updateURL(selectedIds, searchTerm);

    const idSet = new Set(selectedIds);
    const hasIdFilter = selectedIds && selectedIds.length > 0;
    const hasSearch = !!(searchTerm && searchTerm.length);
    const searchLower = hasSearch ? searchTerm.toLowerCase() : '';

    items.forEach(item => {
      const itemId = parseInt(item.getAttribute(CONFIG.itemIdAttr), 10);
      let matchesId = true;
      if (hasIdFilter) {
        matchesId = idSet.has(itemId);
      }

      let matchesSearch = true;
      if (hasSearch) {
        const titleEl = item.querySelector('.icon-card__title');
        const excerptEl = item.querySelector('.icon-card__excerpt');
        const text = ((titleEl ? titleEl.textContent : '') + ' ' + (excerptEl ? excerptEl.textContent : '')).toLowerCase();
        matchesSearch = text.indexOf(searchLower) !== -1;
      }

      const shouldShow = matchesId && matchesSearch;
      if (shouldShow) {
        fadeIn(item);
      } else {
        fadeOut(item);
      }
    });
  }

  function fadeIn(el){
    if (el.style.display !== 'none' && el.style.opacity === '1') return;
    el.style.display = '';
    el.style.opacity = '0';
    el.offsetHeight;
    el.style.transition = 'opacity '+CONFIG.fadeInDuration+'ms ease-in-out';
    el.style.opacity = '1';
  }

  function fadeOut(el){
    if (el.style.display === 'none') return;
    el.style.transition = 'opacity '+CONFIG.fadeOutDuration+'ms ease-in-out';
    el.style.opacity = '0';
    setTimeout(function(){ el.style.display = 'none'; }, CONFIG.fadeOutDuration);
  }

  init();
})();