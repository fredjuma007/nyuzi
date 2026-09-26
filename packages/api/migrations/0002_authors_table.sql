CREATE TABLE IF NOT EXISTS `authors` (
	`id` text PRIMARY KEY NOT NULL,
	`site_id` text NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`status` text DEFAULT 'active' NOT NULL,
	`auto_discovered` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`site_id`) REFERENCES `sites`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `authors_site_name_idx` ON `authors` (`site_id`, `name` COLLATE NOCASE);
--> statement-breakpoint
INSERT OR IGNORE INTO `sites` (`id`, `name`, `domain`, `owner_email`, `turnstile_enabled`, `moderation_required`, `created_at`)
VALUES ('trc254', 'The Reading Circle', 'readingcircle254.com', 'readingcircle254@gmail.com', 0, 0, unixepoch() * 1000);
--> statement-breakpoint
INSERT OR IGNORE INTO `authors` (`id`, `site_id`, `name`, `email`, `status`, `auto_discovered`, `created_at`)
VALUES
  ('auth_trc_bramwel_kemoli', 'trc254', 'Bramwel Kemoli', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_brenda', 'trc254', 'Brenda Frenjo', 'brendafrenjo@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_chege', 'trc254', 'Chege', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_christine_karori', 'trc254', 'Christine Karori', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_edwin_khakali', 'trc254', 'Edwin Khakali', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_emmanuel_njeru', 'trc254', 'Emmanuel Njeru', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_esther_mboche', 'trc254', 'Esther Mboche', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_esther_ndunge', 'trc254', 'Esther Ndunge', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_faith_waweru', 'trc254', 'Faith Waweru', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_fred', 'trc254', 'Fred Juma', 'fredjuma8@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_john_maingi', 'trc254', 'John Maingi', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_kibichi', 'trc254', 'Kibichi', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_lillian_kwamboka', 'trc254', 'Lillian Kwamboka', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_lorret_trizah_mongina', 'trc254', 'Lorret Trizah Mong''ina', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_nekesa', 'trc254', 'Nekesa', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_pith', 'trc254', 'Pith', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_prudence_mukiri', 'trc254', 'Prudence Mukiri', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_purity_migwi', 'trc254', 'Purity Migwi', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_roney_mwavua', 'trc254', 'Roney Mwavua', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_silent_eyes', 'trc254', 'Silent Eyes', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_sumeiya', 'trc254', 'Sumeiya Juma', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_wences_omondi', 'trc254', 'Wences Omondi', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000);
