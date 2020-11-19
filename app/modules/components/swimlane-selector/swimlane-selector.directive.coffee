#############################################################################
## Swimlane Selector
#############################################################################
SwimlaneSelector = ($timeout) ->

    link = (scope, el, attrs) ->

        scope.displaySelector = false

        mount = () ->
            getCurrentSwimlane()

        getCurrentSwimlane = () ->
            if (scope.currentSwimlaneId)
                filteredSwimlanes = scope.swimlanes.filter (swimlane) ->
                    return swimlane.id == scope.currentSwimlaneId
                scope.currentSwimlane = filteredSwimlanes[0];
            else
                scope.currentSwimlane = scope.swimlanes.shift()

        scope.displayOptions = () ->
            scope.displaySelector = true

        scope.hideOptions = () ->
            $timeout (() ->
                scope.displaySelector = false
            ), 300

        scope.selectSwimlane = (swimlane) ->
            scope.ngModel = swimlane.id
            scope.currentSwimlane = swimlane
            scope.hideOptions()

        mount()

    return {
        link: link,
        templateUrl: "components/swimlane-selector/swimlane-selector.html",
        scope: {
            swimlanes: '<',
            currentSwimlaneId: '<',
            ngModel : '=',
        },
        require: "ngModel"
    }

angular.module('taigaComponents').directive("tgSwimlaneSelector", ['$timeout', SwimlaneSelector])
