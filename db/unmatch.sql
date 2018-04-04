delete from liked
where dog_being_liked = $2
and dog_liking = $1;