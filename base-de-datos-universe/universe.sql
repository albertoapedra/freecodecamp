--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: constellation; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.constellation (
    constellation_id integer NOT NULL,
    name character varying(27) NOT NULL,
    description text
);


ALTER TABLE public.constellation OWNER TO freecodecamp;

--
-- Name: constellation_constellation_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.constellation_constellation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.constellation_constellation_id_seq OWNER TO freecodecamp;

--
-- Name: constellation_constellation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.constellation_constellation_id_seq OWNED BY public.constellation.constellation_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(27) NOT NULL,
    description text,
    has_life boolean,
    galaxy_in integer NOT NULL
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: galaxy_stars_in_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_stars_in_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_stars_in_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_stars_in_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_stars_in_id_seq OWNED BY public.galaxy.galaxy_in;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(27) NOT NULL,
    description text,
    planet_around integer,
    temperature_in_celsius integer
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(27) NOT NULL,
    description text,
    age_in_million_of_years numeric(9,1),
    distance_from_earth_in_km integer,
    temperature_in_celsius integer,
    planet_around integer NOT NULL,
    star_around integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_moons_around_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_moons_around_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_moons_around_id_seq OWNER TO freecodecamp;

--
-- Name: planet_moons_around_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_moons_around_id_seq OWNED BY public.planet.planet_around;


--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(27) NOT NULL,
    description text,
    has_life boolean,
    star_around integer NOT NULL,
    galaxy_in integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_planets_around_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_planets_around_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_planets_around_id_seq OWNER TO freecodecamp;

--
-- Name: star_planets_around_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_planets_around_id_seq OWNED BY public.star.star_around;


