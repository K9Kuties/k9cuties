update dogs
set img1 = null
where dog_id = $1;
select * from dogs
where dog_id = $1;