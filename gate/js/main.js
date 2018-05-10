$(document).ready(function () {
    $(function () {
        var socket = io();
    });

    /* Fills the localeStorage in order to test the program without connected databases and so on. */
    var user = {
        id: 1,
        name: 'Vasya',
        pass: 111,
        role: 'user',
        budget: 10
    }
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
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('currentVideoObj', JSON.stringify(videos[0]));

    /* Player */
    let buffering = false;
    let counter = 0;
    let currentPlayer = new Clappr.Player({source: videos[0].source}).attachTo(document.getElementById('current_video'));
    addPlayerListeners(currentPlayer);

    //socket.emit('video', {});
    /* Changes the source of the player to the next */
    $('.video').click(function () {
        counter = 0;
        let nextVideo = $(this).attr('id') == 1 ? videos[1] : videos[2];
        localStorage.setItem('currentVideoObj', JSON.stringify(nextVideo));
        currentPlayer.load({source: nextVideo.source});
        addPlayerListeners(currentPlayer);
    });

    /* Adds all required event listeners to the player */
    function addPlayerListeners(player) {
        player.listenToOnce(player, Clappr.Events.PLAYER_PLAY, function () {
            console.log('Starts playing!');
            console.log('user id: ' + JSON.parse(localStorage.getItem('user')).id + ';' + ' video id: '
                + JSON.parse(localStorage.getItem('currentVideoObj')).id);

            let watchCounter = function () {
                if (player.isPlaying() && !buffering) {
                    counter++;
                    if (counter % 10 == 0) {
                        console.log(counter + ' seconds');
                    }
                }
                setTimeout(watchCounter, 1000);
            };
            setTimeout(watchCounter, 1000);
        });

        player.listenTo(player, Clappr.Events.PLAYER_PLAY, function () {
            buffering = false;
        });

        player.listenToOnce(player, Clappr.Events.PLAYER_ENDED, function () {
            console.log('Player finished!');
        });

        player.listenTo(player.core.getCurrentContainer(), Clappr.Events.CONTAINER_STATE_BUFFERING, function () {
            buffering = true;
            console.log(buffering);
        });
    };

});