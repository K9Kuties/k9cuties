update dogs
set name = $2,
breed = $3,
age = $4,
gender = $5,
description = $6
where dog_id = $1;
select * from dogs
where dog_id = $1;