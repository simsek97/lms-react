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
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `group_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `thumb` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `video` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `video_length` float DEFAULT NULL,
  `is_preview` tinyint(1) DEFAULT '0',
  `short_id` int NOT NULL DEFAULT '0',
  `assets_zip` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `courseId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `videos_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES ('066c6c45-cb41-43d7-b7b8-3ed8aeb4477d','Introduction','Programming For Beginners','https://res.cloudinary.com/dev-empty/image/upload/v1660640937/wdyfkal8ixben5aalosn.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1660640934/jcjji9fsuiccbjiufkw3.mp4',17.5,1,1,NULL,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','db24afee-e132-4be7-a7e7-0c411ccd41ca','2022-08-16 09:08:57','2022-08-16 09:08:57'),('092b2d95-fbf9-428f-b690-5d6c74571edd','Introduction','Basic Programming','https://res.cloudinary.com/dev-empty/image/upload/v1660633890/snyxmtqc13ivp5uu8k7h.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1660633888/zey9eadfw6lnuo64zcbh.mp4',13.723,1,1,NULL,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','d92f38eb-e616-414c-be0c-54e79a6809c7','2022-08-16 07:11:30','2022-08-16 07:11:30'),('11aad455-945c-4ac1-9ff4-b56904afee4c','Project','Project Video','https://res.cloudinary.com/dev-empty/image/upload/v1660633959/wmp0xk23vaqmwfb7bvt3.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1660633957/sgkdeqyltqzizuatjigv.mp4',15.182,0,2,NULL,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','d92f38eb-e616-414c-be0c-54e79a6809c7','2022-08-16 07:12:40','2022-08-16 07:12:40'),('3a858fce-8795-4e9e-b8d4-7fe14e47863e','Introduction','Introduction','https://res.cloudinary.com/dev-empty/image/upload/v1660635409/r5tc5zabmmhagtr4w5wa.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1660635408/w2abrcwvisrbylga6hmb.mp4',13.931,1,1,NULL,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','142a183d-45f1-4447-9aad-64f736471988','2022-08-16 07:36:50','2022-08-16 07:36:50'),('571fcdf8-a9b9-4b36-9a39-9bd67624703a','Introduction','Setting Priorities','https://res.cloudinary.com/dev-empty/image/upload/v1661246823/bgty9tt6hjzysv3watvf.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1661246821/gvwwerhv8bxzdusvvnad.mp4',27.561,0,1,NULL,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','c5c6ee66-84df-46ee-b961-70a3ca173972','2022-08-23 09:27:03','2022-08-23 09:27:03'),('6605e17d-3c26-4d01-9565-f59c9623f5e4','Introduction','Introduction','https://res.cloudinary.com/dev-empty/image/upload/v1660634707/d6rjplfgcmbnrjhaoeva.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1660634704/yhwecyta11b0puhwwkgo.mp4',17.5,0,2,NULL,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','3118e959-37af-453b-889b-e3006446127a','2022-08-16 07:25:08','2022-08-16 07:25:08'),('6afbf2b0-d5f5-405f-be5c-66aff4375d24','Introduction','Introduction, what you will learn and discover','https://res.cloudinary.com/dev-empty/image/upload/v1661246579/pzoul4zxymhwsvgpk1vc.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1661246576/s9rkqxyds8j1eqfq7rik.mp4',3.737,1,1,NULL,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','410d35f5-2fa9-456a-8f8b-0599c1eb45e1','2022-08-23 09:22:59','2022-08-23 09:22:59'),('728f13d3-9116-4b14-984c-0871342fa162','Diet Plan Example for Men','Diet Plan Example for Men','https://res.cloudinary.com/dev-empty/image/upload/v1661321596/krxhp6htpzxbi8rt1g3d.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1661321594/jhkj9brhuzwqqtnllo2v.mp4',3.737,1,1,NULL,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','5335b72b-5ba5-4e55-9f04-bfb0e7f7d39f','2022-08-24 06:13:17','2022-08-24 06:13:17'),('7e0cfbd8-1292-44b1-a93a-0834052422fc','Introduction','SAP ABAP','https://res.cloudinary.com/dev-empty/image/upload/v1660640995/knb0egtwurtagre0c2bn.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1660640994/my3ryeymr8dzhiacrbh8.mp4',7.524,0,2,NULL,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','db24afee-e132-4be7-a7e7-0c411ccd41ca','2022-08-16 09:09:56','2022-08-16 09:09:56'),('7ecba8e0-92d3-4d55-a874-a0bca9038418','Accounting and Finance','Accounting and Finance','https://res.cloudinary.com/dev-empty/image/upload/v1660634657/gdhfodxucmkdwqmmj6fe.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1660634655/fw0ku9yccybda9u9c6gy.mp4',11.762,1,1,NULL,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','3118e959-37af-453b-889b-e3006446127a','2022-08-16 07:24:17','2022-08-16 07:24:17'),('895fac47-e731-412c-a947-27fb489ef818','Introduction','Key 2 Ownership','https://res.cloudinary.com/dev-empty/image/upload/v1661246643/jolpp4lrgckmyyb9gsmd.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1661246641/nialxz7ppsdfozlrkdpk.mp4',15.549,0,2,NULL,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','410d35f5-2fa9-456a-8f8b-0599c1eb45e1','2022-08-23 09:24:03','2022-08-23 09:24:03'),('89ba4507-e450-473e-b82c-1bf86f927ff5','From assessment to action Agile leadership','From assessment to action Agile leadership','https://res.cloudinary.com/dev-empty/image/upload/v1661321328/g6pdnywxtkr4gi5aqsqo.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1661321326/nsrvkzi4dxz2tyqqihey.mp4',15.549,1,1,NULL,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','a4417872-960c-4d9d-9b4c-b05bbc9c4c01','2022-08-24 06:08:49','2022-08-24 06:08:49'),('8b2ce5c0-232a-4441-896b-d78fe64bc17f','Introduction','Basic business idea','https://res.cloudinary.com/dev-empty/image/upload/v1660634228/z9y1sljcm4akckkn1n1w.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1660634226/lnmkkzzprveknhdv4mz8.mp4',17.5,1,1,NULL,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','a06444c4-037f-4787-ba5f-9d28a8f1f4e1','2022-08-16 07:17:08','2022-08-16 07:17:08'),('9bd8d2a6-8c9f-482a-bb11-bdc83fcf6e3a','Before We Begin','Before We Begin','https://res.cloudinary.com/dev-empty/image/upload/v1661322036/ifsvlvrm0leoct92zhwo.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1661322032/jkoszozrilpyne8mn65i.mp4',16.7033,1,1,NULL,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','742d231f-2d5b-42b6-993e-1edeba676f45','2022-08-24 06:20:37','2022-08-24 06:20:37'),('a7aad65e-568b-4e09-ac2f-6a23b5640c06','Introduction','Installing VirtualBox on Intel-Based Macs','https://res.cloudinary.com/dev-empty/image/upload/v1661246261/aiuyy5fu09gzt4c4jtrj.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1661246259/uomy6a0qysnmgicbb6lv.mp4',13.931,0,3,NULL,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','130bcd58-0650-4efe-a401-dc949373c699','2022-08-23 09:17:42','2022-08-23 09:17:42'),('a8aec4be-707b-410d-a887-ad33d660d1ac','Introduction','Course introduction','https://res.cloudinary.com/dev-empty/image/upload/v1661320758/zlllw1oqwpzoc8cjfxtz.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1661320753/umpgo4hxrxpst5fddnik.mp4',15.182,1,1,NULL,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','72a7266e-ba51-42ea-bfc2-4ba9aaa262e2','2022-08-24 05:59:19','2022-08-24 05:59:19'),('bbe49bf9-86a0-41b9-9ec1-b4f7ef966e7c','Introduction 2','Introduction 2','https://res.cloudinary.com/dev-empty/image/upload/v1661317924/nkxupqaykiyns4q5pft9.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1661317921/ryn66wyo1uqcfjfsgbh5.mp4',15.182,0,0,NULL,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','142a183d-45f1-4447-9aad-64f736471988','2022-08-24 05:12:05','2022-08-24 05:12:05'),('bf3be034-ef30-47c0-afe3-75f2fa15e09c','Introduction','Introduction','https://res.cloudinary.com/dev-empty/image/upload/v1661246119/polfjt273mrfivldozwf.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1661246117/bbwy7trp6707pwcbzxow.mp4',13.723,1,1,NULL,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','130bcd58-0650-4efe-a401-dc949373c699','2022-08-23 09:15:19','2022-08-23 09:15:19'),('d0ebd79e-08f2-40db-89b2-703f886a7e9d','Introduction','Lenux Distributions','https://res.cloudinary.com/dev-empty/image/upload/v1661246202/s96gtx40hjsdvmmuz7tv.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1661246197/j0l1gvvlcwstb2pxjay6.mp4',15.182,0,2,NULL,'89aeed13-5b6e-4e0d-84af-a24793a83cd7','130bcd58-0650-4efe-a401-dc949373c699','2022-08-23 09:16:42','2022-08-23 09:16:42'),('f2587d22-96e2-4349-ae57-60d907b2a500','Benefits of exercise','Benefits of exercise','https://res.cloudinary.com/dev-empty/image/upload/v1661321832/lrkg87blmrq17ywjxjpt.jpg','https://res.cloudinary.com/dev-empty/video/upload/v1661321830/y3xopkmxg7kvwtjhftt8.mp4',8.171,1,1,NULL,'ee2ddc7c-08ec-430b-afd0-4da0184bcc4c','308cdeb3-b61f-4fca-a139-9bb219282dd3','2022-08-24 06:17:12','2022-08-24 06:17:12');
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
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

-- Dump completed on 2023-04-05 15:29:55
