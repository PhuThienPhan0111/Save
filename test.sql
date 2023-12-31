USE [TEST_REACT]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 10/3/2023 5:14:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[customer_code] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [nvarchar](20) NOT NULL,
	[last_name] [nvarchar](20) NOT NULL,
	[birth_date] [datetime] NOT NULL,
	[email] [nchar](200) NOT NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[customer_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 10/3/2023 5:14:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[order_code] [int] IDENTITY(1,1) NOT NULL,
	[customer_code] [int] NOT NULL,
	[product_code] [int] NOT NULL,
	[shop_code] [int] NOT NULL,
	[amount] [decimal](13, 3) NULL,
	[price] [decimal](13, 3) NULL,
	[create_time] [datetime] NOT NULL,
 CONSTRAINT [PK_Order_1] PRIMARY KEY CLUSTERED 
(
	[order_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 10/3/2023 5:14:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[product_code] [int] IDENTITY(1,1) NOT NULL,
	[name] [nchar](100) NOT NULL,
	[price] [decimal](13, 3) NULL,
	[shop_code] [int] NOT NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[product_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Shop]    Script Date: 10/3/2023 5:14:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Shop](
	[shop_code] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](200) NOT NULL,
	[location] [nvarchar](500) NULL,
 CONSTRAINT [PK_Shop] PRIMARY KEY CLUSTERED 
(
	[shop_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Customer] ON 

INSERT [dbo].[Customer] ([customer_code], [first_name], [last_name], [birth_date], [email]) VALUES (2, N'Thiên Phú', N'Phan', CAST(N'1997-11-01T00:00:00.000' AS DateTime), N'phanthienphu0111@gmail.com                                                                                                                                                                              ')
INSERT [dbo].[Customer] ([customer_code], [first_name], [last_name], [birth_date], [email]) VALUES (5, N'Thiên Sơn', N'Phan', CAST(N'2023-05-03T00:00:00.000' AS DateTime), N'phanthienson@edu.vn                                                                                                                                                                                     ')
INSERT [dbo].[Customer] ([customer_code], [first_name], [last_name], [birth_date], [email]) VALUES (7, N'Nguyễn Văn', N'A', CAST(N'2015-12-05T00:00:00.000' AS DateTime), N'abc@hotmail.com                                                                                                                                                                                         ')
SET IDENTITY_INSERT [dbo].[Customer] OFF
GO
SET IDENTITY_INSERT [dbo].[Order] ON 

INSERT [dbo].[Order] ([order_code], [customer_code], [product_code], [shop_code], [amount], [price], [create_time]) VALUES (3, 2, 3, 1, NULL, CAST(20000000.000 AS Decimal(13, 3)), CAST(N'2023-10-03T00:00:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[Order] OFF
GO
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([product_code], [name], [price], [shop_code]) VALUES (3, N'Laptop MSI                                                                                          ', CAST(20000000.000 AS Decimal(13, 3)), 1)
INSERT [dbo].[Product] ([product_code], [name], [price], [shop_code]) VALUES (4, N'PC Full                                                                                             ', CAST(32000000.000 AS Decimal(13, 3)), 1)
INSERT [dbo].[Product] ([product_code], [name], [price], [shop_code]) VALUES (10, N'Laptop Asus                                                                                         ', CAST(17000000.000 AS Decimal(13, 3)), 2)
SET IDENTITY_INSERT [dbo].[Product] OFF
GO
SET IDENTITY_INSERT [dbo].[Shop] ON 

INSERT [dbo].[Shop] ([shop_code], [name], [location]) VALUES (1, N'GEARVN HOÀNG HOA THÁM', N'78-80-82 Hoàng Hoa Thám, Phường 12, Quận Tân Bình')
INSERT [dbo].[Shop] ([shop_code], [name], [location]) VALUES (2, N'GEARVN KHA VẠN CÂN', N'905 Kha Vạn Cân, Phường Linh Tây, TP. Thủ Đức')
INSERT [dbo].[Shop] ([shop_code], [name], [location]) VALUES (3, N'GEARVN TRẦN HƯNG ĐẠO', NULL)
SET IDENTITY_INSERT [dbo].[Shop] OFF
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Customer] FOREIGN KEY([customer_code])
REFERENCES [dbo].[Customer] ([customer_code])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Customer]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Product] FOREIGN KEY([product_code])
REFERENCES [dbo].[Product] ([product_code])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Product]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Shop] FOREIGN KEY([customer_code])
REFERENCES [dbo].[Shop] ([shop_code])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Shop]
GO
