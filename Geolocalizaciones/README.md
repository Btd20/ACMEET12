Instalaciones Extensiones y Frameworks
 - Microsoft.EntityFrameworkCore
 - Microsoft.EntityFrameworkCore.Tools
 - Microsoft.EntityFrameworkCore.SqlServer

 Comandos de Entity
  - Add-Migration init
  - Update-database



CARPETA CONTROLLERS
 - Los controladores sirven para poder interactuar con el lado frontend


CARPETA DB
 - La base de datos local en formato .mdf (Creado en un proyecto tipo "Aplicación Consola")

CARPETA MIGRATIONS
 - Ejecutar el comando "Add-Migration nombre" te crea automaticamente la carpeta y las clases. Pero antes tienes que definir
   las tablas en la clase "AplicationDbContext.cs" 


CARPETA MODELS
 - Los models són componentes que representan la estrucutara de los datos
	- Clases:
	 - Country
	 - City
	 - Office
	 - MeetingRoom
	 - Reserve
	 - User

 - La clase AplicationDbContext.cs es una clase que representa el contexto de la base de datos de una aplicación y se utiliza 
   para definir y configurar las tablas mediante la declaración de entidades y estableciendo las relaciones entre ellas.


ARCHIVO appsettings.json
 - Definimos la conexión de la base de datos con: 
  - "ConnectionStrings": {
    "Conexion": "Ruta de la base de datos"
    }


CLASE Program.cs
 - El proyecto te crea el codigo.
 - Codigo que hemos añadido a la clase: 
   

   Codigo CORS
   ------------------------------------------------------------------------
   // Cors
   // Para evitar problemas con el cors en el navegador
   builder.Services.AddCors(options => options.AddPolicy("AllowWebapp",
                                       builder => builder.AllowAnyOrigin()
                                                       .AllowAnyHeader()
                                                       .AllowAnyMethod()));

   //Despues del builder hemos introducio esta linia para el cors
   app.UseCors("AllowWebapp");
   -------------------------------------------------------------------------



   Codigo para hacer conexión con la base de datos
   ------------------------------------------------------------------------
   //Add Context
   builder.Services.AddDbContext<AplicationDbContext>(options =>
   {
       options.UseSqlServer(builder.Configuration.GetConnectionString("Conexion"));
   });
   -------------------------------------------------------------------------



--INSERT TABLA COUNTRY

INSERT INTO Country VALUES('United States');
INSERT INTO Country VALUES('United Kingdom');
INSERT INTO Country VALUES('France');
INSERT INTO Country VALUES('Germany');
INSERT INTO Country VALUES('Spain');
INSERT INTO Country VALUES('Italy');
INSERT INTO Country VALUES('Japan');
INSERT INTO Country VALUES('Australia');
INSERT INTO Country VALUES('Canada');
INSERT INTO Country VALUES('Mexico');


--INSERT TABLA CITY

INSERT INTO City VALUES('New York', 1);
INSERT INTO City VALUES('London', 2);
INSERT INTO City VALUES('Paris', 3);
INSERT INTO City VALUES('Berlin', 4);
INSERT INTO City VALUES('Munich', 4);
INSERT INTO City VALUES('Barcelona', 5);
INSERT INTO City VALUES('Madrid', 5);
INSERT INTO City VALUES('Roma', 6);
INSERT INTO City VALUES('Milan', 6);
INSERT INTO City VALUES('Tokyo', 7);
INSERT INTO City VALUES('Sydney', 8);
INSERT INTO City VALUES('Melbourne', 8);
INSERT INTO City VALUES('Toronto', 9);
INSERT INTO City VALUES('Vancouver', 9);
INSERT INTO City VALUES('Ciudad de Mexico', 10);


--INSERT TABLA OFFICE

