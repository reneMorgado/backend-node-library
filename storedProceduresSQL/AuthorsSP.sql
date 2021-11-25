CREATE PROCEDURE getAuthors
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Autores 
GO  

CREATE PROCEDURE getAuthorById
    @Id_Autor INT
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Autores  
    WHERE Id_Autor = @Id_Autor
GO  

CREATE PROCEDURE getAuthorByName
    @Nombre_Autor VARCHAR(50),
    @Apellido_Autor VARCHAR(50)
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Autores  
    WHERE Nombre_Autor = @Nombre_Autor AND Apellido_Autor = @Apellido_Autor
GO  

CREATE PROCEDURE addAuthor
    @Nombre_Autor VARCHAR(50),
    @Apellido_Autor VARCHAR(50),
    @Fecha_Nacimiento_Autor DATE,
    @Imagen_Autor VARCHAR(150)
AS   
    SET NOCOUNT ON;  
    INSERT INTO dbo.Autores(Nombre_Autor, Apellido_Autor, Fecha_Nacimiento_Autor, Imagen_Autor, createdAt, updatedAt) 
		VALUES (@Nombre_Autor, @Apellido_Autor, @Fecha_Nacimiento_Autor, @Imagen_Autor, SYSDATETIME(), SYSDATETIME())
GO  

CREATE PROCEDURE deleteAuthor
    @Id_Autor INT
AS   
    SET NOCOUNT ON;  
    DELETE FROM dbo.Autores WHERE Id_Autor = @Id_Autor
GO

CREATE PROCEDURE editAuthor
    @Id_Autor INT,
    @Nombre_Autor VARCHAR(50),
    @Apellido_Autor VARCHAR(50),
    @Fecha_Nacimiento_Autor DATE,
    @Imagen_Autor VARCHAR(150)
AS   
    SET NOCOUNT ON;  
    UPDATE dbo.Autores 
        SET Nombre_Autor = @Nombre_Autor, 
            Apellido_Autor = @Apellido_Autor,
            Fecha_Nacimiento_Autor = @Fecha_Nacimiento_Autor,
            Imagen_Autor = @Imagen_Autor,
            updatedAt = SYSDATETIME()
		WHERE Id_Autor = @Id_Autor
GO  