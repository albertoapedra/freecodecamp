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

DROP DATABASE worldcup;
--
-- Name: worldcup; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE worldcup WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE worldcup OWNER TO freecodecamp;

\connect worldcup

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
-- Name: games; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    year integer NOT NULL,
    round character varying(18) NOT NULL,
    winner_id integer NOT NULL,
    opponent_id integer NOT NULL,
    winner_goals integer NOT NULL,
    opponent_goals integer NOT NULL
);


ALTER TABLE public.games OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_game_id_seq OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: teams; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.teams (
    team_id integer NOT NULL,
    name character varying(18) NOT NULL
);


ALTER TABLE public.teams OWNER TO freecodecamp;

--
-- Name: teams_teams_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.teams_teams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teams_teams_id_seq OWNER TO freecodecamp;

--
-- Name: teams_teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.teams_teams_id_seq OWNED BY public.teams.team_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: teams team_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams ALTER COLUMN team_id SET DEFAULT nextval('public.teams_teams_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games VALUES (107, 2018, 'Final', 961, 962, 4, 2);
INSERT INTO public.games VALUES (108, 2018, 'Third Place', 963, 964, 2, 0);
INSERT INTO public.games VALUES (109, 2018, 'Semi-Final', 962, 964, 2, 1);
INSERT INTO public.games VALUES (110, 2018, 'Semi-Final', 961, 963, 1, 0);
INSERT INTO public.games VALUES (111, 2018, 'Quarter-Final', 962, 970, 3, 2);
INSERT INTO public.games VALUES (112, 2018, 'Quarter-Final', 964, 972, 2, 0);
INSERT INTO public.games VALUES (113, 2018, 'Quarter-Final', 963, 974, 2, 1);
INSERT INTO public.games VALUES (114, 2018, 'Quarter-Final', 961, 976, 2, 0);
INSERT INTO public.games VALUES (115, 2018, 'Eighth-Final', 964, 978, 2, 1);
INSERT INTO public.games VALUES (116, 2018, 'Eighth-Final', 972, 980, 1, 0);
INSERT INTO public.games VALUES (117, 2018, 'Eighth-Final', 963, 982, 3, 2);
INSERT INTO public.games VALUES (118, 2018, 'Eighth-Final', 974, 984, 2, 0);
INSERT INTO public.games VALUES (119, 2018, 'Eighth-Final', 962, 986, 2, 1);
INSERT INTO public.games VALUES (120, 2018, 'Eighth-Final', 970, 988, 2, 1);
INSERT INTO public.games VALUES (121, 2018, 'Eighth-Final', 976, 990, 2, 1);
INSERT INTO public.games VALUES (122, 2018, 'Eighth-Final', 961, 992, 4, 3);
INSERT INTO public.games VALUES (123, 2014, 'Final', 993, 992, 1, 0);
INSERT INTO public.games VALUES (124, 2014, 'Third Place', 995, 974, 3, 0);
INSERT INTO public.games VALUES (125, 2014, 'Semi-Final', 992, 995, 1, 0);
INSERT INTO public.games VALUES (126, 2014, 'Semi-Final', 993, 974, 7, 1);
INSERT INTO public.games VALUES (127, 2014, 'Quarter-Final', 995, 1002, 1, 0);
INSERT INTO public.games VALUES (128, 2014, 'Quarter-Final', 992, 963, 1, 0);
INSERT INTO public.games VALUES (129, 2014, 'Quarter-Final', 974, 978, 2, 1);
INSERT INTO public.games VALUES (130, 2014, 'Quarter-Final', 993, 961, 1, 0);
INSERT INTO public.games VALUES (131, 2014, 'Eighth-Final', 974, 1010, 2, 1);
INSERT INTO public.games VALUES (132, 2014, 'Eighth-Final', 978, 976, 2, 0);
INSERT INTO public.games VALUES (133, 2014, 'Eighth-Final', 961, 1014, 2, 0);
INSERT INTO public.games VALUES (134, 2014, 'Eighth-Final', 993, 1016, 2, 1);
INSERT INTO public.games VALUES (135, 2014, 'Eighth-Final', 995, 984, 2, 1);
INSERT INTO public.games VALUES (136, 2014, 'Eighth-Final', 1002, 1020, 2, 1);
INSERT INTO public.games VALUES (137, 2014, 'Eighth-Final', 992, 980, 1, 0);
INSERT INTO public.games VALUES (138, 2014, 'Eighth-Final', 963, 1024, 2, 1);


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.teams VALUES (961, 'France');
INSERT INTO public.teams VALUES (962, 'Croatia');
INSERT INTO public.teams VALUES (963, 'Belgium');
INSERT INTO public.teams VALUES (964, 'England');
INSERT INTO public.teams VALUES (970, 'Russia');
INSERT INTO public.teams VALUES (972, 'Sweden');
INSERT INTO public.teams VALUES (974, 'Brazil');
INSERT INTO public.teams VALUES (976, 'Uruguay');
INSERT INTO public.teams VALUES (978, 'Colombia');
INSERT INTO public.teams VALUES (980, 'Switzerland');
INSERT INTO public.teams VALUES (982, 'Japan');
INSERT INTO public.teams VALUES (984, 'Mexico');
INSERT INTO public.teams VALUES (986, 'Denmark');
INSERT INTO public.teams VALUES (988, 'Spain');
INSERT INTO public.teams VALUES (990, 'Portugal');
INSERT INTO public.teams VALUES (992, 'Argentina');
INSERT INTO public.teams VALUES (993, 'Germany');
INSERT INTO public.teams VALUES (995, 'Netherlands');
INSERT INTO public.teams VALUES (1002, 'Costa Rica');
INSERT INTO public.teams VALUES (1010, 'Chile');
INSERT INTO public.teams VALUES (1014, 'Nigeria');
INSERT INTO public.teams VALUES (1016, 'Algeria');
INSERT INTO public.teams VALUES (1020, 'Greece');
INSERT INTO public.teams VALUES (1024, 'United States');


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_game_id_seq', 138, true);


--
-- Name: teams_teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.teams_teams_id_seq', 1024, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: teams teams_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_name_key UNIQUE (name);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (team_id);


--
-- Name: games games_opponent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_opponent_id_fkey FOREIGN KEY (opponent_id) REFERENCES public.teams(team_id);


--
-- Name: games games_winner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_winner_id_fkey FOREIGN KEY (winner_id) REFERENCES public.teams(team_id);


--
-- PostgreSQL database dump complete
--

