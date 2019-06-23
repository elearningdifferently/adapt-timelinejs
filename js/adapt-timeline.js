define([
    'core/js/adapt',
    'core/js/views/componentView',
    'core/js/models/componentModel',
    './timeline'
], function(Adapt, ComponentView, ComponentModel) {

    var TimelineView = ComponentView.extend({

        preRender: function() {
            this.checkIfResetOnRevisit();
        },

        postRender: function() {
            this.setReadyStatus();

            this.setupInview();
        },

        setupInview: function() {
            var selector = this.getInviewElementSelector();

            var timeline_json = { 
    "title": {
        "media": {
          "url": "//www.flickr.com/photos/tm_10001/2310475988/",
          "caption": "Whitney Houston performing on her My Love is Your Love Tour in Hamburg.",
          "credit": "flickr/<a href='http://www.flickr.com/photos/tm_10001/'>tm_10001</a>"
        },
        "text": {
          "headline": this.model.get('timelineheadline'),
          "text": this.model.get('timelinetext')
        }
    },
    "events": [
      {
        "media": {
          "url": "/img/examples/houston/family.jpg",
          "caption": "Houston's mother and Gospel singer, Cissy Houston (left) and cousin Dionne Warwick.",
          "credit": "Cissy Houston photo:<a href='http://www.flickr.com/photos/11447043@N00/418180903/'>Tom Marcello</a><br/><a href='http://commons.wikimedia.org/wiki/File%3ADionne_Warwick_television_special_1969.JPG'>Dionne Warwick: CBS Television via Wikimedia Commons</a>"
        },
        "start_date": {
          "month": "8",
          "day": "9",
          "year": "1963"
        },
        "text": {
          "headline": "A Musical Heritage",
          "text": "<p>Born in New Jersey on August 9th, 1963, Houston grew up surrounded by the music business. Her mother is gospel singer Cissy Houston and her cousins are Dee Dee and Dionne Warwick.</p>"
        }
        },
        ]
            }
          // replace make_the_json() with the JSON object you created
          // two arguments: the id of the Timeline container (no '#')
          // and the JSON object or an instance of TL.TimelineConfig created from
          // a suitable JSON object
            window.timeline = new TL.Timeline('timeline-embed', timeline_json);
            this.setupInviewCompletion();
        },

        /**
         * determines which element should be used for inview logic - body, instruction or title - and returns the selector for that element
         */
        getInviewElementSelector: function() {
            if (this.model.get('body')) return '.component-body';

            if (this.model.get('instruction')) return '.component-instruction';

            if (this.model.get('displayTitle')) return '.component-title';

            return null;
        },

        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        }
    },
    {
        template: 'timelinejs'
    });

    return Adapt.register('timelinejs', {
        model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
        view: TimelineView
    });
});