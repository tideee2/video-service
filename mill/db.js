module.exports = {

    users : [
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
        },
        {
            id: 33,
            name: 'Dima1',
            pass: 111,
            role: 'investor',
            budget: 30
        },
        {
            id: 34,
            name: 'Dima2',
            pass: 111,
            role: 'investor',
            budget: 30
        },
        {
            id: 4,
            name: 'Vasya',
            pass: 111,
            role: 'user',
            budget: 10
        },
        {
            id: 5,
            name: 'Vasya',
            pass: 111,
            role: 'user',
            budget: 10
        }
    ],

    videos : [
        {
            id: 1,
            name: 'cats',
            duration: 3600,
            channel: 1
        },
        {
            id: 2,
            name: 'dogs',
            duration: 600,
            channel: 1
        },
        {
            id: 3,
            name: 'cats and dogs video',
            duration: 360,
            channel: 1
        },
        {
            id: 4,
            name: 'trees',
            duration: 360,
            channel: 2
        },
    ],
    channels : [
        {
            id: 1,
            name: 'cats and dogs',
            owner: 3
        },
        {
            id: 2,
            name: 'nature',
            owner: 3
        }
    ],

    invest : [
        {
            id: 1,
            id_channel: 1,
            id_user: 3,
            percent: 20
        },
        {
            id: 2,
            id_channel: 1,
            id_user: 34,
            percent: 10
        },
        {
            id: 3,
            id_channel: 1,
            id_user: 33,
            percent: 15
        }
    ],

    views : [
        {
            id: 1,
            id_video: 1,
            id_user: 1,
            timestop: 3600,
            likes: 0
        },
        {
            id: 2,
            id_video: 1,
            id_user: 4,
            timestop: 1000,
            likes: 0
        },
        {
            id: 3,
            id_video: 1,
            id_user: 4,
            timestop: 1800,
            likes: 0
        },
        {
            id: 4,
            id_video: 4,
            id_user: 1,
            timestop: 300,
            likes: 0
        },
        {
            id: 5,
            id_video: 2,
            id_user: 1,
            timestop: 400,
            likes: 0
        }
    ]
}