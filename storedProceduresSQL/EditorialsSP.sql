CREATE PROCEDURE getEditorials
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Editoriales 
GO  

CREATE PROCEDURE getEditorialById
    @Id_Editorial INT
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Editoriales  
    WHERE Id_Editorial = @Id_Editorial
GO  

CREATE PROCEDURE getEditorialByName
    @Editorial VARCHAR(50)
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Editoriales  
    WHERE Editorial = @Editorial
GO  

CREATE PROCEDURE addEditorial
    @Editorial VARCHAR(50)
AS   
    SET NOCOUNT ON;  
    INSERT INTO dbo.Editoriales(Editorial, createdAt, updatedAt) 
		VALUES (@Editorial, SYSDATETIME(), SYSDATETIME())
GO  

CREATE PROCEDURE deleteEditorial
    @Id_Editorial INT
AS   
    SET NOCOUNT ON;  
    DELETE FROM dbo.Editoriales WHERE Id_Editorial = @Id_Editorial
GO

CREATE PROCEDURE editEditorial
    @Id_Editorial INT,
    @Editorial VARCHAR(50)
AS   
    SET NOCOUNT ON;  
    UPDATE dbo.Editoriales 
        SET Editorial = @Editorial, 
            updatedAt = SYSDATETIME()
		WHERE Id_Editorial = @Id_Editorial
GO  