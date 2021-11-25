CREATE PROCEDURE getLanguages
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Idiomas 
GO  

CREATE PROCEDURE getLanguageById
    @Id_Idioma INT
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Idiomas  
    WHERE Id_Idioma = @Id_Idioma
GO  

CREATE PROCEDURE getLanguageByName
    @Idioma VARCHAR(50)
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Idiomas  
    WHERE Idioma = @Idioma
GO  

CREATE PROCEDURE addLanguage
    @Idioma VARCHAR(50)
AS   
    SET NOCOUNT ON;  
    INSERT INTO dbo.Idiomas(Idioma, createdAt, updatedAt) 
		VALUES (@Idioma, SYSDATETIME(), SYSDATETIME())
GO  

CREATE PROCEDURE deleteLanguage
    @Id_Idioma INT
AS   
    SET NOCOUNT ON;  
    DELETE FROM dbo.Idiomas WHERE Id_Idioma = @Id_Idioma
GO

CREATE PROCEDURE editEditorial
    @Id_Idioma INT,
    @Idioma VARCHAR(50)
AS   
    SET NOCOUNT ON;  
    UPDATE dbo.Idiomas 
        SET Idioma = @Idioma, 
            updatedAt = SYSDATETIME()
		WHERE Id_Idioma = @Id_Idioma
GO  