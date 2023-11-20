PGDMP         .            
    {            gps_db    14.7 (Debian 14.7-1.pgdg110+1)    14.9 /    4           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            5           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            6           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            7           1262    16384    gps_db    DATABASE     Z   CREATE DATABASE gps_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
    DROP DATABASE gps_db;
                admin    false            B           1247    26128    Role    TYPE     G   CREATE TYPE public."Role" AS ENUM (
    'ADMINISTRATOR',
    'USER'
);
    DROP TYPE public."Role";
       public          admin    false            �            1259    26118    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    admin    false            �            1259    26146    device_types    TABLE       CREATE TABLE public.device_types (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    created_at timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name character varying(100) NOT NULL
);
     DROP TABLE public.device_types;
       public         heap    admin    false            �            1259    26145    device_types_id_seq    SEQUENCE     �   CREATE SEQUENCE public.device_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.device_types_id_seq;
       public          admin    false    213            8           0    0    device_types_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.device_types_id_seq OWNED BY public.device_types.id;
          public          admin    false    212            �            1259    26155    gps    TABLE     9  CREATE TABLE public.gps (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    created_at timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    code character varying(255) NOT NULL,
    device_type_id integer NOT NULL
);
    DROP TABLE public.gps;
       public         heap    admin    false            �            1259    26154 
   gps_id_seq    SEQUENCE     �   CREATE SEQUENCE public.gps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.gps_id_seq;
       public          admin    false    215            9           0    0 
   gps_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.gps_id_seq OWNED BY public.gps.id;
          public          admin    false    214            �            1259    26163    gps_locations    TABLE     �   CREATE TABLE public.gps_locations (
    gps_id integer NOT NULL,
    location_id integer NOT NULL,
    "timestamp" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 !   DROP TABLE public.gps_locations;
       public         heap    admin    false            �            1259    26170 	   locations    TABLE     c  CREATE TABLE public.locations (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    created_at timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name character varying(255) NOT NULL,
    latitude numeric(9,6) NOT NULL,
    longitude numeric(9,6) NOT NULL
);
    DROP TABLE public.locations;
       public         heap    admin    false            �            1259    26169    locations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.locations_id_seq;
       public          admin    false    218            :           0    0    locations_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;
          public          admin    false    217            �            1259    26134    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    created_at timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    full_name character varying(255) NOT NULL,
    token text,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL
);
    DROP TABLE public.users;
       public         heap    admin    false    834    834            �            1259    26133    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          admin    false    211            ;           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          admin    false    210                       2604    26149    device_types id    DEFAULT     r   ALTER TABLE ONLY public.device_types ALTER COLUMN id SET DEFAULT nextval('public.device_types_id_seq'::regclass);
 >   ALTER TABLE public.device_types ALTER COLUMN id DROP DEFAULT;
       public          admin    false    212    213    213            �           2604    26158    gps id    DEFAULT     `   ALTER TABLE ONLY public.gps ALTER COLUMN id SET DEFAULT nextval('public.gps_id_seq'::regclass);
 5   ALTER TABLE public.gps ALTER COLUMN id DROP DEFAULT;
       public          admin    false    214    215    215            �           2604    26173    locations id    DEFAULT     l   ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);
 ;   ALTER TABLE public.locations ALTER COLUMN id DROP DEFAULT;
       public          admin    false    217    218    218            {           2604    26137    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          admin    false    211    210    211            (          0    26118    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          admin    false    209   e7       ,          0    26146    device_types 
   TABLE DATA           M   COPY public.device_types (id, uuid, created_at, update_at, name) FROM stdin;
    public          admin    false    213   8       .          0    26155    gps 
   TABLE DATA           T   COPY public.gps (id, uuid, created_at, update_at, code, device_type_id) FROM stdin;
    public          admin    false    215   �8       /          0    26163    gps_locations 
   TABLE DATA           I   COPY public.gps_locations (gps_id, location_id, "timestamp") FROM stdin;
    public          admin    false    216   �9       1          0    26170 	   locations 
   TABLE DATA           _   COPY public.locations (id, uuid, created_at, update_at, name, latitude, longitude) FROM stdin;
    public          admin    false    218   <:       *          0    26134    users 
   TABLE DATA           s   COPY public.users (id, uuid, created_at, update_at, username, email, password, full_name, token, role) FROM stdin;
    public          admin    false    211   A;       <           0    0    device_types_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.device_types_id_seq', 3, true);
          public          admin    false    212            =           0    0 
   gps_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.gps_id_seq', 6, true);
          public          admin    false    214            >           0    0    locations_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.locations_id_seq', 6, true);
          public          admin    false    217            ?           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          admin    false    210            �           2606    26126 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            admin    false    209            �           2606    26153    device_types device_types_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.device_types
    ADD CONSTRAINT device_types_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.device_types DROP CONSTRAINT device_types_pkey;
       public            admin    false    213            �           2606    26168     gps_locations gps_locations_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.gps_locations
    ADD CONSTRAINT gps_locations_pkey PRIMARY KEY (gps_id, location_id, "timestamp");
 J   ALTER TABLE ONLY public.gps_locations DROP CONSTRAINT gps_locations_pkey;
       public            admin    false    216    216    216            �           2606    26162    gps gps_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.gps
    ADD CONSTRAINT gps_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.gps DROP CONSTRAINT gps_pkey;
       public            admin    false    215            �           2606    26177    locations locations_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.locations DROP CONSTRAINT locations_pkey;
       public            admin    false    218            �           2606    26144    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            admin    false    211            �           1259    26180    device_types_name_key    INDEX     U   CREATE UNIQUE INDEX device_types_name_key ON public.device_types USING btree (name);
 )   DROP INDEX public.device_types_name_key;
       public            admin    false    213            �           1259    26181    gps_code_key    INDEX     C   CREATE UNIQUE INDEX gps_code_key ON public.gps USING btree (code);
     DROP INDEX public.gps_code_key;
       public            admin    false    215            �           1259    26182    locations_name_key    INDEX     O   CREATE UNIQUE INDEX locations_name_key ON public.locations USING btree (name);
 &   DROP INDEX public.locations_name_key;
       public            admin    false    218            �           1259    26179    users_email_key    INDEX     I   CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
 #   DROP INDEX public.users_email_key;
       public            admin    false    211            �           1259    26178    users_username_key    INDEX     O   CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);
 &   DROP INDEX public.users_username_key;
       public            admin    false    211            �           2606    26183    gps gps_device_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.gps
    ADD CONSTRAINT gps_device_type_id_fkey FOREIGN KEY (device_type_id) REFERENCES public.device_types(id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.gps DROP CONSTRAINT gps_device_type_id_fkey;
       public          admin    false    3217    213    215            �           2606    26188 '   gps_locations gps_locations_gps_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.gps_locations
    ADD CONSTRAINT gps_locations_gps_id_fkey FOREIGN KEY (gps_id) REFERENCES public.gps(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.gps_locations DROP CONSTRAINT gps_locations_gps_id_fkey;
       public          admin    false    216    215    3220            �           2606    26193 ,   gps_locations gps_locations_location_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.gps_locations
    ADD CONSTRAINT gps_locations_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.gps_locations DROP CONSTRAINT gps_locations_location_id_fkey;
       public          admin    false    218    216    3225            (   �   x�m�91 ��WУ _q��V������F�jF��fcNC1�0jjE-M@ML}1��-�Mm��	�3kv�1��{�9sT�r��ʔ�'�Dp 9�z<Qa;�*"
��?������㵽���\/_�~P���������;�3�      ,   �   x�}�M
�0F��)��H毙��<��f�� 
m�B������!���Ԡ$c��#�.F��j�u�H�@���*zј�1�C�c�e�[�A�`K��`L#t)��y/�U����ڲ�_�3�Ps�Y��%��`�Ļr'��z�:���i]����2DW      .   �   x�}�=n!�N�>�
���s�4����(�L��m,}f�r��A����)&CO�9g�F�@���S�S��ʟ��}�y�J�w��tnE�A wp��\������o�w�R�P�dch�r��q��b+#s"_Wy�U��K酫�<��\�b/Kx�p䡍Rp�uU�+��~Q���.:<A�J����Ac���U�n�w�Rp�bEq
�1�;m%����ܞmDx���U��N��^ʾ|�~�Z �      /   e   x���A
�0D�ur
�R�$m���ϡ�Vh����O����p���p�\���Gc�d��V��1�/�4^�!�U1���}a��������}����UJ      1   �   x�}��qD!Ec^�=�����Jp·��w��t�H��s�dS�j6P#�\���FU�F^�P��O���|#~B7z�� ����)�(�w/��.� %�<����c���7�yc��RM���m��3To��j�ى�!����ec�0DЋw`7-���f��{��S���/t��ha�$\�W���Z�b��)r�Ǫ�ot����%�ZX(��z�V����d�g��qc�y\�����O      *   %  x�}�Mo�0 ���Wx𶔵�������Tp��d��*S`�گ��v1q;>y��ɃW�:�͠M���h�Za�� ��1�5m1Ѣ̤�= �ߔ��4O��Lꢼ�'}N���6U��&�M���so눓�e?9Vk7((�����>��q������q��7��ڽ���Ѭ3� G����r�9�|-�ÕeT�+:\ܭ`���;��:��d��.o�^�geuxT�^���FfGN�Xmj��:���z��Wn�y�Ǯ�K���m��#�����X��a|@�~C     