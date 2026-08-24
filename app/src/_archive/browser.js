// Open native connection channel to the backend route
const eventSource = new EventSource('http://localhost:3000/events');

// Catch generic messages (lines omitting an "event:" parameter)
eventSource.onmessage = (event) => {
  const parsedData = JSON.parse(event.data);
  console.log('New broad update received:', parsedData);
};

// Catch custom targeted events if you included "event: event.data.*\n"
// const { sab, totalSlots, constantC, base60, B } = event.data

eventSource.addEventListener('sab', (event) => {
  console.log('sab event:', event.data);
});

eventSource.addEventListener('totalSlots', (event) => {
  console.log('totalSlots event:', event.data);
});

eventSource.addEventListener('base60', (event) => {
  console.log('base60 event:', event.data);
});

eventSource.addEventListener('constantC', (event) => {
  console.log('constantC event:', event.data);
});

eventSource.addEventListener('B', (event) => {
  console.log('B event:', event.data);
});

// Handle auto-reconnections or service failures
eventSource.onerror = (error) => {
  console.error('SSE Stream Error:', error);
  alert(constantC);
};
