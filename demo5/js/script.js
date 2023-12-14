$(document).ready(function() {
    $('#trigger').click(function() {
        $('#overlay').fadeIn(300);
    });
    $('#close, #overlay').click(function(e) {
        if (e.target.id == 'close' || e.target.id == 'overlay')
            $('#overlay').fadeOut(300);
    });
});