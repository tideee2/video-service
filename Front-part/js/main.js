$(document).ready(function() {
	/* Player */
	//var socket = io();
	var videos = ['http://new.shpp.me:1935/vod/sample.mp4/playlist.m3u8',
	'http://clappr.io/highline.mp4',
	'http://techslides.com/demos/sample-videos/small.mp4'];
	let counter = 0;
	let currentPlayer = new Clappr.Player({source: videos[0]}).attachTo(document.getElementById('current_video'));
	addPlayerListeners(currentPlayer);

	/* Show/hide password in the login form */
	$('.fa-eye').click(function() {
		let passField = $('#password');
		if(passField.attr("type") == "password") {
			passField.attr("type", "text");
			return
		}
		passField.attr("type", "password");
	});

	//socket.emit('video', {});
	/* Changes the source of the player to the next */
	$('.video').click(function() {
		counter = 0;
		let sourceLink = $(this).attr('id') == 1 ? videos[1] : videos[2];
		currentPlayer.load({source: sourceLink});
		addPlayerListeners(currentPlayer);
	});

	/* Adds all required event listeners to the player */
	function addPlayerListeners(player) {
		player.listenToOnce(player, Clappr.Events.PLAYER_PLAY, function() { 
			console.log('Starts playing!');

			let watchCounter = function() {
				if(player.isPlaying()) {
					counter++;
					if(counter % 10 == 0) {
						console.log(counter + ' seconds');  
					}
				}
				setTimeout(watchCounter, 1000);
			};
			setTimeout(watchCounter, 1000);
		});

		player.listenToOnce(player, Clappr.Events.PLAYER_ENDED, function() {
			console.log('Player finished!');
		});
	};

});