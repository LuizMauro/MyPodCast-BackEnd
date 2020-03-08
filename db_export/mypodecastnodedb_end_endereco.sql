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
-- Table structure for table `end_endereco`
--

DROP TABLE IF EXISTS `end_endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `end_endereco` (
  `end_id` int(11) NOT NULL AUTO_INCREMENT,
  `end_link` varchar(255) NOT NULL,
  `pod_id` int(11) NOT NULL,
  PRIMARY KEY (`end_id`),
  UNIQUE KEY `end_link` (`end_link`),
  KEY `pod_id` (`pod_id`),
  CONSTRAINT `end_endereco_ibfk_1` FOREIGN KEY (`pod_id`) REFERENCES `pod_podcast` (`pod_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `end_endereco`
--

LOCK TABLES `end_endereco` WRITE;
/*!40000 ALTER TABLE `end_endereco` DISABLE KEYS */;
INSERT INTO `end_endereco` VALUES (1,'podcast210.com',1),(95,'pod120.com',1),(96,'podd210.com',1),(100,'site de teste',1),(103,'site de teste1',1),(104,'site de teste2',1),(109,'newsite1.com',45),(110,'newsite2.com',45),(111,'newsite3.com',45),(112,'sitekja.com',46),(113,'sitebk.com',46),(114,'sitecb.com',46),(115,'sitdekja.com',47),(116,'sitesbk.com',47),(117,'',47),(121,'gui1.com',52),(122,'gui2.com',52),(123,'daaasdsa.com',52),(124,'podcast20.com',53),(125,'pod20.com',53),(126,'das.com',53);
/*!40000 ALTER TABLE `end_endereco` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-08  1:14:08
