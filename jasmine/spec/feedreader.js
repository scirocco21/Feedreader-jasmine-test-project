/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

      it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
      });

      it('contains only feeds with a URL property', function() {
        function checkURL(feed) {
          expect(feed.url).toBeDefined();
          expect(feed.url).not.toBe("");
        };

        for (let i = 0; i < allFeeds.length; i++) {
          checkURL(allFeeds[i])
        };
      });


      it('contains only feeds with a Name property', function() {
        function checkName(feed) {
          expect(feed.name).toBeDefined();
          expect(feed.name).not.toBe("");
        };

        for (let i = 0; i < allFeeds.length; i++) {
          checkName(allFeeds[i])
        };
      });
    });


    describe('The menu', function() {
      let body = document.querySelector('body');

      it('is hidden by default', function() {
        // body should have class set to menu-hidden by default
        expect(body.classList.contains('menu-hidden')).toBe(true)
      });

      it('changes visibility whenever menu icon is clicked', function() {
        // simulate both click events to test turning visibility on and off again
        $('.menu-icon-link').trigger('click');
        expect(body.classList.contains('menu-hidden')).toBe(false);
        $('.menu-icon-link').trigger('click');
        expect(body.classList.contains('menu-hidden')).toBe(true);
      });
    });

    describe('Initial Entries', function() {
      beforeEach(function(done) {
        $('.feed').html("");
          // done is optional callback for loadFeed, required in this case to stop the 'it' block from running before the asynchronous AJAX call is complete
        loadFeed(0, done)
      });

      it('should contain at least one entry once loadFeed() has finished execution', function(done) {
        expect($('.feed').children().length).not.toBe(0);
        // without invoking done() here, Jasmine complains: Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.
        // Cf. docs: https://jasmine.github.io/2.3/introduction.html#section-Asynchronous_Support
         done();
       });
     });

    describe('New Feed Selection', function() {
      $('.feed').html("");
      let firstFeedEntries;
      // load both feeds before running the specs; store entries of first feed before loading the second one
      beforeEach(function(done) {
        loadFeed(0)
        firstFeedEntries = $('.feed').children();
        loadFeed(1, done)
      });

      it('should generate new content when a different feed is loaded', function (done) {
        // if both feeds have different content, expect their first entries to have different urls
        expect(firstFeedEntries[0].href).not.toEqual($('.feed').children()[0].href);
        done();
      });
    });
}());
