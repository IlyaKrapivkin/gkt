CREATE TABLE public.account (
  id serial NOT NULL,
  person_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  alias varchar(16) NULL,
  CONSTRAINT account_pkey PRIMARY KEY (id),
  CONSTRAINT account_fkey_person FOREIGN KEY (person_id) REFERENCES public.person(id)
);

CREATE TABLE public.currency (
  id serial NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  sign varchar(64) NOT NULL,
  code varchar(64) NOT NULL,
  country varchar(128) NOT NULL,
  CONSTRAINT currency_pkey PRIMARY KEY (id)
);

CREATE TABLE public.wallet (
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

CREATE TABLE public.color (
  id serial NOT NULL,
  account_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  sign varchar(256) NOT NULL,
  CONSTRAINT color_pkey PRIMARY KEY (id),
  CONSTRAINT color_fkey_account FOREIGN KEY (account_id) REFERENCES public.account(id)
);

CREATE TABLE public.category (
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

CREATE TABLE public.group (
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

CREATE TABLE public.transfer (
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

CREATE TABLE public.exchange (
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

CREATE TABLE public.minus (
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

CREATE TABLE public.plus (
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

CREATE TABLE public.balance (
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
