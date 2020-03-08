-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: mypodecastnodedb
-- ------------------------------------------------------
-- Server version	8.0.17

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

--
-- Table structure for table `pct_podcast_categoria`
--

DROP TABLE IF EXISTS `pct_podcast_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pct_podcast_categoria` (
  `pct_id` int(11) NOT NULL AUTO_INCREMENT,
  `pod_id` int(11) NOT NULL,
  `ctg_id` int(11) NOT NULL,
  PRIMARY KEY (`pct_id`),
  KEY `pod_id` (`pod_id`),
  KEY `ctg_id` (`ctg_id`),
  CONSTRAINT `pct_podcast_categoria_ibfk_1` FOREIGN KEY (`pod_id`) REFERENCES `pod_podcast` (`pod_id`) ON DELETE CASCADE,
  CONSTRAINT `pct_podcast_categoria_ibfk_2` FOREIGN KEY (`ctg_id`) REFERENCES `ctg_categoria` (`ctg_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pct_podcast_categoria`
--

LOCK TABLES `pct_podcast_categoria` WRITE;
/*!40000 ALTER TABLE `pct_podcast_categoria` DISABLE KEYS */;
INSERT INTO `pct_podcast_categoria` VALUES (44,46,3),(45,47,2),(46,47,3),(47,45,1),(50,1,3),(53,52,2),(54,52,3),(55,53,2),(56,53,3);
/*!40000 ALTER TABLE `pct_podcast_categoria` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-08  1:14:07
