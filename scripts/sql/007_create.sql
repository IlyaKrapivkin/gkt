CREATE TABLE public.config (
  key varchar(256) NOT NULL,
  value varchar(256) NOT NULL,
  CONSTRAINT config_unique_key UNIQUE (key)
);
