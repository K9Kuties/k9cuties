delete from liked
where dog_being_liked = $2
and dog_liking = $1;

delete from messages
where sending_user_id in 
($1, $2)
and
receiving_user_id in ($1, $2); 