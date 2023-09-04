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
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partners` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `partner_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
INSERT INTO `partners` VALUES ('82111ca6-f1af-439b-9a1d-6e557f7efc36','Microsoft','https://res.cloudinary.com/dev-empty/image/upload/v1662220599/fw2vmnixtr8rwhb8jga8.png','2022-09-03 15:56:40','2022-09-03 15:56:40'),('99fcfb9a-44e7-4e6d-b44a-ad8203b277e5','Microsoft','https://res.cloudinary.com/dev-empty/image/upload/v1662220609/foaoty9yj8ztpyn3rygg.png','2022-09-03 15:56:49','2022-09-03 15:56:49'),('c0476de9-26ce-4867-bc4a-c25ef4664274','Microsoft','https://res.cloudinary.com/dev-empty/image/upload/v1662220586/cmejwacwcz2ejxhv8wna.png','2022-09-03 15:56:27','2022-09-03 15:56:27'),('e325d7eb-aa0b-4d2c-83de-6e70b57153e3','Microsoft','https://res.cloudinary.com/dev-empty/image/upload/v1662220570/fdsav9xalgcj6mjqs1rn.png','2022-09-03 15:56:10','2022-09-03 15:56:10'),('f70686e7-f4b1-41ef-b4e6-382726fd83c7','Microsoft','https://res.cloudinary.com/dev-empty/image/upload/v1662220578/sbwdmgrtzl0ttu3ntwt1.png','2022-09-03 15:56:19','2022-09-03 15:56:19'),('f767e9b5-85f8-44d4-be27-dfa10f049cf3','Microsoft','https://res.cloudinary.com/dev-empty/image/upload/v1662220561/xfdt2sondensxindk4xf.png','2022-09-03 15:56:01','2022-09-03 15:56:01');
/*!40000 ALTER TABLE `partners` ENABLE KEYS */;
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

-- Dump completed on 2023-04-05 15:29:53
