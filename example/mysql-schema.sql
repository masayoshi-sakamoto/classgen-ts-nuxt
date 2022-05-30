/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `admin_organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_organization` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '管理者ID',
  `organization_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '店舗ID',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_organization_admin_id_organization_id_index` (`admin_id`,`organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `admin_passwords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_passwords` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ユーザーID(メールアドレス)',
  `code` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'アクティベートコード',
  `expired` timestamp NULL DEFAULT NULL COMMENT '有効期限',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_passwords_created_at_index` (`created_at`),
  KEY `admin_passwords_updated_at_index` (`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `admin_shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_shop` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '管理者ID',
  `shop_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '店舗ID',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_shop_admin_id_shop_id_index` (`admin_id`,`shop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `role_id` char(36) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'ロールID',
  `organization_id` char(36) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'デフォルト組織ID',
  `shop_id` char(36) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'デフォルト店舗ID',
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '名前',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ユーザーID(メールアドレス)',
  `password` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'パスワード',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_username_unique` (`username`),
  KEY `admins_username_password_index` (`username`,`password`),
  KEY `admins_created_at_index` (`created_at`),
  KEY `admins_updated_at_index` (`updated_at`),
  KEY `admins_role_id_index` (`role_id`),
  KEY `admins_organization_id_index` (`organization_id`),
  KEY `admins_shop_id_index` (`shop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `casts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `casts` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `shop_id` char(36) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '店舗ID',
  `employee_id` char(36) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '雇用者ID',
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'キャスト名',
  `media` longtext COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'プロフィール画像' CHECK (json_valid(`media`)),
  `profiles` longtext COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'プロフィールデータ' CHECK (json_valid(`profiles`)),
  `order` int(10) unsigned DEFAULT 0 COMMENT '並び順',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `casts_created_at_index` (`created_at`),
  KEY `casts_updated_at_index` (`updated_at`),
  KEY `casts_shop_id_index` (`shop_id`),
  KEY `casts_employee_id_index` (`employee_id`),
  KEY `casts_name_index` (`name`),
  KEY `casts_order_index` (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contents` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `admin_id` char(36) COLLATE utf8mb4_bin NOT NULL COMMENT '編集者ID',
  `shop_id` char(36) COLLATE utf8mb4_bin NOT NULL COMMENT '店舗ID',
  `formwork_id` char(36) COLLATE utf8mb4_bin NOT NULL COMMENT '型枠ID',
  `title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'タイトル',
  `parts` longtext COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'コンテンツ情報' CHECK (json_valid(`parts`)),
  `status` varchar(255) COLLATE utf8mb4_bin DEFAULT 'draft' COMMENT '公開ステータス',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contents_created_at_index` (`created_at`),
  KEY `contents_updated_at_index` (`updated_at`),
  KEY `contents_admin_id_index` (`admin_id`),
  KEY `contents_shop_id_index` (`shop_id`),
  KEY `contents_formwork_id_index` (`formwork_id`),
  KEY `contents_title_index` (`title`),
  KEY `contents_status_index` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `organization_id` char(36) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '組織ID',
  `last` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '性',
  `first` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '名',
  `sei` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '性カナ',
  `mei` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '名カナ',
  `gender` int(10) unsigned DEFAULT NULL COMMENT '性別',
  `zipcode` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '郵便番号',
  `prefecture` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '都道府県',
  `city` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '市区町村',
  `address` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '住所',
  `building` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '建物名',
  `phone` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '携帯番号',
  `birthday` date DEFAULT NULL COMMENT '生年月日',
  `identification` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '本人確認書類',
  `resident_card` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '住民票',
  `joined_on` date DEFAULT NULL COMMENT '雇用日',
  `left_on` date DEFAULT NULL COMMENT '退社日',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employees_created_at_index` (`created_at`),
  KEY `employees_updated_at_index` (`updated_at`),
  KEY `employees_organization_id_index` (`organization_id`),
  KEY `employees_last_index` (`last`),
  KEY `employees_first_index` (`first`),
  KEY `employees_sei_index` (`sei`),
  KEY `employees_mei_index` (`mei`),
  KEY `employees_gender_index` (`gender`),
  KEY `employees_zipcode_index` (`zipcode`),
  KEY `employees_prefecture_index` (`prefecture`),
  KEY `employees_city_index` (`city`),
  KEY `employees_address_index` (`address`),
  KEY `employees_building_index` (`building`),
  KEY `employees_phone_index` (`phone`),
  KEY `employees_birthday_index` (`birthday`),
  KEY `employees_joined_on_index` (`joined_on`),
  KEY `employees_left_on_index` (`left_on`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `formworks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formworks` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `shop_id` char(36) COLLATE utf8mb4_bin NOT NULL COMMENT '店舗ID',
  `title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'タイトル',
  `subtitle` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'サブタイトル',
  `description` text COLLATE utf8mb4_bin DEFAULT NULL COMMENT '説明',
  `elements` longtext COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'スキーマ定義' CHECK (json_valid(`elements`)),
  `order` int(10) unsigned DEFAULT 0 COMMENT '並び順',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `formworks_created_at_index` (`created_at`),
  KEY `formworks_updated_at_index` (`updated_at`),
  KEY `formworks_shop_id_index` (`shop_id`),
  KEY `formworks_title_index` (`title`),
  KEY `formworks_subtitle_index` (`subtitle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `invitations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invitations` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `role_id` char(36) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'ロールID',
  `organization_id` char(36) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '組織ID',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ユーザーID(メールアドレス)',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invitations_role_id_index` (`role_id`),
  KEY `invitations_organization_id_index` (`organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `layouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `layouts` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `shop_id` char(36) COLLATE utf8mb4_bin NOT NULL COMMENT '店舗ID',
  `title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'タイトル',
  `blocks` longtext COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'レイアウト情報' CHECK (json_valid(`blocks`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `layouts_created_at_index` (`created_at`),
  KEY `layouts_updated_at_index` (`updated_at`),
  KEY `layouts_shop_id_index` (`shop_id`),
  KEY `layouts_title_index` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `parent_id` char(36) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '親ID',
  `admin_id` char(36) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '管理者ID',
  `shop_id` char(36) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '店舗ID',
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '名前',
  `is_directory` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'ディレクトリフラグ',
  `properties` longtext COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'プロパティ' CHECK (json_valid(`properties`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `media_parent_id_is_directory_index` (`parent_id`,`is_directory`),
  KEY `media_created_at_index` (`created_at`),
  KEY `media_updated_at_index` (`updated_at`),
  KEY `media_parent_id_index` (`parent_id`),
  KEY `media_admin_id_index` (`admin_id`),
  KEY `media_shop_id_index` (`shop_id`),
  KEY `media_name_index` (`name`),
  KEY `media_is_directory_index` (`is_directory`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organizations` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '組織名',
  `order` int(10) unsigned DEFAULT 0 COMMENT '並び順',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `organizations_created_at_index` (`created_at`),
  KEY `organizations_updated_at_index` (`updated_at`),
  KEY `organizations_order_index` (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profiles` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `shop_id` char(36) COLLATE utf8mb4_bin NOT NULL COMMENT '店舗ID',
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'プロフィール項目グループ名',
  `type` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'グループタイプ',
  `fields` longtext COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'フィールドデータ' CHECK (json_valid(`fields`)),
  `order` int(10) unsigned DEFAULT 0 COMMENT '並び順',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profiles_created_at_index` (`created_at`),
  KEY `profiles_updated_at_index` (`updated_at`),
  KEY `profiles_shop_id_index` (`shop_id`),
  KEY `profiles_name_index` (`name`),
  KEY `profiles_type_index` (`type`),
  KEY `profiles_order_index` (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'ロール名',
  `policy` longtext COLLATE utf8mb4_bin DEFAULT NULL COMMENT '権限内容' CHECK (json_valid(`policy`)),
  `is_show` tinyint(1) NOT NULL DEFAULT 1 COMMENT '表示フラグ',
  `order` int(10) unsigned DEFAULT 0 COMMENT '並び順',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roles_created_at_index` (`created_at`),
  KEY `roles_updated_at_index` (`updated_at`),
  KEY `roles_name_index` (`name`),
  KEY `roles_order_index` (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `shops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shops` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `organization_id` char(36) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '組織ID',
  `identifier` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '店舗ID',
  `domain` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'ドメイン名',
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '店舗名',
  `profiles` longtext COLLATE utf8mb4_bin DEFAULT NULL COMMENT '店舗プロフィール' CHECK (json_valid(`profiles`)),
  `properties` longtext COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'サイトプロパティ' CHECK (json_valid(`properties`)),
  `order` int(10) unsigned DEFAULT 0 COMMENT '並び順',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `shops_created_at_index` (`created_at`),
  KEY `shops_updated_at_index` (`updated_at`),
  KEY `shops_organization_id_index` (`organization_id`),
  KEY `shops_identifier_index` (`identifier`),
  KEY `shops_domain_index` (`domain`),
  KEY `shops_name_index` (`name`),
  KEY `shops_order_index` (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sitemaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sitemaps` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `admin_id` char(36) COLLATE utf8mb4_bin NOT NULL COMMENT '編集者ID',
  `shop_id` char(36) COLLATE utf8mb4_bin NOT NULL COMMENT '店舗ID',
  `pages` longtext COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'ページ情報' CHECK (json_valid(`pages`)),
  `status` varchar(255) COLLATE utf8mb4_bin DEFAULT 'draft' COMMENT '公開ステータス',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sitemaps_created_at_index` (`created_at`),
  KEY `sitemaps_updated_at_index` (`updated_at`),
  KEY `sitemaps_admin_id_index` (`admin_id`),
  KEY `sitemaps_shop_id_index` (`shop_id`),
  KEY `sitemaps_status_index` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `templates` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'テンプレート名',
  `data` longtext COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'JSONデータ' CHECK (json_valid(`data`)),
  `order` int(10) unsigned DEFAULT 0 COMMENT '並び順',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `templates_created_at_index` (`created_at`),
  KEY `templates_updated_at_index` (`updated_at`),
  KEY `templates_name_index` (`name`),
  KEY `templates_order_index` (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `user_passwords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_passwords` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ユーザーID(メールアドレス)',
  `code` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'アクティベートコード',
  `expired` timestamp NULL DEFAULT NULL COMMENT '有効期限',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_passwords_created_at_index` (`created_at`),
  KEY `user_passwords_updated_at_index` (`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` char(36) COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ユーザーID(メールアドレス)',
  `password` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'パスワード',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  KEY `users_username_password_index` (`username`,`password`),
  KEY `users_created_at_index` (`created_at`),
  KEY `users_updated_at_index` (`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

INSERT INTO `migrations` VALUES (1,'2019_12_14_000001_create_personal_access_tokens_table',1);
INSERT INTO `migrations` VALUES (2,'2022_04_06_182257_create_jobs_table',1);
INSERT INTO `migrations` VALUES (3,'2022_04_06_182324_create_job_batches_table',1);
INSERT INTO `migrations` VALUES (4,'2022_04_06_182344_create_failed_jobs_table',1);
INSERT INTO `migrations` VALUES (5,'2022_04_06_195235_create_admins_table',1);
INSERT INTO `migrations` VALUES (6,'2022_04_06_195416_create_employees_table',1);
INSERT INTO `migrations` VALUES (7,'2022_04_06_195433_create_users_table',1);
INSERT INTO `migrations` VALUES (8,'2022_04_06_195610_create_organizations_table',1);
INSERT INTO `migrations` VALUES (9,'2022_04_06_195620_create_shops_table',1);
INSERT INTO `migrations` VALUES (10,'2022_04_17_171834_create_admin_shop_table',1);
INSERT INTO `migrations` VALUES (11,'2022_04_17_172103_create_admin_passwords_table',1);
INSERT INTO `migrations` VALUES (12,'2022_04_17_172224_create_user_passwords_table',1);
INSERT INTO `migrations` VALUES (13,'2022_04_18_014616_create_templates_table',1);
INSERT INTO `migrations` VALUES (14,'2022_04_18_131254_create_admin_organization_table',1);
INSERT INTO `migrations` VALUES (15,'2022_04_21_095342_create_roles_table',1);
INSERT INTO `migrations` VALUES (16,'2022_04_21_165113_create_invitations_table',1);
INSERT INTO `migrations` VALUES (17,'2022_04_22_075655_create_layouts_table',1);
INSERT INTO `migrations` VALUES (18,'2022_04_23_142540_create_sitemaps_table',1);
INSERT INTO `migrations` VALUES (19,'2022_04_27_181053_create_contents_table',1);
INSERT INTO `migrations` VALUES (20,'2022_04_27_182433_create_formworks_table',1);
INSERT INTO `migrations` VALUES (21,'2022_05_07_030530_create_media_table',1);
INSERT INTO `migrations` VALUES (22,'2022_05_17_193456_create_casts_table',1);
INSERT INTO `migrations` VALUES (23,'2022_05_17_195259_create_profiles_table',1);
INSERT INTO `migrations` VALUES (25,'2022_05_25_153103_create_sessions_table',2);
