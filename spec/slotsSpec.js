
var fixture, fixtureSpin, fixtureTitle, fixtureCover, fixtureMessageBoard, fixtureSpinState, fixtureScore, fixtureReeliItems, fixtureReels,
fixtureReels_1, fixtureReels_2, fixtureReels_3, fixtureReels_4, fixtureReels_5;

beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'fixtures';
    loadFixtures('testFixture.html');

    $('body').find('#spin').click();
    fixture = $('body');
    fixtureSpin = fixture.find('#spin');
    fixtureSpinState = fixtureSpin.is('[disabled=disabled]');
    fixtureScore = fixture.find('#score').text();
    fixtureReels = fixture.find('#screen ul');
    fixtureTitle = fixture.find('.title');

    fixtureMessageBoard = fixture.find('#messageBoard');
    fixtureCover = fixture.find('#cover');


    fixtureReeliItems = fixtureReels.find('li').length;
    fixtureReels_1 = fixtureReels.find('#c0');
    fixtureReels_2 = fixtureReels.find('#cdd1');
    fixtureReels_3 = fixture.find('#c2');
    fixtureReels_4 = fixture.find('#c3');
    fixtureReels_5 = fixture.find('#c4');

});

describe("On load", function () {
    it("loading screen is hidden", function () {
        expect(fixtureCover.css('display')).toBe('none')
    });
});

describe("When start button is clicked", function () {
    it("score is 25", function () {
       expect(fixtureScore).toBe('25')
    });
    it("button is disabled", function () {
        expect(fixtureSpin).toBeTruthy();
    });
    it("button is grey colour", function () {
        expect(fixtureSpin.css('backgroundColor')).toBe('rgb(192, 192, 192)');
    });
});

describe("Reels", function () {
    it("has 5 reels", function () {
        expect(fixtureReels.length).toBe(5)
    });
    it("has 25 reel items", function () {
        expect(fixtureReeliItems).toBe(25)
    });
    it("reel 1 is populated", function () {
        expect(fixtureReels_1).toBeTruthy();
    });
    it("reel 2 is populated", function () {
        expect(fixtureReels_2).toBeTruthy();
    });
    it("reel 3 is populated", function () {
        expect(fixtureReels_3).toBeTruthy();
    });
    it("reel 4 is populated", function () {
        expect(fixtureReels_4).toBeTruthy();
    });
    it("reel 5 is populated", function () {
        expect(fixtureReels_5).toBeTruthy();
    });
});

describe("Message Board", function () {
    it("is present", function () {
        expect(fixtureMessageBoard).toBeTruthy();
    });
});



