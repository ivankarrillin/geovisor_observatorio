create table mercado as
select *,ST_SetSRID(st_point(longitud,latitud),4326)as geom from data_webscrape_1
where longitud IS NOT NULL

drop view mercado
select count(*) from data_webscrape_1
where longitud is null

SELECT ST_SetSRID( ST_Point( -71.104, 42.315), 4326)

select * from info_inmuebles_pagweb limit 10

update mercado set geom=ST_SetSRID(geom,4326)

drop table integral
create table integral as
select * from(
select titulo,estrato,precio,area_construida,geom,
(precio*0.94/area_construida) as integral
from mercado
where upper(titulo) LIKE '%APARTA%'
and precio is not null and area_construida is not null
and area_construida <>0 and precio>0 and precio<5000000000)
as sub where integral<25000000
limit 10





titulo,precio,area_construida,area_total,geom,
titulo
precio
area_construida
area_total

select * from mercado limit 100




drop table ofertas_mapa
create table ofertas_mapa as
select * from(
select COALESCE(tipo_inmueble,'N/A')AS tipo_inmueble,COALESCE(estrato,0) AS estrato,precio,COALESCE(area_construida,0)as area_construida,
	COALESCE(area_total,0)as area_total,
	COALESCE(parqueaderos::float,0)as parqueaderos,
	COALESCE(habitaciones,0)as habitaciones,
	COALESCE(baños,0)as baños,
	latitud,longitud,
	COALESCE(sitio_web,'N/A')as sitio_web,
	geom,
(precio*0.94/area_total) as integral_lote,

CASE 
   WHEN area_construida is null THEN 0
	when area_construida=0 then 0
   ELSE (precio*0.94/area_construida)
END as integral_construccion
from mercado
where latitud<>0 and longitud<>0 and
precio is not null and area_total is not null
and area_total <>0 and precio>0 and precio<5000000000)
as sub where integral_lote<25000000

select distinct tipo_inmueble from ofertas_mapa

limit 10











