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
-- Table structure for table `pod_podcast`
--

DROP TABLE IF EXISTS `pod_podcast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pod_podcast` (
  `pod_id` int(11) NOT NULL AUTO_INCREMENT,
  `pod_nome` varchar(255) NOT NULL,
  `pod_descricao` varchar(255) NOT NULL,
  `pod_criador` varchar(255) NOT NULL,
  `pod_anocriacao` int(11) NOT NULL,
  `pod_duracao` int(11) NOT NULL,
  `pod_endereco_img` varchar(255) NOT NULL,
  `pod_status` tinyint(1) NOT NULL,
  `pod_permissao` int(11) NOT NULL,
  `pod_destaque` tinyint(1) NOT NULL,
  `usu_id` int(11) NOT NULL,
  PRIMARY KEY (`pod_id`),
  UNIQUE KEY `pod_descricao` (`pod_descricao`),
  UNIQUE KEY `pod_endereco_img` (`pod_endereco_img`),
  KEY `usu_id` (`usu_id`),
  CONSTRAINT `pod_podcast_ibfk_1` FOREIGN KEY (`usu_id`) REFERENCES `usu_usuario` (`usu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pod_podcast`
--

LOCK TABLES `pod_podcast` WRITE;
/*!40000 ALTER TABLE `pod_podcast` DISABLE KEYS */;
INSERT INTO `pod_podcast` VALUES (1,'podcast11','sobre podcast11','João',2010,23,'1582225783955-0d32b639602bdc0f85a0e856ad217313.png',1,1,1,1),(44,'podcast2','sobre podcast 2','nathan',2017,60,'./imgs/exemplo1',1,1,0,2),(45,'podcast 5','sobre podcast 5','tester',2020,30,'img/logo.png',1,1,0,1),(46,'podcast3','sobre podcast3','José',2010,23,'img/logo3.png',1,1,1,1),(47,'podcast4','sobre podcast4','João',2010,23,'img/logo4.png',1,1,1,1),(48,'Luiz','122112','1212',1222,1,'1582160772821-7cfe7057928b2aa180ac2865fb8bf676.jpg',1,1,1,1),(52,'Gui','podcast do gui','Guizera',2018,50,'1582224657445-fd0c759ebdd77152897ff87324a7e9d1.jpg',1,1,1,1),(53,'podcast20','podcast 20','Guizera',2018,50,'1583631317756-c17483e86ed0e7bfa3bad914aca2feb2.png',1,1,0,1);
/*!40000 ALTER TABLE `pod_podcast` ENABLE KEYS */;
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
