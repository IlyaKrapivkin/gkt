export const userAliveByRole = `
select
s.id
from
session s
inner join person p on p.id = s.person_id
inner join role r on r.id = p.role_id
where
s.token = $1
and p.valid = true
and p.delete_date is null
and r.name = $2;
`