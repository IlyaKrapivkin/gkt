CREATE TABLE public.setup (
  id serial NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  key varchar(128) NOT NULL,
  CONSTRAINT setup_pkey PRIMARY KEY (id),
  CONSTRAINT setup_unique_key UNIQUE (key)
);

CREATE TABLE public.preset (
  id serial NOT NULL,
  setup_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  value varchar(256) NOT NULL,
  CONSTRAINT preset_pkey PRIMARY KEY (id),
  CONSTRAINT preset_fkey_setup FOREIGN KEY (setup_id) REFERENCES public.setup(id)
);

CREATE TABLE public.account_setup (
  id serial NOT NULL,
  account_id integer NOT NULL,
  preset_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  CONSTRAINT account_setup_pkey PRIMARY KEY (id),
  CONSTRAINT account_setup_fkey_account FOREIGN KEY (account_id) REFERENCES public.account(id),
  CONSTRAINT account_setup_fkey_preset FOREIGN KEY (preset_id) REFERENCES public.preset(id)
);
