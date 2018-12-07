SensorCloud = {
    splashImageIndex: 2,

    setUpFeatures: function() {
        var featuresWrapper = $('#features-wrapper');

        var listItems = featuresWrapper.find('li');
        listItems.click(function() {
            listItems.each(function (index, element) {
                var jqElement = $(element);
                jqElement.addClass('clicked-hidden');
                jqElement.removeClass('clicked-visible');
                var details = jqElement.children('div');
                details.css('visibility', 'hidden');
            });

            $(this).removeClass('clicked-hidden');
            $(this).addClass('clicked-visible');
            $(this).children('div').css('visibility', 'visible');
        });
    },

    advanceSplash: function() {
        var splashImage = $('#splash-image-' + (this.splashImageIndex + 1));
        splashImage.css({'opacity': 0});
        this.splashImageIndex++;
        if (this.splashImageIndex === 3) {
            this.splashImageIndex = 0;
        }
        var currentSplashImage = $('#splash-image-' + (this.splashImageIndex + 1));
        currentSplashImage.css({'opacity': 1});
    },

    init: function() {
        this.setUpFeatures();
    }

};

$(document).on('DOMContentLoaded', function(event) {
    SensorCloud.init();
});
