(function ($, window, document, undefined) {
  'use strict';

  openRolesInit();

  function openRolesInit() {
    const API_URL = 'https://api.lever.co/v0/postings/aeratechnology?&mode=json';
    const filtersWrapperEl = document.querySelector('#open-roles-form');
    const positionsWrapperEl = document.querySelector('#open-roles-positions');
    const teamsSelectEl = document.querySelector('#open-roles-select-teams');
    const countriesSelectEl = document.querySelector('#open-roles-select-countries');

    const getPositions = (url) => {
      fetch(url)
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          const positionData = data;

          if (positionData.length) {
            positionsWrapperEl.innerHTML = '';

            let positionsResult = data;
            let selectState = {
              teamFilter: 'All teams',
              locationFilter: 'All locations',
            };
            let fullCountryArr = [];
            const teamsArr = [];
            const locationsArr = [];

            positionsResult.forEach(({ categories: { location, team } }) => {
              if (!locationsArr.includes(location)) {
                locationsArr.push(location);
                locationsArr.sort();
              }

              if (!teamsArr.includes(team)) {
                teamsArr.push(team);
              }
            });

            locationsArr.map((item) => {
              let itemArray = item.split(',');
              itemArray = itemArray.map((innerItem) => innerItem.trim());
              fullCountryArr.push(itemArray[itemArray.length - 1]);
            });

            let CountryObject = fullCountryArr.reduce((obj, v) => {
              obj[v] = [];
              return obj;
            }, {});

            locationsArr.map((item) => {
              let itemArray = item.split(',');
              itemArray = itemArray.map((innerItem) => innerItem.trim());

              let cityLocation = itemArray.splice(0, itemArray.length - 1);
              CountryObject[itemArray[itemArray.length - 1]].push(cityLocation.join(', '));
            });

            let jobsFiltered = positionsResult;
            if (selectState.teamFilter !== 'All teams') {
              jobsFiltered = jobsFiltered.filter(
                (job) => job.categories.team === selectState.teamFilter
              );
            }

            if (Array.isArray(selectState.locationFilter)) {
              jobsFiltered = selectState.locationFilter.map((item, index) => {
                return jobsFiltered.filter((x) => {
                  return x.categories.location === selectState.locationFilter[index];
                });
              });

              jobsFiltered = jobsFiltered.flat();
            } else if (selectState.locationFilter !== 'All locations') {
              jobsFiltered = jobsFiltered.filter(
                (job) => job.categories.location === selectState.locationFilter
              );
            }

            if (teamsArr.length) {
              teamsArr.sort();

              teamsArr.forEach((teamOption) => {
                const optionElement = document.createElement('option');
                optionElement.setAttribute('value', teamOption);
                optionElement.innerText = teamOption;

                teamsSelectEl.appendChild(optionElement);
              });
            }

            if (Object.keys(CountryObject).length) {
              Object.keys(CountryObject).forEach((country) => {
                const optionElement = document.createElement('option');
                optionElement.setAttribute('value', country);
                optionElement.innerText = country;

                countriesSelectEl.appendChild(optionElement);
              });
            }

            // Show Positions
            positionData.forEach((position) => {
              const {
                categories: { commitment, team, location },
                hostedUrl,
                text,
              } = position;

              positionsWrapperEl.innerHTML += `
                <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                  <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                    <div class="aera-open-roles__bottom-position__content">
                      <div class="aera-open-roles__bottom-position__content-left">
                        <div>
                          <p class="aera-open-roles__bottom-position__name text">${text}</p>
                          <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                        </div>
                      </div>
                      <div class="aera-open-roles__bottom-position__content-right">
                        <p class="aera-open-roles__bottom-position__address text">${location}</p>
                      </div>
                    </div>
                  </a>
                </li>
              `;
            });

            // Filter Positions
            if (teamsSelectEl !== null) {
              teamsSelectEl.addEventListener('change', () => {
                let countriesSelectValue = countriesSelectEl.value;

                const positionsArr = document.querySelectorAll(
                  '.aera-open-roles__bottom-position__wrapper'
                );

                positionsArr.forEach((position) => {
                  position.remove();
                });

                showPosts(false, teamsSelectEl.value, countriesSelectValue, false, true);

                setTimeout(() => {
                  let posts = document.querySelectorAll(
                    '.aera-open-roles__bottom-position__wrapper'
                  );
                  if (!posts.length) {
                    positionsWrapperEl.innerHTML =
                      '<p class="no-positions text">No job postings match these filters</p>';
                  }
                }, 200);
              });
            }

            if (countriesSelectEl !== null) {
              countriesSelectEl.addEventListener('change', () => {
                let teamsSelectValue = teamsSelectEl.value;
                const positionsArr = document.querySelectorAll(
                  '.aera-open-roles__bottom-position__wrapper'
                );

                // SubSelect
                const countryKeys = Object.keys(CountryObject);
                if (countriesSelectEl.value !== 'All countries' && countryKeys.length) {
                  if (document.querySelector('#open-roles-select-city') !== null) {
                    document.querySelector('#open-roles-select-city').remove();
                  }
                  // Create SubSelect
                  const subCountriesSelectEl = document.createElement('select');
                  subCountriesSelectEl.classList.add('aera-open-roles__top-form__select');
                  subCountriesSelectEl.classList.add('subcountries-select');
                  const optionElement = document.createElement('option');
                  optionElement.setAttribute('value', 'All cities');
                  optionElement.innerText = 'All cities';
                  subCountriesSelectEl.appendChild(optionElement);

                  countryKeys.forEach((country) => {
                    if (countriesSelectEl.value === country) {
                      if (CountryObject[country].length) {
                        CountryObject[country].forEach((city) => {
                          const optionElement = document.createElement('option');
                          optionElement.setAttribute('value', city);
                          optionElement.innerText = city;

                          subCountriesSelectEl.appendChild(optionElement);
                        });
                      }
                    }
                  });

                  const subCountriesHtmlMainWrapper = document.createElement('div');
                  subCountriesHtmlMainWrapper.classList.add('aera-open-roles__top-form__block');
                  subCountriesHtmlMainWrapper.setAttribute('id', 'open-roles-select-city');
                  const subCountriesHtmlWrapper = document.createElement('div');
                  subCountriesHtmlWrapper.classList.add('aera-open-roles__top-form__block-wrapper');
                  subCountriesHtmlWrapper.appendChild(subCountriesSelectEl);
                  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                  svgElement.setAttribute('height', '7');
                  svgElement.setAttribute('width', '12');
                  const pathSvgElement = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'path'
                  );
                  pathSvgElement.setAttribute('d', 'M12 .84l-.69-.69L6 5.46.7.15 0 .84l6 6z');
                  pathSvgElement.setAttribute('fill', '#1a1a1a');
                  svgElement.appendChild(pathSvgElement);
                  subCountriesHtmlWrapper.appendChild(svgElement);
                  subCountriesHtmlMainWrapper.appendChild(subCountriesHtmlWrapper);

                  filtersWrapperEl.appendChild(subCountriesHtmlMainWrapper);

                  subCountriesSelectEl.addEventListener('change', () => {
                    positionsWrapperEl.innerHTML = '';

                    positionData.forEach((position) => {
                      const {
                        categories: { commitment, team, location },
                        hostedUrl,
                        text,
                      } = position;

                      if (
                        location.includes(countriesSelectEl.value) &&
                        location.includes(subCountriesSelectEl.value) &&
                        teamsSelectEl.value === 'All teams' &&
                        teamsSelectEl.value !== team
                      ) {
                        positionsWrapperEl.innerHTML += `
                            <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                              <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                                <div class="aera-open-roles__bottom-position__content">
                                  <div class="aera-open-roles__bottom-position__content-left">
                                    <div>
                                      <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                      <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                    </div>
                                  </div>
                                  <div class="aera-open-roles__bottom-position__content-right">
                                    <p class="aera-open-roles__bottom-position__address text">${location}</p>
                                  </div>
                                </div>
                              </a>
                            </li>
                          `;
                      }

                      if (
                        subCountriesSelectEl.value === 'All cities' &&
                        location.includes(countriesSelectEl.value) &&
                        teamsSelectEl.value === 'All teams'
                      ) {
                        positionsWrapperEl.innerHTML += `
                            <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                              <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                                <div class="aera-open-roles__bottom-position__content">
                                  <div class="aera-open-roles__bottom-position__content-left">
                                    <div>
                                      <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                      <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                    </div>
                                  </div>
                                  <div class="aera-open-roles__bottom-position__content-right">
                                    <p class="aera-open-roles__bottom-position__address text">${location}</p>
                                  </div>
                                </div>
                              </a>
                            </li>
                          `;
                      }

                      if (
                        subCountriesSelectEl.value === 'All cities' &&
                        location.includes(countriesSelectEl.value) &&
                        teamsSelectEl.value === team
                      ) {
                        positionsWrapperEl.innerHTML += `
                              <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                                <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                                  <div class="aera-open-roles__bottom-position__content">
                                    <div class="aera-open-roles__bottom-position__content-left">
                                      <div>
                                        <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                        <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                      </div>
                                    </div>
                                    <div class="aera-open-roles__bottom-position__content-right">
                                      <p class="aera-open-roles__bottom-position__address text">${location}</p>
                                    </div>
                                  </div>
                                </a>
                              </li>
                            `;
                      }

                      if (
                        subCountriesSelectEl.value !== 'All cities' &&
                        location.includes(subCountriesSelectEl.value) &&
                        teamsSelectEl.value === team
                      ) {
                        positionsWrapperEl.innerHTML += `
                              <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                                <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                                  <div class="aera-open-roles__bottom-position__content">
                                    <div class="aera-open-roles__bottom-position__content-left">
                                      <div>
                                        <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                        <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                      </div>
                                    </div>
                                    <div class="aera-open-roles__bottom-position__content-right">
                                      <p class="aera-open-roles__bottom-position__address text">${location}</p>
                                    </div>
                                  </div>
                                </a>
                              </li>
                            `;
                      }

                      setTimeout(() => {
                        let posts = document.querySelectorAll(
                          '.aera-open-roles__bottom-position__wrapper'
                        );
                        if (!posts.length) {
                          positionsWrapperEl.innerHTML =
                            '<p class="no-positions text">No job postings match these filters</p>';
                        }
                      }, 200);
                    });
                  });
                } else {
                  if (document.querySelector('#open-roles-select-city') !== null) {
                    document.querySelector('#open-roles-select-city').remove();
                  }
                }

                // Filtering
                positionsArr.forEach((position) => {
                  position.remove();
                });

                showPosts(false, teamsSelectValue, countriesSelectEl.value, true, false);

                setTimeout(() => {
                  let posts = document.querySelectorAll(
                    '.aera-open-roles__bottom-position__wrapper'
                  );
                  if (!posts.length) {
                    positionsWrapperEl.innerHTML =
                      '<p class="no-positions text">No job postings match these filters</p>';
                  }
                }, 200);
              });
            }

            function showPosts(
              showWithoutFilters = false,
              filterTeam,
              filterLocations,
              useFilterTeam,
              usefilterLocations
            ) {
              positionsWrapperEl.innerHTML = '';
              const subCountriesSelect = document.querySelector('.subcountries-select');

              positionData.forEach((position) => {
                const {
                  categories: { commitment, team, location },
                  hostedUrl,
                  text,
                } = position;

                if (filterTeam && usefilterLocations) {
                  if (filterTeam === team) {
                    if (subCountriesSelect == null) {
                      if (
                        location.includes(filterLocations) &&
                        filterLocations !== 'All countries'
                      ) {
                        positionsWrapperEl.innerHTML += `
                          <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                            <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                              <div class="aera-open-roles__bottom-position__content">
                                <div class="aera-open-roles__bottom-position__content-left">
                                  <div>
                                    <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                    <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                  </div>
                                </div>
                                <div class="aera-open-roles__bottom-position__content-right">
                                  <p class="aera-open-roles__bottom-position__address text">${location}</p>
                                </div>
                              </div>
                            </a>
                          </li>
                        `;
                      }
                    } else {
                      if (
                        location.includes(filterLocations) &&
                        filterLocations !== 'All countries' &&
                        location.includes(subCountriesSelect.value)
                      ) {
                        positionsWrapperEl.innerHTML += `
                          <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                            <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                              <div class="aera-open-roles__bottom-position__content">
                                <div class="aera-open-roles__bottom-position__content-left">
                                  <div>
                                    <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                    <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                  </div>
                                </div>
                                <div class="aera-open-roles__bottom-position__content-right">
                                  <p class="aera-open-roles__bottom-position__address text">${location}</p>
                                </div>
                              </div>
                            </a>
                          </li>
                        `;
                      } else if (
                        location.includes(filterLocations) &&
                        filterLocations !== 'All countries' &&
                        subCountriesSelect.value === 'All cities'
                      ) {
                        positionsWrapperEl.innerHTML += `
                        <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                          <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                            <div class="aera-open-roles__bottom-position__content">
                              <div class="aera-open-roles__bottom-position__content-left">
                                <div>
                                  <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                  <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                </div>
                              </div>
                              <div class="aera-open-roles__bottom-position__content-right">
                                <p class="aera-open-roles__bottom-position__address text">${location}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      `;
                      }
                    }

                    if (
                      !location.includes(filterLocations) &&
                      filterLocations === 'All countries'
                    ) {
                      positionsWrapperEl.innerHTML += `
                        <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                          <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                            <div class="aera-open-roles__bottom-position__content">
                              <div class="aera-open-roles__bottom-position__content-left">
                                <div>
                                  <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                  <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                </div>
                              </div>
                              <div class="aera-open-roles__bottom-position__content-right">
                                <p class="aera-open-roles__bottom-position__address text">${location}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      `;
                    }
                  }

                  if (filterTeam === 'All teams') {
                    if (subCountriesSelect !== null) {
                      if (
                        location.includes(filterLocations) &&
                        location.includes(subCountriesSelect.value) &&
                        subCountriesSelect.value !== 'All cities' &&
                        filterLocations !== 'All countries'
                      ) {
                        positionsWrapperEl.innerHTML += `
                        <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                          <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                            <div class="aera-open-roles__bottom-position__content">
                              <div class="aera-open-roles__bottom-position__content-left">
                                <div>
                                  <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                  <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                </div>
                              </div>
                              <div class="aera-open-roles__bottom-position__content-right">
                                <p class="aera-open-roles__bottom-position__address text">${location}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      `;
                      } else if (
                        location.includes(filterLocations) &&
                        subCountriesSelect.value === 'All cities' &&
                        filterLocations !== 'All countries'
                      ) {
                        positionsWrapperEl.innerHTML += `
                        <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                          <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                            <div class="aera-open-roles__bottom-position__content">
                              <div class="aera-open-roles__bottom-position__content-left">
                                <div>
                                  <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                  <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                </div>
                              </div>
                              <div class="aera-open-roles__bottom-position__content-right">
                                <p class="aera-open-roles__bottom-position__address text">${location}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      `;
                      }
                    } else {
                      if (
                        location.includes(filterLocations) &&
                        subCountriesSelect.value === 'All cities' &&
                        filterLocations !== 'All countries'
                      ) {
                        positionsWrapperEl.innerHTML += `
                        <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                          <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                            <div class="aera-open-roles__bottom-position__content">
                              <div class="aera-open-roles__bottom-position__content-left">
                                <div>
                                  <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                  <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                </div>
                              </div>
                              <div class="aera-open-roles__bottom-position__content-right">
                                <p class="aera-open-roles__bottom-position__address text">${location}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      `;
                      }
                    }

                    if (
                      !location.includes(filterLocations) &&
                      filterLocations === 'All countries'
                    ) {
                      positionsWrapperEl.innerHTML += `
                        <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                          <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                            <div class="aera-open-roles__bottom-position__content">
                              <div class="aera-open-roles__bottom-position__content-left">
                                <div>
                                  <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                  <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                </div>
                              </div>
                              <div class="aera-open-roles__bottom-position__content-right">
                                <p class="aera-open-roles__bottom-position__address text">${location}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      `;
                    }
                  }
                }

                if (filterLocations && useFilterTeam) {
                  if (
                    location.includes(filterLocations) &&
                    filterTeam === 'All teams' &&
                    filterTeam !== team
                  ) {
                    positionsWrapperEl.innerHTML += `
                        <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                          <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                            <div class="aera-open-roles__bottom-position__content">
                              <div class="aera-open-roles__bottom-position__content-left">
                                <div>
                                  <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                  <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                </div>
                              </div>
                              <div class="aera-open-roles__bottom-position__content-right">
                                <p class="aera-open-roles__bottom-position__address text">${location}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      `;
                  }

                  if (location.includes(filterLocations) && filterTeam === team) {
                    positionsWrapperEl.innerHTML += `
                        <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                          <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                            <div class="aera-open-roles__bottom-position__content">
                              <div class="aera-open-roles__bottom-position__content-left">
                                <div>
                                  <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                  <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                </div>
                              </div>
                              <div class="aera-open-roles__bottom-position__content-right">
                                <p class="aera-open-roles__bottom-position__address text">${location}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      `;
                  }

                  if (filterLocations === 'All countries' && filterTeam === 'All teams') {
                    positionsWrapperEl.innerHTML += `
                        <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                          <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                            <div class="aera-open-roles__bottom-position__content">
                              <div class="aera-open-roles__bottom-position__content-left">
                                <div>
                                  <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                  <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                </div>
                              </div>
                              <div class="aera-open-roles__bottom-position__content-right">
                                <p class="aera-open-roles__bottom-position__address text">${location}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      `;
                  }

                  if (filterLocations === 'All countries' && filterTeam === team) {
                    positionsWrapperEl.innerHTML += `
                        <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                          <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                            <div class="aera-open-roles__bottom-position__content">
                              <div class="aera-open-roles__bottom-position__content-left">
                                <div>
                                  <p class="aera-open-roles__bottom-position__name text">${text}</p>
                                  <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                                </div>
                              </div>
                              <div class="aera-open-roles__bottom-position__content-right">
                                <p class="aera-open-roles__bottom-position__address text">${location}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      `;
                  }
                }

                if (showWithoutFilters) {
                  positionsWrapperEl.innerHTML += `
                    <li class="aera-open-roles__bottom-position__wrapper" data-teams="${team}" data-location="${location}">
                      <a class="aera-open-roles__bottom-position" href="${hostedUrl}" target="_blank" rel="noopener noreferrer">
                        <div class="aera-open-roles__bottom-position__content">
                          <div class="aera-open-roles__bottom-position__content-left">
                            <div>
                              <p class="aera-open-roles__bottom-position__name text">${text}</p>
                              <p class="aera-open-roles__bottom-position__department">${team}, ${commitment}</p>
                            </div>
                          </div>
                          <div class="aera-open-roles__bottom-position__content-right">
                            <p class="aera-open-roles__bottom-position__address text">${location}</p>
                          </div>
                        </div>
                      </a>
                    </li>
                  `;
                }
              });
            }
          }
        })
        .catch((error) => console.log(error));
    };

    getPositions(API_URL);

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    }
  }
})(jQuery, window, document);
