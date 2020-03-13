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
-- Table structure for table `usu_usuario`
--

DROP TABLE IF EXISTS `usu_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usu_usuario` (
  `usu_id` int(11) NOT NULL AUTO_INCREMENT,
  `usu_nome` varchar(255) NOT NULL,
  `usu_senha` varchar(255) NOT NULL,
  `usu_email` varchar(255) NOT NULL,
  `usu_cpf` varchar(255) NOT NULL,
  `usu_status` tinyint(1) NOT NULL,
  `usu_premium` tinyint(1) NOT NULL,
  `tus_id` int(11) NOT NULL,
  PRIMARY KEY (`usu_id`),
  UNIQUE KEY `usu_nome` (`usu_nome`),
  UNIQUE KEY `usu_email` (`usu_email`),
  UNIQUE KEY `usu_cpf` (`usu_cpf`),
  KEY `tus_id` (`tus_id`),
  CONSTRAINT `usu_usuario_ibfk_1` FOREIGN KEY (`tus_id`) REFERENCES `tus_tipo_usuario` (`tus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usu_usuario`
--

LOCK TABLES `usu_usuario` WRITE;
/*!40000 ALTER TABLE `usu_usuario` DISABLE KEYS */;
INSERT INTO `usu_usuario` VALUES (1,'Nathanzera','$2a$08$2rYSOOZ/Fkwy6xR6f7MPRObWtHAqWz/SerjSo9nE3xqcDNkeB4UhK','nathanzudo@gmail.com','12345',0,0,1),(2,'adm','$2a$08$2rYSOOZ/Fkwy6xR6f7MPRObWtHAqWz/SerjSo9nE3xqcDNkeB4UhK','adm@gmail.com','1234534',1,0,4),(5,'joao','$2a$08$2rYSOOZ/Fkwy6xR6f7MPRObWtHAqWz/SerjSo9nE3xqcDNkeB4UhK','joao@gmail.com','34334',1,0,2),(6,'mod','$2a$08$2rYSOOZ/Fkwy6xR6f7MPRObWtHAqWz/SerjSo9nE3xqcDNkeB4UhK','mod@gmail.com','43223',1,0,3),(7,'user','$2a$08$2rYSOOZ/Fkwy6xR6f7MPRObWtHAqWz/SerjSo9nE3xqcDNkeB4UhK','user@gmail.com','123.456.789-32',1,0,1);
/*!40000 ALTER TABLE `usu_usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-08  1:14:09
