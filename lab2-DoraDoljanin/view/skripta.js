var data;
GetData = async () => {
  data = await fetch("/data").then((r) => r.json());
  return data;
};

async function postData(data = {}) {
  const dataVenues = await fetch("/venues", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => r.json());
  //console.log(dataVenues.venues);
  return dataVenues.venues;
}

/* Formatting function for row details */
function format(venues) {
  const start =
    '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
  const end = "</table>";
  var direlements = Object.values(venues)
    .map(
      (el) =>
      "<tr>" +
      "<td>Venue name:</td>" +
      "<td>" +
      el.name +
      "</td>" +
      "<td>Venue city:</td>" +
      "<td>" +
      el.city +
      "</td>" +
      "<td>Venue capacity:</td>" +
      "<td>" +
      el.capacity +
      "</td>" +
      "<tr>"
    )
    .join("");
  //console.log(direlements);
  return start + direlements + end;
}

//ready function
$(document).ready(async function () {
  const json = await GetData();
  //console.log(json);
  // text input to each footer cell
  $('#worldcups-table tfoot th').each(function () {
    var title = $(this).text();
    $(this).html('<input type="text" placeholder="Search ' + title + '" style="width: 60px;" />');
  });

  var table = $("#worldcups-table").DataTable({
    data: json,
    columns: [{
        data: "year"
      },
      {
        data: "wikipediapage"
      },
      {
        data: "host"
      },
      {
        data: "beginning"
      },
      {
        data: "ending"
      },
      {
        data: "teamcount"
      },
      {
        data: "champions"
      },
      {
        data: "secondplace"
      },
      {
        data: "thirdplace"
      },
      {
        data: "fourthplace"
      },
      {
        data: "matchcount"
      },
      {
        data: "goalcount"
      },
      {
        data: "attendance"
      },
      {
        className: "details-control",
        orderable: false,
        data: null,
        defaultContent: "click here",
      }
    ],
    order: [
      [1, "asc"]
    ],
    dom: 'Bfrtip',
    buttons: [{
        text: 'JSON',
        action: function (e, dt, button, config) {
          var years = dt.buttons.exportData().body.map(r => r[0]);
          dataForExport = data.filter(r => years.includes(r.year));
          console.log(dataForExport)

          $.fn.dataTable.fileSave(
            new Blob([JSON.stringify(dataForExport)]),
            'FIFAWorldCups.json'
          );
        }
      },
      {
        text: 'CSV',
        action: function (e, dt, button, config) {
          var years = dt.buttons.exportData().body.map(r => r[0]);
          dataForExport = data.filter(r => years.includes(r.year));
          var header = dt.buttons.exportData().header.toString() + 'venuename,venuecity,venuecapatity'
          dataForExportCSV = dataForExport.map(r => {
            var row = Object.keys(r).slice(0, -1).map(key => r[key].toString()).join(",");
            var rowsForYear = r.venues.map(element => {
              var venueRow = Object.keys(element).map(key => element[key].toString()).join(",");
              return row + ',' + venueRow;
            }).join('\n');
            return rowsForYear;
          }).join('\n');
          var finalCSV = header + '\n' + dataForExportCSV
          $.fn.dataTable.fileSave(
            new Blob([finalCSV]),
            'FIFAWorldCups.csv'
          );
        }
      }
    ],

    initComplete: function () {
      // pretrazivanje po atributima
      this.api().columns().every(function () {
        var that = this;
        $('input', this.footer()).on('keyup change clear', function () {
          if (that.search() !== this.value) {
            that
              .search(this.value)
              .draw();
          }
        });
      });
    }
  });

  table.buttons().container()
    .appendTo($('.col-sm-6:eq(0)', table.table().container()));

  // event listener za prikaz i sakrivanje detalja o venueima
  $("#worldcups-table tbody").on(
    "click",
    "td.details-control",
    async function () {
      var tr = $(this).closest("tr");
      var row = table.row(tr);
      console.log(row.value);
      if (row.child.isShown()) {
        row.child.hide();
        tr.removeClass("shown");
      } else {
        var year = row.data().year;
        var venues = await postData({
          year
        });
        row.child(format(venues)).show();
        tr.addClass("shown");
      }
    }
  )

});