const db = require("./db");
class worldcupsdata {
  constructor() {}

  getJSON = async function () {
    let rows = await db.query(`select array_to_json(array_agg(row_to_json(t1))) as json from (	
      select 
          wc.*,(
              select 
                  array_to_json(array_agg(row_to_json(t)))
              from 
                  (select 
                      distinct(venues.name),venues.city,venues.capacity
                   from 
                      (worldcups  join worldcups_venues on (wc.year = worldcups_venues.year)) join venues on (worldcups_venues.venueid = venues.id)

                  ) t
              ) as venues
      from worldcups as wc
      group by wc.year
      order by wc.year
  ) t1`);
    return rows.rows[0].json;
  };

  getVenues = async function (year) {
    let rows = await db.query(
      "select venues.* from worldcups_venues  join venues on (venueid = id) where year = $1",
      [year]
    );
    return rows.rows;
  };
}

const baza = new worldcupsdata();
module.exports = baza;