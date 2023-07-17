$(document).ready(function() {

    getJsonData();
    getJsonBestCource();

    $("#banks-1").stupidtable();
    $("#banks-2").stupidtable();
    $("#banks-3").stupidtable();

    // Open converter
    $('body').on('click', '.icon-calculator', function() {
        $.each($(this).parents(), function() {
            $(this).parents().find('#tooltip_content').remove();
        });

        var code = $(this).parent().find(".currency_code").text();
        var currency = parseFloat($(this).parent().text());
        $(this).parent().append(
            '<div id="tooltip_content">' +
            '<div class="arrow_top"></div>' +
            '<div class="close icon-font icon-close"></div>' +
            '<div class="field-with-text">' +
            '<input type="text" value="100" class="form-input-field cash" maxlength="11" data-cource="' + currency + '"/>' +
            '<div class="field-with-text__text">' + code + '</div>' +
            '</div>' +
            '<span class="currency-converter-tooltip__sign"> = </span>' +
            '<div class="field-with-text">' +
            '<input type="text" value="' + (currency * 100).toFixed(2) + '" class="form-input-field currency2" maxlength="11" data-cource="1" />' +
            '<div class="field-with-text__text">azn</div>' +
            '</div>' +
            '</div>'
        );
    });

    // Close converter
    $('body').on('click', '#tooltip_content .close', function() {
        $.each($(this).parents(), function() {
            $(this).parents().find('#tooltip_content').remove();
        });
    });

    // Calc cource currency 1
    $("body").on("keyup", "#tooltip_content .cash", function() {
        var cource1 = parseFloat($("#tooltip_content .cash").data("cource"));
        var curr1 = parseFloat($("#tooltip_content .cash").val());

        $("#tooltip_content .currency2").val((curr1 * cource1).toFixed(2));
    });

    // Calc cource currency 2
    $("body").on("keyup", "#tooltip_content .currency2", function() {
        var cource1 = parseFloat($("#tooltip_content .cash").data("cource"));
        var curr2 = parseFloat($("#tooltip_content .currency2").val());

        $("#tooltip_content .cash").val((curr2 / cource1).toFixed(2));
    });

    // Show calc icon 
    $("body").on("mouseover", ".banks .calculator__container td", function() {
        $.each($(this).parents(), function() {
            $(this).parents().find('.calculator').css({
                'visibility': 'hidden'
            });
        });

        if (($(this).data("cource") == "0.00") || ($(this).data("cource") == "0.0000")) {
            $(this).find('.calculator').css({
                'visibility': 'hidden'
            });
        } else {
            $(this).find('.calculator').css({
                'visibility': 'visible'
            });
        }

    });

    // Update data
    setInterval(function() {
        getJsonUpdateBestCource();
        getJsonTime();
        getJsonUpdateData();
    }, 300000);
});

