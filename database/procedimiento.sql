CREATE DEFINER=`root`@`localhost` PROCEDURE `crearUsuario`(IN nombre VARCHAR(100),IN apellido VARCHAR(100),IN nick VARCHAR(100),IN email VARCHAR(100),IN clave VARCHAR(100),IN isadmin boolean)
BEGIN
	INSERT INTO usuario(nombreUsuario,apellidoUsuario,nickUsuario,emailUsuario,claveUsuario,isadminUsuario) 
    VALUES 
	 (nombre,apellido,nick,email,clave,isadmin);
	select @usuario := last_insert_id() from usuario limit 1;
    INSERT INTO perfil (tituloPerfil,idUsuario) values ('TITULO',@usuario);
END