update dogs
set location = $2
where dog_id = $1;

update dogs
set latitude = $3
where dog_id = $1;

update dogs
set longitude = $4
where dog_id = $1;