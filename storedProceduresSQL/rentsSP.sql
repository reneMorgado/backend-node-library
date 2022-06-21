CREATE PROCEDURE getRents
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Rentas 
GO  

CREATE PROCEDURE getRentsByUser
    @Id_Usuario INT
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Rentas  
    WHERE Id_Usuario = @Id_Usuario
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

CREATE PROCEDURE deleteRent
    @Id_Renta INT
AS   
    SET NOCOUNT ON;  
    DELETE FROM dbo.Rentas WHERE Id_Renta = @Id_Renta
GO
