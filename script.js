document.addEventListener('DOMContentLoaded', function() {
    var clockElement = document.getElementById('clock');
    var timezoneElement = document.getElementById('timezone');
    var dateTimeElement = document.getElementById('date-and-time');
    var timezoneSelect = document.getElementById('timezone-select');
    var applyTimezoneButton = document.getElementById('apply-timezone');

    // Define the initial time zone
    var timeZone = "America/New_York"; // Default timezone

    function updateTime() {
        // Get the current date and time in the specified time zone
        var currentTime = new Date();
        var formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: timeZone,
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        // Format the time
        var formattedTime = formatter.format(currentTime);
        clockElement.textContent = formattedTime;

        // Get the actual timezone offset in minutes
        var timezoneOffsetMinutes = currentTime.getTimezoneOffset(); // Note: no need to invert the sign here
        
        // Display timezone with UTC offset
        var timezoneOffsetHours = Math.abs(Math.floor(timezoneOffsetMinutes / 60));
        var timezoneOffsetMinutesPart = Math.abs(timezoneOffsetMinutes % 60);
        var sign = timezoneOffsetMinutes < 0 ? '+' : '-';
        var timezoneOffset = sign + timezoneOffsetHours.toString().padStart(2, '0') + ':' + timezoneOffsetMinutesPart.toString().padStart(2, '0');
        var timezone = timeZone + " (UTC " + timezoneOffset + ")";
        timezoneElement.textContent = timezone;

        // Format the date as "Monday, 1 May, 2023"
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(currentTime);
        dateTimeElement.textContent = formattedDateTime;
    }

    // Function to handle timezone change
    function handleTimezoneChange() {
        timeZone = timezoneSelect.value;
        updateTime();
        // Update the displayed timezone offset accordingly
        var currentTime = new Date();
        var newTimezoneOffsetMinutes = currentTime.getTimezoneOffset();
        var timezoneOffsetHours = Math.abs(Math.floor(newTimezoneOffsetMinutes / 60));
        var timezoneOffsetMinutesPart = Math.abs(newTimezoneOffsetMinutes % 60);
        var sign = newTimezoneOffsetMinutes < 0 ? '+' : '-';
        var timezoneOffset = sign + timezoneOffsetHours.toString().padStart(2, '0') + ':' + timezoneOffsetMinutesPart.toString().padStart(2, '0');
        var newTimezone = timeZone + " (UTC " + timezoneOffset + ")";
        timezoneElement.textContent = newTimezone;
        // Close the modal after applying the timezone
        closeModal();
    }

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
