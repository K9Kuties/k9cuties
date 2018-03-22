insert into messages (sending_user_id, receiving_user_id, message_body, time)
values ($1, $2, $3, $4);
select * from messages
where sending_user_id in ($1, $2) and receiving_user_id in ($1, $2);