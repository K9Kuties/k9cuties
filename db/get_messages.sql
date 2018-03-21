select * from messages
where sending_user_id in ($1, $2) and receiving_user_id in ($1, $2);
