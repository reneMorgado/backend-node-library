CREATE PROCEDURE getBooks
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Libros 
GO  

CREATE PROCEDURE getBookById
    @Id_Libro INT
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Libros  
    WHERE Id_Libro = @Id_Libro  
GO  

CREATE PROCEDURE getAvailableBooks
    @Prestado BIT
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Libros  
    WHERE Prestado = @Prestado  
GO  

CREATE PROCEDURE getBooksByAuthor
    @Id_Autores INT
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Libros  
    WHERE Id_Autores = @Id_Autores  
GO  

CREATE PROCEDURE getBooksByGender
    @Id_Genero INT
AS   
    SET NOCOUNT ON;  
    SELECT * FROM dbo.Libros  
    WHERE Id_Genero = @Id_Genero  
GO  

CREATE PROCEDURE addBook
    @Id_Autores INT,
	@Id_Genero INT,
	@Id_Editorial INT,
	@Id_Idioma INT,
	@Titulo VARCHAR(100),
	@Sinopsis VARCHAR(100),
	@FechaPublicacion VARCHAR(100),
	@ImgUrl VARCHAR(200),
	@Edicion INT
AS   
    SET NOCOUNT ON;  
    INSERT INTO dbo.Libros(Id_Autores, Id_Genero, Id_Editorial, Id_Idioma, Titulo, Sinopsis, FechaPublicacion, ImgUrl, Edicion, createdAt, updatedAt) 
		VALUES (@Id_Autores, @Id_Genero, @Id_Editorial, @Id_Idioma, @Titulo, @Sinopsis, @FechaPublicacion, @ImgUrl, @Edicion, SYSDATETIME(), SYSDATETIME())
GO  

CREATE PROCEDURE deleteBook
    @Id_Libro INT
AS   
    SET NOCOUNT ON;  
    DELETE FROM dbo.Libros WHERE Id_Libro = @Id_Libro
GO

CREATE PROCEDURE setBookRented
    @Id_Libro INT,
    @Prestado BIT
AS   
    SET NOCOUNT ON;  
    UPDATE dbo.Libros 
        SET Prestado = @Prestado, 
            updatedAt = SYSDATETIME()
		WHERE Id_Libro = @Id_Libro
GO  

CREATE PROCEDURE editBook
    @Id_Libro INT,
    @Id_Autores INT,
	@Id_Genero INT,
	@Id_Editorial INT,
	@Id_Idioma INT,
	@Titulo VARCHAR(100),
	@Sinopsis VARCHAR(100),
	@FechaPublicacion VARCHAR(100),
	@ImgUrl VARCHAR(200),
	@Edicion INT
AS   
    SET NOCOUNT ON;  
    UPDATE dbo.Libros
        SET Id_Autores = @Id_Autores,   
            Id_Genero = @Id_Genero,
            Id_Editorial = @Id_Editorial,
            Id_Idioma = @Id_Idioma,
            Titulo = @Titulo,
            Sinopsis = @Sinopsis,
            FechaPublicacion = @FechaPublicacion,
            ImgUrl = @ImgUrl,
            Edicion = @Edicion,
            updatedAt = SYSDATETIME()
        WHERE Id_Libro = @Id_Libro
GO  