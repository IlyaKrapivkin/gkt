CREATE TABLE public.role (
  id serial NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  name varchar(16) NOT NULL,
  about varchar(256) NULL,
  CONSTRAINT role_pkey PRIMARY KEY (id)
);

CREATE TABLE public.person (
  id serial NOT NULL,
  role_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  login varchar(64) NOT NULL,
  reserve varchar(64) NULL,
  -- hash varchar(256) NOT NULL,
  hash varchar(256) NULL,
  valid BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT person_pkey PRIMARY KEY (id),
  CONSTRAINT person_fkey_role FOREIGN KEY (role_id) REFERENCES public.role(id)
);

CREATE TABLE public.code (
  id serial NOT NULL,
  person_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  expire_date timestamptz NOT NULL,
  accept_date timestamptz NULL,
  code varchar(8) NOT NULL,
  hit smallint NOT NULL DEFAULT 0,
  -- reserve varchar(64) NULL,
  CONSTRAINT code_pkey PRIMARY KEY (id),
  CONSTRAINT code_fkey_person FOREIGN KEY (person_id) REFERENCES public.person(id)
);

CREATE TABLE public.session (
  id serial NOT NULL,
  person_id integer NOT NULL,
  create_date timestamptz NOT NULL DEFAULT now(),
  update_date timestamptz NOT NULL DEFAULT now(),
  delete_date timestamptz NULL,
  token varchar(128) NOT NULL,
  CONSTRAINT session_pkey PRIMARY KEY (id),
  CONSTRAINT session_fkey_person FOREIGN KEY (person_id) REFERENCES public.person(id)
);
