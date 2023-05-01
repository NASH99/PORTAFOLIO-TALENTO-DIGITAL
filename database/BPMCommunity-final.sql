
use BPMCommunity;

CREATE TABLE genero_musical(
	idGenero_musical INT AUTO_INCREMENT PRIMARY KEY,
    nombreGenero_musical VARCHAR(50) NOT NULL,
    imagenGenero_musical VARCHAR(2000) 
);
INSERT INTO genero_musical(nombreGenero_musical,imagenGenero_musical) 
VALUES 
('afro','/img/covers/afro.png'),
('blues','/img/covers/blues.png'),
('jazz','/img/covers/jazz.png'),
('r&b','/img/covers/r&b.png'),
('salsa','/img/covers/salsa.png'),
('rock','/img/covers/rock.png'),
('electronica','/img/covers/electronica.png'),
('reggaeton','/img/covers/reggaeton.png'),
('pop','/img/covers/pop.png'),
('otros','/img/covers/otros.png');

CREATE TABLE pais(
	idPais INT AUTO_INCREMENT PRIMARY KEY,
    nombrePais VARCHAR(30),
    imagenPais VARCHAR(100)
);
INSERT INTO pais (nombrePais) VALUES ('chile'),('eeuu'),('canada'),('españa'),('puerto rico'),('argentina'),('colombia');

CREATE TABLE usuario( 
	idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(25) NOT NULL ,
	apellidoUsuario VARCHAR(25) NOT NULL ,
	nickUsuario varchar(30) NOT NULL,
    emailUsuario varchar(30) NOT NULL,
    claveUsuario varchar(30) NOT NULL,
    isadminUsuario boolean DEFAULT false
);

INSERT INTO usuario (nombreUsuario, apellidoUsuario, nickUsuario, emailUsuario, claveUsuario, isadminUsuario)
VALUES 
    ('Ignacio', 'Alvarado', 'solo_nash', 'ignacio99k@hotmail.com', '123',0),
    ('Pedro', 'Hernández', 'pedroh', 'pedroh@gmail.com', 'qwerty',0),
    ('Juan','Perez','JPmusic','juanperezmusic@gmail.com','password',0),
    ('Maria','Gonzalez','MGmusic','mariagonzalezmusic@gmail.com','1234',0),
    ('Francisco', 'Carmona', 'thenefelin', 'francisco@hotmail.com','123',0),
    ('Emerson', 'Ramirez', 'EME', 'emeo@hotmail.com', '123',0),
    ('Laura', 'García', 'laurita', 'lauritagarcia@gmail.com', '123456',0),
	('Ana', 'Martínez', 'anam', 'ana.martinez@hotmail.com', 'abc123',0),
	('Carlos', 'López', 'clopez', 'carlos.lopez@gmail.com', 'qwertyuiop',0),
	('Miguel', 'Rodríguez', 'mike', 'miguel.rodriguez@gmail.com', 'mike123',0),
	('Sofía', 'Ramírez', 'sofii', 'sofii_ramirez@hotmail.com', 'contraseña',0),
	('Luis', 'González', 'luisg', 'luis.gonzalez@gmail.com', '12345678',0),
    ('ADMINISTRADOR', 'ADMIN', 'ADMIN', 'admin@gmail.com', '123',1),
    ('Alejandro', 'Sanz', 'alejandrosanz', 'alejandrosanz@email.com', 'password', 0),
	('Julieta', 'Venegas', 'julietavenegas', 'julietavenegas@email.com', 'password', 0),
	('Luis', 'Fonsi', 'luisfonsi', 'luisfonsi@email.com', 'password', 0),
	('Bad', 'Bunny', 'badbunny', 'badbunny@email.com', 'password', 0),
	('Rosalía', 'Vila', 'rosalia', 'rosalia@email.com', 'password', 0),
	('Gustavo', 'Cerati', 'gustavocerati', 'gustavocerati@email.com', 'password', 0),
	('Pablo', 'Alborán', 'pabloalboran', 'pabloalboran@email.com', 'password', 0),
	('Ariana', 'Grande', 'arianagrande', 'arianagrande@email.com', 'password', 0),
	('J', 'Balvin', 'jbalvin', 'jbalvin@email.com', 'password', 0),
	('Shakira', 'Mebarak', 'shakira', 'shakira@email.com', 'password', 0);
    
    
    
