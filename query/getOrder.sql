SELECT `order`.*, `store`.`name`, `user`.`username` FROM `order`, `store`, `user` WHERE `order`.`user_idUser` = `user`.`idUser` and `order`.`store_idstore` = `store`.`idstore`