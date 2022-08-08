/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : admin

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 08/08/2022 23:49:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_menu
-- ----------------------------
DROP TABLE IF EXISTS `admin_menu`;
CREATE TABLE `admin_menu` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int NOT NULL DEFAULT '0',
  `order` int NOT NULL DEFAULT '0',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permission_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of admin_menu
-- ----------------------------
BEGIN;
INSERT INTO `admin_menu` (`id`, `parent_id`, `order`, `name`, `path`, `permission_id`, `created_at`, `updated_at`) VALUES (1, 0, 1, 'Dashboard', '/', NULL, NULL, '2022-08-07 23:05:15');
INSERT INTO `admin_menu` (`id`, `parent_id`, `order`, `name`, `path`, `permission_id`, `created_at`, `updated_at`) VALUES (2, 0, 3, 'Admin', '/auth', 3, NULL, '2022-08-07 23:05:15');
INSERT INTO `admin_menu` (`id`, `parent_id`, `order`, `name`, `path`, `permission_id`, `created_at`, `updated_at`) VALUES (3, 2, 4, 'Users', 'auth/users', NULL, NULL, '2022-08-07 23:05:15');
INSERT INTO `admin_menu` (`id`, `parent_id`, `order`, `name`, `path`, `permission_id`, `created_at`, `updated_at`) VALUES (4, 2, 5, 'Roles', 'auth/roles', NULL, NULL, '2022-08-07 23:05:15');
INSERT INTO `admin_menu` (`id`, `parent_id`, `order`, `name`, `path`, `permission_id`, `created_at`, `updated_at`) VALUES (5, 2, 6, 'Permission', 'auth/permissions', NULL, NULL, '2022-08-07 23:05:15');
INSERT INTO `admin_menu` (`id`, `parent_id`, `order`, `name`, `path`, `permission_id`, `created_at`, `updated_at`) VALUES (6, 2, 7, 'Menu', 'auth/menu', NULL, NULL, '2022-08-07 23:05:15');
INSERT INTO `admin_menu` (`id`, `parent_id`, `order`, `name`, `path`, `permission_id`, `created_at`, `updated_at`) VALUES (7, 2, 8, 'Operation log', 'auth/logs', 5, NULL, '2022-08-07 23:05:15');
INSERT INTO `admin_menu` (`id`, `parent_id`, `order`, `name`, `path`, `permission_id`, `created_at`, `updated_at`) VALUES (10, 8, 0, 'rtttt', 'yyyy', 4, '2022-07-27 21:19:23', '2022-07-27 21:19:23');
INSERT INTO `admin_menu` (`id`, `parent_id`, `order`, `name`, `path`, `permission_id`, `created_at`, `updated_at`) VALUES (11, 0, 2, 'aaa', '/a/b', 4, '2022-08-07 17:03:17', '2022-08-07 23:05:15');
COMMIT;

-- ----------------------------
-- Table structure for admin_operation_log
-- ----------------------------
DROP TABLE IF EXISTS `admin_operation_log`;
CREATE TABLE `admin_operation_log` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `method` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `input` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `admin_operation_log_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=899 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of admin_operation_log
-- ----------------------------
BEGIN;
INSERT INTO `admin_operation_log` (`id`, `user_id`, `name`, `path`, `method`, `ip`, `input`, `created_at`, `updated_at`) VALUES (894, NULL, 'admin', '/api/auth/currentUser', 'GET', '::ffff:127.0.0.1', '{}', '2022-08-08 23:49:17', '2022-08-08 23:49:17');
INSERT INTO `admin_operation_log` (`id`, `user_id`, `name`, `path`, `method`, `ip`, `input`, `created_at`, `updated_at`) VALUES (895, NULL, 'admin', '/api/admin/permission/query', 'GET', '::ffff:127.0.0.1', '{\"pageSize\":\"1000\"}', '2022-08-08 23:49:18', '2022-08-08 23:49:18');
INSERT INTO `admin_operation_log` (`id`, `user_id`, `name`, `path`, `method`, `ip`, `input`, `created_at`, `updated_at`) VALUES (896, NULL, 'admin', '/api/admin/role/query', 'GET', '::ffff:127.0.0.1', '{\"pageSize\":\"1000\"}', '2022-08-08 23:49:18', '2022-08-08 23:49:18');
INSERT INTO `admin_operation_log` (`id`, `user_id`, `name`, `path`, `method`, `ip`, `input`, `created_at`, `updated_at`) VALUES (897, NULL, 'admin', '/api/admin/user/query', 'GET', '::ffff:127.0.0.1', '{\"current\":\"1\",\"pageSize\":\"20\",\"sorter\":\"\"}', '2022-08-08 23:49:18', '2022-08-08 23:49:18');
INSERT INTO `admin_operation_log` (`id`, `user_id`, `name`, `path`, `method`, `ip`, `input`, `created_at`, `updated_at`) VALUES (898, NULL, 'admin', '/api/admin/log/query', 'GET', '::ffff:127.0.0.1', '{\"current\":\"1\",\"pageSize\":\"20\",\"sorter\":\"\"}', '2022-08-08 23:49:24', '2022-08-08 23:49:24');
COMMIT;

-- ----------------------------
-- Table structure for admin_permissions
-- ----------------------------
DROP TABLE IF EXISTS `admin_permissions`;
CREATE TABLE `admin_permissions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `http_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `http_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_permissions_name_unique` (`name`),
  UNIQUE KEY `admin_permissions_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of admin_permissions
