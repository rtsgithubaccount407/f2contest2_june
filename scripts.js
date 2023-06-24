// Function to fetch data using .then
function fetchDataWithThen() {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            renderTable(data);
            attachEventListeners();
        })
        .catch(error => console.log(error));
}

// Function to render table with data
function renderTable(data) {
    const tableBody = document.getElementById('table-body');

    // Clear previous table data
    tableBody.innerHTML = '';

    // Iterate over each object in the data array
    data.forEach(coin => {
        const { image, id, symbol, current_price, total_volume, price_change_percentage_24h, market_cap } = coin;

        // Create a new table row
        const row = document.createElement('tr');

        // Create table cells and populate them with data
        const imageCell = document.createElement('td');
        const imageElement = document.createElement('img');
        imageElement.src = image;
        imageElement.alt = symbol;
        imageElement.classList.add('coin-image');
        imageCell.appendChild(imageElement);

        const idCell = document.createElement('td');
        idCell.textContent = id;

        const symbolCell = document.createElement('td');
        symbolCell.textContent = symbol;

        const priceCell = document.createElement('td');
        priceCell.textContent = current_price;

        const volumeCell = document.createElement('td');
        volumeCell.textContent = total_volume;

        const percentageChangeCell = document.createElement('td');
        percentageChangeCell.textContent = `${price_change_percentage_24h}%`;

        const marketCapCell = document.createElement('td');
        marketCapCell.textContent = market_cap;

        // Append table cells to the row
        row.appendChild(imageCell);
        row.appendChild(idCell);
        row.appendChild(symbolCell);
        row.appendChild(priceCell);
        row.appendChild(volumeCell);
        row.appendChild(percentageChangeCell);
        row.appendChild(marketCapCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

// Function to handle search
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value.toLowerCase();

    // Filter the data based on the search text
    const filteredData = data.filter(coin => {
        const name = coin.name.toLowerCase();
        const symbol = coin.symbol.toLowerCase();
        return name.includes(searchText) || symbol.includes(searchText);
    });

    renderTable(filteredData);
}

// Function to sort by market cap
function sortByMarketCap() {
    const sortedData = [...data].sort((a, b) => a.market_cap - b.market_cap);
    renderTable(sortedData);
}

// Function to sort by percentage change
function sortByPercentageChange() {
    const sortedData = [...data].sort((a, b) => a.price_change_percentage - b.price_change_percentage);
    renderTable(sortedData);
}

// Function to attach event listeners
function attachEventListeners() {
    // Attach event listener to search button
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', handleSearch);

    // Attach event listeners to sorting buttons
    const sortMarketCapButton = document.getElementById('sort-market-cap');
    sortMarketCapButton.addEventListener('click', sortByMarketCap);

    const sortPercentageChangeButton = document.getElementById('sort-percentage-change');
    sortPercentageChangeButton.addEventListener('click', sortByPercentageChange);
}

// Fetch data using .then method
fetchDataWithThen();