CREATE TABLE perfil( 
	idPerfil INT AUTO_INCREMENT PRIMARY KEY,
    tituloPerfil VARCHAR(100) DEFAULT 'Perfil',
    nombreArtistaPerfil varchar(20) DEFAULT 'ARTISTA',
	telefonoPerfil int DEFAULT 0,
	nacimientoPerfil date,
    generoPerfil varchar(20),
    biografiaPerfil varchar(200) DEFAULT 'BIOGRAFIA',
    spotifyPerfil varchar(5000) DEFAULT '0mkpKSEcGYHAAUXgD7nKWa',
    youtubePerfil varchar(5000) DEFAULT '5NV6Rdv1a3I',
    youtubePerfilLink varchar(1000) DEFAULT '',
    instagramPerfilLink varchar(1000) DEFAULT '',
    topUsuario int default 0,
    idGenero_musical int default 10,
    FOREIGN KEY (idGenero_musical) REFERENCES genero_musical(idGenero_musical),
    idPais INT,
	FOREIGN KEY (idPais) REFERENCES pais(idPais),
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario) ON DELETE CASCADE  
);
INSERT INTO perfil (tituloPerfil,nombreArtistaPerfil,telefonoPerfil,nacimientoPerfil,generoPerfil,biografiaPerfil,idGenero_musical,idPais,idUsuario,topUsuario)
VALUES
('Bienvenidos a mi perfil ignacio','NASH',934318746,'1999-07-14','masculino','Me inicie en la musica...',8,1,1,50),
('Bienvenidos a mi perfil pedro','Pedro Pascal',934318745,'1998-07-14','masculino','Me inicie en la musica...',2,2,2,2),
('Bienvenidos a mi perfil juan','JH',934318744,'1990-05-23','masculino','Me inicie en la musica...',4,3,3,4),
('Bienvenidos a mi perfil maria','Maria Becerra',5551234,'1995-08-12','femenino','Me inicie en la musica...',5,3,4,5),
('Bienvenidos a mi perfil THE NEFELIN','THE NEFELIN',666666666,'1981-08-8','masculino','Me inicie en la musica...',6,1,5,50),
('Bienvenidos a mi perfil EME','EME',34389764,'1990-06-22','masculino','Me inicie en la musica...',6,1,6,50),
('Bienvenidos a mi perfil LAURA','LAU',34389764,'1990-06-22','femenino','Me inicie en la musica...',3,1,7,30),
('Bienvenidos a mi perfil ANA','ANA GARCIA',34389764,'1990-06-22','femenino','Me inicie en la musica...',10,1,8,22),
('Bienvenidos a mi perfil CARLOS','CARLITOX',34389764,'1990-06-22','masculino','Me inicie en la musica...',9,1,9,34),
('Bienvenidos a mi perfil MIGUEL','PAPI MICKY',34389764,'1990-06-22','masculino','Me inicie en la musica...',8,1,10,3),
('Bienvenidos a mi perfil SOFIA','SOFI',34389764,'1990-06-22','femenino','Me inicie en la musica...',1,1,11,4),
('Bienvenidos a mi perfil LUIS','LUCHO GONZALEZ',34389764,'1990-06-22','masculino','Me inicie en la musica...',7,1,12,5),
('ADMIN','ADMIN',34389764,'1990-06-22','masculino','ADMIN',7,1,13,0),
('Mi perfil musical', 'Alejandro Sanz', 123456789, '1968-12-18', 'masculino', 'Soy un cantautor español con una larga trayectoria musical', 9, 4, 14, 5),
('Perfil de música', 'Julieta Venegas', 987654321, '1970-11-24', 'femenino', 'Soy una cantautora y multiinstrumentista mexicana', 9, 2, 15, 10),
('Perfil musical', 'Luis Fonsi', 5551212, '1978-04-15', 'masculino', 'Soy un cantante y compositor puertorriqueño', 9, 5, 16, 2),
('Mi música', 'Bad Bunny', 777888999, '1994-03-10', 'masculino', 'Soy un cantante y rapero puertorriqueño', 8, 5, 17, 7),
('Perfil de artista', 'Rosalía', 666555444, '1993-09-25', 'femenino', 'Soy una cantante y compositora española de música urbana y flamenco', 8, 4, 18, 8),
('Mi perfil artístico', 'Gustavo Cerati', 11223344, '1959-08-11', 'masculino', 'Soy un cantautor y guitarrista argentino, ex líder de la banda Soda Stereo', 6, 6, 19, 40),
('Mi perfil', 'Pablo Alborán', 99887766, '1989-05-31', 'masculino', 'Soy un cantante y compositor español', 9, 4, 20, 30),
('Perfil de música', 'Ariana Grande', 777999666, '1993-06-26', 'femenino', 'Soy una cantante y actriz estadounidense', 4, 2, 21, 4),
('Perfil artístico', 'J Balvin', 555666777, '1985-05-07', 'masculino', 'Soy un cantante y compositor colombiano', 8, 7, 22, 40),
('Mi perfil musical', 'Shakira', 12345678, '1977-02-02', 'femenino', 'Soy una cantante, compositora y bailarina colombiana', 9, 7, 23, 35);

