CREATE PROCEDURE getGenders
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Generos 
GO  

CREATE PROCEDURE getGenderById
    @Id_Genero INT
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Generos  
    WHERE Id_Genero = @Id_Genero
GO 

CREATE PROCEDURE getGenderByName
    @Genero VARCHAR(50)
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Generos  
    WHERE Genero = @Genero
GO  

CREATE PROCEDURE addGender
    @Genero VARCHAR(50),
    @Imagen_Genero VARCHAR(150)
AS   
    SET NOCOUNT ON;  
    INSERT INTO dbo.Generos(Genero, Imagen_Genero, createdAt, updatedAt) 
		VALUES (@Genero, @Imagen_Genero, SYSDATETIME(), SYSDATETIME())
GO  

CREATE PROCEDURE deleteGender
    @Id_Genero INT
AS   
    SET NOCOUNT ON;  
    DELETE FROM dbo.Generos WHERE Id_Genero = @Id_Genero
GO

CREATE PROCEDURE editGender
    @Id_Genero INT,
    @Genero VARCHAR(50),
    @Imagen_Genero VARCHAR(150)
AS   
    SET NOCOUNT ON;  
    UPDATE dbo.Generos 
        SET Genero = @Genero, 
            Imagen_Genero = @Imagen_Genero,
            updatedAt = SYSDATETIME()
		WHERE Id_Genero = @Id_Genero
GO  