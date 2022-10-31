$(document).ready(function() {
    var scrollMarqs = $('.scrollMarq');

    if (scrollMarqs.length) {
        scrollMarqs.each(function() {
            var scrollMarq = $(this);

            // Support small text - copy to fill screen width
            if (scrollMarq.find('.scrolling-text').outerWidth() < $(window).width()) {
                var windowToScrolltextRatio = Math.round($(window).width() / scrollMarq.find('.scrolling-text').outerWidth()),
                    scrollTextContent = scrollMarq.find('.scrolling-text .scrolling-text-content').text(),
                    newScrollText = '';
                for (var i = 0; i < windowToScrolltextRatio; i++) {
                    newScrollText += ' ' + scrollTextContent;
                }
                scrollMarq.find('.scrolling-text .scrolling-text-content').text(newScrollText);
            }

            // Init variables and config
            var scrollingText = scrollMarq.find('.scrolling-text'),
                scrollingTextWidth = scrollingText.outerWidth(),
                scrollingTextHeight = scrollingText.outerHeight(true),
                startLetterIndent = parseInt(scrollingText.find('.scrolling-text-content').css('font-size'), 10) / 4.8,
                startLetterIndent = Math.round(startLetterIndent),
                scrollAmountBoundary = Math.abs($(window).width() - scrollingTextWidth),
                transformAmount = 0,
                leftBound = 0,
                rightBound = scrollAmountBoundary,
                transformDirection = scrollMarq.hasClass('left-to-right') ? -1 : 1,
                transformSpeed = 200;

            // Read transform speed
            if (scrollMarq.attr('speed')) {
                transformSpeed = scrollMarq.attr('speed');
            }

            // Make scrolling text copy for scrolling infinity
            scrollMarq.append(scrollingText.clone().addClass('scrolling-text-copy'));
            scrollMarq.find('.scrolling-text').css({'position': 'absolute', 'left': 0});
            scrollMarq.css('height', scrollingTextHeight);

            var getActiveScrollingText = function(direction) {
                var firstScrollingText = scrollMarq.find('.scrolling-text:nth-child(1)');
                var secondScrollingText = scrollMarq.find('.scrolling-text:nth-child(2)');

                var firstScrollingTextLeft = parseInt(scrollMarq.find('.scrolling-text:nth-child(1)').css("left"), 10);
                var secondScrollingTextLeft = parseInt(scrollMarq.find('.scrolling-text:nth-child(2)').css("left"), 10);

                if (direction === 'left') {
                    return firstScrollingTextLeft < secondScrollingTextLeft ? secondScrollingText : firstScrollingText;
                } else if (direction === 'right') {
                    return firstScrollingTextLeft > secondScrollingTextLeft ? secondScrollingText : firstScrollingText;
                }
            }

            $(window).on('wheel', function(e) {
                var delta = e.originalEvent.deltaY;

                if (delta > 0) {
                    // going down
                    transformAmount += transformSpeed * transformDirection;
                    scrollMarq.find('.scrolling-text .scrolling-text-content');
                }
                else {
                    transformAmount -= transformSpeed * transformDirection;
                    scrollMarq.find('.scrolling-text .scrolling-text-content');
                }
                setTimeout(function(){
                    scrollMarq.find('.scrolling-text').css('transform', 'translate3d('+ transformAmount * -1 +'px, 0, 0)');
                }, 10);
                setTimeout(function() {
                    scrollMarq.find('.scrolling-text .scrolling-text-content').css('transform', 'skewX(0)');
                }, 500)

                // Boundaries
                if (transformAmount < leftBound) {
                    var activeText = getActiveScrollingText('left');
                    activeText.css({'left': Math.round(leftBound - scrollingTextWidth - startLetterIndent) + 'px'});
                    leftBound = parseInt(activeText.css("left"), 10);
                    rightBound = leftBound + scrollingTextWidth + scrollAmountBoundary + startLetterIndent;

                } else if (transformAmount > rightBound) {
                    var activeText = getActiveScrollingText('right');
                    activeText.css({'left': Math.round(rightBound + scrollingTextWidth - scrollAmountBoundary + startLetterIndent) + 'px'});
                    rightBound += scrollingTextWidth + startLetterIndent;
                    leftBound = rightBound - scrollingTextWidth - scrollAmountBoundary - startLetterIndent;
                }
            });
        })
    }
});
