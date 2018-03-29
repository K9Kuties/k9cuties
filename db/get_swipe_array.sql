select * 
from dogs
where ST_DWithin(location, ST_MakePoint($3,$2)::geography, $4 * 1609)
AND dog_id not in (select dog_being_unliked
                        from dislike
                        where dog_unliking = $1)
AND dog_id not in (select dog_being_liked
                        from liked 
                        where dog_liking = $1)
AND dog_id <> $1;