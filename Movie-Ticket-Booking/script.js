const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const lowerSectionBtn = document.getElementById('lowerSectionBtn');
const balconySectionBtn = document.getElementById('balconySectionBtn');
const lowerSeating = document.getElementById('lower-seating');
const balconySeating = document.getElementById('balcony-seating');
const lowerSection = document.getElementById('lowerSection');
const balconySection = document.getElementById('balconySection');

let ticketPrice = +movieSelect.value; // Get the movie ticket price
const occupiedSeatsCount = 19; // Number of occupied seats to be marked

// Create seating layout for Balcony and Lower Sections
function createSeating(container, rows, seatsPerRow) {
  container.innerHTML = ''; // Clear existing layout

  const seatElements = [];
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < seatsPerRow; j++) {
      const seat = document.createElement('div');
      seat.classList.add('seat');
      row.appendChild(seat);
      seatElements.push(seat); // Collect seat elements for random occupation
    }
    container.appendChild(row);
  }
  
  return seatElements; // Return all the seat elements to be used for marking as occupied
}

// Randomly mark some seats as occupied
function markOccupiedSeats(seatElements) {
  const totalSeats = seatElements.length;
  const occupiedSeats = new Set();

  while (occupiedSeats.size < occupiedSeatsCount) {
    const randomIndex = Math.floor(Math.random() * totalSeats);
    if (!occupiedSeats.has(randomIndex)) {
      seatElements[randomIndex].classList.add('occupied');
      occupiedSeats.add(randomIndex);
    }
  }
}

// Initialize seating for Lower and Balcony Sections with random occupied seats
function initSeating() {
  const lowerSeats = createSeating(lowerSeating, 20, 25);  // 500 seats (20 rows, 25 seats per row)
  const balconySeats = createSeating(balconySeating, 10, 20);  // 200 seats (10 rows, 20 seats per row)

  markOccupiedSeats([...lowerSeats, ...balconySeats]);  // Mark 19 seats as occupied randomly across both sections
}

// Update seat count and total price
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie selection change
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value; // Update the ticket price based on selected movie
  updateSelectedCount(); // Recalculate total cost
});

// Handle seat selection
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Toggle between Balcony and Lower Section
lowerSectionBtn.addEventListener('click', () => {
  lowerSection.style.display = 'block';
  balconySection.style.display = 'none';
  lowerSectionBtn.classList.add('active');
  balconySectionBtn.classList.remove('active');
});

balconySectionBtn.addEventListener('click', () => {
  lowerSection.style.display = 'none';
  balconySection.style.display = 'block';
  lowerSectionBtn.classList.remove('active');
  balconySectionBtn.classList.add('active');
});

// On page load
initSeating(); // Initialize seating and randomly mark occupied seats
updateSelectedCount(); // Set initial counts
