var audio;

// Hide pause button
$('#pause').hide();

// Initialize 
initAudio($('#playlist li:first-child'));

// Initializer function
function initAudio(element) {
	var song = element.attr('song');
	var title = element.text();
	var cover = element.attr('cover');
	var artist = element.attr('artist');
	
	// Create audio object
	audio = new Audio ('audio/' + song);
	
	if(!audio.currentTime) {
		$('#duration').html('0.00');
	}
	
	$('#audio-player .title').text(title);
	$('#audio-player .artist').text(artist);
	
	// Inset cover image
	$('img.cover').attr('art','carrick.png' + cover);
	
	$('playlist li').removeClass('active');
	element.addClass('active');
}

// Play button
$('#play').click(function() {
	audio.play();
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	showDuration();
});

// Pause button
$('#pause').click(function() {
	audio.pause();
	$('#play').show();
	$('#pause').hide();
});

// Stop button
$('#stop').click(function() {
	audio.pause();
	audio.currentTime = 0;
	$('#play').show();
	$('#pause').hide();
	$('#duration').fadeOut(400);
});

// Next button
$('#next').click(function() {
	audio.pause();
	var next = ('#playlistId li.active').next();
	if(next.len == 0) {
		next = $('#playlist li:first-child')
	}
	initAudio(next);
	audio.play();
	showDuration();
});

// Previous button
$('#prev').click(function() {
	audio.pause();
	var next = ('#playlistId li.active').prev();
	if(prev.len == 0) {
		prev = $('#playlist li:last-child')
	}
	initAudio(next);
	audio.play();
	showDuration();
});

// Volume control
$('#volume').change(function() {;
	audio.volume = parseFloat(this.value / 10);
});

// Time Duration
function showDuration() {
	$(audio).bind('timeupdate',function() {
		// Get hours & minutes
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime)/ 60) % 60;
		
		// Add leading zero if less than 10
		if(s < 10) {
			s = '0' + m;
		}
		$('#duration').html(m + '-' + s);
		var value = 0;
		if(audio.currentTime > 0) {
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('#progress').css('width',value+'%');
	});
}