INSERT INTO Office VALUES('ACME NYC', 1);
INSERT INTO Office VALUES('ACME London', 2);
INSERT INTO Office VALUES('ACME Paris', 3);
INSERT INTO Office VALUES('ACME Berlin', 4);
INSERT INTO Office VALUES('ACME Munich',5);
INSERT INTO Office VALUES('ACME Barcelona',6);
INSERT INTO Office VALUES('ACME Madrid',7);
INSERT INTO Office VALUES('ACME Roma',8);
INSERT INTO Office VALUES('ACME Milan',9);
INSERT INTO Office VALUES('ACME Tokyo',10);
INSERT INTO Office VALUES('ACME Sydney',11);
INSERT INTO Office VALUES('ACME Melbourne',12);
INSERT INTO Office VALUES('ACME Toronto',13);
INSERT INTO Office VALUES('ACME Vancouver',14);
INSERT INTO Office VALUES('ACME Ciudad de Mexico',15);

--INSERT TABLA MEETINGROOM
-- ACME NYC - Nova York, Estats Units
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Empire', 1),
       ('Sala Central Park', 1),
       ('Sala Hudson', 1),
       ('Sala Liberty', 1),
       ('Sala Times Square', 1);

-- ACME London - Londres, Regne Unit
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Thames', 2),
       ('Sala Buckingham', 2),
       ('Sala Hyde', 2),
       ('Sala Tower', 2),
       ('Sala Westminster', 2);

-- ACME Paris - París, França
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Seine', 3),
       ('Sala Louvre', 3),
       ('Sala Eiffel', 3),
       ('Sala Montmartre', 3),
       ('Sala Versalles', 3);

-- ACME Berlin - Berlín, Alemanya
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Spree', 4),
       ('Sala Brandenburg', 4),
       ('Sala Tiergarten', 4),
       ('Sala Potsdamer', 4),
       ('Sala Reichstag', 4);

-- ACME Munich - Munic, Alemanya
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Isar', 5),
       ('Sala Englischer Garten', 5),
       ('Sala Marienplatz', 5),
       ('Sala Nymphenburg', 5),
       ('Sala Oktoberfest', 5);

-- ACME Barcelona - Barcelona, Espanya
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Montjuïc', 6),
       ('Sala Tibidabo', 6),
       ('Sala Barceloneta', 6),
       ('Sala Gaudí', 6),
       ('Sala Sagrada Família', 6);

-- ACME Madrid - Madrid, Espanya
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Retiro', 7),
       ('Sala Prado', 7),
       ('Sala Gran Vía', 7),
       ('Sala Puerta del Sol', 7),
       ('Sala Reina Sofía', 7);

-- ACME Rome - Roma, Itàlia
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Tevere', 8),
       ('Sala Colosseo', 8),
       ('Sala Aventino', 8),
       ('Sala Trevi', 8),
       ('Sala Vatican', 8);

-- ACME Milan - Milà, Itàlia
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Navigli', 9),
       ('Sala Duomo', 9),
       ('Sala Brera', 9),
       ('Sala Porta Nuova', 9),
       ('Sala Sforza', 9);

-- ACME Tokyo - Tòquio, Japó
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Fuji', 10),
       ('Sala Shibuya', 10),
       ('Sala Ginza', 10),
       ('Sala Shinjuku', 10),
       ('Sala Harajuku', 10);

-- ACME Sydney - Sydney, Austràlia
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Blue Mountains', 11),
       ('Sala Bondi', 11),
       ('Sala Darling Harbour', 11),
       ('Sala Opera House', 11),
       ('Sala Manly', 11);

-- ACME Melbourne - Melbourne, Austràlia
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Yarra', 12),
       ('Sala Flinders', 12),
       ('Sala St Kilda', 12),
       ('Sala Federation', 12),
       ('Sala Brighton', 12);

-- ACME Toronto - Toronto, Canadà
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Ontario', 13),
       ('Sala CN Tower', 13),
       ('Sala Distillery', 13);

-- ACME Vancouver - Vancouver, Canadà
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Stanley Park', 14),
       ('Sala Capilano', 14),
       ('Sala Granville Island', 14),
       ('Sala Grouse Mountain', 14),
       ('Sala English Bay', 14);

-- ACME Ciudad de México - Ciutat de Mèxic, Mèxic
INSERT INTO MeetingRoom (MeetingRoomName, OfficeId)
VALUES ('Sala Chapultepec', 15),
       ('Sala Zócalo', 15),
       ('Sala Polanco', 15),
       ('Sala Reforma', 15),
       ('Sala Coyoacán', 15);
