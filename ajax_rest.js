$(document).ready(function () {
  $("form").submit(function (event) {
    var formData = {
      query: $("#ip").val(),
    };
	var url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
	var token = "db5d0da29b8027007c4d35be0e93a8af2b872f18";

    $.ajax({
      type: "GET",
      url: url + formData.query,
	  beforeSend: function(xhr) {
                 xhr.setRequestHeader("Authorization", "Token "+ token) 
            },
      data: '',
      dataType: "json",
      encode: true,
    }).done(function (result) {
        console.log(result);
        let detailInfo = result['location']['data'];

        $('#result').html(
            '<p>Страна: ' + detailInfo.country + '</p>' +
            '<p>Регион: ' + detailInfo.region_with_type + '</p>' +
            '<p>Город: ' + detailInfo.city + '</p>' +
            '<p>Почтовый индекс: ' + detailInfo.postal_code + '</p>' +
            '<p>Координаты: ' + detailInfo.geo_lat + ', ' + detailInfo.geo_lon + '</p>'
        )
	});

    event.preventDefault();
  });
});