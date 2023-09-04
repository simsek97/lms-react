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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `designation` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `bio` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `profile_photo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `reset_password_token` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `reset_password_send_at` datetime DEFAULT NULL,
  `reset_password_at` datetime DEFAULT NULL,
  `website` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `linkedin` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `youtube` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` enum('student','admin','instructor') CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'student',
  `email_confirmed` tinyint(1) DEFAULT '0',
  `email_confirmed_at` datetime DEFAULT NULL,
  `instructor_request` tinyint(1) DEFAULT '0',
  `instructor_request_confirmed` tinyint(1) DEFAULT '0',
  `instructor_request_confirmed_at` datetime DEFAULT NULL,
  `instructor_status` tinyint(1) DEFAULT NULL,
  `instructor_subject` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `instructor_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `is_profile_public` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('89aeed13-5b6e-4e0d-84af-a24793a83cd7','Admin','User','simsek97@gmail.com','$2b$10$dlh6PVGVzG7pHebt8GxVFuwNNsWJvJWb5lZcyB.nAI3FqLMDXSZ.G',NULL,NULL,'Admin started his career as a Unix and Linux System Engineer in 1999. Since that time he has utilized his Linux skills at companies such as Xerox, UPS, Hewlett-Packard, and Amazon.com. Additionally, he has acted as a technical consultant and independent contractor for small businesses and Fortune 500 companies.','https://res.cloudinary.com/dev-empty/image/upload/v1661245253/wqsnxv0pfdwl2abdakf5.jpg',NULL,NULL,'e52de641-fc1b-419a-b82f-75905bdfac97','2022-08-16 03:26:55',NULL,NULL,NULL,NULL,NULL,NULL,'admin',1,'2022-08-16 03:27:12',0,0,NULL,NULL,NULL,NULL,1,1,'2022-08-16 03:26:55','2022-08-23 14:12:36'),('b2e6c33f-fae4-4668-a442-fb890ede4ee2','Student','User','simsek9.7@gmail.com','$2b$10$cHO0VlLk5MbLZJu7w4MJNOupFPt4cLxSDHY8QyI0tpzw50haQfUZa',NULL,NULL,NULL,NULL,NULL,NULL,'d45e8c4e-eb5c-484c-bd86-3b87236242c5','2022-09-24 23:07:27',NULL,NULL,NULL,NULL,NULL,NULL,'student',0,NULL,0,0,NULL,NULL,NULL,NULL,1,1,'2022-09-24 23:07:27','2022-09-24 23:07:27'),('ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','Instructor','User','simsek.97@gmail.com','$2b$10$cQuqV3bPHw3EQFZXSBxxhOf5wYeAOhZ8ShRPZmmDra1M0J173Sxly',NULL,NULL,'AP consultant and the #1 SAP instructor on Udemy.\n\nI hope you find my courses interesting and I really hope you enjoy them.','https://res.cloudinary.com/dev-empty/image/upload/v1661230727/rquq94qv4bpuvf7xnxyh.jpg',NULL,'+8801646295918','aed837d4-6237-4e9a-b7a3-22dfbb5ab9ad','2022-08-16 05:25:46',NULL,NULL,NULL,NULL,NULL,NULL,'instructor',1,'2022-08-16 07:29:43',1,1,'2022-08-16 07:33:08',NULL,'Register to Become an Intructor','Register to Become an Intructor',1,1,'2022-08-16 05:25:46','2022-09-04 05:17:44');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
