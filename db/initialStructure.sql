CREATE TABLE brands (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    category_id integer NOT NULL
);

CREATE TABLE categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);

CREATE SEQUENCE categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE categories_id_seq OWNED BY categories.id;

CREATE SEQUENCE brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE brands_id_seq OWNED BY brands.id;


ALTER TABLE ONLY brands ALTER COLUMN id SET DEFAULT nextval('brands_id_seq'::regclass);

ALTER TABLE ONLY categories ALTER COLUMN id SET DEFAULT nextval('categories_id_seq'::regclass);


SELECT pg_catalog.setval('brands_id_seq', 1, false);

SELECT pg_catalog.setval('categories_id_seq', 1, false);


ALTER TABLE ONLY brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);

ALTER TABLE ONLY categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);

CREATE UNIQUE INDEX brand_name_index
    ON brands USING btree
    (name COLLATE pg_catalog."default" varchar_ops);

CREATE INDEX brand_category_id_index
    ON brands USING btree
    (category_id);

CREATE UNIQUE INDEX category_name_index
    ON categories USING btree
    (name COLLATE pg_catalog."default" varchar_ops);

ALTER TABLE ONLY brands
    ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES categories(id);