-- ----------------------------
BEGIN;
INSERT INTO `admin_permissions` (`id`, `name`, `slug`, `http_method`, `http_path`, `created_at`, `updated_at`) VALUES (2, 'Dashboard', 'dashboard', 'GET', '/', '2022-08-01 22:14:38', '2022-08-01 22:14:38');
INSERT INTO `admin_permissions` (`id`, `name`, `slug`, `http_method`, `http_path`, `created_at`, `updated_at`) VALUES (3, 'Login', 'auth.login', 'POST', '/auth/login', '2022-08-01 22:14:38', '2022-08-03 22:10:58');
INSERT INTO `admin_permissions` (`id`, `name`, `slug`, `http_method`, `http_path`, `created_at`, `updated_at`) VALUES (4, 'User setting', 'auth.setting', 'GET,PUT', '/auth/setting1l', '2022-08-01 22:14:38', '2022-08-01 22:04:10');
INSERT INTO `admin_permissions` (`id`, `name`, `slug`, `http_method`, `http_path`, `created_at`, `updated_at`) VALUES (5, 'Auth management', 'auth.management', 'ANY', '/auth/roles', '2022-08-01 22:14:38', '2022-08-03 22:10:39');
COMMIT;

-- ----------------------------
-- Table structure for admin_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `admin_role_menu`;
CREATE TABLE `admin_role_menu` (
  `role_id` int NOT NULL,
  `menu_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `admin_role_menu_role_id_menu_id_index` (`role_id`,`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of admin_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `admin_role_menu` (`role_id`, `menu_id`, `created_at`, `updated_at`) VALUES (11, 8, NULL, NULL);
INSERT INTO `admin_role_menu` (`role_id`, `menu_id`, `created_at`, `updated_at`) VALUES (11, 2, NULL, NULL);
INSERT INTO `admin_role_menu` (`role_id`, `menu_id`, `created_at`, `updated_at`) VALUES (1, 7, NULL, NULL);
INSERT INTO `admin_role_menu` (`role_id`, `menu_id`, `created_at`, `updated_at`) VALUES (11, 9, NULL, NULL);
INSERT INTO `admin_role_menu` (`role_id`, `menu_id`, `created_at`, `updated_at`) VALUES (1, 10, NULL, NULL);
INSERT INTO `admin_role_menu` (`role_id`, `menu_id`, `created_at`, `updated_at`) VALUES (14, 11, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for admin_role_permissions
-- ----------------------------
DROP TABLE IF EXISTS `admin_role_permissions`;
CREATE TABLE `admin_role_permissions` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `admin_role_permissions_role_id_permission_id_index` (`role_id`,`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of admin_role_permissions
-- ----------------------------
BEGIN;
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (1, 1, NULL, NULL);
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (2, 1, NULL, NULL);
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (3, 1, NULL, NULL);
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (4, 1, NULL, NULL);
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (5, 1, NULL, NULL);
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (6, 1, NULL, NULL);
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (7, 23, NULL, NULL);
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (7, 5, NULL, NULL);
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (8, 23, NULL, NULL);
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (8, 24, NULL, NULL);
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (9, 5, NULL, NULL);
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (9, 4, NULL, NULL);
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (10, 5, '2022-07-17 13:03:45', '2022-07-17 13:03:45');
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (9, 3, '2022-07-17 23:28:52', '2022-07-17 23:28:52');
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (10, 4, '2022-07-17 23:29:10', '2022-07-17 23:29:10');
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (5, 25, '2022-07-18 22:28:50', '2022-07-18 22:28:50');
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (11, 4, '2022-08-03 22:22:18', '2022-08-03 22:22:18');
INSERT INTO `admin_role_permissions` (`role_id`, `permission_id`, `created_at`, `updated_at`) VALUES (12, 4, '2022-08-03 22:36:22', '2022-08-03 22:36:22');
COMMIT;

-- ----------------------------
-- Table structure for admin_role_users
-- ----------------------------
DROP TABLE IF EXISTS `admin_role_users`;
CREATE TABLE `admin_role_users` (
  `role_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `admin_role_users_role_id_user_id_index` (`role_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of admin_role_users
-- ----------------------------
BEGIN;
INSERT INTO `admin_role_users` (`role_id`, `user_id`, `created_at`, `updated_at`) VALUES (1, 1, NULL, NULL);
INSERT INTO `admin_role_users` (`role_id`, `user_id`, `created_at`, `updated_at`) VALUES (11, 2, NULL, NULL);
INSERT INTO `admin_role_users` (`role_id`, `user_id`, `created_at`, `updated_at`) VALUES (1, 2, NULL, NULL);
INSERT INTO `admin_role_users` (`role_id`, `user_id`, `created_at`, `updated_at`) VALUES (1, 3, NULL, NULL);
INSERT INTO `admin_role_users` (`role_id`, `user_id`, `created_at`, `updated_at`) VALUES (11, 4, NULL, NULL);
INSERT INTO `admin_role_users` (`role_id`, `user_id`, `created_at`, `updated_at`) VALUES (11, 1, NULL, NULL);
INSERT INTO `admin_role_users` (`role_id`, `user_id`, `created_at`, `updated_at`) VALUES (1, 9, NULL, NULL);
INSERT INTO `admin_role_users` (`role_id`, `user_id`, `created_at`, `updated_at`) VALUES (1, 10, NULL, NULL);
INSERT INTO `admin_role_users` (`role_id`, `user_id`, `created_at`, `updated_at`) VALUES (1, 11, NULL, NULL);
INSERT INTO `admin_role_users` (`role_id`, `user_id`, `created_at`, `updated_at`) VALUES (12, 19, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for admin_roles
-- ----------------------------
DROP TABLE IF EXISTS `admin_roles`;
CREATE TABLE `admin_roles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_roles_name_unique` (`name`),
  UNIQUE KEY `admin_roles_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of admin_roles
-- ----------------------------
BEGIN;
INSERT INTO `admin_roles` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES (1, 'Administrator', 'administrator', '2020-08-01 09:14:57', '2020-08-20 09:14:57');
INSERT INTO `admin_roles` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES (14, 'guest', 'guest', '2022-08-07 16:41:21', '2022-08-07 16:41:21');
COMMIT;

-- ----------------------------
-- Table structure for admin_user_permissions
-- ----------------------------
DROP TABLE IF EXISTS `admin_user_permissions`;
CREATE TABLE `admin_user_permissions` (
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `admin_user_permissions_user_id_permission_id_index` (`user_id`,`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of admin_user_permissions
-- ----------------------------
BEGIN;
INSERT INTO `admin_user_permissions` (`user_id`, `permission_id`, `created_at`, `updated_at`) VALUES (2, 5, NULL, NULL);
INSERT INTO `admin_user_permissions` (`user_id`, `permission_id`, `created_at`, `updated_at`) VALUES (3, 2, NULL, NULL);
INSERT INTO `admin_user_permissions` (`user_id`, `permission_id`, `created_at`, `updated_at`) VALUES (1, 1, NULL, NULL);
INSERT INTO `admin_user_permissions` (`user_id`, `permission_id`, `created_at`, `updated_at`) VALUES (1, 4, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for admin_users
-- ----------------------------
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(190) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of admin_users
-- ----------------------------
BEGIN;
INSERT INTO `admin_users` (`id`, `username`, `password`, `name`, `avatar`, `remember_token`, `created_at`, `updated_at`) VALUES (1, 'admin', '$2a$10$4IEX8kKiCGpY1o4kpRBXlOc.Tj8nGd.8w5L2SJ0ZF8K2/6800H.u.', 'admin', NULL, NULL, '2022-08-06 19:19:33', '2022-08-06 19:19:33');
INSERT INTO `admin_users` (`id`, `username`, `password`, `name`, `avatar`, `remember_token`, `created_at`, `updated_at`) VALUES (20, 'test1', '$2a$10$.PKI5TVP4/I88eRnoMnAde94cx.9fB9lVcYL4xtuNU9YxcC7CHIQq', 'test', NULL, NULL, '2022-08-07 16:43:15', '2022-08-07 16:43:15');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