function getJsonData() {
    $.ajax({
        url: "/data/data.json",
        success: function(resp) {
            var i = 0;
            while (resp[i]) {
                if ((resp[i].cash.usd.buy != '0.00') || (resp[i].cash.usd.sell != '0.00') ||
                    (resp[i].cash.eur.buy != '0.00') || (resp[i].cash.eur.sell != '0.00')) {
                    $("#banks-1 tbody").append('<tr class="calculator__container exchange-calculator-rates">' +
                        '<td><a class="gmaps" href="#" data-link="' + resp[i].maplink + '"></a><a class="font-bold" href="' + resp[i].link + '" target="_blank">' + resp[i].name + '</a></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.usd.buy + '">' + resp[i].cash.usd.buy + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.usd.code + '</span></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.usd.sell + '">' + resp[i].cash.usd.sell + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.usd.code + '</span></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.eur.buy + '">' + resp[i].cash.eur.buy + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.eur.code + '</span></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.eur.sell + '">' + resp[i].cash.eur.sell + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.eur.code + '</span></td>' +
                        '<td></td>' +
                        '</tr>');
                }
                if ((resp[i].cash.rub.buy != '0.00') || (resp[i].cash.rub.sell != '0.00') ||
                    (resp[i].cash.gbp.buy != '0.00') || (resp[i].cash.gbp.sell != '0.00')) {
                    $("#banks-2 tbody").append('<tr class="calculator__container exchange-calculator-rates">' +
                        '<td><a class="gmaps" href="#" data-link="' + resp[i].maplink + '"></a><a class="font-bold" href="' + resp[i].link + '" target="_blank">' + resp[i].name + '</a></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.rub.buy + '">' + resp[i].cash.rub.buy + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.rub.code + '</span></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.rub.sell + '">' + resp[i].cash.rub.sell + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.rub.code + '</span></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.gbp.buy + '">' + resp[i].cash.gbp.buy + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.gbp.code + '</span></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.gbp.sell + '">' + resp[i].cash.gbp.sell + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.gbp.code + '</span></td>' +
                        '<td></td>' +
                        '</tr>');
                }
                if ((resp[i].cash.try.buy != '0.00') || (resp[i].cash.try.sell != '0.00')) {
                    $("#banks-3 tbody").append('<tr class="calculator__container exchange-calculator-rates">' +
                        '<td><a class="gmaps" href="#" data-link="' + resp[i].maplink + '"></a><a class="font-bold" href="' + resp[i].link + '" target="_blank">' + resp[i].name + '</a></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.try.buy + '">' + resp[i].cash.try.buy + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.try.code + '</span></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.try.sell + '">' + resp[i].cash.try.sell + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.try.code + '</span></td>' +
                        '<td style="width: 30%"></td>' +
                        '<td></td>' +
                        '</tr>');
                }
                i++;
                if (i == 33) break;
            }
        }
    });
}

function getJsonUpdateData() {
    $.ajax({
        url: "/data/data.json",
        success: function(resp) {
            var i = 0;
            var htmlData1, htmlData2, htmlData3;
            while (resp[i]) {
                if ((resp[i].cash.usd.buy != '0.00') || (resp[i].cash.usd.sell != '0.00') ||
                    (resp[i].cash.eur.buy != '0.00') || (resp[i].cash.eur.sell != '0.00')) {
                    htmlData1 += '<tr class="calculator__container exchange-calculator-rates">' +
                        '<td><a class="gmaps" href="#" data-link="' + resp[i].maplink + '"></a><a class="font-bold" href="' + resp[i].link + '" target="_blank">' + resp[i].name + '</a></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.usd.buy + '">' + resp[i].cash.usd.buy + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.usd.code + '</span></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.usd.sell + '">' + resp[i].cash.usd.sell + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.usd.code + '</span></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.eur.buy + '">' + resp[i].cash.eur.buy + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.eur.code + '</span></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.eur.sell + '">' + resp[i].cash.eur.sell + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.eur.code + '</span></td>' +
                        '<td></td>' +
                        '</tr>';
                }
                if ((resp[i].cash.rub.buy != '0.00') || (resp[i].cash.rub.sell != '0.00') ||
                    (resp[i].cash.gbp.buy != '0.00') || (resp[i].cash.gbp.sell != '0.00')) {
                    htmlData2 += '<tr class="calculator__container exchange-calculator-rates">' +
                        '<td><a class="gmaps" href="#" data-link="' + resp[i].maplink + '"></a><a class="font-bold" href="' + resp[i].link + '" target="_blank">' + resp[i].name + '</a></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.rub.buy + '">' + resp[i].cash.rub.buy + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.rub.code + '</span></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.rub.sell + '">' + resp[i].cash.rub.sell + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.rub.code + '</span></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.gbp.buy + '">' + resp[i].cash.gbp.buy + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.gbp.code + '</span></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.gbp.sell + '">' + resp[i].cash.gbp.sell + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.gbp.code + '</span></td>' +
                        '<td></td>' +
                        '</tr>';
                }
                if ((resp[i].cash.try.buy != '0.00') || (resp[i].cash.try.sell != '0.00')) {
                    htmlData3 += '<tr class="calculator__container exchange-calculator-rates">' +
                        '<td><a class="gmaps" href="#" data-link="' + resp[i].maplink + '"></a><a class="font-bold" href="' + resp[i].link + '" target="_blank">' + resp[i].name + '</a></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.try.buy + '">' + resp[i].cash.try.buy + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.try.code + '</span></td>' +
                        '<td class="font-size-large" data-cource="' + resp[i].cash.try.sell + '">' + resp[i].cash.try.sell + '<i class="icon-font icon-calculator calculator"></i><span class="currency_code">' + resp[i].cash.try.code + '</span></td>' +
                        '<td style="width: 30%"></td>' +
                        '<td></td>' +
                        '</tr>';
                }
                i++;
                if (i == 33) break;
            }
            $("#banks-1 tbody").replaceWith("<tbody>" + htmlData1 + "</tbody>");
            $("#banks-2 tbody").replaceWith("<tbody>" + htmlData2 + "</tbody>");
            $("#banks-3 tbody").replaceWith("<tbody>" + htmlData3 + "</tbody>");
        }
    });
}

