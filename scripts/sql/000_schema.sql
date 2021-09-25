CREATE TABLE IF NOT EXISTS public.config (
  key varchar(256) NOT NULL,
  value varchar(256) NOT NULL,
  CONSTRAINT config_pkey PRIMARY KEY (key)
);

CREATE TABLE IF NOT EXISTS public.currency (
  id serial NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  sign varchar(64) NOT NULL,
  code varchar(64) NOT NULL,
  country varchar(128) NOT NULL,
  CONSTRAINT currency_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.setup (
  id serial NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  key varchar(128) NOT NULL,
  CONSTRAINT setup_pkey PRIMARY KEY (id),
  CONSTRAINT setup_unique_key UNIQUE (key)
);

CREATE TABLE IF NOT EXISTS public.preset (
  id serial NOT NULL,
  setup_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  value varchar(256) NOT NULL,
  CONSTRAINT preset_pkey PRIMARY KEY (id),
  CONSTRAINT preset_fkey_setup FOREIGN KEY (setup_id) REFERENCES public.setup(id)
);

CREATE TABLE IF NOT EXISTS public.role (
  id serial NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  name varchar(16) NOT NULL,
  about varchar(256) NULL,
  CONSTRAINT role_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.person (
  id serial NOT NULL,
  role_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  login varchar(64) NOT NULL,
  reserve varchar(64) NULL,
  hash varchar(256) NULL,
  valid BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT person_pkey PRIMARY KEY (id),
  CONSTRAINT person_fkey_role FOREIGN KEY (role_id) REFERENCES public.role(id)
);

CREATE TABLE IF NOT EXISTS public.code (
  id serial NOT NULL,
  person_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  expire_date timestamptz NOT NULL,
  accept_date timestamptz NULL,
  code varchar(8) NOT NULL,
  hit smallint NOT NULL DEFAULT 0,
  CONSTRAINT code_pkey PRIMARY KEY (id),
  CONSTRAINT code_fkey_person FOREIGN KEY (person_id) REFERENCES public.person(id)
);

CREATE TABLE IF NOT EXISTS public.session (
  id serial NOT NULL,
  person_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  token varchar(128) NOT NULL,
  CONSTRAINT session_pkey PRIMARY KEY (id),
  CONSTRAINT session_fkey_person FOREIGN KEY (person_id) REFERENCES public.person(id)
);

CREATE TABLE IF NOT EXISTS public.account (
  id serial NOT NULL,
  person_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  alias varchar(16) NULL,
  CONSTRAINT account_pkey PRIMARY KEY (id),
  CONSTRAINT account_fkey_person FOREIGN KEY (person_id) REFERENCES public.person(id)
);

CREATE TABLE IF NOT EXISTS public.account_setup (
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

CREATE TABLE IF NOT EXISTS public.wallet (
  id serial NOT NULL,
  account_id integer NOT NULL,
  currency_id integer NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  alias varchar(16) NULL,
  main BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT wallet_pkey PRIMARY KEY (id),
  CONSTRAINT wallet_fkey_account FOREIGN KEY (account_id) REFERENCES public.account(id),
  CONSTRAINT wallet_fkey_currency FOREIGN KEY (currency_id) REFERENCES public.currency(id)
);

CREATE TABLE IF NOT EXISTS public.color (
  id serial NOT NULL,
  account_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  sign varchar(256) NOT NULL,
  CONSTRAINT color_pkey PRIMARY KEY (id),
  CONSTRAINT color_fkey_account FOREIGN KEY (account_id) REFERENCES public.account(id)
);

CREATE TABLE IF NOT EXISTS public.category (
  id serial NOT NULL,
  account_id integer NOT NULL,
  color_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  name varchar(128) NOT NULL,
  CONSTRAINT category_pkey PRIMARY KEY (id),
  CONSTRAINT category_fkey_color FOREIGN KEY (color_id) REFERENCES public.color(id)
);

CREATE TABLE IF NOT EXISTS public.group (
  id serial NOT NULL,
  account_id integer NOT NULL,
  category_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  name varchar(128) NOT NULL,
  CONSTRAINT group_pkey PRIMARY KEY (id),
  CONSTRAINT group_fkey_category FOREIGN KEY (category_id) REFERENCES public.category(id)
);

CREATE TABLE IF NOT EXISTS public.transfer (
  id serial NOT NULL,
  account_id integer NOT NULL,
  exwallet_id integer NOT NULL,
  wallet_id integer NOT NULL,
  currency_id integer NOT NULL,
  category_id integer NOT NULL,
  group_id integer NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  amount integer NOT NULL,
  CONSTRAINT transfer_pkey PRIMARY KEY (id),
  CONSTRAINT transfer_fkey_account FOREIGN KEY (account_id) REFERENCES public.account(id),
  CONSTRAINT transfer_fkey_exwallet FOREIGN KEY (exwallet_id) REFERENCES public.wallet(id),
  CONSTRAINT transfer_fkey_wallet FOREIGN KEY (wallet_id) REFERENCES public.wallet(id),
  CONSTRAINT transfer_fkey_currency FOREIGN KEY (currency_id) REFERENCES public.currency(id),
  CONSTRAINT transfer_fkey_category FOREIGN KEY (category_id) REFERENCES public.category(id),
  CONSTRAINT transfer_fkey_group FOREIGN KEY (group_id) REFERENCES public.group(id)
);

CREATE TABLE IF NOT EXISTS public.exchange (
  id serial NOT NULL,
  account_id integer NOT NULL,
  wallet_id integer NOT NULL,
  excurrency_id integer NOT NULL,
  currency_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  examount integer NOT NULL,
  amount integer NOT NULL,
  rate integer NOT NULL,
  bank varchar(256) NULL,
  CONSTRAINT exchange_pkey PRIMARY KEY (id),
  CONSTRAINT exchange_fkey_account FOREIGN KEY (account_id) REFERENCES public.account(id),
  CONSTRAINT exchange_fkey_wallet FOREIGN KEY (wallet_id) REFERENCES public.wallet(id),
  CONSTRAINT exchange_fkey_excurrency FOREIGN KEY (currency_id) REFERENCES public.currency(id),
  CONSTRAINT exchange_fkey_currency FOREIGN KEY (currency_id) REFERENCES public.currency(id)
);

CREATE TABLE IF NOT EXISTS public.minus (
  id serial NOT NULL,
  account_id integer NOT NULL,
  wallet_id integer NOT NULL,
  currency_id integer NOT NULL,
  category_id integer NOT NULL,
  group_id integer NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  amount integer NOT NULL,
  CONSTRAINT minus_pkey PRIMARY KEY (id),
  CONSTRAINT minus_fkey_account FOREIGN KEY (account_id) REFERENCES public.account(id),
  CONSTRAINT minus_fkey_wallet FOREIGN KEY (wallet_id) REFERENCES public.wallet(id),
  CONSTRAINT minus_fkey_currency FOREIGN KEY (currency_id) REFERENCES public.currency(id),
  CONSTRAINT minus_fkey_category FOREIGN KEY (category_id) REFERENCES public.category(id),
  CONSTRAINT minus_fkey_group FOREIGN KEY (group_id) REFERENCES public.group(id)
);

CREATE TABLE IF NOT EXISTS public.plus (
  id serial NOT NULL,
  account_id integer NOT NULL,
  wallet_id integer NOT NULL,
  currency_id integer NOT NULL,
  category_id integer NOT NULL,
  group_id integer NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  amount integer NOT NULL,
  CONSTRAINT plus_pkey PRIMARY KEY (id),
  CONSTRAINT plus_fkey_account FOREIGN KEY (account_id) REFERENCES public.account(id),
  CONSTRAINT plus_fkey_wallet FOREIGN KEY (wallet_id) REFERENCES public.wallet(id),
  CONSTRAINT plus_fkey_currency FOREIGN KEY (currency_id) REFERENCES public.currency(id),
  CONSTRAINT plus_fkey_category FOREIGN KEY (category_id) REFERENCES public.category(id),
  CONSTRAINT plus_fkey_group FOREIGN KEY (group_id) REFERENCES public.group(id)
);

CREATE TABLE IF NOT EXISTS public.balance (
  id serial NOT NULL,
  wallet_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  amount integer NOT NULL,
  income integer NOT NULL,
  expense integer NOT NULL,
  CONSTRAINT balance_pkey PRIMARY KEY (id),
  CONSTRAINT balance_fkey_wallet FOREIGN KEY (wallet_id) REFERENCES public.wallet(id)
);
