CREATE PROCEDURE getUsers
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Usuarios 
GO  

CREATE PROCEDURE getUserNameById
    @Id_Usuario INT
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Usuarios  
    WHERE Id_Usuario = @Id_Usuario
GO  

CREATE PROCEDURE deleteUser
    @Id_Usuario INT
AS   
    SET NOCOUNT ON;  
    DELETE FROM dbo.Usuarios WHERE Id_Usuario = @Id_Usuario
GO

CREATE PROCEDURE getUserByEmail
    @Email VARCHAR(100)
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Usuarios  
    WHERE Email = @Email
GO 

CREATE PROCEDURE addRent
    @Id_Usuario INT,
    @Id_Libro INT,
    @FechaRenta DATE,
    @FechaDevolucion DATE
AS   
    SET NOCOUNT ON;  
    INSERT INTO dbo.Rentas(Id_Usuario, Id_Libro, FechaRenta, FechaDevolucion, createdAt, updatedAt) 
		VALUES (@Id_Usuario, @Id_Libro, @FechaRenta, @FechaDevolucion, SYSDATETIME(), SYSDATETIME())
GO  


