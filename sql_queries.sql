create database eShopping;

show databases	

use eShopping;

/* manufacture table creation*/
create table manufacture
(manufactureRowId int auto_increment primary key,
 manufactureId varchar(30) unique,
 manufactureName varchar(30), 
 city varchar(30), 
 email varchar(30),
 phone int);
 
 insert into manufacture values(3,16,'samsung','pune','abc@gmail.com',1234566);
 insert into manufacture values (1 ,12,'da','indore','asd@gmail.com','23424'); 
insert into manufacture values (2 ,13,'da','indore','asd@gmail.com','23424'); 

select * from manufacture;


create table category
(categoryId int primary key, 
categoryName varchar(30)
);
insert into category values (1,123,'electronic'); 
insert into category values (2,124,'electronic'); 
/* product table creation*/

create table product
(productId int auto_increment primary key, 
productName varchar(50), 
price varchar(50),  
categoryId int,
productImg varchar(500),
productDescription varchar(150)
 );


insert into product (productName, price, categoryId, productImg, productDescription) values ('Fjallraven - Foldsack No.','109.95',1,'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg','Your perfect pack for everyday use and walks in the forest. Stash your laptop (u');
insert into product (productName, price, categoryId, productImg, productDescription) values ('Mens Casual Premium Slim ','22.3',1,'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg','Slim-fitting style, contrast raglan long sleeve, three-button henley placket, li');
insert into product (productName, price, categoryId, productImg, productDescription) values ('Mens Cotton Jacket','55.99',1,'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg','great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, s');
insert into product (productName, price, categoryId, productImg, productDescription) values ('Mens Casual Slim Fit','15.99',1,'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg','The color could be slightly different between on the screen and in practice. / P');
insert into product (productName, price, categoryId, productImg, productDescription) values ('John Hardy Womens Legends','695',1,'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg','From our Legends Collection, the Naga was inspired by the mythical water dragon ');
insert into product (productName, price, categoryId, productImg, productDescription) values ('Solid Gold Petite Micropa','168',1,'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg','Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed an');
insert into product (productName, price, categoryId, productImg, productDescription) values ('White Gold Plated Princes','9.99',1,'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg','Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts');
insert into product (productName, price, categoryId, productImg, productDescription) values ('Pierced Owl Rose Gold Pla','10.99',1,'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg','Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Stee');
insert into product (productName, price, categoryId, productImg, productDescription) values ('WD 2TB Elements Portable ','64',1,'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg','USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance Hig');
insert into product (productName, price, categoryId, productImg, productDescription) values ('SanDisk SSD PLUS 1TB Inte','109',1,'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg','Easy upgrade for faster boot up, shutdown, application load and response (As com');
insert into product (productName, price, categoryId, productImg, productDescription) values ('Silicon Power 256GB SSD 3','109',1,'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg','3D NAND flash are applied to deliver high transfer speeds Remarkable transfer sp');
insert into product (productName, price, categoryId, productImg, productDescription) values ('WD 4TB Gaming Drive Works','114',1,'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg','Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek desi');
insert into product (productName, price, categoryId, productImg, productDescription) values ('Acer SB220Q bi 21.5 inche','599',1,'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg','21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync t');
insert into product (productName, price, categoryId, productImg, productDescription) values ('Samsung 49-Inch CHG90 144','999.99',1,'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg','49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side');
insert into product (productName, price, categoryId, productImg, productDescription) values ('BIYLACLESEN Womens 3-in-1','56.99',1,'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg','Note:The Jackets is US standard size, Please choose size as your usual wear Mate');
insert into product (productName, price, categoryId, productImg, productDescription) values ('Lock and Love Womens Remo','29.95',1,'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg','100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATE');
insert into product (productName, price, categoryId, productImg, productDescription) values ('Rain Jacket Women Windbre','39.99',1,'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg','Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable');
insert into product (productName, price, categoryId, productImg, productDescription) values ('MBJ Womens Solid Short Sl','9.85',1,'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg','95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric');
insert into product (productName, price, categoryId, productImg, productDescription) values ('Opna Womens Short Sleeve ','7.95',1,'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg','100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & ');
insert into product (productName, price, categoryId, productImg, productDescription) values ('DANVOUY Womens T Shirt Ca','12.99',1,'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg','95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion');



 select * from product;
 update product set vendorId=2 where productId<=6; 
  insert into product values (23,124,'tv','electronic','100000','1'); 
  insert into product values (3,174,'fridge','electronic','1000',2); 
   insert into product values (4,14,'ac','electronic','10000',3);
 
 create table subCategory
 (subCategoryRowId int auto_increment primary key, 
 subCategoryId varchar(30) unique, 
 categoryRowId int not null,
 constraint fk_categoryRowId_in_category_table Foreign Key (categoryRowId) References category (categoryRowId));

 select * from subCategory;
  insert into subCategory values (10,200,1);
  insert into subCategory values (20,300,2);  
  
 create table customer(
 customerRowId int auto_increment primary key, 
 customerId varchar(30) unique, 
 customerName varchar(30), 
 email varchar(30), 
 address varchar(30), 
 city varchar(30), 
 state varchar(30), 
 postalCode int, 
 phone int);
 
  insert into customer values (01,11,'sandeep','abc@gmail.com','pune','pune','MH','10002',2317612);
    insert into customer values (02,22,'rahul','xyz@gmail.com','pune','pune','MH','10002',23456612);
