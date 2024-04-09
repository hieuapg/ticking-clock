document.addEventListener('DOMContentLoaded', function() {
    var clockElement = document.getElementById('clock');
    var timezoneElement = document.getElementById('timezone');
    var dateTimeElement = document.getElementById('date-and-time');
    var timezoneSelect = document.getElementById('timezone-select');
    var applyTimezoneButton = document.getElementById('apply-timezone');

    // Define the initial time zone
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Default timezone

    function updateTime() {
        // Get the current date and time in the specified time zone
        var currentTime = new Date();
        var formatter = new Intl.DateTimeFormat("en-US", {
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: timeZone
        });
    
        // Format the time
        var formattedTime = formatter.format(currentTime);
        
        // Replace "24" with "00" for midnight
        if (formattedTime.startsWith('24')) {
            formattedTime = '00' + formattedTime.slice(2);
        }
    
        clockElement.textContent = formattedTime;
    
        // Format the date as "Monday, 1 May, 2023"
        var options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            timeZone: timeZone 
        };
        var formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(currentTime);
        dateTimeElement.textContent = formattedDateTime;
    }
    

    // Function to handle timezone change
    function handleTimezoneChange() {
        timeZone = timezoneSelect.value;
        updateTime();
        // Update the displayed timezone accordingly
        timezoneElement.textContent = timeZone; // Display the timezone name
        // Close the modal after applying the timezone
        closeModal();
    }

    // Set the timezone element to display the default timezone
    timezoneElement.textContent = timeZone;

    // Open the modal
    function openModal() {
        var modal = document.getElementById('myModal');
        modal.style.display = 'block';
    }

    // Close the modal
    function closeModal() {
        var modal = document.getElementById('myModal');
        modal.style.display = 'none';
    }

    updateTime(); // Call once to avoid delay
    setInterval(updateTime, 1000); // Update every second

    // Event listener for applying timezone from dropdown
    applyTimezoneButton.addEventListener('click', handleTimezoneChange);

    // Event listener for opening modal
    var settingsButton = document.getElementById('settings-button');
    settingsButton.addEventListener('click', openModal);

    // Event listener for closing modal
    var closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', closeModal);

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        var modal = document.getElementById('myModal');
        if (event.target == modal) {
            closeModal();
        }
    });
});
