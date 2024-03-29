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


