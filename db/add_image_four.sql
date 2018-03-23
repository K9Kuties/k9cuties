update dogs
set img4 = $2
where dog_id = $1;
select * from dogs
where dog_id = $1;