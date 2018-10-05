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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('contains only feeds with a URL property', function() {
           function checkURL(feed) {
             expect(feed.url).toBeDefined();
             expect(feed.url).not.toBe("");
           }

            for (let i = 0; i < allFeeds.length; i++) {
              checkURL(allFeeds[i])
            }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('contains only feeds with a URL property', function() {
           function checkName(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toBe("");
           }

            for (let i = 0; i < allFeeds.length; i++) {
              checkName(allFeeds[i])
            }
         });
    });

    /* TODO: Write a new test suite named "The menu" */

        describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
          let body = document.querySelector('body');

          it('is hidden by default', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true)
            // expect($('.menu-icon-link')).toBeHidden()
          })

          it('changes visibility whenever menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect(body.classList.contains('menu-hidden')).toBe(false)

            $('.menu-icon-link').trigger('click');
            expect(body.classList.contains('menu-hidden')).toBe(true)
          })
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        })
    /* TODO: Write a new test suite named "Initial Entries" */
      describe('Initial Entries', function() {

        beforeEach(function(done) {
          $('.feed').html("")
          // done is optional callback for loadFeed, required in this case to stop the 'it' block from running before the asynchronous AJAX call is complete
          loadFeed(0, done)
        })
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         it('should contain at least one entry once loadFeed() has finished execution', function(done) {
           expect($('.feed').children().length).not.toBe(0);
           // without invoking done() here, Jasmine complains: Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.
           // Cf. docs: https://jasmine.github.io/2.3/introduction.html#section-Asynchronous_Support
           done();
         });
     });
}());
