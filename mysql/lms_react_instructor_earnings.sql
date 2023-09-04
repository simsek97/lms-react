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
-- Table structure for table `instructor_earnings`
--

DROP TABLE IF EXISTS `instructor_earnings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor_earnings` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `earnings` float DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `courseId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `status` enum('due','paid','cancelled') CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'due',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `instructor_earnings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `instructor_earnings_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor_earnings`
--

LOCK TABLES `instructor_earnings` WRITE;
/*!40000 ALTER TABLE `instructor_earnings` DISABLE KEYS */;
INSERT INTO `instructor_earnings` VALUES ('017cc784-bc84-4ff0-aac8-93b25979ef6c',9.99,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','130bcd58-0650-4efe-a401-dc949373c699','due','2022-08-29 04:31:51','2022-08-29 04:31:51'),('048c60da-c8f2-4f63-8475-7a9ab7e560c5',49.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','742d231f-2d5b-42b6-993e-1edeba676f45','due','2022-08-24 06:59:03','2022-08-24 06:59:03'),('32c0ba71-89bd-4eca-8c81-f3fc9084d6b6',17.99,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','3118e959-37af-453b-889b-e3006446127a','due','2022-08-22 15:53:28','2022-08-22 15:53:28'),('34e696d5-2a8f-4987-be31-77572478f387',39.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','308cdeb3-b61f-4fca-a139-9bb219282dd3','due','2022-09-24 11:41:43','2022-09-24 11:41:43'),('3b37455b-e8c9-48c7-9054-eedb74e72b7d',11.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','a4417872-960c-4d9d-9b4c-b05bbc9c4c01','due','2022-09-25 07:35:54','2022-09-25 07:35:54'),('43e5676b-f0d0-412f-9a48-154f2b7b393f',49.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','742d231f-2d5b-42b6-993e-1edeba676f45','due','2022-09-24 23:00:55','2022-09-24 23:00:55'),('4fb7d7da-18b2-42c6-8b7f-7776c77fab7d',16.99,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','a06444c4-037f-4787-ba5f-9d28a8f1f4e1','due','2022-08-22 04:53:57','2022-08-22 04:53:57'),('52a0742e-a490-49ad-ab64-792579f26e46',34.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','142a183d-45f1-4447-9aad-64f736471988','due','2022-08-18 07:24:54','2022-08-18 07:24:54'),('6abdeb43-1e56-48ce-8e5a-6be61618c312',34.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','142a183d-45f1-4447-9aad-64f736471988','due','2022-08-23 07:38:40','2022-08-23 07:38:40'),('774dfeb7-34db-47da-b77a-09adb773cdb0',16.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','db24afee-e132-4be7-a7e7-0c411ccd41ca','due','2022-08-18 07:24:54','2022-08-18 07:24:54'),('83888d13-c67c-48f7-8405-885bbd692514',34.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','142a183d-45f1-4447-9aad-64f736471988','due','2022-08-22 05:46:13','2022-08-22 05:46:13'),('8f6ec23b-c470-4f4e-810b-4d582e3734ca',49.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','742d231f-2d5b-42b6-993e-1edeba676f45','due','2022-09-24 21:33:50','2022-09-24 21:33:50'),('97ffde2e-1692-4656-ac0b-230bc5c92a78',34.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','142a183d-45f1-4447-9aad-64f736471988','due','2022-08-22 05:53:04','2022-08-22 05:53:04'),('9d8fa8c7-c1a2-4f3d-9fd8-ee785a025e84',9.99,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','410d35f5-2fa9-456a-8f8b-0599c1eb45e1','due','2022-09-23 18:46:04','2022-09-23 18:46:04'),('af398513-a6f9-436b-835d-1d5223dd4247',16.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','db24afee-e132-4be7-a7e7-0c411ccd41ca','due','2022-08-22 15:45:32','2022-08-22 15:45:32'),('c31a7b2f-f851-42e9-9e1e-a9094078e310',34.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','142a183d-45f1-4447-9aad-64f736471988','due','2022-08-22 15:50:04','2022-08-22 15:50:04'),('c457f731-d9b2-4be1-a87f-fd065b6f43c4',17.99,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','3118e959-37af-453b-889b-e3006446127a','due','2022-08-23 04:06:33','2022-08-23 04:06:33'),('d57028e6-409c-47f6-a72a-897bf0adb500',34.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','142a183d-45f1-4447-9aad-64f736471988','due','2022-08-18 07:37:04','2022-08-18 07:37:04'),('e0b7297f-04b8-4b73-b07b-813b2a713ad0',49.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','742d231f-2d5b-42b6-993e-1edeba676f45','due','2022-09-23 20:46:23','2022-09-23 20:46:23'),('fee43f60-7f1d-4f1e-9ba5-9f72b55a3ca1',99.99,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','5335b72b-5ba5-4e55-9f04-bfb0e7f7d39f','due','2022-08-30 13:01:19','2022-08-30 13:01:19');
/*!40000 ALTER TABLE `instructor_earnings` ENABLE KEYS */;
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

-- Dump completed on 2023-04-05 15:29:52
