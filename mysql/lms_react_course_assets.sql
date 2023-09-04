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
-- Table structure for table `course_assets`
--

DROP TABLE IF EXISTS `course_assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_assets` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `lecture_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `lecture_file` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `courseId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `course_assets_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_assets`
--

LOCK TABLES `course_assets` WRITE;
/*!40000 ALTER TABLE `course_assets` DISABLE KEYS */;
INSERT INTO `course_assets` VALUES ('289302a0-3a4d-485e-a23f-417340385169','How to image proccessing','https://res.cloudinary.com/dev-empty/raw/upload/v1660633994/rcsgks9kygvsefxzjdnr.php','d92f38eb-e616-414c-be0c-54e79a6809c7','2022-08-16 07:13:15','2022-08-16 07:13:15'),('5dfb4a3f-d6c1-4c01-8aa0-455254fbf6d3','Certified Security','https://res.cloudinary.com/dev-empty/raw/upload/v1660635440/lggdrfp1jhvqrfv4uwew.pdf','142a183d-45f1-4447-9aad-64f736471988','2022-08-16 07:37:21','2022-08-16 07:37:21'),('5e4c6ee2-fed7-4938-bd85-7d532fe8af82','How to image proccessing','https://res.cloudinary.com/dev-empty/raw/upload/v1660641019/bznisqkn49wgxjmasoaf.jpeg','db24afee-e132-4be7-a7e7-0c411ccd41ca','2022-08-16 09:10:19','2022-08-16 09:10:19'),('81a7a6c0-4dd4-43a6-afbe-f95ddd924473','How to image proccessing','https://res.cloudinary.com/dev-empty/raw/upload/v1661246283/bb9wygtppwejxmsijx6z.pdf','130bcd58-0650-4efe-a401-dc949373c699','2022-08-23 09:18:04','2022-08-23 09:18:04'),('98b2fa7e-105b-4e50-a6c7-5be307e5ff5d','Accounting and Finance','https://res.cloudinary.com/dev-empty/raw/upload/v1660634743/s8yj6ly5rudzk8fkwcow.sql','3118e959-37af-453b-889b-e3006446127a','2022-08-16 07:25:43','2022-08-16 07:25:43'),('99cebd1f-ec2c-49d4-b658-1820129f67b9','Business Idea','https://res.cloudinary.com/dev-empty/raw/upload/v1660634259/mvhsgqhumvg3gfrnkqhu.pdf','a06444c4-037f-4787-ba5f-9d28a8f1f4e1','2022-08-16 07:17:39','2022-08-16 07:17:39');
/*!40000 ALTER TABLE `course_assets` ENABLE KEYS */;
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

-- Dump completed on 2023-04-05 15:29:54