CREATE TABLE imagen(
	idImagen INT AUTO_INCREMENT PRIMARY KEY,
    imagen VARCHAR(2000) DEFAULT '/img/prueba.png',
    idPerfil INT,
    FOREIGN KEY (idPerfil) REFERENCES perfil(idPerfil)
);
-- INSERT INTO imagen (imagen,idPerfil) VALUES ('/img/profiles/nash.jpg',1),('/img/prueba2.jpg',2),('/img/prueba.jpg',3),('/img/prueba.jpg',4),('/img/profiles/nefelin.jpg',5),('/img/profiles/eme.jpg',6),('/img/prueba.jpg',7),('/img/prueba.jpg',8),('/img/prueba.jpg',9),('/img/prueba.jpg',10),('/img/prueba.jpg',11),('/img/prueba.jpg',12);
INSERT INTO imagen (imagen,idPerfil) VALUES ('/img/profiles/nash.jpg',1),('/img/profiles/nash1.jpg',1),('/img/profiles/nash2.jpg',1),('/img/profiles/nash3.jpg',1),('/img/prueba.png',2),('/img/prueba.png',3),('/img/prueba.png',4),('/img/profiles/nefelin.jpg',5),('/img/profiles/eme.jpg',6),('/img/prueba.png',7),('/img/prueba.png',8),('/img/prueba.png',9),('/img/prueba.png',10),('/img/prueba.png',11),('/img/prueba.png',12),
('https://media.revistavanityfair.es/photos/615bb7e60e15c822284d7b66/master/pass/259025.jpg',14),
('https://www.latercera.com/resizer/uZ3Ohtam6RU6za5VKNGP_7Y__a4=/900x600/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/KBND64PE2VBG5MTDXIOZHVH3DE.jpg',15),
('https://cloudfront-us-east-1.images.arcpublishing.com/infobae/JPBEZ7R7PBDKNP7K6YPFXFYM54.jpg',16),
('https://yt3.googleusercontent.com/7tCfeCWH4arhsTM-4Rz4IxWieQbegzibeXlG-kbytAujdk5dr2K0gBb8NG0Cvk6lB1dPkjyd=s900-c-k-c0x00ffffff-no-rj',17),
('https://www.the-sun.com/wp-content/uploads/sites/6/2022/01/MP-ROSALIA-OFF-PLATFORM-copy.jpg',18),
('https://www.latercera.com/resizer/bPu5831ETotvq7tAhbJ36eMpxrQ=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/AEQQLV72WJBQNKAHLEEMQMJB24.jpg',19),
('https://s1.eestatic.com/2020/06/18/corazon/famosos/pablo_alboran-musica-cantantes_498711332_154006560_1706x960.jpg',20),
('https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952',21),
('https://www.latercera.com/resizer/TaL7yzVl9QbDvT_ssT8ywTmkZBI=/arc-anglerfish-arc2-prod-copesa/public/54BSEPRPTZFYHCIAJ2JQH42KW4.jpg',22),
('https://phantom-marca.unidadeditorial.es/53ecf20db7f13f3a2564cafcffc26b3b/resize/1320/f/jpg/assets/multimedia/imagenes/2023/04/26/16825144508526.jpg',23);

CREATE TABLE publicacion(
	idPublicacion INT AUTO_INCREMENT PRIMARY KEY,
    tituloPublicacion VARCHAR(100) NOT NULL,
    descripcionPublicacion VARCHAR(2000) NOT NULL,
    fechaPublicacion date NOT NULL,
    idPerfil INT,
    FOREIGN KEY (idPerfil) REFERENCES perfil(idPerfil) ON DELETE CASCADE  
);
INSERT INTO publicacion (tituloPublicacion,descripcionPublicacion,fechaPublicacion,idPerfil)
VALUES
('¿Que opinan de mi track?','descripcion de la publicacion','2023-03-28',1),
('Tengo problemas con el DAW','descripcion de la publicacion','2023-03-27',2), 
('Colaboremos','descripcion de la publicacion','2023-03-26',3),
('Nuevo sencillo','Escucha mi nuevo sencillo en todas las plataformas digitales.','2023-04-21',4),
('Concierto en vivo','No te pierdas mi próximo concierto en vivo el próximo fin de semana.','2023-05-01',5),
('Estoy en busca de colaboraciones','Soy cantante y estoy buscando artistas para colaborar...', '2023-04-20',6);
 
 select * from imagen;
 select * from publicacion;
 select * from usuario;
 select * from perfil;

update perfil set spotifyPerfil = '01wn2JqJHSueTZOrGkJz44' , youtubePerfil = 'aXr9w_Mboew' , instagramPerfilLink = 'https://www.instagram.com/solo_nash/', youtubePerfilLink = 'https://www.youtube.com/channel/UCCbfxL0cf1CDp9PNtpVUlrA' where idPerfil = 1;
update perfil set spotifyPerfil = '3ISjXmCHrpogys7fhBbp2F', youtubePerfil = '0WsjRYgZMzs' ,instagramPerfilLink = 'https://www.instagram.com/thenefelin/', youtubePerfilLink = 'https://www.youtube.com/@TheNefelin' where idPerfil = 5;	
update perfil set spotifyPerfil = '5gOgj6I9IggfnM3zSFyiK0', youtubePerfil = 'Qu9TGjwcf2k' , instagramPerfilLink = 'https://www.instagram.com/emers.666/', youtubePerfilLink = 'https://www.youtube.com/@emeramirez4123' where idPerfil = 6;	

-- DROP TABLE imagen,publicacion,usuario,perfil,genero_musical,pais;