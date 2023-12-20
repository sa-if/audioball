// Get the microphone stream
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
.then(function(stream) {
    // Create an audio context
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create a media stream source
    var source = audioContext.createMediaStreamSource(stream);
    
    // Create an analyser node
    var analyser = audioContext.createAnalyser();
    source.connect(analyser);
    
    // Get the frequency data and update the graphical interface
    function update() {
        // Get the frequency data
        var frequencyData = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(frequencyData);
        
        // Update the graphical interface based on the frequency data
        // Change the position of the ball based on the volume of the sound
        var volume = frequencyData.reduce((a, b) => a + b) / frequencyData.length;
        var scaledVolume = volume * 5; // Increase the scaling factor
        var randomJump = Math.random() * volume; // Add a random factor based on the volume
        document.getElementById('ball').style.bottom = (scaledVolume + randomJump) + 'px';
        document.getElementById('ball').style.left = (50 + randomJump) + '%'; // Add random horizontal movement
        
        // Call the update function again in the next frame
        requestAnimationFrame(update);
    }
    
    // Start the update loop
    update();
})
.catch(function(err) {
    // Handle the error
    console.log(err);
});