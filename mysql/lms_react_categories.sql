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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('1e6ad2ce-497d-4dbc-9325-0209a5ad541d','Design','design','2022-08-16 06:41:35','2022-08-16 06:41:35'),('3b0eebe9-c3a9-4250-be93-40b58ee1d40c','Health & Fitness','health-fitness','2022-08-16 06:42:28','2022-08-16 06:42:28'),('6387f943-49ac-48c9-b270-afda93feb165','Lifestyle','lifestyle','2022-08-16 06:41:59','2022-08-16 06:41:59'),('6fe00827-7c90-48e9-bf3e-7e2591f97ec8','Office Productivity','office-productivity','2022-08-16 06:40:53','2022-08-16 06:40:53'),('7049c68c-584e-4934-807f-2bf17f3fabfe','Photography & Video','photography-video','2022-08-16 06:42:13','2022-08-16 06:42:13'),('763283f5-3076-4b06-acba-e33d1f2a0db7','Development','development','2022-08-16 06:39:49','2022-08-16 06:39:49'),('8955ae82-ba74-4435-8ff5-e52f76594ece','Personal Development','personal-development','2022-08-16 06:41:23','2022-08-16 06:41:23'),('92f8ccf1-384e-4c27-b429-a1bce510a1cc','Music','music-383','2022-08-23 06:15:16','2022-09-04 05:05:20'),('9757989d-24a0-42b7-ab56-11673f671800','Marketing','marketing','2022-08-16 06:41:46','2022-08-16 06:41:46'),('9ae93b15-0ec2-4b42-ab02-337d0e91eaa0','Teaching & Academics','teaching-academics','2022-08-16 06:42:55','2022-08-16 06:42:55'),('aca10dcc-c359-4b8d-acaf-d016898d65fa','Finance & Accounting','finance-accounting','2022-08-16 06:40:16','2022-08-16 06:40:16'),('c54a81fe-9947-4ede-80f7-5b924bb1fa20','Business','business','2022-08-16 06:40:03','2022-08-16 06:40:03'),('e532600c-8db4-41bd-8eb4-36b5cf67fc49','IT & Software','it-software','2022-08-16 06:40:39','2022-08-16 06:40:39');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
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

-- Dump completed on 2023-04-05 15:29:51
