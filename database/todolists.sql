CREATE DATABASE `todolist`;

CREATE TABLE `todolists` (
  `id` bigint(20) NOT NULL,
  `content` varchar(255)  NOT NULL,
  `created_at` bigint(100) DEFAULT NULL,
  `updated_at` bigint(100) DEFAULT NULL,
  `completed` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY(`id`)
);

