$(document).ready(function() {
    getOilAndGold();

    $('body').on('click', '.gmaps', function(e) {
        e.preventDefault();
        var link = $(this).data('link');
        var name = $(this).parent().find('a.font-bold').text();

        $.magnificPopup.open({
            items: {
                src: link
            },
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false,
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-panel">' + name + '</div>' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '</div>',
            }
        });
    });

    // Update data
    setInterval(function() {
        getOilAndGold();
    }, 300000);

    // menu select
    if (getPage() == "/noncash") {
        $(".main-menu li:nth-child(2)").addClass("active");
    } else if (getPage() == "/crossrates") {
        $(".main-menu li:nth-child(3)").addClass("active");
    } else if (getPage() == "/rates") {
        $(".main-menu li:nth-child(4)").addClass("active");
    } else if (getPage() == "/converter") {
        $(".main-menu li:nth-child(5)").addClass("active");
    } else if (getPage() == "/24h") {
        $(".main-menu li:nth-child(6)").addClass("active");
    } else {
        $(".main-menu li:nth-child(1)").addClass("active");
    }



});

//Get page from url
function getPage() {
    return window.location.pathname;
}

function getOilAndGold() {
    $.ajax({
        url: "/data/data.json",
        success: function(resp) {
            var k = 34;
            var parrent = $(".goldandoil");
            parrent.find(".oil .value").text(resp[k].cash.oil.data);
            parrent.find(".gold .value").text(resp[k].cash.gold.data);
        }
    });
}

// Open Tab
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}