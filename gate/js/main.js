$(document).ready(function () {
    /* Connection to the store service */
    var socket = new io('http://localhost:3000');

    /* Fills the localeStorage in order to make tests without connected databases and so on. */
    var users = [
        {
            id: 1,
            name: 'Vasya',
            pass: 111,
            role: 'user',
            budget: 10
        },
        {
            id: 2,
            name: 'Petya',
            pass: 111,
            role: 'owner',
            budget: 30
        },
        {
            id: 3,
            name: 'Dima',
            pass: 111,
            role: 'investor',
            budget: 30
        }
    ];
    var videos = [
        {
            id: 1,
            name: 'Test1',
            source: 'http://new.shpp.me:1935/vod/sample.mp4/playlist.m3u8',
            duration: 634,
            owner_id: 1
        },
        {
            id: 2,
            name: 'Test2',
            source: 'http://clappr.io/highline.mp4',
            duration: 37,
            owner_id: 1
        },
        {
            id: 3,
            name: 'Test3',
            source: 'http://techslides.com/demos/sample-videos/small.mp4',
            duration: 5,
            owner_id: 1
        }
    ];
    localStorage.setItem('user', JSON.stringify(users[0]));

    /* Player */
    let buffering = false;
    let seconds = 0;
    let timer;
    let currentPlayer = new Clappr.Player({source: videos[0].source}).attachTo(document.getElementById('current_video'));
    localStorage.setItem('currentVideoObj', JSON.stringify(videos[0]));
    addPlayerListeners(currentPlayer);

    /* Sets a timer in order to calculate the amount of displayed seconds */
    function startTimer(player) {
        timer = window.setTimeout(function () {
            if (player.isPlaying() && !buffering) {
                seconds++;
                if (seconds % 10 == 0) {
                    socket.emit('video', JSON.stringify({
                        userId: JSON.parse(localStorage.getItem('user')).id,
                        videoId: JSON.parse(localStorage.getItem('currentVideoObj')).id,
                        watching: true
                    }));
                }
            }
            startTimer(player);
        }, 1000);
    };

    /* Changes the source (video) of the player to the next */
    $('.video').click(function () {
        seconds = 0;
        let nextVideo = $(this).attr('id') == 1 ? videos[1] : videos[2];
        socket.emit('video', JSON.stringify({
            userId: JSON.parse(localStorage.getItem('user')).id,
            videoId: JSON.parse(localStorage.getItem('currentVideoObj')).id,
            watching: false
        }));
        localStorage.setItem('currentVideoObj', JSON.stringify(nextVideo));
        window.clearTimeout(timer);
        currentPlayer.load({source: nextVideo.source});
        addPlayerListeners(currentPlayer);
    });

    $('.buttons button').click(function () {
        let userButton = $(this).attr("id");
        let nextUserId = userButton.substring(userButton.length - 1) - 1;
        localStorage.setItem('user', JSON.stringify(users[nextUserId]));
    });

    /* Adds all required event listeners to the player */
    function addPlayerListeners(player) {
        player.listenToOnce(player, Clappr.Events.PLAYER_PLAY, function () {
            socket.emit('video', JSON.stringify({
                userId: JSON.parse(localStorage.getItem('user')).id,
                videoId: JSON.parse(localStorage.getItem('currentVideoObj')).id,
                watching: true
            }));
            startTimer(player);
        });

        player.listenTo(player, Clappr.Events.PLAYER_PLAY, function () {
            buffering = false;
        });

        player.listenToOnce(player, Clappr.Events.PLAYER_ENDED, function () {
            socket.emit('video', JSON.stringify({
                userId: JSON.parse(localStorage.getItem('user')).id,
                videoId: JSON.parse(localStorage.getItem('currentVideoObj')).id,
                watching: false
            }));
        });

        player.listenTo(player.core.getCurrentContainer(), Clappr.Events.CONTAINER_STATE_BUFFERING, function () {
            buffering = true;
        });
    };

});