-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 20 2018 г., 20:23
-- Версия сервера: 10.1.25-MariaDB
-- Версия PHP: 7.1.7
CREATE DATABASE `video-service`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `video-service`
--

-- --------------------------------------------------------

--
-- Структура таблицы `invest`
--

CREATE TABLE `invest` (
  `id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `percent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `invest`
--

INSERT INTO `invest` (`id`, `video_id`, `user_id`, `percent`) VALUES
(1, 1, 3, 20),
(2, 1, 4, 10),
(3, 1, 5, 15),
(4, 2, 5, 10),
(5, 2, 3, 10),
(6, 1, 2, 55),
(7, 2, 8, 80);

-- --------------------------------------------------------

--
-- Структура таблицы `transactionstouser`
--

CREATE TABLE `transactionstouser` (
  `id` int(11) NOT NULL,
  `id-from` int(11) NOT NULL,
  `id-to` int(11) NOT NULL,
  `money` float NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `transactionstouser`
--

INSERT INTO `transactionstouser` (`id`, `id-from`, `id-to`, `money`, `timestamp`) VALUES
(1, 1, 3, 3.9, '2018-05-10 21:10:44'),
(2, 1, 4, 1.95, '2018-05-10 21:10:44'),
(3, 1, 5, 2.93, '2018-05-10 21:10:44'),
(4, 2, 5, 0.08, '2018-05-10 21:10:44'),
(5, 2, 3, 0.08, '2018-05-10 21:10:44'),
(6, 1, 2, 10.74, '2018-05-10 21:10:44'),
(7, 2, 8, 0.66, '2018-05-10 21:10:44');

-- --------------------------------------------------------

--
-- Структура таблицы `transactionstovideo`
--

CREATE TABLE `transactionstovideo` (
  `id` int(11) NOT NULL,
  `id-from` int(11) NOT NULL,
  `id-to` int(11) NOT NULL,
  `money` float NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `transactionstovideo`
--

INSERT INTO `transactionstovideo` (`id`, `id-from`, `id-to`, `money`, `timestamp`) VALUES
(1, 1, 1, 5.52, '2018-05-10 21:10:43'),
(2, 6, 1, 7, '2018-05-10 21:10:43'),
(3, 7, 1, 7, '2018-05-10 21:10:43'),
(4, 1, 2, 0.83, '2018-05-10 21:10:43'),
(5, 1, 4, 0.65, '2018-05-10 21:10:43');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `role` varchar(20) NOT NULL,
  `budget` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `pass`, `role`, `budget`) VALUES
(1, 'Vasya', '111', 'user', 90),
(2, 'Petya', '111', 'owner', 110.74),
(3, 'Dima', '111', 'investor', 103.98),
(4, 'Dima2', '111', 'investor', 101.95),
(5, 'Dima3', '111', 'investor', 103.01),
(6, 'Andrew', '111', 'user', 90),
(7, 'Andrew2', '111', 'user', 90),
(8, 'Petya2', '111', 'owner', 100.66),
(9, 'service', '111', 'service', 109);

-- --------------------------------------------------------

--
-- Структура таблицы `videoprice`
--

CREATE TABLE `videoprice` (
  `id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `videoprice`
--

INSERT INTO `videoprice` (`id`, `video_id`, `price`, `time`) VALUES
(1, 1, 19.52, '2018-05-10 21:10:43'),
(2, 2, 0.83, '2018-05-10 21:10:43'),
(3, 4, 0.65, '2018-05-10 21:10:43');

-- --------------------------------------------------------

--
-- Структура таблицы `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `source` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `videos`
--

INSERT INTO `videos` (`id`, `name`, `source`, `duration`, `owner_id`) VALUES
(1, 'cats', '', 3600, 2),
(2, 'dogs', '', 600, 2),
(3, 'cats and dogs', '', 360, 2),
(4, 'trees', '', 360, 8);

-- --------------------------------------------------------

--
-- Структура таблицы `views`
--

CREATE TABLE `views` (
  `id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `time_watch` int(11) NOT NULL,
  `liked` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `views`
--

INSERT INTO `views` (`id`, `video_id`, `user_id`, `time_watch`, `liked`) VALUES
(1, 1, 1, 3600, 0),
(2, 1, 6, 1000, 0),
(3, 1, 7, 1800, 0),
(4, 2, 1, 400, 0),
(5, 4, 1, 300, 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `invest`
--
ALTER TABLE `invest`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `transactionstouser`
--
ALTER TABLE `transactionstouser`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `transactionstovideo`
--
ALTER TABLE `transactionstovideo`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `videoprice`
--
ALTER TABLE `videoprice`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `invest`
--
ALTER TABLE `invest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT для таблицы `transactionstouser`
--
ALTER TABLE `transactionstouser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT для таблицы `transactionstovideo`
--
ALTER TABLE `transactionstovideo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT для таблицы `videoprice`
--
ALTER TABLE `videoprice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `views`
--
ALTER TABLE `views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