select * from customer;
 
 create table payment(
 paymentRowId int auto_increment primary key, 
 paymentId varchar(30) unique,
 paymentMode varchar(20)
 );
  insert into payment values (101,'101@abc','online');
  insert into payment values (201,'201@abc','online');
select * from payment;

 create table orders(
	orderRowId int auto_increment primary key,
    orderId varchar(30) unique,
    orderDate varchar(30), 
    shipDate varchar(30), 
    tracker varchar(30),
    customerRowId int not null,
    paymentRowId int not null, 
    productRowId int not null, 
constraint fk_customerRowId_in_customer_table Foreign Key (customerRowId) References customer (customerRowId),
constraint fk_paymentRowId_in_customer_table Foreign Key (paymentRowId) References payment (paymentRowId),
constraint fk_productRowId_in_customer_table Foreign Key (productRowId) References product (productRowId));

insert into orders values (321,'321@','12/04/2021','13/04/2021','yes',1,101,3);
insert into orders values (213,'213@','12/04/2021','13/04/2021','yes',2,201,4);
insert into orders values (111,'111@','12/04/2021','13/04/2021','yes',1,201,12);


create table orderDetails(
orderDetailRowId int auto_increment primary key, 
orderDetailId varchar(30) unique, 
billDate varchar(20), 
orderRowId int not null, 
constraint fk_orderRowId_in_orders_table Foreign Key (orderRowId) References orders (orderRowId));

insert into orderDetails values (111,'111@','12/04/2021',111);
insert into orderDetails values (1001,'1001@','12/04/2021',213);

select * from orderDetails;

create table dispatch(
dispatchRowId int auto_increment primary key, 
dispatchId varchar(30) unique, 
dispatchDate varchar(30),
 tracking varchar(30), 
 orderRowId int not null, 
  productRowId int not null,
 constraint fk_orderRowId_in_dispatch_table Foreign Key (orderRowId) References orders (orderRowId), 
 constraint fk_productRowId_in_product_table Foreign Key (productRowId) References product (productRowId)
 );
 insert into dispatch values (001,'001@','12/04/2021','yes',111,3);
  insert into dispatch values (002,'002@','12/04/2021','yes',213,4);
select * from dispatch;

create table roleMaster(
roleRowId int auto_increment primary key, 
roleId varchar(30) unique,
roleName varchar(30)
);
 insert into roleMaster values (00100,'00100@','user');
  insert into roleMaster values (00200,'00200@','admin');
   insert into roleMaster values (00300,'00300@','supplier');
select * from roleMaster;

create table userRole(
	userRowId int auto_increment primary key,
	userId varchar(30) unique, 
	roleRowId int not null, 
 constraint fk_roleRowId_in_rolemaster_table Foreign Key (roleRowId) References rolemaster (roleRowId));
 
 insert into userRole values (11011,'11011@',100);
  insert into userRole values (1221,'1221@',200);