function getJsonBestCource() {
    $.ajax({
        url: "/data/data.json",
        success: function(resp) {
            // CBAR Cource
            var k = 33;
            var parrent = $(".currency-table__table tbody");
            parrent.find("td[data-cource-cbar='usd'] .currency-table__rate__num").text(resp[k].cash.usd.buy);
            parrent.find("td[data-cource-cbar='eur'] .currency-table__rate__num").text(resp[k].cash.eur.buy);
            parrent.find("td[data-cource-cbar='rub'] .currency-table__rate__num").text(resp[k].cash.rub.buy);
            parrent.find("td[data-cource-cbar='gbp'] .currency-table__rate__num").text(resp[k].cash.gbp.buy);
            parrent.find("td[data-cource-cbar='try'] .currency-table__rate__num").text(resp[k].cash.try.buy);

            var maxUSD, maxEUR, maxRUB, maxGBP, maxTRY;
            var minUSD, minEUR, minRUB, minGBP, minTRY;

            resp = resp.slice(0, 33);

            $.each(resp, function(i, value) {
                var usdB = parseFloat(value.cash.usd.buy);
                var usdS = parseFloat(value.cash.usd.sell);
                var eurB = parseFloat(value.cash.eur.buy);
                var eurS = parseFloat(value.cash.eur.sell);
                var rubB = parseFloat(value.cash.rub.buy);
                var rubS = parseFloat(value.cash.rub.sell);
                var gbpB = parseFloat(value.cash.gbp.buy);
                var gbpS = parseFloat(value.cash.gbp.sell);
                var tryB = parseFloat(value.cash.try.buy);
                var tryS = parseFloat(value.cash.try.sell);

                // Best cource buy usd
                if (usdB > 0) {
                    if (!maxUSD) { maxUSD = value; } else if (usdB > parseFloat(maxUSD.cash.usd.buy)) {
                        maxUSD = value;
                    }
                }
                // Best cource sell usd
                if (usdS > 0) {
                    if (!minUSD) { minUSD = value; } else if (usdS < parseFloat(minUSD.cash.usd.sell)) {
                        minUSD = value;
                    }
                }
                // Best cource buy eur
                if (eurB > 0) {
                    if (!maxEUR) { maxEUR = value; } else if (eurB > parseFloat(maxEUR.cash.eur.buy)) {
                        maxEUR = value;
                    }
                }
                // Best cource sell eur
                if (eurS > 0) {
                    if (!minEUR) { minEUR = value; } else if (eurS < parseFloat(minEUR.cash.eur.sell)) {
                        minEUR = value;
                    }
                }
                // Best cource buy rub
                if (rubB > 0) {
                    if (!maxRUB) { maxRUB = value; } else if (rubB > parseFloat(maxRUB.cash.rub.buy)) {
                        maxRUB = value;
                    }
                }
                // Best cource sell rub
                if (rubS > 0) {
                    if (!minRUB) { minRUB = value; } else if (rubS < parseFloat(minRUB.cash.rub.sell)) {
                        minRUB = value;
                    }
                }
                // Best cource buy gbp
                if (gbpB > 0) {
                    if (!maxGBP) { maxGBP = value; } else if (gbpB > parseFloat(maxGBP.cash.gbp.buy)) {
                        maxGBP = value;
                    }
                }
                // Best cource sell gbp
                if (gbpS > 0) {
                    if (!minGBP) { minGBP = value; } else if (gbpS < parseFloat(minGBP.cash.gbp.sell)) {
                        minGBP = value;
                    }
                }
                // Best cource buy gbp
                if (tryB > 0) {
                    if (!maxTRY) { maxTRY = value; } else if (tryB > parseFloat(maxTRY.cash.try.buy)) {
                        maxTRY = value;
                    }
                }
                // Best cource sell try
                if (tryS > 0) {
                    if (!minTRY) { minTRY = value; } else if (tryS < parseFloat(minTRY.cash.try.sell)) {
                        minTRY = value;
                    }
                }
            });

            var ArMaxUSD = [],
                ArMaxEUR = [],
                ArMaxRUB = [],
                ArMaxGBP = [],
                ArMaxTRY = [];
            var ArMinUSD = [],
                ArMinEUR = [],
                ArMinRUB = [],
                ArMinGBP = [],
                ArMinTRY = [];

            $.each(resp, function(i, value) {
                var usdB = parseFloat(value.cash.usd.buy);
                var usdS = parseFloat(value.cash.usd.sell);
                var eurB = parseFloat(value.cash.eur.buy);
                var eurS = parseFloat(value.cash.eur.sell);
                var rubB = parseFloat(value.cash.rub.buy);
                var rubS = parseFloat(value.cash.rub.sell);
                var gbpB = parseFloat(value.cash.gbp.buy);
                var gbpS = parseFloat(value.cash.gbp.sell);
                var tryB = parseFloat(value.cash.try.buy);
                var tryS = parseFloat(value.cash.try.sell);

                // Best cource buy usd
                if (maxUSD) {
                    if (usdB == parseFloat(maxUSD.cash.usd.buy)) {
                        ArMaxUSD.push(value);
                    }
                }
                // Best cource sell usd
                if (minUSD) {
                    if (usdS == parseFloat(minUSD.cash.usd.sell)) {
                        ArMinUSD.push(value);
                    }
                }
                // Best cource buy eur
                if (maxEUR) {
                    if (eurB == parseFloat(maxEUR.cash.eur.buy)) {
                        ArMaxEUR.push(value);
                    }
                }
                // Best cource sell eur
                if (minEUR) {
                    if (eurS == parseFloat(minEUR.cash.eur.sell)) {
                        ArMinEUR.push(value);
                    }
                }
                // Best cource buy rub
                if (maxRUB) {
                    if (rubB == parseFloat(maxRUB.cash.rub.buy)) {
                        ArMaxRUB.push(value);
                    }
                }
                // Best cource sell rub
                if (minRUB) {
                    if (rubS == parseFloat(minRUB.cash.rub.sell)) {
                        ArMinRUB.push(value);
                    }
                }
                // Best cource buy gbp
                if (maxGBP) {
                    if (gbpB == parseFloat(maxGBP.cash.gbp.buy)) {
                        ArMaxGBP.push(value);
                    }
                }
                // Best cource sell gbp
                if (minGBP) {
                    if (gbpS == parseFloat(minGBP.cash.gbp.sell)) {
                        ArMinGBP.push(value);
                    }
                }
                // Best cource buy try
                if (maxTRY) {
                    if (tryB == parseFloat(maxTRY.cash.try.buy)) {
                        ArMaxTRY.push(value);
                    }
                }
                // Best cource sell try
                if (minTRY) {
                    if (tryS == parseFloat(minTRY.cash.try.sell)) {
                        ArMinTRY.push(value);
                    }
                }
            });

            // Output all max currency usd
            $.each(ArMaxUSD, function(i) {
                parrent.find("td[data-cource-buy='usd']").append(
                    '<div class="currency-table__rate__num">' + ArMaxUSD[i].cash.usd.buy + '</div>' +
                    '<a href="' + ArMaxUSD[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMaxUSD[i].name + '</div>' +
                    '</a>'
                );
            });

            // Output all min currency usd
            $.each(ArMinUSD, function(i) {
                parrent.find("td[data-cource-sell='usd']").append(
                    '<div class="currency-table__rate__num">' + ArMinUSD[i].cash.usd.sell + '</div>' +
                    '<a href="' + ArMinUSD[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMinUSD[i].name + '</div>' +
                    '</a>'
                );
            });

            // Output all max currency eur
            $.each(ArMaxEUR, function(i) {
                parrent.find("td[data-cource-buy='eur']").append(
                    '<div class="currency-table__rate__num">' + ArMaxEUR[i].cash.eur.buy + '</div>' +
                    '<a href="' + ArMaxEUR[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMaxEUR[i].name + '</div>' +
                    '</a>'
                );
            });

            // Output all min currency eur
            $.each(ArMinEUR, function(i) {
                parrent.find("td[data-cource-sell='eur']").append(
                    '<div class="currency-table__rate__num">' + ArMinEUR[i].cash.eur.sell + '</div>' +
                    '<a href="' + ArMinEUR[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMinEUR[i].name + '</div>' +
                    '</a>'
                );
            });

            // Output all max currency rub
            $.each(ArMaxRUB, function(i) {
                parrent.find("td[data-cource-buy='rub']").append(
                    '<div class="currency-table__rate__num">' + ArMaxRUB[i].cash.rub.buy + '</div>' +
                    '<a href="' + ArMaxRUB[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMaxRUB[i].name + '</div>' +
                    '</a>'
                );
            });

            // Output all min currency rub
            $.each(ArMinRUB, function(i) {
                parrent.find("td[data-cource-sell='rub']").append(
                    '<div class="currency-table__rate__num">' + ArMinRUB[i].cash.rub.sell + '</div>' +
                    '<a href="' + ArMinRUB[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMinRUB[i].name + '</div>' +
                    '</a>'
                );
            });

            // Output all max currency gbp
            $.each(ArMaxGBP, function(i) {
                parrent.find("td[data-cource-buy='gbp']").append(
                    '<div class="currency-table__rate__num">' + ArMaxGBP[i].cash.gbp.buy + '</div>' +
                    '<a href="' + ArMaxGBP[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMaxGBP[i].name + '</div>' +
                    '</a>'
                );
            });

            // Output all min currency gbp
            $.each(ArMinGBP, function(i) {
                parrent.find("td[data-cource-sell='gbp']").append(
                    '<div class="currency-table__rate__num">' + ArMinGBP[i].cash.gbp.sell + '</div>' +
                    '<a href="' + ArMinGBP[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMinGBP[i].name + '</div>' +
                    '</a>'
                );
            });

            // Output all max currency try
            $.each(ArMaxTRY, function(i) {
                parrent.find("td[data-cource-buy='try']").append(
                    '<div class="currency-table__rate__num">' + ArMaxTRY[i].cash.try.buy + '</div>' +
                    '<a href="' + ArMaxTRY[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMaxTRY[i].name + '</div>' +
                    '</a>'
                );
            });

            // Output all min currency try
            $.each(ArMinTRY, function(i) {
                parrent.find("td[data-cource-sell='try']").append(
                    '<div class="currency-table__rate__num">' + ArMinTRY[i].cash.try.sell + '</div>' +
                    '<a href="' + ArMinTRY[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMinTRY[i].name + '</div>' +
                    '</a>'
                );
            });

        }
    });
}

function getJsonUpdateBestCource() {
    $.ajax({
        url: "/data/data.json",
        success: function(resp) {
            // CBAR Cource
            var k = 33;
            var parrent = $(".currency-table__table tbody");
            parrent.find("td[data-cource-cbar='usd'] .currency-table__rate__num").text(resp[k].cash.usd.buy);
            parrent.find("td[data-cource-cbar='eur'] .currency-table__rate__num").text(resp[k].cash.eur.buy);
            parrent.find("td[data-cource-cbar='rub'] .currency-table__rate__num").text(resp[k].cash.rub.buy);
            parrent.find("td[data-cource-cbar='gbp'] .currency-table__rate__num").text(resp[k].cash.gbp.buy);
            parrent.find("td[data-cource-cbar='try'] .currency-table__rate__num").text(resp[k].cash.try.buy);

            var maxUSD, maxEUR, maxRUB, maxGBP, maxTRY;
            var minUSD, minEUR, minRUB, minGBP, minTRY;

            resp = resp.slice(0, 33);

            $.each(resp, function(i, value) {
                var usdB = parseFloat(value.cash.usd.buy);
                var usdS = parseFloat(value.cash.usd.sell);
                var eurB = parseFloat(value.cash.eur.buy);
                var eurS = parseFloat(value.cash.eur.sell);
                var rubB = parseFloat(value.cash.rub.buy);
                var rubS = parseFloat(value.cash.rub.sell);
                var gbpB = parseFloat(value.cash.gbp.buy);
                var gbpS = parseFloat(value.cash.gbp.sell);
                var tryB = parseFloat(value.cash.try.buy);
                var tryS = parseFloat(value.cash.try.sell);

                // Best cource buy usd
                if (usdB > 0) {
                    if (!maxUSD) { maxUSD = value; } else if (usdB > parseFloat(maxUSD.cash.usd.buy)) {
                        maxUSD = value;
                    }
                }
                // Best cource sell usd
                if (usdS > 0) {
                    if (!minUSD) { minUSD = value; } else if (usdS < parseFloat(minUSD.cash.usd.sell)) {
                        minUSD = value;
                    }
                }
                // Best cource buy eur
                if (eurB > 0) {
                    if (!maxEUR) { maxEUR = value; } else if (eurB > parseFloat(maxEUR.cash.eur.buy)) {
                        maxEUR = value;
                    }
                }
                // Best cource sell eur
                if (eurS > 0) {
                    if (!minEUR) { minEUR = value; } else if (eurS < parseFloat(minEUR.cash.eur.sell)) {
                        minEUR = value;
                    }
                }
                // Best cource buy rub
                if (rubB > 0) {
                    if (!maxRUB) { maxRUB = value; } else if (rubB > parseFloat(maxRUB.cash.rub.buy)) {
                        maxRUB = value;
                    }
                }
                // Best cource sell rub
                if (rubS > 0) {
                    if (!minRUB) { minRUB = value; } else if (rubS < parseFloat(minRUB.cash.rub.sell)) {
                        minRUB = value;
                    }
                }
                // Best cource buy gbp
                if (gbpB > 0) {
                    if (!maxGBP) { maxGBP = value; } else if (gbpB > parseFloat(maxGBP.cash.gbp.buy)) {
                        maxGBP = value;
                    }
                }
                // Best cource sell gbp
                if (gbpS > 0) {
                    if (!minGBP) { minGBP = value; } else if (gbpS < parseFloat(minGBP.cash.gbp.sell)) {
                        minGBP = value;
                    }
                }
                // Best cource buy gbp
                if (tryB > 0) {
                    if (!maxTRY) { maxTRY = value; } else if (tryB > parseFloat(maxTRY.cash.try.buy)) {
                        maxTRY = value;
                    }
                }
                // Best cource sell try
                if (tryS > 0) {
                    if (!minTRY) { minTRY = value; } else if (tryS < parseFloat(minTRY.cash.try.sell)) {
                        minTRY = value;
                    }
                }
            });

            var ArMaxUSD = [],
                ArMaxEUR = [],
                ArMaxRUB = [],
                ArMaxGBP = [],
                ArMaxTRY = [];
            var ArMinUSD = [],
                ArMinEUR = [],
                ArMinRUB = [],
                ArMinGBP = [],
                ArMinTRY = [];

            $.each(resp, function(i, value) {
                var usdB = parseFloat(value.cash.usd.buy);
                var usdS = parseFloat(value.cash.usd.sell);
                var eurB = parseFloat(value.cash.eur.buy);
                var eurS = parseFloat(value.cash.eur.sell);
                var rubB = parseFloat(value.cash.rub.buy);
                var rubS = parseFloat(value.cash.rub.sell);
                var gbpB = parseFloat(value.cash.gbp.buy);
                var gbpS = parseFloat(value.cash.gbp.sell);
                var tryB = parseFloat(value.cash.try.buy);
                var tryS = parseFloat(value.cash.try.sell);

                // Best cource buy usd
                if (maxUSD) {
                    if (usdB == parseFloat(maxUSD.cash.usd.buy)) {
                        ArMaxUSD.push(value);
                    }
                }
                // Best cource sell usd
                if (minUSD) {
                    if (usdS == parseFloat(minUSD.cash.usd.sell)) {
                        ArMinUSD.push(value);
                    }
                }
                // Best cource buy eur
                if (maxEUR) {
                    if (eurB == parseFloat(maxEUR.cash.eur.buy)) {
                        ArMaxEUR.push(value);
                    }
                }
                // Best cource sell eur
                if (minEUR) {
                    if (eurS == parseFloat(minEUR.cash.eur.sell)) {
                        ArMinEUR.push(value);
                    }
                }
                // Best cource buy rub
                if (maxRUB) {
                    if (rubB == parseFloat(maxRUB.cash.rub.buy)) {
                        ArMaxRUB.push(value);
                    }
                }
                // Best cource sell rub
                if (minRUB) {
                    if (rubS == parseFloat(minRUB.cash.rub.sell)) {
                        ArMinRUB.push(value);
                    }
                }
                // Best cource buy gbp
                if (maxGBP) {
                    if (gbpB == parseFloat(maxGBP.cash.gbp.buy)) {
                        ArMaxGBP.push(value);
                    }
                }
                // Best cource sell gbp
                if (minGBP) {
                    if (gbpS == parseFloat(minGBP.cash.gbp.sell)) {
                        ArMinGBP.push(value);
                    }
                }
                // Best cource buy try
                if (maxTRY) {
                    if (tryB == parseFloat(maxTRY.cash.try.buy)) {
                        ArMaxTRY.push(value);
                    }
                }
                // Best cource sell try
                if (minTRY) {
                    if (tryS == parseFloat(minTRY.cash.try.sell)) {
                        ArMinTRY.push(value);
                    }
                }
            });

            // Output all max currency usd
            var htmlDataMaxUSD = '';
            $.each(ArMaxUSD, function(i) {
                htmlDataMaxUSD += '<div class="currency-table__rate__num">' + ArMaxUSD[i].cash.usd.buy + '</div>' +
                    '<a href="' + ArMaxUSD[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMaxUSD[i].name + '</div>' +
                    '</a>';
            });
            parrent.find("td[data-cource-buy='usd']").replaceWith('<td class="currency-table__rate" data-cource-buy="usd">' + htmlDataMaxUSD + '</td>');

            // Output all min currency usd
            var htmlDataMinUSD = '';
            $.each(ArMinUSD, function(i) {
                htmlDataMinUSD += '<div class="currency-table__rate__num">' + ArMinUSD[i].cash.usd.sell + '</div>' +
                    '<a href="' + ArMinUSD[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMinUSD[i].name + '</div>' +
                    '</a>';
            });
            parrent.find("td[data-cource-sell='usd']").replaceWith('<td class="currency-table__rate" data-cource-sell="usd">' + htmlDataMinUSD + '</td>');

            // Output all max currency eur
            var htmlDataMaxEUR = '';
            $.each(ArMaxEUR, function(i) {
                htmlDataMaxEUR += '<div class="currency-table__rate__num">' + ArMaxEUR[i].cash.eur.buy + '</div>' +
                    '<a href="' + ArMaxEUR[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMaxEUR[i].name + '</div>' +
                    '</a>';
            });
            parrent.find("td[data-cource-buy='eur']").replaceWith('<td class="currency-table__rate" data-cource-buy="eur">' + htmlDataMaxEUR + '</td>');

            // Output all min currency eur
            var htmlDataMinEUR = '';
            $.each(ArMinEUR, function(i) {
                htmlDataMinEUR += '<div class="currency-table__rate__num">' + ArMinEUR[i].cash.eur.sell + '</div>' +
                    '<a href="' + ArMinEUR[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMinEUR[i].name + '</div>' +
                    '</a>';
            });
            parrent.find("td[data-cource-sell='eur']").replaceWith('<td class="currency-table__rate" data-cource-sell="eur">' + htmlDataMinEUR + '</td>');

            // Output all max currency rub
            var htmlDataMaxRUB = '';
            $.each(ArMaxRUB, function(i) {
                htmlDataMaxRUB += '<div class="currency-table__rate__num">' + ArMaxRUB[i].cash.rub.buy + '</div>' +
                    '<a href="' + ArMaxRUB[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMaxRUB[i].name + '</div>' +
                    '</a>';
            });
            parrent.find("td[data-cource-buy='rub']").replaceWith('<td class="currency-table__rate" data-cource-buy="rub">' + htmlDataMaxRUB + '</td>');

            // Output all min currency rub
            var htmlDataMinRUB = '';
            $.each(ArMinRUB, function(i) {
                htmlDataMinRUB += '<div class="currency-table__rate__num">' + ArMinRUB[i].cash.rub.sell + '</div>' +
                    '<a href="' + ArMinRUB[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMinRUB[i].name + '</div>' +
                    '</a>';
            });
            parrent.find("td[data-cource-sell='rub']").replaceWith('<td class="currency-table__rate" data-cource-sell="rub">' + htmlDataMinRUB + '</td>');

            // Output all max currency gbp
            var htmlDataMaxGBP = '';
            $.each(ArMaxGBP, function(i) {
                htmlDataMaxGBP += '<div class="currency-table__rate__num">' + ArMaxGBP[i].cash.gbp.buy + '</div>' +
                    '<a href="' + ArMaxGBP[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMaxGBP[i].name + '</div>' +
                    '</a>';
            });
            parrent.find("td[data-cource-buy='gbp']").replaceWith('<td class="currency-table__rate" data-cource-buy="gbp">' + htmlDataMaxGBP + '</td>');

            // Output all min currency gbp
            var htmlDataMinGBP = '';
            $.each(ArMinGBP, function(i) {
                htmlDataMinGBP += '<div class="currency-table__rate__num">' + ArMinGBP[i].cash.gbp.sell + '</div>' +
                    '<a href="' + ArMinGBP[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMinGBP[i].name + '</div>' +
                    '</a>';
            });
            parrent.find("td[data-cource-sell='gbp']").replaceWith('<td class="currency-table__rate" data-cource-sell="gbp">' + htmlDataMinGBP + '</td>');

            // Output all max currency try
            var htmlDataMaxTRY = '';
            $.each(ArMaxTRY, function(i) {
                htmlDataMaxTRY += '<div class="currency-table__rate__num">' + ArMaxTRY[i].cash.try.buy + '</div>' +
                    '<a href="' + ArMaxTRY[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMaxTRY[i].name + '</div>' +
                    '</a>';
            });
            parrent.find("td[data-cource-buy='try']").replaceWith('<td class="currency-table__rate" data-cource-buy="try">' + htmlDataMaxTRY + '</td>');

            // Output all min currency try
            var htmlDataMinTRY = '';
            $.each(ArMinTRY, function(i) {
                htmlDataMinTRY += '<div class="currency-table__rate__num">' + ArMinTRY[i].cash.try.sell + '</div>' +
                    '<a href="' + ArMinTRY[i].link + '" class="currency-table__link" target="_blank">' +
                    '<div class="currency-table__rate__text">' + ArMinTRY[i].name + '</div>' +
                    '</a>';
            });
            parrent.find("td[data-cource-sell='try']").replaceWith('<td class="currency-table__rate" data-cource-sell="try">' + htmlDataMinTRY + '</td>');

        }
    });
}

function getJsonTime() {
    $.ajax({
        url: "/data/data.json",
        success: function(resp) {
            var i = 0;
            $("#banks-1 thead th:last-child").replaceWith('<th style="width: 10%">' + resp[i].update_time + '</th>');
            $("#banks-2 thead th:last-child").replaceWith('<th style="width: 10%">' + resp[i].update_time + '</th>');
            $("#banks-3 thead th:last-child").replaceWith('<th style="width: 10%">' + resp[i].update_time + '</th>');
        }
    });
}