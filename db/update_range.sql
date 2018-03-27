update dogs
set age_begin = $2
where dog_id = $1;
update dogs
set age_end = $3
where dog_id = $1;
select * from dogs
where dog_id = $1;