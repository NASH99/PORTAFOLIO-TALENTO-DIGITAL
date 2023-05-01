CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminarUsuario`(IN id int)
BEGIN
	delete from publicacion where idPerfil = id;
	delete from imagen where idPerfil = id;
	delete from perfil where idPerfil = id;
	delete from usuario where idUsuario = id;
END