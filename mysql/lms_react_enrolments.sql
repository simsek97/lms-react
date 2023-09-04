-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: lms-react.chw8nuks2vpz.us-east-2.rds.amazonaws.com    Database: lms_react
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `enrolments`
--

DROP TABLE IF EXISTS `enrolments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrolments` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `bought_price` float DEFAULT NULL,
  `payment_method` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `buyer_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `buyer_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `buyer_avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `courseId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` enum('paid','unpaid') CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `enrolments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `enrolments_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrolments`
--

LOCK TABLES `enrolments` WRITE;
/*!40000 ALTER TABLE `enrolments` DISABLE KEYS */;
INSERT INTO `enrolments` VALUES ('2a18c49e-6ab6-4d42-921a-576a8a2300d3',16.99,'Card','Shabbir','shabbirahmed149@gmail.com','https://res.cloudinary.com/dev-empty/image/upload/v1660631868/gnfwstr1tv80am1duqp7.png','89aeed13-5b6e-4e0d-84af-a24793a83cd7','db24afee-e132-4be7-a7e7-0c411ccd41ca','paid','2022-08-18 07:24:54','2022-08-18 07:24:54'),('762048bd-5f4b-4fc5-8827-8f39a6959f57',34.99,'Card','Shabbir','shabbirahmed149@gmail.com','https://res.cloudinary.com/dev-empty/image/upload/v1660631868/gnfwstr1tv80am1duqp7.png','89aeed13-5b6e-4e0d-84af-a24793a83cd7','142a183d-45f1-4447-9aad-64f736471988','paid','2022-08-18 07:37:04','2022-08-18 07:37:04'),('7dfe0304-82dd-4a58-a97f-7a0a0f10acba',34.99,'Card','Shabbir','shabbirahmed149@gmail.com','https://res.cloudinary.com/dev-empty/image/upload/v1660631868/gnfwstr1tv80am1duqp7.png','89aeed13-5b6e-4e0d-84af-a24793a83cd7','142a183d-45f1-4447-9aad-64f736471988','paid','2022-08-18 07:24:54','2022-08-18 07:24:54'),('fa55ef51-4e58-4c6c-9eb3-253a3fb6295b',11.99,'Card','Admin','admin@edmy.com','https://res.cloudinary.com/dev-empty/image/upload/v1661245253/wqsnxv0pfdwl2abdakf5.jpg','89aeed13-5b6e-4e0d-84af-a24793a83cd7','a4417872-960c-4d9d-9b4c-b05bbc9c4c01','paid','2022-09-25 07:35:54','2022-09-25 07:35:54');
/*!40000 ALTER TABLE `enrolments` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-05 15:29:50