select * from userRole;

create table loginInfo(
loginRowId int auto_increment primary key, 
loginId varchar(30) unique, 
loginTime varchar(30), 
logoutTime varchar(30),
userRowId int not null,
 constraint fk_userRowId_in_userrole_table Foreign Key (userRowId) References userrole (userRowId)
 );
  insert into loginInfo values (121,'121@','10','11',1221);
  insert into loginInfo values (131,'131@','10','11',11011);
  
select * from loginInfo;

 create table users(
 usersId int unique auto_increment, 
 userName varchar(30), 
 email varchar(30) primary key, 
 phone varchar(12) unique, 
 password varchar(20),
 isAdmin boolean default false );
 


insert into users values ('1@','sandeep','sandeep@gmail.com',2312313,121);
insert into users values ('2@','rahul','rahul@gmail.com',2312313,131);
  
select * from users;


//////////////////////////////////////////////////////////


CREATE TABLE manufacturer (
	m_id INT AUTO_INCREMENT,
	m_name varchar(20),
	city varchar(20), 
	email varchar(20),
    CONSTRAINT pk_category_m_id PRIMARY KEY (m_id) 
    
);	
CREATE TABLE category (
	cat_id INT AUTO_INCREMENT,
	cat_name varchar(20),
    CONSTRAINT pk_category_cat_id PRIMARY KEY (cat_id) 
);	
CREATE TABLE product (
	p_id int auto_increment,
	p_name varchar(20), 
	p_type varchar(20),
	p_price int,
     m_id int,
    cat_name varchar(20),
 	CONSTRAINT pk_product_p_id PRIMARY KEY (p_id),
    CONSTRAINT fk_product_m_id FOREIGN KEY (m_id) REFERENCES manufacturer (m_id),
    CONSTRAINT fk_product_cat_name FOREIGN KEY (cat_name) REFERENCES category (cat_name)
);	

CREATE TABLE vandor (
	v_id int auto_increment,
	v_name varchar(20), 
	m_name varchar(20),
	v_phone int,
     o_id int,
	CONSTRAINT pk_vandor_v_id PRIMARY KEY (v_id),
    //CONSTRAINT fk_m_id_in_product FOREIGN KEY (m_id) REFERENCES manufacturer (m_id),
    //CONSTRAINT fk_cat_name_in_product FOREIGN KEY (cat_name) REFERENCES category (cat_name)
);	

CREATE TABLE order_table (
	o_id int,
	cust_id int (foreign key)
	o_date varchar(20)
	ship_date varchar(20)
	status varchar(20)
	payment_id int (foreign key)
	productId  int(foreign key)
    CONSTRAINT pk_order_table_o_id PRIMARY KEY (o_id),
);

 create table order_detail (
  o_id int (foreign key)
  o_detail_Id int
  bill_date varchar(20)
	CONSTRAINT pk_order_detail_o_detail_Id PRIMARY KEY (o_detail_Id),
 );
 
 create table payment(
 paymentId int,
 paymentMode varchar(20),
 order_id int (foreign key),
  CONSTRAINT pk_payment_paymentId PRIMARY KEY (paymentId)
 );
 
 create table subCategory(
  subCatId int,
  sunCatName varchar(20),
  cat_id int (forgin key),
   CONSTRAINT pk_payment_subCategory PRIMARY KEY (subCatId),
 );
 
 create table dispatch(
 dis_Id int,
 dis_Date varchar(20)
	status
	o_Id int (foreign key) 
 prod_id int 
 CONSTRAINT pk_payment_dispatch PRIMARY KEY (dis_Id),
 );
 
 create table customer(
	cust_id int,
	cust_name varchar(20),
	address varchar(20),
	city varchar(20)
	state varchar(20),
	postal_code int,
	phone int, 
  email varchar(20),
  CONSTRAINT pk_customer_cust_id PRIMARY KEY (cust_id),
 );
 
 
 
 
 
 



