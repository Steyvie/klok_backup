// Function to update time and date
function updateTime() {
  const now = new Date();

  // Format time without seconds
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const timeString = now.toLocaleTimeString("nl-NL", timeOptions);
  document.getElementById("time").textContent = timeString;

  // Format date in Dutch
  const dateOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const dateString = now.toLocaleDateString("nl-NL", dateOptions);
  document.getElementById("date").textContent = dateString;
}

// Function to fetch agenda from GitHub
// In script.js
async function fetchAgenda() {
  const username = "steyvie"; // lowercase exactly as in URL
  const repo = "klok"; // exactly as in URL
  const url = `https://raw.githubusercontent.com/${username}/${repo}/main/agenda.txt?t=${Date.now()}`;

  console.log("Fetching:", url); // Check this in browser console

  try {
    const response = await fetch(url);
    console.log("Status:", response.status);

    if (response.ok) {
      const text = await response.text();
      document.getElementById("agenda").textContent = text || "Agenda is leeg";
    } else {
      document.getElementById("agenda").textContent =
        `Fout: ${response.status}`;
    }
  } catch (error) {
    console.error(error);
    document.getElementById("agenda").textContent = "Netwerkfout";
  }
}

// Update time immediately and then every minute
updateTime();
setInterval(updateTime, 60000);

// Fetch agenda immediately and then every second
fetchAgenda();
setInterval(fetchAgenda, 60000);
