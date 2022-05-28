CREATE TABLE `admin_organization` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '管理者ID',
  `organization_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '店舗ID',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_organization_admin_id_organization_id_index` (`admin_id`,`organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
