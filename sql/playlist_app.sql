-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2020 at 04:29 PM
-- Server version: 8.0.18
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `playlist_app`
--
CREATE DATABASE IF NOT EXISTS `playlist_app` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `playlist_app`;

-- --------------------------------------------------------

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
CREATE TABLE IF NOT EXISTS `playlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) COLLATE utf8_bin NOT NULL,
  `genre` varchar(128) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `playlist`
--

INSERT INTO `playlist` (`id`, `title`, `genre`) VALUES
(1, 'Relaxing sounds', 'Chillout'),
(3, 'New wave in not dead', 'New wave'),
(4, 'New wave is not dead', 'New wave'),
(5, 'Friday night fun time', 'House'),
(6, 'New hits', 'Pop'),
(7, 'Golden oldies', 'Various');

-- --------------------------------------------------------

--
-- Table structure for table `playlist_track`
--

DROP TABLE IF EXISTS `playlist_track`;
CREATE TABLE IF NOT EXISTS `playlist_track` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `playlist_id` int(11) NOT NULL,
  `track_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `playlist_id` (`playlist_id`),
  KEY `track_id` (`track_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `playlist_track`
--

INSERT INTO `playlist_track` (`id`, `playlist_id`, `track_id`) VALUES
(2, 2, 1),
(3, 2, 2),
(4, 2, 3),
(5, 2, 4),
(7, 3, 2),
(8, 3, 6),
(9, 3, 7);

-- --------------------------------------------------------

--
-- Table structure for table `track`
--

DROP TABLE IF EXISTS `track`;
CREATE TABLE IF NOT EXISTS `track` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) COLLATE utf8_bin NOT NULL,
  `artist` varchar(128) COLLATE utf8_bin NOT NULL,
  `album_art` varchar(128) COLLATE utf8_bin NOT NULL,
  `youtube_url` varchar(128) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `track`
--

INSERT INTO `track` (`id`, `title`, `artist`, `album_art`, `youtube_url`) VALUES
(1, 'Everything i wanted', 'Billie Eilish', 'https://www.youtube.com/watch?v=qCTMq7xvdXU', 'https://www.youtube.com/watch?v=qCTMq7xvdXU'),
(2, 'Lights and Music', 'Cut Copy', 'https://direct.rhapsody.com/imageserver/images/alb.18859519/500x500.jpg', 'https://www.youtube.com/watch?v=8R1X2TxW5Rk'),
(3, 'Sweet Disposition', 'The Temper Trap', 'https://i.pinimg.com/originals/95/7f/9b/957f9b7d861979521ca7578aaa54fc0e.jpg', 'https://www.youtube.com/watch?v=jxKjOOR9sPU'),
(4, 'Ice Cream', 'New Young Pony Club', 'https://m.media-amazon.com/images/I/71JT1yuU7EL._SS500_.jpg', 'https://www.youtube.com/watch?v=-shACMaxUb0'),
(6, 'Around the World', 'Daft Punk', 'https://vignette.wikia.nocookie.net/daftpunk/images/5/58/Around_the_World.jpg/revision/latest?cb=20140514231509', 'https://www.youtube.com/watch?v=LKYPYj2XX80'),
(8, 'Gold Guns Girls', 'Metric', 'https://i1.sndcdn.com/artworks-000010047105-pyujx5-t500x500.jpg?671e660', 'https://www.youtube.com/watch?v=FRtd8ArvH_s');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
