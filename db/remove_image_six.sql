update dogs
set img6 = null
where dog_id = $1;
select * from dogs
where dog_id = $1;