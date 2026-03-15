SELECT cron.alter_job(
  (SELECT jobid FROM cron.job WHERE jobname = 'weekly-tech-spec-draft'),
  '0 13 * * 0'
);