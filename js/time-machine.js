function TimeMachine(containerNode, index) {
    var canAdvance = true;
    var currentTimeout = null;
    var $container = null;
    var that = this;
    this.index = index;

    var clearCurrentTimeout = function() {
        if (currentTimeout !== null) {
            window.clearTimeout(currentTimeout);
            currentTimeout = null;
            timeoutMs = null;
        }
    }

    var advance = function() {        
        if (canAdvance) {
            var currenttimeoutMs = that.timeoutMs;
            clearCurrentTimeout();
            var container = $container;
            var imgs = container.find('img');
            var firstItem = imgs.last();
            var secondTopItem = imgs.get(imgs.length - 1);
            var jqSecondTopItem = $(secondTopItem);
            jqSecondTopItem.addClass('no-transition');
            jqSecondTopItem.css('opacity', 1);
            canAdvance = false;

            firstItem.fadeOut(500, function() {
                canAdvance = true;
                jqSecondTopItem.removeClass('no-transition');
                firstItem.css({'display': ''});
                firstItem.remove();
                firstItem.css('opacity', 0);
                container.prepend(firstItem);
                firstItem.css({'opacity': ''});
                if (currenttimeoutMs) {
                    that.autoAdvance(currenttimeoutMs);
                }
            });
        }
    }

    this.autoAdvance = function(timeout) {
        that.timeoutMs = timeout;
        clearCurrentTimeout();

        currentTimeout = window.setTimeout(function() {
            advance();
        }, timeout);
    }

    var init = function(containerNode) {
        $container = $(containerNode);
        var images = $container.find('img');
        images.each(function(index, element) {
            element.addEventListener('dragstart', function(event) {
                event.preventDefault();
                return false;
            });
            element.addEventListener('click', function(event) {
                event.preventDefault();
                advance();
            });
        });
    }

    init(containerNode);
}

TimeMachineManager = {
    timeMachines: [],
    observers: [],

    addObserver: function(observer) {
        this.observers.push(observer);
    },

    addTimeMachines: function(timeMachines) {
        var that = this;
        timeMachines.forEach(function(timeMachine, index) {
            that.timeMachines.push(timeMachine);
        });
        this.notifyAll();
    },

    notifyAll: function() {
        var that = this;
        this.observers.forEach(function(observer, index) {
            observer.notify(that.timeMachines);
        });
    }
};

document.addEventListener("DOMContentLoaded", function(event) {
    var nodes = $('[data-js="time-machine"]');

    var timeMachines = [];
    nodes.each(function(index, node) {
        timeMachines.push(new TimeMachine(node, index));
    });

    TimeMachineManager.addTimeMachines(timeMachines);
});
