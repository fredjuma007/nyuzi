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
  ('auth_trc_fred', 'trc254', 'Fred Juma', 'fredjuma8@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_brenda', 'trc254', 'Brenda Frenjo', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000),
  ('auth_trc_sumeiya', 'trc254', 'Sumeiya Juma', 'readingcircle254@gmail.com', 'active', 0, unixepoch() * 1000);
