select * from dogs
where dog_id in
(select liked.dog_liking
    from liked 
    where liked.dog_being_liked = $1
intersect
select liked.dog_being_liked
    from liked
    where liked.dog_liking = $1);