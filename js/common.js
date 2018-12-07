MODE = {
    NavBar: {
      isHamburgerOpen: false,

      init: function() {
        $(window).resize(function(event) {
          if ($(window).width() >= 768) {
            $('html').removeClass('hamburger-open');
          } else {
            if (MODE.NavBar.isHamburgerOpen && !$('html').hasClass('hamburger-open')) {
              $('html').addClass('hamburger-open');
            }
          }

          MODE.industriesLink.popover('hide');
        });

        MODE.NavBar.preloadImages();
      },

      close: function() {
        MODE.navMenuCont.css('right', '-600px');
        MODE.NavBar.onToggleHamburger(false);
      },

      preloadImages: function() {
        var files = ['lab', 'solar', 'wires'];
        var extensions = ['', '@2x'];
        var images = [];

        for (var ext in extensions) {
          for (var file in files) {
            var img = new Image();
            img.src = '/img/topnav/' + files[file] + extensions[ext] + '.jpg';
            images.push(img);
          }
        }
      },

      showMask: function(isShow) {
        if (isShow) {
          $('#mask').css('display', 'block');
        } else {
          $('#mask').css('display', 'none');
        }
      },

      onResize: function(mql) {
        if (MODE.NavBar.isHamburgerOpen) {
          MODE.NavBar.showMask(mql.matches);
        }
      },

      onToggleHamburger: function(isOpen) {
        MODE.NavBar.isHamburgerOpen = isOpen;

        if (isOpen) {
          $('html').addClass('hamburger-open');
          $(document.body).on('touchmove', MODE.NavBar.preventTouchMove);
          $('.navbar-collapse').on('touchmove', MODE.NavBar.cancelBubble);
          $(document.body).css('overflow', 'hidden');
        } else {
          $('html').removeClass('hamburger-open'); 
          $(document.body).off('touchmove', MODE.NavBar.preventTouchMove); 
          $('.navbar-collapse').off('touchmove', MODE.NavBar.cancelBubble);
          $(document.body).css('overflow', 'auto');
        }

        MODE.NavBar.showMask(isOpen);
      },

      preventTouchMove: function(event) {
        event.preventDefault();
      },

      cancelBubble: function(event) {
        event.stopPropagation();
      },

      lightenIndustry: function(lighten) {
        var wrapper = $('#industries-wrapper');

        wrapper.children('a').each(function(index, element) {
          var jqElem = $(element);
          if (element !== lighten) {
            jqElem.removeClass('popover-light');
            jqElem.addClass('popover-dark');
          } else {
            jqElem.removeClass('popover-dark');
            jqElem.addClass('popover-light');
          }
        });
      },

      darkenIndustries: function() {
        MODE.NavBar.lightenIndustry(null);
      },

      setupPopover: function() {
        var wrapper = $('#industries-wrapper');

        wrapper.children('a').each(
          function(index, element) {
            $(this).mouseenter(function(event) {
              MODE.NavBar.lightenIndustry(element);
            });
          }
        );
      },

      showPopoverHelper: function() {
        MODE.industriesLink.popover('show');
        $('.popover').mouseleave(MODE.NavBar.darkenIndustries);
        MODE.NavBar.setupPopover();
        $('#dropdown').attr('src', '/img/topnav/drop-hover.png');
        $('#dropdown').addClass('hover');
        
      },

      hidePopover: function() {
        MODE.industriesLink.popover('hide');
        $('.popover').off('mouseleave', MODE.NavBar.darkenIndustries);
        $('#dropdown').attr('src', '/img/topnav/drop.png');
        $('#dropdown').removeClass('hover');
      },

      showPopover: function(event) {
        var popoverId = MODE.industriesLink.attr('aria-describedby');
        if (popoverId === undefined) {
          MODE.NavBar.showPopoverHelper();
        }
      },

      togglePopover: function(event) {
        var popoverId = MODE.industriesLink.attr('aria-describedby');
        if (popoverId === undefined) {
          MODE.NavBar.showPopoverHelper();
        } else {
          MODE.NavBar.hidePopover(); 
        }
      },
    },

    init: function() {
        var options = {
          html: true,
          trigger: 'manual',
          placement: 'bottom',
          template2: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-title"></h3> \
            <div class="popover-content"></div></div>',
          content: '<div><div id="industries-wrapper"> \
                      <a href="industries/medical.html"> \
                        <div class="popover-col"> \
                          <div id="popover-lab" class="pic">Smart Homes</div> \
                          <div class="desc"> \
                            <p>Control your home on your finger tips</p> \
                          </div> \
                        </div> \
                      </a> \
                      <a href="industries/solar.html"> \
                        <div class="popover-col"> \
                          <div id="popover-solar" class="pic">Smart City</div> \
                          <div class="desc"> \
                            <p>Empower the citizen with IoT</p> \
                          </div> \
                        </div> \
                      </a> \
                      <a href="industries/manufacturing.html"> \
                        <div class="popover-col"> \
                          <div id="popover-wires" class="pic">Smart Factory</div> \
                          <div class="desc"> \
                            <p>Manufacture with IoT efficiency</p> \
                          </div> \
                        </div></a></div></div>',
        };

        var industriesLink = $('#industries-link');
        MODE.industriesLink = industriesLink;
        industriesLink.popover(options); 
        industriesLink.popover('show');
        industriesLink.popover('hide');

        $('.hide-popover').mouseenter(MODE.NavBar.hidePopover);

        industriesLink.mouseenter(MODE.NavBar.showPopover);
        industriesLink.click(MODE.NavBar.togglePopover);

        $(window).mousemove(function(event) {
          if (event.pageY > 312) {
            MODE.NavBar.hidePopover();
          }
        });

        var mql = window.matchMedia("(max-width: 768px)");
        if (mql.addListener) {
          mql.addListener(MODE.NavBar.onResize);
        }

        MODE.NavBar.init();

        $('#close-btn').click(MODE.NavBar.close);

        $('[data-toggle="slide-collapse"]').on('click', function() {
            if (MODE.navMenuCont === undefined) {
              MODE.navMenuCont = $($(this).data('target'));
            }
            
            MODE.navMenuCont.css('display', 'block');
            MODE.navMenuCont.css('right', 0);
            MODE.NavBar.onToggleHamburger(true);
        });

        $('nav').append('<div id="mask"></div>');
        $('#mask').click(MODE.NavBar.close);

        // set up contact form
        var contactForm = document['form_63408030908149'];
        if (contactForm) {
          $(contactForm).submit(function() {
            // validate fields.
            var inputs = contactForm.elements;
            var fields = [
              {name: 'q3_input3', required: true},
              {name: 'q4_email', required: true},
              {name: 'q5_input5', required: true},
              {name: 'q6_input6', required: false}
            ];
            var ok = true;

            for (var i = 0; i < fields.length; i++) {
              var field = fields[i];
              var input = inputs[field.name];
              var val = input.value.trim()

              input.value = val;

              if (!val && field.required) {
                $(input).css('background-color', '#F2DEDE');
                ok = false;
              } else {
                $(input).css('background-color', '#FFF');
              }
            }

            if (!ok) {
              return false;
            }

            // submit the form.
            return true;
          });
        }
    },

};

if (document.attachEvent) {
  document.attachEvent("onreadystatechange", function() {
    if (document.readyState === "complete"){
      MODE.init();
    }
  });
} else {
  $(document).on('DOMContentLoaded', MODE.init);
}