--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: constellation constellation_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.constellation ALTER COLUMN constellation_id SET DEFAULT nextval('public.constellation_constellation_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: galaxy galaxy_in; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_in SET DEFAULT nextval('public.galaxy_stars_in_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: planet planet_around; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_around SET DEFAULT nextval('public.planet_moons_around_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Name: star star_around; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_around SET DEFAULT nextval('public.star_planets_around_id_seq'::regclass);


--
-- Data for Name: constellation; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.constellation VALUES (1, 'constelacion uno', 'descripcion de constelacion uno');
INSERT INTO public.constellation VALUES (2, 'constelacion dos', 'descripcion de constelacion dos');
INSERT INTO public.constellation VALUES (3, 'constelacion tres', 'descripcion de constelacion tres');


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'galaxia1', 'gran tamaño y muy lejana', false, 1);
INSERT INTO public.galaxy VALUES (2, 'galaxia2', 'pequeña y cercana', false, 2);
INSERT INTO public.galaxy VALUES (3, 'galaxia3', 'mediana y medianamente cerca', false, 3);
INSERT INTO public.galaxy VALUES (4, 'galaxia4', 'grande y cercana', false, 4);
INSERT INTO public.galaxy VALUES (5, 'galaxia5', 'pequeña y lejana', true, 5);
INSERT INTO public.galaxy VALUES (6, 'galaxia6', 'grande y medianamente cercana', false, 6);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (4, 'luna1', 'descripcion numero uno', 9, 1200);
INSERT INTO public.moon VALUES (5, 'luna2', 'descripcion numero dos', 9, 1500);
INSERT INTO public.moon VALUES (6, 'luna3', 'descripcion numero tres', 9, 1800);
INSERT INTO public.moon VALUES (7, 'luna4', 'descripcion numero cuatro', 5, 1001);
INSERT INTO public.moon VALUES (8, 'luna5', 'descripcion numero cinco', 5, 995);
INSERT INTO public.moon VALUES (9, 'luna6', 'descripcion numero seis', 5, 1100);
INSERT INTO public.moon VALUES (10, 'luna7', 'descripcion numero siete', 3, 1200);
INSERT INTO public.moon VALUES (11, 'luna8', 'descripcion numero ocho', 4, 1500);
INSERT INTO public.moon VALUES (12, 'luna9', 'descripcion numero nueve', 4, 2100);
INSERT INTO public.moon VALUES (13, 'luna10', 'descripcion numero diez', 7, 2200);
INSERT INTO public.moon VALUES (14, 'luna11', 'descripcion numero once', 8, 1900);
INSERT INTO public.moon VALUES (15, 'luna12', 'descripcion numero doce', 9, 1600);
INSERT INTO public.moon VALUES (16, 'luna13', 'descripcion numero trece', 11, 1700);
INSERT INTO public.moon VALUES (17, 'luna14', 'descripcion numero catorce', 11, 1300);
INSERT INTO public.moon VALUES (18, 'luna15', 'descripcion numero quince', 8, 1110);
INSERT INTO public.moon VALUES (19, 'luna16', 'descripcion numero dieciseis', 5, 1200);
INSERT INTO public.moon VALUES (20, 'luna17', 'descripcion numero diecisiete', 5, 1400);
INSERT INTO public.moon VALUES (21, 'luna18', 'descripcion numero dieciocho', 3, 5200);
INSERT INTO public.moon VALUES (22, 'luna19', 'descripcion numero diecinueve', 3, 6300);
INSERT INTO public.moon VALUES (23, 'luna20', 'descripcion numero veinte', 3, 9000);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'planeta1', 'rocoso y sin agua', 4.5, 10000, 1000, 1, 1);
INSERT INTO public.planet VALUES (2, 'planeta3', 'con anillos gaseosos', 5.0, 70000, 5000, 3, 1);
INSERT INTO public.planet VALUES (3, 'planeta4', 'montañoso y rosa', 9.0, 9000, 36000, 4, 3);
INSERT INTO public.planet VALUES (4, 'planeta5', 'rocoso y violeta', 18.9, 100000, 4500, 5, 2);
INSERT INTO public.planet VALUES (5, 'planeta6', 'con forma de estrella', 2.3, 500000, 18000, 6, 1);
INSERT INTO public.planet VALUES (6, 'planeta7', 'de superficie irregular', 1.2, 45000, 6300, 7, 1);
INSERT INTO public.planet VALUES (7, 'planeta8', 'redondo y brillante', 3.6, 48000, 98100, 8, 2);
INSERT INTO public.planet VALUES (8, 'planeta9', 'no refleja la luz', 15.3, 4800, 4100, 9, 1);
INSERT INTO public.planet VALUES (9, 'planeta10', 'redondo y amarilo', 4.5, 52000, 630, 10, 3);
INSERT INTO public.planet VALUES (10, 'planeta11', 'con anillos rocosos', 8.2, 4100, 4521, 11, 3);
INSERT INTO public.planet VALUES (11, 'planeta12', 'ovalado y verdoso', 9.0, 95000, 1300, 12, 2);
INSERT INTO public.planet VALUES (12, 'planeta2', 'transparente', 56.3, 10000, 10000, 2, 2);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'estrella1', 'redonda y azul', false, 1, 1);
INSERT INTO public.star VALUES (2, 'estrella2', 'redonda y verde', false, 2, 1);
INSERT INTO public.star VALUES (3, 'estrella3', 'redonda y amarilla', false, 3, 2);
INSERT INTO public.star VALUES (4, 'estrella4', 'redonda y roja', false, 4, 2);
INSERT INTO public.star VALUES (5, 'estrella5', 'redonda y naranja', false, 5, 3);
INSERT INTO public.star VALUES (6, 'estrella6', 'redonda y violeta', false, 6, 3);


--
-- Name: constellation_constellation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.constellation_constellation_id_seq', 3, true);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: galaxy_stars_in_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_stars_in_id_seq', 1, false);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 23, true);


--
-- Name: planet_moons_around_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_moons_around_id_seq', 1, false);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: star_planets_around_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_planets_around_id_seq', 1, false);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: constellation constellation_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.constellation
    ADD CONSTRAINT constellation_name_key UNIQUE (name);


--
-- Name: constellation constellation_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.constellation
    ADD CONSTRAINT constellation_pkey PRIMARY KEY (constellation_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: galaxy galaxy_stars_in_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_stars_in_id_key UNIQUE (galaxy_in);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_moons_around_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_moons_around_id_key UNIQUE (planet_around);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: star star_planets_around_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_planets_around_id_key UNIQUE (star_around);


--
-- Name: moon moon_planet_around_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_around_fkey FOREIGN KEY (planet_around) REFERENCES public.planet(planet_around);


--
-- Name: planet planet_star_around_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_around_fkey FOREIGN KEY (star_around) REFERENCES public.star(star_around);


--
-- Name: star star_galaxy_in_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_in_fkey FOREIGN KEY (galaxy_in) REFERENCES public.galaxy(galaxy_in);


--
-- PostgreSQL database dump complete
--

