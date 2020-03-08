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
-- Table structure for table `fbk_feedback`
--

DROP TABLE IF EXISTS `fbk_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fbk_feedback` (
  `fbk_id` int(11) NOT NULL AUTO_INCREMENT,
  `fbk_datacriacao` datetime NOT NULL,
  `fbk_status` tinyint(1) NOT NULL,
  `fbk_valor` int(11) NOT NULL,
  `fbk_valor_status` tinyint(1) NOT NULL,
  `usu_id` int(11) NOT NULL,
  `pod_id` int(11) NOT NULL,
  `tfb_id` int(11) NOT NULL,
  PRIMARY KEY (`fbk_id`),
  KEY `usu_id` (`usu_id`),
  KEY `pod_id` (`pod_id`),
  KEY `tfb_id` (`tfb_id`),
  CONSTRAINT `fbk_feedback_ibfk_1` FOREIGN KEY (`usu_id`) REFERENCES `usu_usuario` (`usu_id`),
  CONSTRAINT `fbk_feedback_ibfk_2` FOREIGN KEY (`pod_id`) REFERENCES `pod_podcast` (`pod_id`),
  CONSTRAINT `fbk_feedback_ibfk_3` FOREIGN KEY (`tfb_id`) REFERENCES `tfb_tipo_feedback` (`tfb_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fbk_feedback`
--

LOCK TABLES `fbk_feedback` WRITE;
/*!40000 ALTER TABLE `fbk_feedback` DISABLE KEYS */;
INSERT INTO `fbk_feedback` VALUES (1,'2019-11-24 21:36:48',1,0,0,2,1,1),(2,'2019-11-24 21:36:48',1,0,0,6,52,1),(3,'2019-11-24 21:36:48',2,0,0,6,52,2),(4,'2019-11-24 21:36:48',1,0,0,2,52,3),(5,'2019-11-24 21:36:48',1,0,0,2,52,3),(6,'2019-11-24 21:36:48',1,0,0,2,52,2),(7,'2019-11-24 21:36:48',1,0,0,2,52,2),(8,'2019-11-24 21:36:48',2,0,0,2,47,2),(9,'2019-11-24 21:36:48',2,0,0,2,48,2);
/*!40000 ALTER TABLE `fbk_feedback` ENABLE KEYS */;
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
