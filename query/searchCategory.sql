SELECT DISTINCT `idCategory`, `category`.`name` 
FROM `category`, `sub_Category` 
WHERE `category`.`idCategory`=`sub_Category`.`category_idCategory` 
AND (`category`.`name` LIKE 't%' OR `sub_Category`.`name` LIKE 't%')