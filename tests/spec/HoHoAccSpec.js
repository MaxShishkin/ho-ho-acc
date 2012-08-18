// A note on namings.
// Panels that are not expaneded to their full width
// i call teasers. They have two states - expanded
// and collapsed. Expanded is the default state as
// they appear on the screen. When you hover over
// an expanded teaser this one gets it full width
// and is called a panel, while other teases collapse
// a bit and get collapsed state.

describe("HoHoAcc", function () {

  jasmine.getStyleFixtures().fixturesPath = "/css"
  preloadStyleFixtures("hohoacc.css");


  describe("basic behaviour", function () {

    beforeEach(function () {
      loadStyleFixtures("hohoacc.css");
      loadFixtures('fixture.html');
    });

    it("should make wrapper take its container width", function () {
      expect($("#hohoacc").width()).toEqual($("#container").width());
    });

    it("should make panels take 70% of wrapper width if no user panelWidth option specified", function () {
      var hoHoAcc = $("#hohoacc").hoHoAcc({speed: 0}).data("hoHoAcc"),
        fullWidth = $("#hohoacc").width(),
        panels = $("#hohoacc").children(".panel"),
        numPanels = panels.length,
        panelWidth = Math.floor(fullWidth * 0.7),
        i;

      for(i = 0; i < numPanels; i += 1) {
        hoHoAcc.collapsePanel(i - 1);
        hoHoAcc.expandPanel(i);
        expect($(panels[i]).width()).toEqual(panelWidth);
      }
    });

    it("should be able to take user specified panelWidth in percent", function (){
      var fullWidth = $("#hohoacc").width(),
        userPanelWidth = "40%",
        computedPanelWidth = fullWidth * parseInt(userPanelWidth, 10) / 100,
        hoHoAcc = $("#hohoacc").hoHoAcc({speed: 0, panelWidth: userPanelWidth}).data("hoHoAcc"),
        panels = $("#hohoacc").children(".panel"),
        numPanels = panels.length,
        i;

      for(i = 0; i < numPanels; i += 1) {
        hoHoAcc.collapsePanel(i - 1);
        hoHoAcc.expandPanel(i);
        expect($(panels[i]).width()).toEqual(computedPanelWidth);
      }
    });

    it("should make panels take user specified panelWidth if it's in bounds", function () {
      var userPanelWidth = 400,
        hoHoAcc = $("#hohoacc").hoHoAcc({speed: 0, panelWidth: userPanelWidth}).data("hoHoAcc"),
        panels = $("#hohoacc").children(".panel"),
        numPanels = panels.length,
        i;

      for(i = 0; i < numPanels; i += 1) {
        hoHoAcc.collapsePanel(i - 1);
        hoHoAcc.expandPanel(i);
        expect($(panels[i]).width()).toEqual(userPanelWidth);
      }
    });

    it("should make panels take 70% of wrapper width if user specified panelWidth option is not in bounds", function () {
      var fullWidth = $("#hohoacc").width(),
        userPanelWidth = fullWidth + 1,
        computedPanelWidth = Math.floor(fullWidth * 0.7),
        hoHoAcc = $("#hohoacc").hoHoAcc({speed: 0, panelWidth: userPanelWidth}).data("hoHoAcc"),
        panels = $("#hohoacc").children(".panel"),
        numPanels = panels.length,
        i;

      for(i = 0; i < numPanels; i += 1) {
        hoHoAcc.collapsePanel(i - 1);
        hoHoAcc.expandPanel(i);
        expect($(panels[i]).width()).toEqual(computedPanelWidth);
      }
    });

    it("should make expanded teasers take even parts of wrapper width", function () {
      var hoHoAcc = $("#hohoacc").hoHoAcc({speed: 0}).data("hoHoAcc"),
        fullWidth = $("#hohoacc").width(),
        panels = $("#hohoacc").children(".panel"),
        numPanels = panels.length,
        teaserExpandedWidth = Math.floor(fullWidth / numPanels);

      panels.each(function (i, panel) {
        expect($(panel).width()).toEqual(teaserExpandedWidth);
      });
    });

    it("should make collapse teasers take even parts of wrapper width minus palen width", function () {
      var fullWidth = $("#hohoacc").width(),
        hoHoAcc = $("#hohoacc").hoHoAcc({speed: 0}).data("hoHoAcc"),
        panels = $("#hohoacc").children(".panel"),
        numPanels = panels.length,
        panelWidth = Math.floor(fullWidth * 0.7),
        teaserCollapseWidth = Math.floor((fullWidth - panelWidth) / (numPanels - 1)),
        i;

        for(i = 0; i < numPanels; i += 1) {
          hoHoAcc.collapsePanel(i - 1);
          hoHoAcc.expandPanel(i);

          panels.each(function (j, panel) {
            if(j != i){
              expect($(panel).width()).toEqual(teaserCollapseWidth);
            }
          });
        }
    });

    it("should maintain correct left positions when no panels are expanded", function () {
      var fullWidth = $("#hohoacc").width(),
        hoHoAcc = $("#hohoacc").hoHoAcc({speed: 0}).data("hoHoAcc"),
        panels = $("#hohoacc").children(".panel"),
        numPanels = panels.length,
        teaserExpandedWidth = Math.floor(fullWidth / numPanels),
        left = 0;

        panels.each(function (i, panel) {
          expect($(panel)).toHaveCss({left: left + "px"});
          left += teaserExpandedWidth;
        });
    });

    it("should maintain correct left positions when a panel is expanded", function () {
      var fullWidth = $("#hohoacc").width(),
        panelWidth = 900,
        hoHoAcc = $("#hohoacc").hoHoAcc({speed: 0, panelWidth: panelWidth}).data("hoHoAcc"),
        panels = $("#hohoacc").children(".panel"),
        numPanels = panels.length,
        teaserCollapseWidth = Math.floor((fullWidth - panelWidth) / (numPanels - 1)),
        i,
        left;

        for(i = 0; i < numPanels; i += 1) {
          hoHoAcc.collapsePanel(i - 1);
          hoHoAcc.expandPanel(i);
          left = 0;
          panels.each(function (j, panel) {
            expect($(panel)).toHaveCss({left: left + "px"});
            if (i !== j) {
              left += teaserCollapseWidth;
            } else {
              left += panelWidth;
            }
          });
        }
    });

    it("should adjust expanded teasers width when gapMax option is set", function () {
      var gapMax = 20,
        hoHoAcc = $("#hohoacc").hoHoAcc({speed: 0, gapMax: gapMax}).data("hoHoAcc"),
        fullWidth = $("#hohoacc").width(),
        panels = $("#hohoacc").children(".panel"),
        numPanels = panels.length,
        teaserExpandedWidth = Math.floor((fullWidth - gapMax * (numPanels - 1)) / numPanels);

      panels.each(function (i, panel) {
        expect($(panel).width()).toEqual(teaserExpandedWidth);
      });
    });

    it("should adjust collapse teasers width when gapMax option is set", function () {
      var gapMin = 40,
        fullWidth = $("#hohoacc").width(),
        hoHoAcc = $("#hohoacc").hoHoAcc({speed: 0, gapMin: gapMin}).data("hoHoAcc"),
        panels = $("#hohoacc").children(".panel"),
        numPanels = panels.length,
        panelWidth = Math.floor(fullWidth * 0.7),
        teaserCollapseWidth = Math.floor(((fullWidth - panelWidth) - gapMin * (numPanels - 1)) / (numPanels - 1)),
        i;

        for(i = 0; i < numPanels; i += 1) {
          hoHoAcc.collapsePanel(i - 1);
          hoHoAcc.expandPanel(i);

          panels.each(function (j, panel) {
            if(j != i){
              expect($(panel).width()).toEqual(teaserCollapseWidth);
            }
          });
        }
    });

    it("should adjust left positions when gapMax option is set and no panels are expanded", function () {
      var gapMax = 33,
        fullWidth = $("#hohoacc").width(),
        hoHoAcc = $("#hohoacc").hoHoAcc({speed: 0, gapMax: gapMax}).data("hoHoAcc"),
        panels = $("#hohoacc").children(".panel"),
        numPanels = panels.length,
        teaserExpandedWidth = Math.floor((fullWidth - gapMax * (numPanels - 1)) / numPanels);
        left = 0;

        panels.each(function (i, panel) {
          expect($(panel)).toHaveCss({left: left + "px"});
          left += teaserExpandedWidth + gapMax;
        });
    });

    it("should adjust left positions when gapMin option is set and a panel is expanded", function () {
      var gapMin = 8,
        fullWidth = $("#hohoacc").width(),
        panelWidth = 777,
        hoHoAcc = $("#hohoacc").hoHoAcc({speed: 0, panelWidth: panelWidth, gapMin: gapMin}).data("hoHoAcc"),
        panels = $("#hohoacc").children(".panel"),
        numPanels = panels.length,
        teaserCollapseWidth = Math.floor(((fullWidth - panelWidth) - gapMin * (numPanels - 1)) / (numPanels - 1)),
        i,
        left;

        for(i = 0; i < numPanels; i += 1) {
          hoHoAcc.collapsePanel(i - 1);
          hoHoAcc.expandPanel(i);
          left = 0;
          panels.each(function (j, panel) {
            expect($(panel)).toHaveCss({left: left + "px"});
            if (i !== j) {
              left += teaserCollapseWidth;
            } else {
              left += panelWidth;
            }
            left += gapMin;
          });
        }
    });

  });


});