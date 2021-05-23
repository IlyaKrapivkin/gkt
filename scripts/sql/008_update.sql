ALTER TABLE public.config
DROP CONSTRAINT config_unique_key;

ALTER TABLE public.config
ADD CONSTRAINT config_pkey PRIMARY KEY (key);
