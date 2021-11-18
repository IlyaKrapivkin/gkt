export const cntUserAlive = `
select
count(id)
from
session s
where
exists (
  select
  1
  from
  person p
  where
  p.id = s.person_id
  and p.valid = true
  and p.delete_date is null
)
and s.token = $1;
`