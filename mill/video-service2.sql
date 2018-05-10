TRUNCATE TABLE `invest`;
TRUNCATE TABLE `users`;
TRUNCATE TABLE `videos`;
TRUNCATE TABLE `videoprice`;
TRUNCATE TABLE `views`;


INSERT INTO `invest` (`id`, `video_id`, `user_id`, `percent`) VALUES
(1, 1, 3, 20),
(2, 1, 4, 10),
(3, 1, 5, 15),
(4, 2, 5, 10),
(5, 2, 3, 10),
(6, 1, 2, 55),
(7, 2, 8, 80);

TRUNCATE TABLE `transactionstouser`;

TRUNCATE TABLE `transactionstovideo`;

INSERT INTO `users` (`id`, `name`, `pass`, `role`, `budget`) VALUES
(1, 'Vasya', '111', 'user', 100),
(2, 'Petya', '111', 'owner', 100),
(3, 'Dima', '111', 'investor', 100),
(4, 'Dima2', '111', 'investor', 100),
(5, 'Dima3', '111', 'investor', 100),
(6, 'Andrew', '111', 'user', 100),
(7, 'Andrew2', '111', 'user', 100),
(8, 'Petya2', '111', 'owner', 100),
(9, 'service', '111', 'service', 100);

INSERT INTO `videoprice` (`id`, `video_id`, `price`, `time`) VALUES
(1, 1, 19.52, '2018-05-10 15:14:54'),
(2, 2, 0.83, '2018-05-10 15:14:54'),
(3, 4, 0.65, '2018-05-10 15:14:54');

INSERT INTO `videos` (`id`, `name`, `source`, `duration`, `owner_id`) VALUES
(1, 'cats', '', 3600, 2),
(2, 'dogs', '', 600, 2),
(3, 'cats and dogs', '', 360, 2),
(4, 'trees', '', 360, 8);

INSERT INTO `views` (`id`, `video_id`, `user_id`, `time_watch`, `liked`) VALUES
(1, 1, 1, 3600, 0),
(2, 1, 6, 1000, 0),
(3, 1, 7, 1800, 0),
(4, 2, 1, 400, 0),
(5, 4, 1, 300, 0);
