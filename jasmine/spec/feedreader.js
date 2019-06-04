/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */


$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('feed has url', function(){
            for (let feed of allFeeds){
                expect(Object.keys(feed)).toContain('url');
                expect(feed['url'].length).not.toBe(0);
            }
        })


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('feed has name', function(){
            for (let feed of allFeeds){
                expect(Object.keys(feed)).toContain('name');
                expect(feed['name'].length).not.toBe(0);
            }
        })
    });


    
    describe('The menu', function(){

        let body, menu_icon;

        beforeEach(function(){
            body = $('body');
            menu_icon = $('.menu-icon-link');
        })

        afterEach(function(){
            body = null;
            menu_icon = null;
        })

        /* a test that ensures the menu element is
         * hidden by default. 
         */
        it('menu is hidden by default', function(){
            expect(body.hasClass('menu-hidden')).toBe(true);
        })

         /* a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('menu is toggling', function(){
            menu_icon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menu_icon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        })
        
    })

    

    describe('Initial Entries', function(){

        let feed_container = $('.feed');

        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        it('at least one entry in feed', function(done){
            expect(feed_container.length).toBeGreaterThan(0);
            done();
        });
        
    })
    


    describe('New Feed Selection', function(){
    
        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        let prev_content, updated_content;

        beforeEach(function(done){

            loadFeed(0, function(){
                prev_content = $('.feed').html();

                loadFeed(1, function(){
                    updated_content = $('.feed').html();
                    done();
                })
            });
        });

        it('the feed content changes', function(done){
            expect(updated_content).not.toBe(prev_content);
            done();
        })

    })

}());
