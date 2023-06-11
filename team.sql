
CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `event` varchar(128) NOT NULL,
  `msg` varchar(300) NOT NULL,
  `type` set('finding','hiring') NOT NULL,
  `team_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `post` (`id`, `name`, `event`, `msg`, `type`, `team_id`) VALUES
(21, 'need login', 'Cult Treasure Hunt', 'google dev', 'finding', 18),
(22, 'need login', 'Cult Treasure Hunt', 'lelo bhai muje pls', 'finding', 18),
(23, 'need login', 'Cult Treasure Hunt', 'React bachpan se sikh rah hu', 'finding', 18),
(24, 'Denzil', 'Kickstart', 'Django 100 AWS 100', '', NULL);

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `leader` varchar(128) NOT NULL,
  `event` varchar(128) NOT NULL,
  `members` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`members`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `team` (`id`, `leader`, `event`, `members`) VALUES
(18, 'need login', 'Cult Treasure Hunt', '[\"Shaun\"]');


ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id` (`team_id`);

ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

ALTER TABLE `post`
  ADD CONSTRAINT `team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`);
COMMIT;
