-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 18, 2024 at 06:36 PM
-- Server version: 5.7.40
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cloud_service`
--
CREATE DATABASE IF NOT EXISTS `cloud_service` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `cloud_service`;

-- --------------------------------------------------------

--
-- Table structure for table `bucket_object`
--

DROP TABLE IF EXISTS `bucket_object`;
CREATE TABLE IF NOT EXISTS `bucket_object` (
  `iBucketObjectId` int(11) NOT NULL AUTO_INCREMENT,
  `vName` varchar(100) NOT NULL,
  `vSecretName` varchar(100) DEFAULT NULL,
  `iUserBucketId` int(11) NOT NULL,
  `iUserId` int(11) NOT NULL,
  `vFileUrl` text NOT NULL,
  `vFileType` varchar(50) NOT NULL,
  `dtCreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`iBucketObjectId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `iUserId` int(11) NOT NULL AUTO_INCREMENT,
  `vName` varchar(100) NOT NULL,
  `vEmail` varchar(255) NOT NULL,
  `vPassword` varchar(255) NOT NULL,
  `dtCreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dtModifiedAt` timestamp NOT NULL,
  `eStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `vAccessKey` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`iUserId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_bucket`
--

DROP TABLE IF EXISTS `user_bucket`;
CREATE TABLE IF NOT EXISTS `user_bucket` (
  `iUserBucketId` int(11) NOT NULL AUTO_INCREMENT,
  `vName` varchar(100) NOT NULL,
  `iUserId` int(11) NOT NULL,
  `vSecretName` varchar(100) DEFAULT NULL,
  `iCapacity` int(11) NOT NULL,
  `iUtilised` int(11) NOT NULL,
  `dtCreatedAt` timestamp NOT NULL,
  `dtModifiedAt` timestamp NOT NULL,
  PRIMARY KEY (`iUserBucketId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
