PGDMP         9            	    x           ORdb    12.2    12.2 	               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    24986    ORdb    DATABASE     �   CREATE DATABASE "ORdb" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Croatian_Croatia.1250' LC_CTYPE = 'Croatian_Croatia.1250';
    DROP DATABASE "ORdb";
                postgres    false            �            1259    25019    proba    TABLE     ;   CREATE TABLE public.proba (
    probica text[] NOT NULL
);
    DROP TABLE public.proba;
       public         heap    postgres    false            �            1259    25058 	   worldcups    TABLE     !  CREATE TABLE public.worldcups (
    year integer NOT NULL,
    wikipediapage character varying(50) NOT NULL,
    host text[] NOT NULL,
    beginning date NOT NULL,
    ending date NOT NULL,
    teamcount smallint NOT NULL,
    venues text[] NOT NULL,
    champions character varying(50) NOT NULL,
    secondplace character varying(50) NOT NULL,
    thirdplace character varying(50) NOT NULL,
    fourthplace character varying(50) NOT NULL,
    matchcount smallint NOT NULL,
    goalcount integer,
    attendance integer,
    topscorer text[]
);
    DROP TABLE public.worldcups;
       public         heap    postgres    false                      0    25019    proba 
   TABLE DATA           (   COPY public.proba (probica) FROM stdin;
    public          postgres    false    202   
                 0    25058 	   worldcups 
   TABLE DATA           �   COPY public.worldcups (year, wikipediapage, host, beginning, ending, teamcount, venues, champions, secondplace, thirdplace, fourthplace, matchcount, goalcount, attendance, topscorer) FROM stdin;
    public          postgres    false    203   m
       �
           2606    25065    worldcups worldcups_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.worldcups
    ADD CONSTRAINT worldcups_pkey PRIMARY KEY (year);
 B   ALTER TABLE ONLY public.worldcups DROP CONSTRAINT worldcups_pkey;
       public            postgres    false    203               A   x��Vr-.IL��WpN�+I�K,��Wҁ�%�)$���%� ��'g��+�r��qqq $r         �  x��Y=s#����bJ�%���!I�ZiE�%jWuWN���4f����K���m]9P�ѹ�N��_~�� F\��J%a��~�5T��ʥ
~y��A׻�F^?^�>�7�,f�'�{Rn�Tjy���J���ÈB{}�"����87^��13��}�0��/"=����f���b��JD<�&�xX�1��P��`�J��*��r����/b!%7K�Ww_�B�7Xc�Z?��e�d���I�qRm���I�ib�I��	>�6�Z�Ei#���Fl+����{��k���z�D�`73��>3\J�������0��{���0C-���p��U����n·p���|��!ǵ�q�f�\.c�72��7�Ͻ���;�[��>�� �s�6y�\ϛ�N��Hǽ�Y��7�Z��g��އݳԁ�K�!���[�76���隇~lx>?�yC���s�0V�+O�Y�tt�ݝޜ���O��>\��t�c��݁6��g��sǾ�Ռ�M�gpܲ4���(��R�Uo�h��|�%zC��5�mPj5S+���v�����$k晵�B'���a>S�_����cX�r��	�����rjtqH��>�bE���\�9�oy$�c>���VL�%s���Ɋ	U�VKm�P�ި�)��_
C�rŷ8d�����|і�T`=�$f3m�l�Ѭ�L-m<�
���w�zZ�ѡj7"���V!�W�̒�#tF����@;���Ql���t����r,��,�2U��z��j�������½w�E�ʸ�a�%n�nH2��7�����p�y��{+���4dr��gb���8�Ov|+�f�@_"u�(\1���7*��K�M�=m�G���G�B�����7&������"< )zyS��ڕN�B�t�!�xT��j�~8�?�?�>�q�_�D���d3b�Eh�v&,� �KTX,V	�Z����S�h �6g��)b�(�����r���d��ViUK�/ *��9;��ֻ/�@���(&�9�����<{]9u��\��K0�^�rfط���pP���9�eI�y�s5�ҩٴ�Rɛ�����o��9xw�=<h��B�@��R���L/���~���"r' fP�%o��C��x6w��n	��kO�t����Ca�<��J=[i4k��8�=O�&G�(Z��;䟄��l���J�D>U�1��F�gN\!\Bߍ�~��y�{^j߱��':,��H���j7	���6�AV4��r�X��7���4�=�Ag�:����6���M�g�)$�S�Q ,��J�G�#�/�I��tVY�vN����-O2�H L��y��#��
���SG<�'\"
ld���H�`/�f����̖ϴ�z�Im�D`�:�\_Z%�Zɛ�F1�Z�K�o��J#Ƽ��1��ns�U[������⻯�2�7����Ō������M��"X��h��D�{����`��� �F���T��!�s�_�Rn����r����c��=�T>Q@SdO�v��m��f$YA���slq��� .���og�l�F�{�Xlc<�k���}�9U�M��<z�fY����V\����:\���ɧ��wK���=-���t+�V���l��(;�[��7�=�ȉ�'�=&'���3���O���4\S�k��C�J�Ӫ��3�bZX(�c �nb������i%�=�W!�F�"�� ����-�f�^oB*>P4�G|˼vӱ�q_ip�L�7�K����uvN��VIP���|�e]���� ���3[]Ȏ¹���r�̵���:�r��A]��"E��I�L�2�SεYǊw4��֏7R��[� ^���nbf�G�4�@�T�}��U�����*�*�#@b�L<0"��E?�K�Lz���v�C�88�[��t����ޟ@����Q.V�f5)J%Tc�W�9%��$E�����+�X���3�g�-j�C@�qTy�jP��qp�*�|[��g���B�1�z u�ʧ�2@�{�%I#��Y�@"��JrMB��w������N-Q��T0�b��*��Gbj�Nt��������F�N\�H�c#����N;���M8�J����N��õ{>�"a��4�@�餧q���u���Q��އG��N�R����\?<�O.bl�Y]�{�@WMZ=��T��p��l"�Z�V��lS�vF��}�%N`�Z�ү�X��8���3�qE%�}3E��$�m]{��,�O�����nO�
�P07t/�:���^�ȷ��3t4E>���?�2��#S���/�
_{��l��E^� "[�ev�G��s0�eu���-e's���"7y���q�T�1W�ņ�\÷�`.�y$��
�w,�����!q�{�f�
�jE�}FI��myw1
h��>&lh5)������[�m�mL5)<I?��Ƒ��r'm��IqT�(�$`\m!�L1#�^���� �I��'gL,QK�L��4����_&�Gݛ�l.�̒�픩ŉ5�G��	�~��b+�sE��3[��,�Sr󛭗�pӇQ6>Qi��~��z�T�kt�;�R�����6G�d���>�p��,�UҦ�6=������к�%�"l���p�B��t.
W/��!5|�xz Y���%U�C�'dn�<��,�k�����)]�J�40�'<X �ξ�P�;���^й�����nn�j�V�ݠB�L@DЕ�L����9���c*:�Ł��1�`���K��|H���'u�㨦M�O{���ӹ�I��.=w�ҭh,W��".���慱;��J7��.�8D��5Ә�k9���[c�VX�bqK���1���2t_�1�����;�]JW�z��nQ9q� �QN��f1���{��y( ncT��= ��	�7�_�۹@o��^�b�ApGz.���p����� -gzf@`���'6�T��:(�/ͻ���e�FE ���sz-��6��D�O99����
)�db �2�jQP����l��B����1{+���7o��m��     