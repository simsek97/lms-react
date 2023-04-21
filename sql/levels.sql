CREATE TABLE `levels` (
  `id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

INSERT INTO `` (`id`,`name`,`slug`,`created_at`,`updated_at`) VALUES ('0b950a9a-fbea-49c2-8ca6-407e15b99132','Kindergarten','kindergarten','2023-04-10 01:35:26','2023-04-10 01:35:26');
INSERT INTO `` (`id`,`name`,`slug`,`created_at`,`updated_at`) VALUES ('2bc1195d-e08d-4df2-93a6-3b415294bc9f','First Grade','first-grade','2023-04-10 01:35:48','2023-04-10 01:35:48');
INSERT INTO `` (`id`,`name`,`slug`,`created_at`,`updated_at`) VALUES ('738c6aba-e83c-4879-8aab-505eb1387d9f','Pre-K','pre-k','2023-04-10 01:35:14','2023-04-10 01:35:14');
INSERT INTO `` (`id`,`name`,`slug`,`created_at`,`updated_at`) VALUES ('8b31395a-deb0-4d25-b308-005b401084fd','Second Grade','second-grade','2023-04-10 01:35:53','2023-04-10 01:35:53');
INSERT INTO `` (`id`,`name`,`slug`,`created_at`,`updated_at`) VALUES ('9fa0e57e-25e4-46a1-a8cf-8b873fe60ff3','Fourth Grade','fourth-grade','2023-04-10 01:36:04','2023-04-10 01:36:04');
INSERT INTO `` (`id`,`name`,`slug`,`created_at`,`updated_at`) VALUES ('ef327f78-6065-41c4-8c1e-f95ba14bcd01','Third Grade','third-grade','2023-04-10 01:35:58','2023-04-10 01:35:58');
